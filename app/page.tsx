import Image from "next/image";

import { CategoryPicker } from "@/components/CategoryPicker";
import { FaqList } from "@/components/FaqList";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SignupForm } from "@/components/SignupForm";
import { StoryPicker } from "@/components/StoryPicker";
import { site } from "@/lib/content";

const steps = [
  {
    n: "1",
    title: "Megmondjátok, mit szerettek",
    body: "Bejelölitek a kedvenc témákat, és megadjátok, hány éves a gyermeked. Két perc az egész, és bármikor meggondolhatjátok magatokat.",
  },
  {
    n: "2",
    title: "Délután megérkezik a három mese",
    body: "Kora délután megírom nektek, mi a mai három. Mindegyiknél ott a címe, hogy miről szól, és hogy hány perc felolvasni – így már vacsora közben tudjátok, mi vár rátok.",
  },
  {
    n: "3",
    title: "A gyermeked választ, te felolvasod",
    body: "Megmutatod neki mind a hármat, és ő dönt. Egy koppintás, és ott a teljes mese: nagy betűkkel, reklám nélkül, hogy csak egymásra kelljen figyelnetek.",
  },
];

/* A négy ígéret a Facebook-borítóról */
const promises = [
  {
    icon: "🧡",
    title: "Személyre szabható kategóriák",
    body: "Ha most éppen az állatok a kedvenc téma, válasszátok azt, és olyat küldök! Ha jobban örülnétek egy kalandosnak, akkor olyat. Ti választjátok ki a témát a következő napokra.",
  },
  {
    icon: "⭐",
    title: "Minden nap 3 mese, ti választotok",
    body: "Nem egyetlen kötelező mesét küldök, hanem hármat, amiből választhattok. Így az esti mese nem feladat lesz, hanem közös döntés.",
  },
  {
    icon: "🌱",
    title: "Nyugodtabb esték",
    body: "Fél nyolckor már nem kell törnötök a fejeteket, mi legyen a mese. Ott vár a három, és csak annyi a dolgotok, hogy leüljetek egymás mellé.",
  },
  {
    icon: "🌈",
    title: "Boldogabb gyerekek",
    body: "Sokat jelent neki, hogy a nap végén az övé a döntés. Sokszor épp ettől megy könnyebben a lefekvés.",
  },
];

const benefits = [
  {
    emoji: "⏱️",
    title: "Tudod, mennyi idő",
    body: "Minden mesénél odaírom, hány perc felolvasni. Ha ma tényleg csak öt percetek van, nyugodtan válasszatok öt percest – az is egész mese.",
  },
  {
    emoji: "📵",
    title: "Képernyő helyett hang",
    body: "A telefon a te kezedben marad, a gyermeked pedig csak a te hangodat hallja. Nincs villogás, és nem indul el magától a következő rész.",
  },
  {
    emoji: "🌙",
    title: "Elalvásra hangolva",
    body: "Egyik mesémnek sincs izgalomban hagyó vége. Úgy írom meg őket, hogy az utolsó mondat után jólessen lekapcsolni a villanyt.",
  },
  {
    emoji: "🎒",
    title: "Veletek együtt változik",
    body: "Ahogy nő a gyermeked, más témák kezdik érdekelni. Ilyenkor elég átjelölnötök a kategóriákat, és a válogatás követi őt.",
  },
  {
    emoji: "✍️",
    title: "Eredeti mesék",
    body: "Minden mesét én írok, magyarul, egyesével. Nincs köztük netről összeszedett vagy géppel fordított szöveg.",
  },
  {
    emoji: "💌",
    title: "Nem app, csak egy e-mail",
    body: "Nem kell letöltenetek semmit, és esténként sem kell bejelentkezni sehova. Megérkezik, megnyitod, olvasod.",
  },
];

