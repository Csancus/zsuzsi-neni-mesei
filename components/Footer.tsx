import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-900 text-cream/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo className="text-cream" />
          <p className="mt-4 text-sm leading-relaxed">
            Naponta három friss esti mese e-mailben. A gyerek választ egyet, te
            felolvasod – és este fél nyolckor nem kell kitalálni semmit.
          </p>
        </div>

        <nav className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-2">
          <a className="transition hover:text-cream" href="#hogyan">Hogyan működik</a>
          <a className="transition hover:text-cream" href="#kategoriak">Kategóriák</a>
          <a className="transition hover:text-cream" href="#arak">Árak</a>
          <a className="transition hover:text-cream" href="#gyik">GYIK</a>
          <a className="transition hover:text-cream" href="mailto:hello@zsuzsineni-mesei.hu">
            Kapcsolat
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
