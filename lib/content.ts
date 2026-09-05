import { storyBodies } from "./stories";

export type Category = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "kalandok", name: "Kalandok", emoji: "🗺️", blurb: "Térkép, csónak, elveszett kincs. Ezekben történik a legtöbb minden." },
  { id: "allatok", name: "Állatok", emoji: "🦊", blurb: "Erdei és háztáji szereplők, barátkozás és bátorság." },
  { id: "termeszet", name: "Természet", emoji: "🍂", blurb: "Eső, hó, magvak, csillagok. Közben észrevétlenül tanul is." },
  { id: "baratsag", name: "Barátság", emoji: "🤝", blurb: "Összeveszés, kibékülés, és hogy együtt könnyebb." },
  { id: "tanulsagos", name: "Tanulságos mesék", emoji: "📖", blurb: "A végén marad valami, amiről még beszélgethettek." },
  { id: "tundermese", name: "Tündérmesék", emoji: "🧚", blurb: "Varázslat, királylányok, hét próba." },
  { id: "elalvos", name: "Elalvós, csendes", emoji: "🌙", blurb: "Lassú tempó, halk hangok, puha lezárás." },
  { id: "vicces", name: "Vicces mesék", emoji: "😄", blurb: "Csacsi helyzetek, amiken nevetni lehet." },
  { id: "erzelmi", name: "Érzésekről", emoji: "💛", blurb: "Düh, féltékenység, félelem, nevén nevezve." },
  { id: "npmese", name: "Népmesék", emoji: "🪕", blurb: "Magyar népmesék mai nyelven." },
  { id: "ovi", name: "Ovi és suli", emoji: "🎒", blurb: "Első nap, új barát, elveszett uzsonna." },
  { id: "urhajos", name: "Világűr", emoji: "🚀", blurb: "Bolygók, üstökösök, kicsi űrhajósok." },
];

export type DemoStory = {
  title: string;
  category: string;
  emoji: string;
  minutes: number;
  age: string;
  teaser: string;
  /** A teljes mese bekezdésekre bontva – a felolvasó nézet ezt jeleníti meg. */
  body: string[];
};

export const demoStories: DemoStory[] = [
  {
    title: "A hold, aki elaludt",
    category: "Elalvós, csendes",
    emoji: "🌙",
    minutes: 6,
    age: "3–6 év",
    teaser:
      "Egy este a Hold nem kelt fel. A kisváros gyerekei elindultak felébreszteni, de úgy, hogy közben senki más ne ébredjen fel.",
    body: storyBodies["A hold, aki elaludt"],
  },
  {
    title: "Bátor Samu és a viharos tó",
    category: "Kalandok",
    emoji: "🗺️",
    minutes: 9,
    age: "4–8 év",
    teaser:
      "Samu, a sünfiú elkérte a nagypapa csónakját. A tó közepén felhők gyűltek, és kiderült, hogy a bátorság néha annyit tesz: visszafordulsz.",
    body: storyBodies["Bátor Samu és a viharos tó"],
  },
  {
    title: "Miért mérges a kis sárkány?",
    category: "Érzésekről",
    emoji: "💛",
    minutes: 7,
    age: "3–7 év",
    teaser:
      "Zente minden apróságtól füstöt fújt, amíg egy öreg teknős meg nem tanította neki a három lassú lélegzetet.",
    body: storyBodies["Miért mérges a kis sárkány?"],
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "Hogyan érkeznek meg a mesék?",
    a: "Kora délután küldök nektek egy e-mailt, benne a három mesével: cím, pár mondat róla, és hogy hány perc felolvasni. Rákattintotok arra, amelyiket választottátok, és megnyílik a teljes szöveg. Telefonon is jól olvasható, nem kell nagyítani.",
  },
  {
    q: "Miért pont három mese?",
    a: "Mert az esti mese nem csak rólad szól. Ha a gyermeked is beleszólhat, sokkal könnyebben megy a lefekvés. Három választás épp elég ahhoz, hogy legyen tétje, de nem annyi, hogy elvesszen benne.",
  },
  {
    q: "Milyen korosztálynak szólnak a mesék?",
    a: "Nagyjából hároméves kortól nyolcig. Minden mesénél odaírom az ajánlott kort és a felolvasási időt, így fél nyolckor sem érhet meglepetés titeket.",
  },
  {
    q: "Meg tudom adni, milyen meséket szeretnék?",
    a: "Igen. Bejelölitek a kategóriákat: állatok, kalandok, természet, barátság, tanulságos mesék és a többi. A következő válogatást már ezekből állítom össze, és később is bármikor átállíthatjátok.",
  },
  {
    q: "Mennyibe kerül?",
    a: "Az első tíz nap ingyen van. Utána havi 5 000 Ft. Nincs hűségidő, és a lemondáshoz nem kell se telefonálnotok, se levelet írnotok – egy kattintás.",
  },
  {
    q: "Mi történik a próbaidőszak végén?",
    a: "A tizedik nap előtt írok nektek. Ha nem folytatnátok, egy kattintás, és ennyi. Bankkártyát eleve nem kértem, szóval magától nem indul el semmi.",
  },
];

export const site = {
  facebook: "https://www.facebook.com/zsuzsinenimesei/",
  email: "hello@zsuzsineni-mesei.hu",
  tagline: "Minden este egy új történet, közelebb egymáshoz.",
  quote: "A képzelet nagyobbá teszi a világot.",
};
