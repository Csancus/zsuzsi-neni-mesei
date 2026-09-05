import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Köszönöm!",
  description: "Megérkezett a jelentkezésed a Zsuzsi néni meséi próbaidőszakára.",
  robots: { index: false, follow: true },
};

/**
 * Tartalék köszönőoldal: ide csak akkor jut el a látogató, ha nincs JavaScript.
 * Egyébként az űrlap alatt jelenik meg a köszönő üzenet.
 */
export default function Koszonom() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="starfield flex-1 text-cream">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center px-5 py-24 text-center lg:py-32">
          <span
            aria-hidden
            className="float-slow grid size-20 place-items-center rounded-full bg-white/10 text-4xl ring-1 ring-gold/40"
          >
            🌙
          </span>

          <h1 className="mt-8 font-display text-3xl font-bold leading-tight sm:text-4xl">
            Köszönöm szépen!
          </h1>
          <p className="mt-4 text-lg text-cream/80">
            Megkaptam a jelentkezésedet, hamarosan írok.
          </p>

          <Link
            href="/"
            className="mt-10 rounded-full bg-gold px-6 py-3 text-sm font-bold text-night-900 transition hover:bg-gold-soft"
          >
            Vissza a főoldalra
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
