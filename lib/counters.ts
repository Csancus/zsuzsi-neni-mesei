/**
 * Kattintásmérés a /szamok oldalhoz – Vercel Blob tárolóval.
 *
 * A tárolt JSON alakja:
 *   {
 *     "2026-09-05": { "feliratkozas_kuldes": 4, "mese_megnyitas": 11 },  // napi összesítés
 *     "_oldalak":   { "mese_megnyitas": { "/": 11 } },                   // melyik oldalról
 *     "_cimkek":    { "mese_megnyitas": { "A hold, aki elaludt": 6 } },  // mire kattintottak
 *     "_teszt":     { days: {...}, pages: {...}, labels: {...} }         // fejlesztői alapvonal
 *   }
 *
 * FONTOS – adatvédelem: kizárólag aggregált darabszámot tárolunk esemény, oldal
 * és címke szerint. Se IP, se user agent, se azonosító, se süti, se localStorage.
 * Egyetlen sorból sem lehet visszakövetkeztetni arra, hogy ki kattintott.
 */
import { head, get, put, BlobPreconditionFailedError } from "@vercel/blob";

export const PATH = "szamok/counters.json";
export const PAGES_KEY = "_oldalak";
export const LABELS_KEY = "_cimkek";
export const TEST_KEY = "_teszt";

/** Engedélyezett eseménynevek – bármi más elutasítva. */
export const EVENTS = [
  "header_cta",
  "nav_klikk",
  "mese_megnyitas",
  "kategoria_be",
  "gyik_nyitas",
  "feliratkozas_kuldes",
  "feliratkozas_siker",
  "facebook_klikk",
  "jogi_megnyitas",
] as const;

export type EventName = (typeof EVENTS)[number];

/** Emberi nevek a /szamok oldal fejlécéhez. */
export const EVENT_LABELS: Record<EventName, string> = {
  header_cta: "Fejléc „10 nap ingyen”",
  nav_klikk: "Menüpont",
  mese_megnyitas: "Mese megnyitása",
  kategoria_be: "Kategória bejelölése",
  gyik_nyitas: "GYIK kérdés kinyitása",
  feliratkozas_kuldes: "Űrlap elküldve",
  feliratkozas_siker: "Sikeres feliratkozás",
  facebook_klikk: "Facebook-link",
  jogi_megnyitas: "Jogi oldal megnyitása",
};

export const META_KEYS = [PAGES_KEY, LABELS_KEY, TEST_KEY];

type Counters = Record<string, unknown>;
type DayCounts = Record<string, number>;
type Breakdown = Record<string, Record<string, number>>;

/** Budapest szerinti YYYY-MM-DD (a szerver UTC-ben jár). */
export function today(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Budapest",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/**
 * Útvonal-tisztítás. Csak a saját oldalaink útvonalát fogadjuk el, hogy szemét
 * ne tudja felfújni a tárolót. Query stringet és hash-t eldobunk.
 */
export function cleanPath(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let p = raw.split("?")[0].split("#")[0].trim();
  if (!p.startsWith("/")) return null;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  if (p === "") p = "/";
  if (p.length > 80) return null;
  if (!/^\/[a-z0-9/\-._]*$/i.test(p)) return null;
  return p;
}

/**
 * Címke-tisztítás: melyik mesére, kategóriára, kérdésre kattintottak. Csak a
 * saját felületünkről érkező, rövid szöveget engedünk be – szabad szöveget nem.
 */
export function cleanLabel(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const l = raw.trim().replace(/\s+/g, " ");
  if (!l || l.length > 80) return null;
  return l;
}

async function readWithEtag(): Promise<{ data: Counters; etag: string | null }> {
  let etag: string | null = null;
  try {
    const meta = await head(PATH);
    etag = meta?.etag ?? null;
  } catch {
    return { data: {}, etag: null }; // még nincs blob
  }
  const res = await get(PATH, { access: "private", useCache: false });
  if (!res) return { data: {}, etag };
  const text = res.stream ? await new Response(res.stream).text() : "";
  try {
    return { data: text ? (JSON.parse(text) as Counters) : {}, etag };
  } catch {
    return { data: {}, etag };
  }
}

async function write(data: Counters, etag: string | null) {
  await put(PATH, JSON.stringify(data), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    ...(etag ? { ifMatch: etag } : {}),
  });
}

export async function readCounters(): Promise<Counters> {
  const { data } = await readWithEtag();
  return data;
}

function bump(target: Breakdown, event: string, key: string) {
  target[event] = target[event] || {};
  target[event][key] = (target[event][key] || 0) + 1;
}

/** Atomi növelés: feltételes írás ETag-gel, ütközés esetén újrapróbál. */
export async function increment(
  event: string,
  page: string | null,
  label: string | null,
): Promise<boolean> {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readWithEtag();
    const day = today();

    const days = (data[day] as DayCounts) || {};
    days[event] = (days[event] || 0) + 1;
    data[day] = days;

    if (page) {
      const pages = (data[PAGES_KEY] as Breakdown) || {};
      bump(pages, event, page);
      data[PAGES_KEY] = pages;
    }
    if (label) {
      const labels = (data[LABELS_KEY] as Breakdown) || {};
      bump(labels, event, label);
      data[LABELS_KEY] = labels;
    }

    try {
      await write(data, etag);
      return true;
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue; // párhuzamos írás
      throw err;
    }
  }
  return false;
}

/**
 * Az aktuális állást fejlesztői teszt-alapvonalként rögzíti: ami eddig
 * összejött, az próbálgatás volt, nem valódi látogató. A /szamok oldal ezt
 * külön jelöli és levonja.
 */
export async function markAsTest() {
  for (let attempt = 0; attempt < 4; attempt++) {
    const { data, etag } = await readWithEtag();

    const days: Record<string, DayCounts> = {};
    for (const [k, v] of Object.entries(data)) {
      if (META_KEYS.includes(k)) continue;
      days[k] = { ...(v as DayCounts) };
    }
    data[TEST_KEY] = {
      days,
      pages: JSON.parse(JSON.stringify(data[PAGES_KEY] || {})),
      labels: JSON.parse(JSON.stringify(data[LABELS_KEY] || {})),
    };

    try {
      await write(data, etag);
      return data[TEST_KEY];
    } catch (err) {
      if (err instanceof BlobPreconditionFailedError) continue;
      throw err;
    }
  }
  return null;
}
