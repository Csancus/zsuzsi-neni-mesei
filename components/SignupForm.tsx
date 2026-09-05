"use client";

import { TrackedLink } from "./TrackedLink";

import { useState } from "react";
import { track } from "@/lib/track";
import { usePreferences } from "./usePreferences";

type Status = "idle" | "loading" | "ok" | "unavailable" | "error";

export function SignupForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { selected } = usePreferences();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const dark = variant === "dark";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    track("feliratkozas_kuldes", variant === "dark" ? "sötét űrlap" : "világos űrlap");

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          categories: selected,
          website: form.get("website") ?? "",
        }),
      });
      if (res.ok) {
        track("feliratkozas_siker");
        setStatus("ok");
        setEmail("");
      } else if (res.status === 503) {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div
        className={`rounded-2xl px-5 py-4 text-sm ${
          dark
            ? "bg-white/10 text-cream ring-1 ring-white/20"
            : "bg-night-900/5 text-ink ring-1 ring-night-900/10"
        }`}
      >
        <p className="font-semibold">Megvagytok, köszönöm! 🌙</p>
        <p className={dark ? "mt-1 text-cream/75" : "mt-1 text-ink-soft"}>
          Küldtem egy e-mailt, kattints rá, és holnap délután már ott lesz nálatok az
          első három mese.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
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
        {/* mézesbödön: valódi látogató nem tölti ki */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="pointer-events-none absolute size-0 opacity-0"
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
          <a className="underline" href="mailto:hello@zsuzsineni-mesei.hu">
            hello@zsuzsineni-mesei.hu
          </a>{" "}
          címre, és szólok, amint élesítem.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-xs text-red-300">
          Most nem sikerült elküldeni. Próbáld meg újra, vagy írj a hello@zsuzsineni-mesei.hu címre.
        </p>
      )}
    </form>
  );
}
