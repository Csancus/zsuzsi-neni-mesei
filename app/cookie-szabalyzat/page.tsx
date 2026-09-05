import type { Metadata } from "next";
import Link from "next/link";

import { LegalShell } from "@/components/LegalShell";
import { legalUpdatedAt, provider } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Süti (cookie) szabályzat",
  description:
    "A Zsuzsi néni meséi oldalon nincs analitikai és nincs marketing süti, és nem futtatok külső nyomkövető szkriptet. Itt leírom, mit tárolok és mit nem.",
  robots: { index: true, follow: true },
};

export default function CookieSzabalyzat() {
  return (
    <LegalShell
      title="Süti (cookie) szabályzat"
      intro="A rövid válasz: ezen az oldalon nincs analitikai és nincs marketing süti, és semmit nem tárolok rólad. Annyi történik, hogy néhány gomb megnyomását összesítve megszámolom – név, IP és süti nélkül. Ezért nem is dobok fel süti-sávot."
      updatedAt={legalUpdatedAt}
    >
      <h2>1. Röviden</h2>
      <ul>
        <li>
          <strong>Nincs Google Analytics</strong> és semmilyen más látogatottság-mérő.
        </li>
        <li>
          <strong>Nincs Meta Pixel</strong>, nincs hirdetési vagy remarketing kód.
        </li>
        <li>
          <strong>Nem profilozok</strong>, és nem adok el adatot senkinek.
        </li>
        <li>
          <strong>Néhány gombnyomást megszámolok</strong>, de csak összesítve, süti és
          azonosító nélkül. A 4. pontban részletesen leírom.
        </li>
        <li>
          <strong>Egyetlen dolgot tárolok a böngésződben</strong>: a főoldalon bejelölt
          mesekategóriákat. Ez nálad marad, hozzám nem kerül át.
        </li>
      </ul>

      <h2>2. Mi az a süti, és mi az a helyi tárolás?</h2>
      <p>
        A <strong>süti (cookie)</strong> egy apró szövegfájl, amit a weboldal helyez el a
        böngésződben, és amit a böngésző minden későbbi kérésnél visszaküld a
        kiszolgálónak. A <strong>helyi tárolás</strong> (localStorage) ehhez hasonló, de
        egy fontos különbséggel: a benne lévő adat <em>nem</em> megy át magától a
        kiszolgálóra, csak a te böngésződben létezik.
      </p>
      <p>Ezen az oldalon jelenleg csak az utóbbit használom.</p>

      <h2>3. Mit tárolok pontosan?</h2>
      <table>
        <thead>
          <tr>
            <th>Név</th>
            <th>Típus</th>
            <th>Mire való</th>
            <th>Meddig marad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>znm.prefs.categories</code>
            </td>
            <td>Helyi tárolás (localStorage)</td>
            <td>
              Megjegyzi, melyik mesekategóriákat jelölted be a főoldalon, hogy ne vesszenek
              el, amíg végignézed az oldalt, és hogy a regisztrációnál már ezekkel indulj.
            </td>
            <td>
              Amíg te nem törlöd. Privát (inkognitó) ablakban az ablak bezárásával eltűnik.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        Ezen kívül <strong>jelenleg egyetlen sütit sem helyezek el</strong> a
        böngésződben.
      </p>

      <h2>4. Amit megszámolok: gombnyomások, összesítve</h2>
      <p>
        Szeretném tudni, hogy melyik gomb és melyik mese érdekli az embereket, mert
        ebből tudom, mit érdemes javítani. Ehhez viszont nem kell megtudnom, hogy ki
        vagy, ezért <strong>nem is tudom meg</strong>.
      </p>
      <p>Amikor például megnyitsz egy mesét, a szerverem annyit jegyez fel, hogy</p>
      <ul>
        <li>ma egy „mese megnyitása” eseménnyel több történt,</li>
        <li>és hogy melyik mese címéhez tartozott.</li>
      </ul>
      <p>Ami ilyenkor NEM kerül feljegyzésre:</p>
      <ul>
        <li>az IP-címed,</li>
        <li>a böngésződ vagy az eszközöd azonosítója (user agent, ujjlenyomat),</li>
        <li>bármilyen látogatóazonosító, süti vagy helyi tárolású kulcs,</li>
        <li>az időpont a napnál pontosabban,</li>
        <li>bármi, amiből össze lehetne kötni, hogy két kattintás ugyanattól az embertől jött.</li>
      </ul>
      <p>
        A tárolt adat tehát ennyi: <em>„2026-09-05, mese megnyitása, A hold, aki elaludt,
        6 darab.”</em> Ez nem személyes adat, mert senkire nem vezethető vissza, és épp
        ezért nem esik a süti-hozzájárulás szabályai alá sem: nem tárolok és nem olvasok
        ki semmit a végberendezésedről.
      </p>
      <p>
        Ezt a mérést az összes gombra kiterjesztettük (fejléc, menü, mesék, kategóriák,
        GYIK-kérdések, űrlap, Facebook-link, jogi oldalak), és az eredményt egy jelszóval
        védett belső oldalon nézem meg. Külső szolgáltatót nem használok hozzá: a számok
        a saját tárhelyemen maradnak.
      </p>

      <h2>5. Mit NEM használok?</h2>
      <p>Hogy egyértelmű legyen, itt van tételesen, mi nincs az oldalon:</p>
      <ul>
        <li>külső látogatottság-mérő (Google Analytics, Plausible, Matomo és társaik),</li>
        <li>hirdetési és remarketing kódok (Google Ads, Meta Pixel, TikTok Pixel),</li>
        <li>hőtérkép és munkamenet-felvétel (Hotjar, Clarity és hasonlók),</li>
        <li>A/B tesztelő és személyre szabó eszközök,</li>
        <li>beágyazott közösségi tartalom (YouTube-videó, Facebook-doboz, térkép),</li>
        <li>külső betűtípus-kiszolgáló: a betűket a saját kiszolgálónkról töltöm be.</li>
      </ul>
      <p>
        A láblécben és a fejlécben található Facebook-hivatkozás egyszerű link. Amíg nem
        kattintasz rá, a Facebook nem kap rólad semmit. Ha rákattintasz, onnantól már a
        Facebook saját adatkezelése érvényes, amiről a saját tájékoztatójukban
        olvashatsz.
      </p>

      <h2>6. Miért nincs süti-sáv?</h2>
      <p>
        Mert nem lenne mit engedélyezned. Hozzájárulást kérni azokra a sütikre kell,
        amelyek nem feltétlenül szükségesek a szolgáltatás működéséhez – ilyet pedig nem
        használok, és a 4. pontban leírt darabszámláláshoz sem tárolok semmit a
        böngésződben. Egy olyan sávot pedig nem teszek ki, amin nincs valódi választás:
        ennél többre tartok téged.
      </p>
      <p>
        Ez a helyzet bármikor megváltozhat. Ha egyszer statisztikát vagy hirdetést kezdek
        mérni, akkor <strong>előtte</strong> kérek rá hozzájárulást, valódi „Elutasítom”
        gombbal, és ezt az oldalt is frissítem.
      </p>

      <h2>7. Mi lesz, ha bevezetem a bejelentkezést?</h2>
      <p>
        Az előfizetői fiókhoz szükség lesz egy <strong>munkamenet-sütire</strong>, amiből a
        kiszolgáló felismeri, hogy be vagy jelentkezve. Ez a működéshez feltétlenül
        szükséges süti: nélküle nem lehetne belépni, ezért az elektronikus hírközlésről
        szóló 2003. évi C. törvény 155. § (4) bekezdése és a GDPR alapján nem kell hozzá
        külön hozzájárulás. Statisztikára vagy hirdetésre ezt sem fogom használni.
      </p>
      <p>
        Amikor ez élesedik, itt fogom feltüntetni a süti nevét, célját és lejáratát is.
      </p>

      <h2>8. Hogyan törölheted vagy tilthatod le?</h2>
      <p>
        A böngésződ beállításaiban bármikor törölheted a tárolt adatokat, és letilthatod a
        sütiket:
      </p>
      <ul>
        <li>Chrome: Beállítások → Adatvédelem és biztonság → Böngészési adatok törlése</li>
        <li>Firefox: Beállítások → Adatvédelem és biztonság → Sütik és oldaladatok</li>
        <li>Safari: Beállítások → Adatvédelem → Webhelyadatok kezelése</li>
        <li>Edge: Beállítások → Cookie-k és webhelyengedélyek</li>
      </ul>
      <p>
        Privát vagy inkognitó ablakban minden magától törlődik, amikor bezárod az ablakot.
      </p>
      <p>
        Egyetlen következménye van: a bejelölt mesekategóriák nem maradnak meg, és
        legközelebb újra be kell jelölnöd őket. Az oldal minden más része ettől
        függetlenül működik.
      </p>

      <h2>9. Ha változik ez a szabályzat</h2>
      <p>
        Ha új sütit vagy tárolt adatot vezetek be, azt itt vezetem át, és frissítem a
        hatálybalépés dátumát. Ha a változás hozzájárulást igényel, előre kérem.
      </p>

      <h2>10. Kapcsolódó dokumentumok</h2>
      <p>
        A személyes adatok kezeléséről az{" "}
        <Link href="/adatkezelesi-tajekoztato">Adatkezelési tájékoztató</Link> szól, a
        szolgáltatás feltételeiről pedig az{" "}
        <Link href="/aszf">Általános Szerződési Feltételek</Link>. Kérdés esetén írj a{" "}
        <a href={`mailto:${provider.email}`}>{provider.email}</a> címre.
      </p>
    </LegalShell>
  );
}
