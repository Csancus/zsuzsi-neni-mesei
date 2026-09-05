import type { Metadata } from "next";
import Link from "next/link";

import { LegalShell, Todo } from "@/components/LegalShell";
import {
  authority,
  legalUpdatedAt,
  paymentProvider,
  price,
  provider,
  vatNote,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Általános Szerződési Feltételek",
  description:
    "A Zsuzsi néni meséi előfizetés feltételei: mit kapsz, mennyibe kerül, hogyan mondható le, és mi a helyzet az elállási joggal.",
  robots: { index: true, follow: true },
};

export default function Aszf() {
  return (
    <LegalShell
      title="Általános Szerződési Feltételek"
      intro="Röviden: naponta három mesét küldök e-mailben, az első 10 nap ingyen van, utána havidíjas az előfizetés, és bármikor lemondhatod a következő hónap kezdete előtt."
      updatedAt={legalUpdatedAt}
    >
      <h2>1. A szolgáltató adatai</h2>
      <ul>
        <li>
          Név: <Todo>{provider.name}</Todo> egyéni vállalkozó
        </li>
        <li>
          Székhely és levelezési cím: <Todo>{provider.address}</Todo>
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
        <li>
          Tárhelyszolgáltató: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
        </li>
      </ul>
      <p>
        A szolgáltató e-mailen érhető el. Ügyfélszolgálati telefonszámot nem tartok fenn;
        a megkeresésekre munkanapokon, legkésőbb 2 munkanapon belül válaszolok.
      </p>

      <h2>2. Mire vonatkoznak ezek a feltételek?</h2>
      <p>
        Ez a dokumentum a <strong>Zsuzsi néni meséi</strong> előfizetéses szolgáltatás
        használatának feltételeit tartalmazza. A feltételeket a regisztrációkor kell
        elfogadnod; elfogadás nélkül a szolgáltatás nem vehető igénybe.
      </p>
      <p>
        A szerződés magyar nyelven jön létre, elektronikus úton, és nem minősül írásba
        foglalt szerződésnek. A szolgáltató nem iktatja, utólag nem hozzáférhető – ezért
        érdemes ezt az oldalt elmenteni vagy kinyomtatni. A szerződésre a magyar jog az
        irányadó.
      </p>
      <p>
        A szolgáltatásra nem vonatkozik magatartási kódex. A szolgáltatás elsősorban
        fogyasztóknak szól, azaz szakmája, önálló foglalkozása vagy üzleti tevékenysége
        körén kívül eljáró természetes személyeknek.
      </p>

      <h2>3. Mit kapsz?</h2>
      <p>Az előfizetés része:</p>
      <ul>
        <li>
          minden nap kora délután egy e-mail, benne <strong>három esti mese</strong>{" "}
          ajánlásával (cím, rövid leírás, ajánlott életkor, felolvasási idő),
        </li>
        <li>
          a kiválasztott mese teljes szövege, olvasásra optimalizált, reklámmentes
          felületen,
        </li>
        <li>
          a mesekategóriák bármikori módosítása, ami a következő napi válogatásra
          érvényesül.
        </li>
      </ul>
      <p>
        A mesék a szolgáltató saját, eredeti írásai. A napi válogatás összetétele a
        szolgáltató szerkesztői döntése; konkrét mese vagy téma megküldésére nem
        vállalok kötelezettséget. A szolgáltatás nem tartalmaz hangoskönyvet, nyomtatott
        kiadványt és személyes tanácsadást.
      </p>

      <h2>4. Hogyan jön létre a szerződés?</h2>
      <ol>
        <li>Megadod az e-mail címedet a weboldalon, és elfogadod ezeket a feltételeket.</li>
        <li>
          Küldök egy megerősítő e-mailt. A benne lévő linkre kattintva igazolod, hogy a
          cím valóban a tiéd.
        </li>
        <li>
          A megerősítéssel indul a <strong>{price.trialDays} napos ingyenes
          próbaidőszak</strong>, és másnap délután megérkezik az első három mese.
        </li>
        <li>
          A próbaidőszak lejárta előtt e-mailben szólok. Ha nem lépsz semmit, az
          előfizetés <strong>nem indul el automatikusan</strong>: külön kell megrendelned.
        </li>
      </ol>
      <p>
        Az adatbeviteli hibákat a megrendelés elküldése előtt bármikor javíthatod, később
        pedig e-mailben jelezheted, és mi javítom.
      </p>

      <h2>5. A próbaidőszak</h2>
      <p>
        Az első {price.trialDays} nap ingyenes és kötelezettségmentes. Bankkártyaadatot nem
        kérek hozzá, ezért a próbaidőszak végén magától semmi nem indul el, és nem
        vonok le semmit. Egy e-mail cím egy alkalommal veheti igénybe a próbaidőszakot.
      </p>

      <h2>6. Díjak és fizetés</h2>
      <p>
        Az előfizetés díja <strong>{price.monthlyHuf} / hónap</strong>. Az áfára vonatkozó
        tájékoztatás: <Todo>{vatNote}</Todo>
      </p>
      <p>
        A díjat előre, havonta kell megfizetni. A fizetés a{" "}
        <Todo>{paymentProvider.name}</Todo> fizetési szolgáltatón keresztül történik;
        bankkártyaadatot a szolgáltató nem lát és nem tárol. A számlát elektronikusan
        állítom ki, és e-mailben küldöm meg. Ezt a regisztrációval kifejezetten
        elfogadod.
      </p>
      <p>
        A díjat a szolgáltató módosíthatja. A változásról legalább 30 nappal előre
        e-mailben értesítelek, és az új díj csak a következő számlázási időszaktól lép
        érvénybe. Ha nem fogadod el, a hatálybalépés előtt felmondhatod az előfizetést.
      </p>
      <p>
        Ha a díj beszedése nem sikerül, e-mailben jelezzük. Ha 7 napon belül sem rendeződik,
        a hozzáférést felfüggeszthetem.
      </p>

      <h2>7. Az előfizetés lemondása</h2>
      <p>
        Az előfizetés <strong>határozatlan időre</strong> szól, és{" "}
        <strong>bármikor, indokolás nélkül felmondható</strong>. Nincs hűségidő és nincs
        felmondási díj.
      </p>
      <p>
        A lemondáshoz elég a fiókodban egy kattintás, vagy egy e-mail a{" "}
        <a href={`mailto:${provider.email}`}>{provider.email}</a> címre. A felmondás a
        folyamatban lévő, már kifizetett időszak végén lép hatályba – addig a szolgáltatás
        elérhető marad, és időarányos visszatérítést nem fizetek.
      </p>
      <p>
        A szolgáltató is felmondhatja a szerződést 30 napos határidővel, illetve azonnali
        hatállyal, ha súlyosan megszeged ezeket a feltételeket (például továbbadod a
        meséket). Ilyenkor a már kifizetett, fel nem használt időszak díját visszatérítem.
      </p>

      <h2>8. Elállási jog</h2>
      <p>
        A szolgáltatás digitális tartalom szolgáltatása, amelyet nem tárgyi adathordozón
        nyújtok. A fogyasztó és a vállalkozás közötti szerződések részletes szabályairól
        szóló <strong>45/2014. (II. 26.) Korm. rendelet</strong> 20. §-a alapján a
        fogyasztót 14 napos elállási jog illetné meg, ugyanezen rendelet{" "}
        <strong>29. § (1) bekezdés m) pontja</strong> szerint azonban ez a jog nem
        gyakorolható, ha a teljesítés a fogyasztó előzetes, kifejezett hozzájárulásával
        megkezdődött, és a fogyasztó tudomásul vette, hogy ezzel elveszíti az elállási
        jogát.
      </p>
      <p>
        A megrendeléskor ezért kifejezetten kérned kell a teljesítés azonnali megkezdését,
        és nyilatkoznod kell arról, hogy ezt tudomásul veszed. Ha ezt nem teszed meg, a
        teljesítést a 14 napos határidő leteltéig nem kezdem meg, és addig elállhatsz.
      </p>
      <p>
        Ez a korlátozás <strong>nem érinti a felmondási jogodat</strong>: az előfizetést a
        7. pont szerint bármikor lemondhatod.
      </p>

      <h2>9. Szerzői jog</h2>
      <p>
        A weboldalon és az e-mailekben megjelenő mesék, szövegek, illusztrációk és a
        grafikai arculat szerzői jogi védelem alatt állnak. A jogosult a szolgáltató.
      </p>
      <p>
        Az előfizetés <strong>személyes, nem kizárólagos, át nem ruházható</strong>{" "}
        felhasználási jogot ad arra, hogy a meséket saját és a háztartásodban élő gyerekek
        számára felolvasd. Nem engedélyezett a mesék többszörözése, nyilvános terjesztése,
        közzététele, értékesítése, valamint nyilvános felolvasása vagy közvetítése
        (például intézményben, videóban, közösségi médiában) a szolgáltató előzetes,
        írásbeli engedélye nélkül. Óvodák, iskolák és könyvtárak számára külön
        megállapodás köthető: írj a fenti e-mail címre.
      </p>

      <h2>10. Rendelkezésre állás, felelősség</h2>
      <p>
        A szolgáltatás elérhetőségére törekszem, de folyamatos, hibamentes működést nem
        tudok garantálni: karbantartás, a tárhelyszolgáltató hibája vagy más, rajtam
        kívül álló ok időszakos kiesést okozhat. Ha a kiesés egy hónapban a 3 napot
        meghaladja, kérésre időarányos jóváírást adok a következő hónapra.
      </p>
      <p>
        A mesék szórakoztató és nevelési célúak; nem minősülnek pedagógiai, pszichológiai
        vagy egészségügyi tanácsnak. A szolgáltató a jogszabály által megengedett
        mértékben zárja ki a felelősségét a szolgáltatás használatából eredő közvetett
        károkért. Ez a korlátozás nem érinti a szolgáltató felelősségét szándékos
        károkozásért, valamint az emberi életet, testi épséget vagy egészséget megkárosító
        szerződésszegésért.
      </p>
      <p>
        A weboldal működéséhez internetkapcsolat és e-mail cím szükséges. Ha az
        e-mailjeim a levélszemét mappába kerülnek, ezért nem tudok felelősséget vállalni,
        de szívesen segítek beállítani.
      </p>

      <h2>11. Panasz és jogorvoslat</h2>
      <p>
        Panaszt a <a href={`mailto:${provider.email}`}>{provider.email}</a> címen tehetsz.
        A panaszt kivizsgálom, és <strong>30 napon belül</strong> írásban válaszolok.
      </p>
      <p>Ha nem sikerül megegyeznünk, az alábbi lehetőségeid vannak:</p>
      <ul>
        <li>
          <strong>Fogyasztóvédelmi hatóság:</strong> a lakóhelyed szerint illetékes
          fővárosi vagy megyei kormányhivatal fogyasztóvédelmi feladatkörében eljáró
          szervezeti egysége.
        </li>
        <li>
          <strong>Békéltető testület:</strong> ingyenes, gyors eljárás fogyasztói
          jogvitákra. Az eljárásra a lakóhelyed vagy a szolgáltató székhelye szerinti
          testület illetékes; a testületek listája a{" "}
          <a href="https://bekeltetes.hu" target="_blank" rel="noreferrer">
            bekeltetes.hu
          </a>{" "}
          oldalon található. A szolgáltató székhelye szerint illetékes testület:{" "}
          {authority.arbitration.name}, {authority.arbitration.address}, e-mail:{" "}
          <a href={`mailto:${authority.arbitration.email}`}>
            {authority.arbitration.email}
          </a>{" "}
          – <Todo>[KITÖLTENDŐ: a végleges székhely szerinti testületre cserélendő]</Todo>.
          A szolgáltatót együttműködési kötelezettség terheli a békéltető testületi
          eljárásban.
        </li>
        <li>
          <strong>Online vitarendezés:</strong> az Európai Bizottság online vitarendezési
          platformja a{" "}
          <a href={authority.odr} target="_blank" rel="noreferrer">
            {authority.odr}
          </a>{" "}
          címen érhető el.
        </li>
        <li>
          <strong>Bíróság:</strong> a jogvita bírósági úton is rendezhető.
        </li>
      </ul>

      <h2>12. Adatkezelés</h2>
      <p>
        A személyes adataid kezeléséről az{" "}
        <Link href="/adatkezelesi-tajekoztato">Adatkezelési tájékoztató</Link> szól részletesen.
      </p>

      <h2>13. Egyéb</h2>
      <p>
        A szolgáltató jogosult ezeket a feltételeket módosítani. A módosításról legalább 15
        nappal a hatálybalépés előtt e-mailben értesítelek. Ha a módosítást nem fogadod el,
        a hatálybalépésig felmondhatod az előfizetést; a további használat a módosítás
        elfogadásának minősül.
      </p>
      <p>
        Ha ezeknek a feltételeknek valamelyik pontja érvénytelennek bizonyulna, az a többi
        pont érvényességét nem érinti.
      </p>
      <p>
        A nem szabályozott kérdésekben a Polgári Törvénykönyvről szóló 2013. évi V.
        törvény, az elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi CVIII.
        törvény, a fogyasztóvédelemről szóló 1997. évi CLV. törvény és a 45/2014. (II. 26.)
        Korm. rendelet rendelkezései az irányadók.
      </p>
    </LegalShell>
  );
}
