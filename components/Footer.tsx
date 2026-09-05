import { site } from "@/lib/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-900 text-cream/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo className="text-cream" />
          <p className="mt-4 text-sm leading-relaxed">
            Naponta három friss esti mese e-mailben. A gyerek választ egyet, te
            felolvasod – és este fél nyolckor nem kell kitalálni semmit.
          </p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cream transition hover:bg-white/15"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
              <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
            </svg>
            Kövess minket a Facebookon
          </a>
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
          <a className="transition hover:text-cream" href="#hogyan">Hogyan működik</a>
          <a className="transition hover:text-cream" href="#kategoriak">Kategóriák</a>
          <a className="transition hover:text-cream" href="#arak">Árak</a>
          <a className="transition hover:text-cream" href="#gyik">GYIK</a>
          <a className="transition hover:text-cream" href={`mailto:${site.email}`}>
            Kapcsolat
          </a>
          <a
            className="transition hover:text-cream"
            href={site.facebook}
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Zsuzsi néni meséi</p>
          <p>Minden mese saját írás – nem gyűjtött, nem másolt.</p>
        </div>
      </div>
    </footer>
  );
}
