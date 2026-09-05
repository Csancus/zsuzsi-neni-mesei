"use client";

import { useState } from "react";

type Stats = {
  events: string[];
  eventLabels: Record<string, string>;
  days: string[];
  data: Record<string, Record<string, number>>;
  test: Record<string, Record<string, number>>;
  testTotal: Record<string, number>;
  total: Record<string, number>;
  pages: Record<string, Record<string, number>>;
  labels: Record<string, Record<string, number>>;
};

export function SzamokClient() {
  const [pw, setPw] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load(password: string, markTest = false) {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/stats?pw=${encodeURIComponent(password)}${markTest ? "&marktest=1" : ""}`;
      const res = await fetch(url, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Nem sikerült betölteni.");
        setStats(null);
      } else {
        setStats(json as Stats);
      }
    } catch {
      setError("Nem sikerült betölteni.");
    } finally {
      setLoading(false);
    }
  }

  if (!stats) {
    return (
      <main className="mx-auto w-full max-w-md px-5 py-20">
        <h1 className="font-display text-2xl font-bold">Számok</h1>
        <p className="mt-1 text-sm text-ink-soft">Kattintásmérés – zsuzsi-neni-mesei.hu</p>

        <form
          className="mt-8 rounded-2xl bg-white p-6 ring-1 ring-cream-300"
          onSubmit={(e) => {
            e.preventDefault();
            void load(pw);
          }}
        >
          <label htmlFor="pw" className="block text-sm font-bold">
            Jelszó
          </label>
          <input
            id="pw"
            type="password"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="mt-2 w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2.5 outline-none focus:border-night-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-xl bg-night-900 px-5 py-2.5 text-sm font-bold text-cream disabled:opacity-60"
          >
            {loading ? "Töltés…" : "Belépek"}
          </button>
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
        </form>
      </main>
    );
  }

  const { events, eventLabels, days, data, test, testTotal, total, pages, labels } = stats;
  const hasTest = Object.values(testTotal).some((n) => n > 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Számok</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Kattintásmérés – zsuzsi-neni-mesei.hu. Csak összesített darabszám; se IP, se
            süti, se azonosító.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void load(pw)}
            className="rounded-xl bg-cream-200 px-4 py-2 text-sm font-bold text-ink"
          >
            Frissítés
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Az eddigi összes számot fejlesztői tesztnek jelöljük, és levonjuk. Biztos?")) {
                void load(pw, true);
              }
            }}
            className="rounded-xl bg-cream-200 px-4 py-2 text-sm font-bold text-ink"
          >
            Eddigieket tesztnek jelölöm
          </button>
        </div>
      </div>

      <Section title="Összesen">
        <Table
          head={["Esemény", "Összes", ...(hasTest ? ["ebből teszt", "Valós"] : [])]}
          rows={events.map((e) => [
            eventLabels[e] ?? e,
            total[e] ?? 0,
            ...(hasTest ? [testTotal[e] ?? 0, (total[e] ?? 0) - (testTotal[e] ?? 0)] : []),
          ])}
        />
      </Section>

      <Section title="Naponta">
        {days.length === 0 ? (
          <Empty />
        ) : (
          <Table
            head={["Nap", ...events.map((e) => eventLabels[e] ?? e)]}
            rows={days.map((d) => [
              d,
              ...events.map((e) => {
                const n = data[d]?.[e] ?? 0;
                const t = test[d]?.[e] ?? 0;
                return n - t;
              }),
            ])}
          />
        )}
      </Section>

      <Section title="Mire kattintottak">
        <Breakdown rows={labels} events={events} eventLabels={eventLabels} first="Címke" />
      </Section>

      <Section title="Melyik oldalról">
        <Breakdown rows={pages} events={events} eventLabels={eventLabels} first="Oldal" />
      </Section>

      <p className="mt-10 rounded-xl bg-cream-200/70 px-4 py-3 text-xs leading-relaxed text-ink-soft">
        A számok a Vercel Blob tárolóban élnek, naponta és eseményenként összesítve. A
        mérés nem használ sütit és nem tárol semmit, amiből egy látogató azonosítható
        lenne, ezért nem is kér hozzájárulást. Ez az oldal <strong>noindex</strong>, a
        keresők nem indexelik.
      </p>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-lg font-bold">{title}</h2>
      <div className="mt-3 overflow-x-auto rounded-2xl bg-white ring-1 ring-cream-300">
        {children}
      </div>
    </section>
  );
}

function Empty() {
  return <p className="px-4 py-6 text-sm text-ink-soft">Még nincs mért adat.</p>;
}

function Table({ head, rows }: { head: string[]; rows: (string | number)[][] }) {
  return (
    <table className="w-full min-w-[640px] text-sm tabular-nums">
      <thead>
        <tr>
          {head.map((h, i) => (
            <th
              key={h}
              className={`border-b-2 border-cream-300 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-ink-soft ${
                i === 0 ? "text-left" : "text-right"
              }`}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={String(row[0])} className="hover:bg-cream-200/50">
            {row.map((cell, i) => (
              <td
                key={i}
                className={`whitespace-nowrap border-b border-cream-300 px-3 py-2 ${
                  i === 0 ? "text-left font-medium" : "text-right"
                } ${cell === 0 ? "text-cream-300" : ""}`}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Breakdown({
  rows,
  events,
  eventLabels,
  first,
}: {
  rows: Record<string, Record<string, number>>;
  events: string[];
  eventLabels: Record<string, string>;
  first: string;
}) {
  const keys = Object.keys(rows).sort(
    (a, b) => sum(rows[b]) - sum(rows[a]) || a.localeCompare(b, "hu"),
  );
  if (keys.length === 0) return <Empty />;

  const usedEvents = events.filter((e) => keys.some((k) => rows[k][e]));

  return (
    <Table
      head={[first, ...usedEvents.map((e) => eventLabels[e] ?? e), "Összes"]}
      rows={keys.map((k) => [
        k,
        ...usedEvents.map((e) => rows[k][e] ?? 0),
        sum(rows[k]),
      ])}
    />
  );
}

function sum(o: Record<string, number>) {
  return Object.values(o).reduce((a, b) => a + b, 0);
}
