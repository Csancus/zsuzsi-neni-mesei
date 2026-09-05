"use client";

import { useState } from "react";

import { categories } from "@/lib/content";
import { WEB3FORMS_ENDPOINT, WEB3FORMS_KEY } from "@/lib/forms";
import { SITE_URL } from "@/lib/site";
import { track } from "@/lib/track";
import { TrackedLink } from "./TrackedLink";
import { usePreferences } from "./usePreferences";

type Status = "idle" | "loading" | "unavailable";

export function SignupForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { selected } = usePreferences();
  const [status, setStatus] = useState<Status>("idle");

  const dark = variant === "dark";

  const chosen = categories
    .filter((c) => selected.includes(c.id))
    .map((c) => c.name)
    .join(", ");

  /**
   * Natív űrlapküldés a Web3Forms felé. Nem AJAX: az ingyenes csomag a szerver
   * felőli és a böngészős fetch-hívást is elutasítja, a sima form POST viszont
   * megy (ugyanez fut a budapest-dietetikus.hu oldalon). Siker után a Web3Forms
   * a `redirect` mezőben megadott saját oldalunkra irányít.
   */
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!WEB3FORMS_KEY) {
      e.preventDefault();
      setStatus("unavailable");
      return;
    }
    track("feliratkozas_kuldes", dark ? "sötét űrlap" : "világos űrlap");
    setStatus("loading");
    // nincs preventDefault – innen a böngésző küldi el az űrlapot
  }

  return (
    <form
      action={WEB3FORMS_ENDPOINT}
      method="POST"
      onSubmit={onSubmit}
      className="w-full"
    >
      <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
      <input type="hidden" name="subject" value="Új feliratkozó – Zsuzsi néni meséi" />
      <input type="hidden" name="from_name" value="Zsuzsi néni meséi" />
      <input type="hidden" name="Kategóriák" value={chosen || "(nem választott)"} readOnly />
      <input type="hidden" name="redirect" value={`${SITE_URL}/koszonom`} />
      {/* mézesbödön: a Web3Forms eldobja a küldést, ha ki van töltve */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden
        style={{ display: "none" }}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${variant}`}>
          E-mail cím
        </label>
        <input
          id={`email-${variant}`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="pelda@email.com"
          className={`h-13 min-w-0 flex-1 rounded-full px-5 text-base outline-none transition ${
            dark
              ? "bg-white/10 text-cream ring-1 ring-white/20 placeholder:text-cream/40 focus:ring-2 focus:ring-gold"
              : "bg-white text-ink ring-1 ring-cream-300 placeholder:text-ink-soft/60 focus:ring-2 focus:ring-gold"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-13 shrink-0 rounded-full bg-gold px-7 text-base font-semibold text-night-900 transition hover:bg-gold-soft disabled:opacity-60"
        >
          {status === "loading" ? "Küldés…" : "Indulhat a 10 nap"}
        </button>
      </div>

      <p className={`mt-3 text-xs ${dark ? "text-cream/55" : "text-ink-soft"}`}>
        Bankkártyát nem kérek. A tizedik nap előtt írok, hogy dönthessetek. A
        feliratkozással elfogadod az{" "}
        <TrackedLink
          className="underline underline-offset-2"
          href="/aszf"
          event="jogi_megnyitas"
          label="ÁSZF (űrlap alól)"
        >
          ÁSZF-et
        </TrackedLink>{" "}
        és az{" "}
        <TrackedLink
          className="underline underline-offset-2"
          href="/adatkezelesi-tajekoztato"
          event="jogi_megnyitas"
          label="Adatkezelési (űrlap alól)"
        >
          adatkezelési tájékoztatót
        </TrackedLink>
        .
      </p>

      {status === "unavailable" && (
        <p className="mt-3 rounded-xl bg-gold/15 px-4 py-3 text-xs text-gold-soft ring-1 ring-gold/30">
          A regisztráció még nem indult el. Írj addig a{" "}
          <a className="underline" href="mailto:hello@zsuzsi-neni-mesei.hu">
            hello@zsuzsi-neni-mesei.hu
          </a>{" "}
          címre, és szólok, amint élesítem.
        </p>
      )}
    </form>
  );
}
