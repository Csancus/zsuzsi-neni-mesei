import { CategoryPicker } from "@/components/CategoryPicker";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SignupForm } from "@/components/SignupForm";
import { StoryPicker } from "@/components/StoryPicker";
import { faq } from "@/lib/content";

const steps = [
  {
    n: "1",
    title: "Beállítod, mit szerettek",
    body: "Kijelölöd a kedvenc kategóriákat és a gyerek korát. Két perc az egész, és bármikor módosíthatod.",
  },
  {
    n: "2",
    title: "Délután megérkezik a hármas",
    body: "Minden nap kora délután e-mailben kapsz három friss mesét: cím, hangulat, felolvasási idő. Így már vacsora közben tudod, mi lesz.",
  },
  {
    n: "3",
    title: "A gyerek választ, te felolvasod",
    body: "Egy kattintás, és megnyílik a teljes mese – nagy betűkkel, reklám nélkül, telefonra szabva.",
  },
];

const benefits = [
  {
    emoji: "🕗",
    title: "Nem kell esténként ötletelni",
    body: "A „na, mit meséljek ma?” kérdés lekerül a válladról. Kész válogatás vár, mire hazaértek.",
  },
  {
    emoji: "🙋",
    title: "A gyerek is dönt",
    body: "A választás élménye önmagában segít a lefekvésnél: nem rá esik valami, hanem ő kér valamit.",
  },
  {
    emoji: "⏱️",
    title: "Tudod, mennyi idő",
    body: "Minden mesénél ott a felolvasási idő. Ha ma csak öt perc van, öt percest választasz.",
  },
  {
    emoji: "📵",
    title: "Képernyő helyett hang",
    body: "A telefon nálad marad, a gyerek csak a hangodat hallja. Se villogás, se automatikus következő rész.",
  },
  {
    emoji: "🌱",
    title: "Veletek együtt változik",
    body: "Ahogy nő a gyerek és jönnek az új témák, a válogatás is követi – elég átállítanod a kategóriákat.",
  },
  {
    emoji: "✍️",
    title: "Eredeti mesék",
    body: "Minden szöveg saját írás, magyarul, gyerekhangra hangolva – nem netről összeszedett anyag.",
  },
];