const included = [
  "Naponta 3 friss, eredeti mese",
  "A témákat ti választjátok",
  "Felolvasási idő minden mesénél",
  "Ajánlott életkor minden mesénél",
  "Reklám nélküli olvasófelület",
  "Bármikor lemondható",
];

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col">
      <Header />

      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="starfield relative overflow-hidden text-cream">
          <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide ring-1 ring-white/20">
                <span aria-hidden>✨</span> 10 nap ingyen, bankkártya nélkül
              </span>

              <h1 className="mt-6 font-display text-[2.1rem] font-bold leading-[1.12] tracking-tight sm:text-[2.75rem] lg:text-[3.2rem]">
                Minden este három mese.
                <br />
                <span className="text-gold-soft">A gyermeked választ.</span>
                <br />
                <span className="text-gold-soft">Boldog és nyugodt este.</span>
              </h1>

              <p className="mt-5 font-hand text-2xl text-cream/85 sm:text-[1.7rem]">
                {site.tagline}
              </p>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/75">
                Minden délután küldök nektek három mesét. Megmutatod a gyermekednek, ő
                kiválasztja a témát, és együtt élvezitek a mese hullámait. Másnapra is
                választhattok egyet.
              </p>

              <div className="mt-8 max-w-xl">
                <SignupForm variant="dark" />
              </div>

              <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-cream/70">
                <li className="inline-flex items-center gap-2">
                  <Check /> Napi 3 új mese
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check /> Ti választotok témát
                </li>
                <li className="inline-flex items-center gap-2">
                  <Check /> Bármikor lemondható
                </li>
              </ul>
            </div>

            {/* Márkaillusztráció + a napi hármas előnézete */}
            <div className="relative mx-auto w-full max-w-md pb-40 sm:pb-44 lg:pb-36">
              <Image
                src="/logo.webp"
                alt="Kislány a paplan alatt, mackóval és csillagos mesekönyvvel – Esti Mesék"
                width={640}
                height={640}
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="float-slow w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              />

              <div className="absolute bottom-0 left-0 w-64 rounded-3xl bg-cream p-4 text-ink shadow-2xl ring-1 ring-night-900/10 sm:w-72 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink-soft">
                  Ma este
                </p>
                <p className="mt-0.5 font-display text-base font-bold sm:text-lg">
                  Melyiket olvassuk?
                </p>

                <div className="mt-3 space-y-2">
                  <PreviewRow emoji="🌙" title="A hold, aki elaludt" meta="6 perc · elalvós" />
                  <PreviewRow
                    emoji="🗺️"
                    title="Bátor Samu és a viharos tó"
                    meta="9 perc · kalandok"
                    active
                  />
                  <PreviewRow
                    emoji="💛"
                    title="Miért mérges a kis sárkány?"
                    meta="7 perc · érzésekről"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Négy ígéret ---------- */}
        <section className="bg-cream py-16 lg:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="card-glow overflow-hidden rounded-[2rem] ring-1 ring-cream-300">
              <Image
                src="/meseles.jpg"
                alt="Anya és kisgyerek esti mesét olvasnak az ágyban, mackóval és alvó kutyával"
                width={1300}
                height={1040}
                sizes="(min-width: 1024px) 46vw, 92vw"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold">
                Amit kaptok
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
                Meséljünk együtt minden este
              </h2>

              <ul className="mt-8 space-y-5">
                {promises.map((p) => (
                  <li key={p.title} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-full bg-cream-200 text-lg"
                    >
                      {p.icon}
                    </span>
                    <span>
                      <span className="block font-display text-lg font-bold">{p.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-soft">
                        {p.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- Idézet ---------- */}
        <section className="starfield stars-strip py-14 text-cream">
          <p className="mx-auto max-w-3xl px-5 text-center font-hand text-3xl leading-snug text-gold-soft sm:text-4xl">
            {site.quote}
          </p>
        </section>

        {/* ---------- A mai három ---------- */}
        <section id="mese" className="scroll-mt-20 bg-cream py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead
              eyebrow="Egy példa"
              title="Ez érkezett ma"
              lead="Ez a mai hármas. Nyissátok meg bármelyiket, és el is olvashatjátok az egészet – pontosan így érkezik majd hozzátok minden délután."
            />
            <div className="mt-12">
              <StoryPicker />
            </div>
          </div>
        </section>

        {/* ---------- Hogyan működik ---------- */}
        <section id="hogyan" className="scroll-mt-20 bg-cream-200/60 py-20 lg:py-24">
          <div className="mx-auto w-full max-w-6xl px-5">
            <SectionHead
              eyebrow="Három lépés"
              title="Hogyan működik"
              lead="Egyszer beállítjátok, onnantól már csak a felolvasás marad."
            />

            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s) => (
                <li key={s.n} className="card-glow rounded-3xl bg-white p-7 ring-1 ring-cream-300">
                  <span className="grid size-11 place-items-center rounded-full bg-night-900 font-display text-lg font-bold text-gold-soft">
                    {s.n}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
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
              lead="Jelöljétek be, ami érdekel titeket. A holnapi hármast már ehhez igazítom – és ha közben mást szeretnétek, bármikor átírhatjátok."
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
              eyebrow="Amiért jó"
              title="Az esti mese legyen a nap legkönnyebb része"
            />

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-3xl bg-white/[0.07] p-6 ring-1 ring-white/10">
                  <span aria-hidden className="text-2xl">
                    {b.emoji}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
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
              lead="Nincsenek csomagok és extrák. Ennyi az egész."
            />

            <div className="card-glow mt-12 overflow-hidden rounded-[2rem] bg-night-900 text-cream">
              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <div className="bg-night-900 p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-soft">
                    Először
                  </p>
                  <p className="mt-3 font-display text-4xl font-bold">10 nap ingyen</p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    Harminc mese, mindennel együtt. Bankkártyát nem kérek hozzá, így a
                    tizedik nap után magától nem indul el semmi.
                  </p>
                </div>

                <div className="bg-night-800 p-8">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold-soft">
                    Utána
                  </p>
                  <p className="mt-3 font-display text-4xl font-bold">
                    5 000 Ft
                    <span className="ml-1 text-base font-normal text-cream/60">/ hó</span>
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">
                    Nagyjából egy mesekönyv ára – havonta kilencven meséért. Ha mégsem
                    nektek való, egy kattintás a lemondás.
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
        <section id="gyik" className="scroll-mt-20 bg-cream-200/60 py-20 lg:py-24">
          <div className="mx-auto w-full max-w-3xl px-5">
            <SectionHead eyebrow="Kérdések" title="Amit a szülők kérdezni szoktak" />

            <div className="mt-12">
              <FaqList />
            </div>
          </div>
        </section>

        {/* ---------- Záró CTA ---------- */}
        <section id="regisztracio" className="starfield scroll-mt-20 py-20 text-cream lg:py-24">
          <div className="mx-auto w-full max-w-2xl px-5 text-center">
            <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
              Holnap este már ő választhat.
            </h2>
            <p className="mt-4 text-lg text-cream/75">
              Írd be az e-mail címed, és holnap délután már küldöm is az első három
              mesét. Tíz napig ingyen, bankkártya nélkül.
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
        className={`text-xs font-bold uppercase tracking-widest ${
          dark ? "text-gold-soft" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
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
      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 ${
        active ? "bg-gold/25 ring-2 ring-gold" : "bg-cream-200/80"
      }`}
    >
      <span aria-hidden className="text-lg">
        {emoji}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-bold">{title}</span>
        <span className="block text-[11px] text-ink-soft">{meta}</span>
      </span>
    </div>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-4 text-gold-soft ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden
    >
      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
