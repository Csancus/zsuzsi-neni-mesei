"use client";

import { useEffect, useId, useRef, useState } from "react";

import { categories } from "@/lib/content";
import { WEB3FORMS_ENDPOINT, WEB3FORMS_KEY } from "@/lib/forms";
import { SITE_URL } from "@/lib/site";
import { track } from "@/lib/track";
import { TrackedLink } from "./TrackedLink";
import { usePreferences } from "./usePreferences";

type Status = "idle" | "loading" | "ok" | "unavailable";

export function SignupForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { selected } = usePreferences();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const submitted = useRef(false);
  const sinkName = `w3f-${useId().replace(/:/g, "")}`;

  const dark = variant === "dark";

  const chosen = categories
    .filter((c) => selected.includes(c.id))
    .map((c) => c.name)
    .join(", ");

  /**
   * A Web3Forms ingyenes csomagja se szerverről, se böngészős fetch-ből nem
   * engedi a hívást (403 + CORS), csak a natív űrlapküldést. Hogy közben ne
   * navigáljon el az oldal, a küldést egy rejtett iframe-be irányítjuk – ezt
   * csak akkor állítjuk be, ha van JavaScript. Enélkül marad a sima küldés, és
   * a Web3Forms a `redirect` mezőben megadott /koszonom oldalra tér vissza.
   */
  useEffect(() => {
    if (formRef.current) formRef.current.target = sinkName;
  }, [sinkName]);

  function onSubmit() {
    if (!WEB3FORMS_KEY) {
      setStatus("unavailable");
      return false;
    }
    submitted.current = true;
    track("feliratkozas_kuldes", dark ? "sötét űrlap" : "világos űrlap");
    setStatus("loading");
  }

  function onSinkLoad() {
    if (!submitted.current) return; // az iframe első, üres betöltése
    submitted.current = false;
    track("feliratkozas_siker");
    setEmail("");
    setStatus("ok");
  }

  return (
    <>
      <form
        ref={formRef}
        action={WEB3FORMS_ENDPOINT}
        method="POST"
        onSubmit={(e) => {
          if (onSubmit() === false) e.preventDefault();
        }}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {status === "ok" && (
          <p
            className={`mt-3 rounded-xl px-4 py-3 text-sm ${
              dark
                ? "bg-white/10 text-cream ring-1 ring-gold/40"
                : "bg-white text-ink ring-1 ring-gold/50"
            }`}
          >
            <span className="font-semibold">Köszönöm szépen! 🌙</span>{" "}
            <span className={dark ? "text-cream/75" : "text-ink-soft"}>
              Megkaptam a jelentkezésedet, hamarosan írok.
            </span>
          </p>
        )}

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

      {/* ide megy a küldés, hogy az oldal a helyén maradjon */}
      <iframe
        name={sinkName}
        title="Feliratkozás"
        onLoad={onSinkLoad}
        aria-hidden
        tabIndex={-1}
        style={{ display: "none" }}
      />
    </>
  );
}
