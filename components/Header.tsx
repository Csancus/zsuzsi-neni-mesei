"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#hogyan", label: "Hogyan működik" },
  { href: "#mese", label: "A mai három" },
  { href: "#kategoriak", label: "Kategóriák" },
  { href: "#arak", label: "Árak" },
  { href: "#gyik", label: "GYIK" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night-900/85 text-cream backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-cream/75 transition hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#regisztracio"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-night-900 transition hover:bg-gold-soft sm:inline-block"
          >
            10 nap ingyen
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menü"
            className="grid size-10 place-items-center rounded-full ring-1 ring-white/20 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-5 pb-5 pt-3 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm text-cream/80 transition hover:bg-white/5 hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a
                href="#regisztracio"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold text-night-900"
              >
                10 nap ingyen
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
