export type Category = {
  id: string;
  name: string;
  emoji: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "kalandok", name: "Kalandok", emoji: "🗺️", blurb: "Térkép, hajó, elveszett kincs – pörgős fordulatok." },
  { id: "allatok", name: "Állatok", emoji: "🦊", blurb: "Erdei és háztáji szereplők, barátság és bátorság." },
  { id: "termeszet", name: "Természet", emoji: "🍂", blurb: "Eső, hó, magvak, csillagok – közben tanul is." },
  { id: "baratsag", name: "Barátság", emoji: "🤝", blurb: "Összeveszés, kibékülés, együtt könnyebb." },
  { id: "tanulsagos", name: "Tanulságos mesék", emoji: "📖", blurb: "A végén mindig marad valami, amiről beszélgethettek." },
  { id: "tundermese", name: "Tündérmesék", emoji: "🧚", blurb: "Varázslat, királylányok, hét próba." },
  { id: "elalvos", name: "Elalvós, csendes", emoji: "🌙", blurb: "Lassú tempó, halk hangok, puha lezárás." },
  { id: "vicces", name: "Vicces mesék", emoji: "😄", blurb: "Csacsi helyzetek és kacagós poénok." },
  { id: "erzelmi", name: "Érzésekről", emoji: "💛", blurb: "Düh, féltékenység, félelem – nevén nevezve." },
  { id: "npmese", name: "Népmesék", emoji: "🪕", blurb: "Magyar népmesekincs mai nyelven." },
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
};

export const demoStories: DemoStory[] = [
  {
    title: "A hold, aki elaludt",
    category: "Elalvós, csendes",
    emoji: "🌙",
    minutes: 6,
    age: "3–6 év",
    teaser:
      "Egy este a Hold nem kelt fel. A kisváros gyerekei összefogtak, hogy csendben, lábujjhegyen felébresszék – de csak úgy, hogy közben ne ébredjen fel senki más.",
  },
  {
    title: "Bátor Bogyó és a viharos tó",
    category: "Kalandok",
    emoji: "🗺️",
    minutes: 9,
    age: "4–8 év",
    teaser:
      "Bogyó, a sünfiú kölcsönkérte a nagypapa csónakját. A tó közepén viszont felhők gyűltek, és kiderült: a bátorság néha azt jelenti, hogy visszafordulunk.",
  },
  {
    title: "Miért mérges a kis sárkány?",
    category: "Érzésekről",
    emoji: "💛",
    minutes: 7,
    age: "3–7 év",
    teaser:
      "Zente, a sárkánybébi minden apróságtól füstöt fújt. Amíg egy öreg teknős meg nem tanította neki a három lassú lélegzetet.",
  },
];

export const faq: { q: string; a: string }[] = [
  {
    q: "Hogyan érkeznek meg a mesék?",
    a: "Minden nap kora délután e-mailben kapsz három mesét rövid leírással. Egy kattintás, és megnyílik a kiválasztott mese teljes szövege – telefonon, tableten vagy laptopon egyaránt jól olvasható.",
  },
  {
    q: "Miért pont három mese?",
    a: "Mert az esti mese nem csak a szülőről szól. A gyerek is beleszólhat, hogy ma mi legyen – ez a kis döntés sokat segít a lefekvés körüli huzavonában. Három választás elég ahhoz, hogy legyen tere, de nem annyi, hogy elvesszen benne.",
  },
  {
    q: "Milyen korosztálynak szólnak a mesék?",
    a: "Nagyjából 3 és 8 év közötti gyerekeknek. Minden mesénél feltüntetjük az ajánlott kort és a felolvasási időt, így percre pontosan tudod, mibe vágsz bele fél nyolckor.",
  },
  {
    q: "Meg tudom adni, milyen meséket szeretnék?",
    a: "Igen. A profilodban bármikor bejelölheted a kedvenc kategóriákat – állatos, tündér, kalandos, elalvós és így tovább. A következő napi válogatás már ezek alapján áll össze, és menet közben is finomíthatsz rajta.",
  },
  {
    q: "Mennyibe kerül?",
    a: "Az első 10 nap ingyenes. Utána 5 000 Ft havonta, bármikor lemondható – nincs hűségidő, nincs felmondási procedúra.",
  },
  {
    q: "Mi történik a próbaidőszak végén?",
    a: "A 10. nap előtt szólunk e-mailben. Ha nem szeretnéd folytatni, egyetlen kattintás a lemondás, és nem terhelünk semmit.",
  },
];

export const site = {
  facebook: "https://www.facebook.com/zsuzsinenimesei/",
  email: "hello@zsuzsineni-mesei.hu",
  tagline: "Minden este egy új történet, közelebb egymáshoz.",
  quote: "A képzelet nagyobbá teszi a világot.",
};