const included = [
  "Naponta 3 friss, eredeti mese",
  "Kategóriák tetszés szerint",
  "Felolvasási idő minden mesénél",
  "Korosztály-jelölés (3–8 év)",
  "Reklámmentes olvasófelület",
  "Bármikor lemondható",
];

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="starfield relative overflow-hidden text-cream">
          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide ring-1 ring-white/20">
                <span aria-hidden>✨</span> 10 nap ingyen, bankkártya nélkül
              </span>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Minden este három mese.
                <br />
                <span className="text-gold-soft">A gyerek választ egyet.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">
                Nem kell többé fejből kitalálni, mit meséljetek. Naponta küldünk három
                friss, eredeti esti mesét – ti eldöntitek, melyik kerül ma sorra.
              </p>

              <div className="mt-9 max-w-xl">
                <SignupForm variant="dark" />
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream/70">
                <li className="inline-flex items-center gap-2">
                  <Check /> Napi 3 új mese
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check /> Saját kategóriák
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check /> Bármikor lemondható
                </li>
              </ul>
            </div>

            {/* Telefonos előnézet */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="float-slow rounded-[2.2rem] bg-white/10 p-3 ring-1 ring-white/20 backdrop-blur-sm">
                <div className="rounded-[1.7rem] bg-cream p-5 text-ink">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                    Ma este
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold">
                    Melyiket olvassuk?
                  </p>

                  <div className="mt-4 space-y-2.5">
                    <PreviewRow emoji="🌙" title="A hold, aki elaludt" meta="6 perc · elalvós" />
                    <PreviewRow
                      emoji="🗺️"
                      title="Bátor Bogyó és a viharos tó"
                      meta="9 perc · kalandos"
                      active
                    />
                    <PreviewRow
                      emoji="💛"
                      title="Miért mérges a kis sárkány?"
                      meta="7 perc · érzésekről"
                    />
                  </div>

                  <div className="mt-5 rounded-2xl bg-night-900 px-4 py-3 text-center text-sm font-semibold text-cream">
                    Olvasás indítása
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- A mai három ---------- */}
        <section id="mese" className="scroll-mt-20 bg-cream py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead
              eyebrow="Nézd meg élesben"
              title="Így néz ki egy napi hármas"
              lead="Ez a mai válogatás. Válassz egyet – pontosan ennyi a dolgotok esténként."
            />
            <div className="mt-12">
              <StoryPicker />
            </div>
          </div>
        </section>

        {/* ---------- Hogyan működik ---------- */}
        <section id="hogyan" className="scroll-mt-20 bg-cream-200/50 py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead
              eyebrow="Három lépés"
              title="Hogyan működik"
              lead="Egyszer beállítod, aztán már csak felolvasol."
            />

            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="card-glow rounded-3xl bg-white p-7 ring-1 ring-cream-300"
                >
                  <span className="grid size-11 place-items-center rounded-full bg-night-900 font-display text-lg font-semibold text-gold-soft">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Kategóriák ---------- */}
        <section id="kategoriak" className="scroll-mt-20 bg-cream py-20 lg:py-24">
          <div className="mx-auto w-full max-w-4xl px-5">
            <SectionHead
              eyebrow="Ti szabjátok testre"
              title="Milyen meséket szeretnétek?"
              lead="Jelöld be, ami érdekel – a holnapi hármas már ehhez igazodik. Bármikor átállítható."
            />
            <div className="mt-12">
              <CategoryPicker />
            </div>
          </div>
        </section>

        {/* ---------- Miért jó ---------- */}
        <section className="starfield py-20 text-cream lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead
              dark
              eyebrow="Miért érdemes"
              title="Az esti mese legyen a nap legkönnyebb része"
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10"
                >
                  <span aria-hidden className="text-2xl">
                    {b.emoji}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Árak ---------- */}
        <section id="arak" className="scroll-mt-20 bg-cream py-20 lg:py-24">
          <div className="mx-auto w-full max-w-3xl px-5">
            <SectionHead
              eyebrow="Árazás"
              title="Egy ár, minden benne"
              lead="Nincs csomag, nincs extra, nincs hűségidő."
            />

            <div className="card-glow mt-12 overflow-hidden rounded-[2rem] bg-night-900 text-cream">
              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-night-900 p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-soft">
                    Először
                  </p>
                  <p className="mt-3 font-display text-4xl font-semibold">10 nap ingyen</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    30 mese, teljes hozzáféréssel. Bankkártya nem kell hozzá, és a végén
                    sem vonunk le semmit magától.
                  </p>
                </div>

                <div className="bg-night-800 p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold-soft">
                    Utána
                  </p>
                  <p className="mt-3 font-display text-4xl font-semibold">
                    5 000 Ft
                    <span className="ml-1 text-base font-normal text-cream/60">/ hó</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    Kevesebb, mint egy mesekönyv ára – havonta kb. 90 új mesével. Egy
                    kattintással lemondható.
                  </p>
                </div>
              </div>

              <ul className="grid gap-3 border-t border-white/10 p-8 sm:grid-cols-2">
                {included.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-cream/80">
                    <Check className="mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- GYIK ---------- */}
        <section id="gyik" className="scroll-mt-20 bg-cream-200/50 py-20 lg:py-24">
          <div className="mx-auto w-full max-w-3xl px-5">
            <SectionHead eyebrow="Kérdések" title="Amit a szülők kérdezni szoktak" />

            <div className="mt-12 space-y-3">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl bg-white px-6 py-5 ring-1 ring-cream-300 open:ring-night-600/25"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-semibold">
                    {item.q}
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5 shrink-0 text-ink-soft transition group-open:rotate-45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Záró CTA ---------- */}
        <section id="regisztracio" className="starfield scroll-mt-20 py-20 text-cream lg:py-24">
          <div className="mx-auto w-full max-w-2xl px-5 text-center">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Ma este már választhat.
            </h2>
            <p className="mt-4 text-lg text-cream/75">
              Add meg az e-mail címed, és holnap délután megérkezik az első három mese.
              Tíz napig ingyen, kötelezettség nélkül.
            </p>
            <div className="mt-9 text-left">
              <SignupForm variant="dark" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`text-xs font-semibold uppercase tracking-widest ${
          dark ? "text-gold-soft" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            dark ? "text-cream/70" : "text-ink-soft"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

function PreviewRow({
  emoji,
  title,
  meta,
  active = false,
}: {
  emoji: string;
  title: string;
  meta: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 ${
        active ? "bg-gold/20 ring-2 ring-gold" : "bg-cream-200/70"
      }`}
    >
      <span aria-hidden className="text-xl">
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{title}</span>
        <span className="block text-xs text-ink-soft">{meta}</span>
      </span>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 text-gold ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
