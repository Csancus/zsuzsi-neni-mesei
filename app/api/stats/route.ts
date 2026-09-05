/*
 * GET /api/stats?pw=...            – napi számok + oldal/címke szerinti bontás
 * GET /api/stats?pw=...&marktest=1 – az eddigi állást teszt-alapvonalnak jelöli
 *
 * A jelszó a SZAMOK_PW környezeti változóból jön.
 */
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

import {
  EVENTS,
  EVENT_LABELS,
  LABELS_KEY,
  META_KEYS,
  PAGES_KEY,
  TEST_KEY,
  markAsTest,
  readCounters,
  today,
} from "@/lib/counters";

const noStore = { "Cache-Control": "no-store" };

/** Hézagmentes YYYY-MM-DD lista from..to között (növekvő). */
function fillDays(from: string | undefined, to: string): string[] {
  if (!from) return [];
  const out: string[] = [];
  const cur = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  while (cur <= end && out.length < 3660) {
    out.push(cur.toISOString().slice(0, 10));
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return out;
}

function passwordMatches(given: string, expected: string) {
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

type Breakdown = Record<string, Record<string, number>>;

/** Bontás a teszt-alapvonal levonásával: { kulcs: { esemény: darab } }. */
function netBreakdown(all: Breakdown, test: Breakdown) {
  const rows: Record<string, Record<string, number>> = {};
  for (const event of EVENTS) {
    const src = all[event] || {};
    for (const [key, n] of Object.entries(src)) {
      const net = n - ((test[event] || {})[key] || 0);
      if (net <= 0) continue;
      rows[key] = rows[key] || {};
      rows[key][event] = net;
    }
  }
  return rows;
}

export async function GET(request: Request) {
  const expected = process.env.SZAMOK_PW;
  if (!expected) {
    return NextResponse.json(
      { error: "A SZAMOK_PW környezeti változó nincs beállítva." },
      { status: 500, headers: noStore },
    );
  }

  const url = new URL(request.url);
  const given = url.searchParams.get("pw") ?? "";
  if (!passwordMatches(given, expected)) {
    return NextResponse.json(
      { error: "Hibás jelszó" },
      { status: 401, headers: noStore },
    );
  }

  try {
    if (url.searchParams.get("marktest") === "1") await markAsTest();

    const data = await readCounters();
    const test = (data[TEST_KEY] as {
      days?: Record<string, Record<string, number>>;
      pages?: Breakdown;
      labels?: Breakdown;
    }) || {};
    const testDays = test.days || {};

    // A tárolóban csak azok a napok szerepelnek, amelyeken volt esemény.
    // A táblázatban a nullás napok is kellenek, ezért az első mért naptól
    // MA-ig (Budapest szerint) minden naptári napot felsorolunk.
    const recorded = Object.keys(data)
      .filter((d) => !META_KEYS.includes(d))
      .sort();
    const days = fillDays(recorded[0], today()).reverse();

    const dayData = data as Record<string, Record<string, number>>;
    const total: Record<string, number> = {};
    const testTotal: Record<string, number> = {};
    for (const e of EVENTS) {
      total[e] = days.reduce((s, d) => s + (dayData[d]?.[e] || 0), 0);
      testTotal[e] = days.reduce((s, d) => s + (testDays[d]?.[e] || 0), 0);
    }

    return NextResponse.json(
      {
        events: EVENTS,
        eventLabels: EVENT_LABELS,
        days,
        data,
        test: testDays,
        testTotal,
        total,
        pages: netBreakdown((data[PAGES_KEY] as Breakdown) || {}, test.pages || {}),
        labels: netBreakdown((data[LABELS_KEY] as Breakdown) || {}, test.labels || {}),
      },
      { headers: noStore },
    );
  } catch (err) {
    console.error("[stats] sikertelen:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Nem sikerült beolvasni a számlálókat." },
      { status: 500, headers: noStore },
    );
  }
}
