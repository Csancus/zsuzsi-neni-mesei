import type { Metadata } from "next";
import Link from "next/link";

import { LegalShell, Todo } from "@/components/LegalShell";
import { site } from "@/lib/content";
import {
  authority,
  formProcessor,
  hosting,
  legalUpdatedAt,
  paymentProvider,
  provider,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Adatkezelési tájékoztató",
  description:
    "Milyen személyes adatokat kezelünk a Zsuzsi néni meséi szolgáltatásban, mennyi ideig, kinek adjuk tovább, és milyen jogaid vannak.",
  robots: { index: true, follow: true },
};

export default function AdatkezelesiTajekoztato() {
  return (
    <LegalShell
      title="Adatkezelési tájékoztató"
      intro="Röviden: az e-mail címedet azért kezeljük, hogy meg tudjuk küldeni a napi meséket, a kiválasztott kategóriákat pedig azért, hogy a válogatás rólatok szóljon. Nem adjuk el senkinek, és bármikor kérheted a törlésüket."
      updatedAt={legalUpdatedAt}
    >
      <h2>1. Ki kezeli az adataidat?</h2>
      <p>
        A <strong>Zsuzsi néni meséi</strong> szolgáltatás üzemeltetője és az adatok
        kezelője:
      </p>
      <ul>
        <li>
          Név: <Todo>{provider.name}</Todo> egyéni vállalkozó
        </li>
        <li>
          Székhely: <Todo>{provider.address}</Todo>
        </li>
        <li>
          Nyilvántartási szám: <Todo>{provider.registryNumber}</Todo>
        </li>
        <li>
          Adószám: <Todo>{provider.taxNumber}</Todo>
        </li>
        <li>
          E-mail: <a href={`mailto:${provider.email}`}>{provider.email}</a>
        </li>
        <li>Weboldal: {provider.website}</li>
      </ul>
      <p>
        Adatvédelmi tisztviselőt nem alkalmazunk, mert a tevékenységünk ezt nem teszi
        kötelezővé. Adatvédelmi kérdésekben a fenti e-mail címen tudsz elérni minket.
      </p>

      <h2>2. Milyen adatokat kezelünk, és miért?</h2>
      <table>
        <thead>
          <tr>
            <th>Mit</th>
            <th>Miért</th>
            <th>Milyen jogalapon</th>
            <th>Meddig</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-mail cím</td>
            <td>A napi három mese kiküldése, a fiókod azonosítása</td>
            <td>Szerződés teljesítése (GDPR 6. cikk (1) b) pont)</td>
            <td>Amíg előfizető vagy, utána 30 napig</td>
          </tr>
          <tr>
            <td>Kiválasztott mesekategóriák, a gyerek megadott életkora</td>
            <td>Hogy a napi válogatás nektek szóljon</td>
            <td>Szerződés teljesítése</td>
            <td>Amíg előfizető vagy, utána 30 napig</td>
          </tr>
          <tr>
            <td>Melyik mesét nyitottad meg</td>
            <td>Hogy ne küldjünk kétszer ugyanolyat, és lássuk, mi működik</td>
            <td>Jogos érdek (GDPR 6. cikk (1) f) pont)</td>
            <td>Legfeljebb 12 hónap</td>
          </tr>
          <tr>
            <td>Számlázási név és cím</td>
            <td>Számla kiállítása az előfizetésről</td>
            <td>Jogi kötelezettség (GDPR 6. cikk (1) c) pont)</td>
            <td>
              8 év, a számvitelről szóló 2000. évi C. törvény 169. § (2) bekezdése alapján
            </td>
          </tr>
          <tr>
            <td>Fizetéssel kapcsolatos azonosítók</td>
            <td>Az előfizetési díj beszedése</td>
            <td>Szerződés teljesítése</td>
            <td>A fizetési szolgáltatónál, a saját szabályzata szerint</td>
          </tr>
          <tr>
            <td>Nekünk írt e-mail tartalma</td>
            <td>Válaszadás, panaszkezelés</td>
            <td>Jogos érdek, panasz esetén jogi kötelezettség</td>
            <td>Válasz után 1 év, panasz esetén 5 év</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Bankkártyaadatot soha nem látunk és nem tárolunk.</strong> A fizetés a
        fizetési szolgáltató felületén történik, mi csak azt kapjuk vissza, hogy a
        tranzakció sikeres volt-e.
      </p>

      <h2>3. Mi történik a 10 napos próbaidőszakban?</h2>
      <p>
        A próbaidőszak alatt csak az e-mail címedet és a bejelölt kategóriákat kezeljük.
        Bankkártyát nem kérünk, számlázási adatot nem adsz meg. Ha a 10 nap után nem
        fizetsz elő, az adataidat 30 napon belül töröljük.
      </p>

      <h2>4. Kinek adjuk tovább?</h2>
      <p>
        Az adataidat nem adjuk el, és nem adjuk át marketingcélra senkinek. Ahhoz viszont,
        hogy a szolgáltatás működjön, néhány szolgáltatót igénybe veszünk. Ők
        adatfeldolgozóként járnak el, azaz csak azt tehetik az adatokkal, amire mi
        utasítjuk őket:
      </p>
      <ul>
        <li>
          <strong>{hosting.name}</strong> ({hosting.address}) – a weboldal tárhelye és
          futtatása.
        </li>
        <li>
          <strong>{formProcessor.name}</strong> – {formProcessor.purpose}.
        </li>
        <li>
          <strong>
            <Todo>{paymentProvider.name}</Todo>
          </strong>{" "}
          – az előfizetési díj beszedése.
        </li>
        <li>
          <strong>
            <Todo>[KITÖLTENDŐ: e-mail küldő szolgáltató, pl. Resend]</Todo>
          </strong>{" "}
          – a napi mesék és a rendszerüzenetek kiküldése.
        </li>
        <li>
          <strong>
            <Todo>[KITÖLTENDŐ: könyvelő neve és székhelye]</Todo>
          </strong>{" "}
          – a számlák könyvelése.
        </li>
      </ul>
      <p>
        Ezen kívül adatot csak akkor adunk ki, ha erre jogszabály kötelez minket (például
        hatósági vagy bírósági megkeresés esetén).
      </p>

      <h2>5. Kerülnek adatok az Európai Unión kívülre?</h2>
      <p>
        Igen, a tárhelyszolgáltató ({hosting.name}) egyesült államokbeli vállalkozás. Az
        adattovábbítás jogi alapja az Európai Bizottság EU–USA adatvédelmi keretrendszerről
        szóló megfelelőségi határozata, illetve az általános szerződési feltételek
        (Standard Contractual Clauses). Az adatok fizikailag az Európai Unión belüli
        régióban tárolódnak.
      </p>

      <h2>6. Sütik, mérés, a böngésződben tárolt adatok</h2>
      <p>
        A weboldalon <strong>nincs analitikai és nincs marketing süti</strong>, és nem
        futtatunk külső nyomkövető szkriptet. Ezért nem kérünk süti-hozzájárulást sem:
        nincs mihez.
      </p>
      <p>
        Egyetlen dolgot tárolunk a böngésződben, a <code>localStorage</code>-ban: a
        főoldalon bejelölt mesekategóriákat, hogy ne vesszenek el, amíg végignézed az
        oldalt. Ez nálad marad, hozzánk nem kerül át.
      </p>
      <p>
        Néhány gomb megnyomását <strong>összesítve megszámoljuk</strong> (például hány
        mesét nyitottak meg ma), de ehhez nem tárolunk IP-címet, böngészőazonosítót, sütit
        vagy bármi mást, amiből visszakövetkeztethetnénk rád. Ez nem személyes adat, ezért
        nem is szerepel a fenti táblázatban. A részletek a{" "}
        <Link href="/cookie-szabalyzat">Süti (cookie) szabályzatban</Link> vannak.
      </p>
      <p>
        Amikor bejelentkezel, a működéshez feltétlenül szükséges munkamenet-sütit
        használunk. Ehhez a GDPR és az elektronikus hírközlési szabályok szerint nem kell
        külön hozzájárulás.
      </p>

      <h2>7. Milyen jogaid vannak?</h2>
      <p>Bármikor kérheted tőlünk, hogy</p>
      <ul>
        <li>
          <strong>megmutassuk</strong>, milyen adataidat kezeljük (hozzáférés joga),
        </li>
        <li>
          <strong>kijavítsuk</strong> a pontatlan adatot (helyesbítés),
        </li>
        <li>
          <strong>töröljük</strong> az adataidat (törlés joga) – kivéve, amit jogszabály
          alapján meg kell őriznünk, például a kiállított számlákat,
        </li>
        <li>
          <strong>korlátozzuk</strong> az adatkezelést, amíg egy vitás kérdés eldől,
        </li>
        <li>
          <strong>átadjuk</strong> az adataidat géppel olvasható formában neked vagy egy
          másik szolgáltatónak (adathordozhatóság),
        </li>
        <li>
          <strong>ne kezeljük</strong> tovább az adataidat, ha jogos érdeken alapuló
          adatkezelés ellen tiltakozol.
        </li>
      </ul>
      <p>
        Ha valamelyik adatkezelés a hozzájárulásodon alapul, azt bármikor visszavonhatod.
        A visszavonás a korábbi adatkezelés jogszerűségét nem érinti.
      </p>
      <p>
        Írj a <a href={`mailto:${provider.email}`}>{provider.email}</a> címre, és{" "}
        <strong>legkésőbb 30 napon belül</strong> válaszolunk. Ha a kérés összetett,
        ezt a határidőt legfeljebb két hónappal meghosszabbíthatjuk, de erről is szólunk.
      </p>

      <h2>8. Hova fordulhatsz, ha nem vagy elégedett?</h2>
      <p>
        Először írj nekünk, jó eséllyel gyorsabban rendezzük. Ettől függetlenül bármikor
        panasszal élhetsz a felügyeleti hatóságnál:
      </p>
      <ul>
        <li>{authority.naih.name}</li>
        <li>Cím: {authority.naih.address}</li>
        <li>Postacím: {authority.naih.postal}</li>
        <li>Telefon: {authority.naih.phone}</li>
        <li>
          E-mail: <a href={`mailto:${authority.naih.email}`}>{authority.naih.email}</a>
        </li>
        <li>
          Web:{" "}
          <a href={authority.naih.web} target="_blank" rel="noreferrer">
            {authority.naih.web}
          </a>
        </li>
      </ul>
      <p>
        Bírósághoz is fordulhatsz. A pert a lakóhelyed szerinti törvényszék előtt is
        megindíthatod.
      </p>

      <h2>9. Hogyan vigyázunk az adatokra?</h2>
      <p>
        A weboldal titkosított kapcsolaton (HTTPS) érhető el. A rendszereinkhez csak azok
        férnek hozzá, akiknek a munkájukhoz feltétlenül szükséges, jelszóval és
        kétlépcsős azonosítással. A szolgáltatóinkat úgy választjuk meg, hogy megfelelő
        adatbiztonsági garanciákat nyújtsanak.
      </p>

      <h2>10. Ha változik ez a tájékoztató</h2>
      <p>
        Ha lényegesen módosítjuk – például új adatfeldolgozó lép be, vagy új célra
        kezdünk adatot kezelni –, arról e-mailben értesítünk, mielőtt életbe lép. A kisebb
        pontosításokat itt vezetjük át, és frissítjük a hatálybalépés dátumát.
      </p>

      <h2>11. Kapcsolódó dokumentumok</h2>
      <p>
        A szolgáltatás használatának feltételeit az{" "}
        <Link href="/aszf">Általános Szerződési Feltételek</Link> tartalmazzák, a
        böngésződben tárolt adatokról és a mérésről pedig a{" "}
        <Link href="/cookie-szabalyzat">Süti (cookie) szabályzat</Link> szól. Kérdés esetén írj
        a <a href={`mailto:${provider.email}`}>{provider.email}</a> címre, vagy keress a{" "}
        <a href={site.facebook} target="_blank" rel="noreferrer">
          Facebook-oldalunkon
        </a>
        .
      </p>
    </LegalShell>
  );
}
