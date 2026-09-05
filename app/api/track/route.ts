/*
 * POST /api/track   body: {"e":"mese_megnyitas","p":"/","l":"A hold, aki elaludt"}
 *
 * Egy aggregált napi számlálót növel. A kérésről SEMMIT nem tárolunk: se IP-t,
 * se user agentet, se azonosítót. Nem tesz le sütit, és nem ad vissza semmit.
 */
import { NextResponse } from "next/server";

import { EVENTS, cleanLabel, cleanPath, increment } from "@/lib/counters";

export async function POST(request: Request) {
  let event: unknown;
  let page: string | null = null;
  let label: string | null = null;

  try {
    const body = (await request.json()) as { e?: unknown; p?: unknown; l?: unknown };
    event = body?.e;
    page = cleanPath(body?.p);
    label = cleanLabel(body?.l);
  } catch {
    event = undefined;
  }

  if (typeof event !== "string" || !(EVENTS as readonly string[]).includes(event)) {
    return NextResponse.json(
      { error: "Unknown event" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    await increment(event, page, label);
  } catch (err) {
    // A látogató felé sose hibázzunk – a mérés nem funkció.
    console.error("[track] sikertelen:", err instanceof Error ? err.message : err);
  }

  return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
