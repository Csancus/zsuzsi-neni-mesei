import Link from "next/link";

import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalShell({
  title,
  intro,
  updatedAt,
  children,
}: {
  title: string;
  intro: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        <section className="starfield py-14 text-cream lg:py-16">
          <div className="mx-auto w-full max-w-3xl px-5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-cream/70 transition hover:text-cream"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Vissza a főoldalra
            </Link>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-cream/75">{intro}</p>
            <p className="mt-4 text-xs text-cream/55">Hatályos: {updatedAt}</p>
          </div>
        </section>

        <section className="bg-cream py-14 lg:py-16">
          <div className="legal-prose mx-auto w-full max-w-3xl px-5">{children}</div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/** Kitöltendő helykitöltő – vizuálisan is kiugrik, nehogy így menjen élesbe. */
export function Todo({ children }: { children: React.ReactNode }) {
  return <span className="todo">{children}</span>;
}
