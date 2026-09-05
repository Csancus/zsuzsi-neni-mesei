/**
 * Jogi dokumentumokhoz tartozó adatok EGY helyen.
 *
 * ⚠️ A `KITÖLTENDŐ`-vel jelölt mezőket élesítés előtt ki kell tölteni – addig
 * a szövegben is látszik, hogy hiányzik, nem találunk ki helyette adatot.
 */

const TODO = (mit: string) => `[KITÖLTENDŐ: ${mit}]`;

export const provider = {
  /** Egyéni vállalkozó teljes neve */
  name: TODO("egyéni vállalkozó teljes neve"),
  /** Székhely / levelezési cím */
  address: TODO("székhely címe"),
  /** Nyilvántartási szám (egyéni vállalkozói nyilvántartás) */
  registryNumber: TODO("nyilvántartási szám"),
  taxNumber: TODO("adószám"),
  email: "hello@zsuzsi-neni-mesei.hu",
  /** Ha nem adsz meg telefonszámot, ez a mondat marad: e-mailen elérhető */
  phone: null as string | null,
  website: "zsuzsi-neni-mesei.hu",
};

export const hosting = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, Amerikai Egyesült Államok",
  email: "privacy@vercel.com",
};

export const formProcessor = {
  name: "Web3Forms (Bitpixel Software Solutions)",
  purpose: "a weboldali feliratkozási űrlap továbbítása e-mailben",
};

/** Fizetési szolgáltató – még nincs kiválasztva (Stripe / Barion / SimplePay) */
export const paymentProvider = {
  name: TODO("fizetési szolgáltató neve és székhelye"),
};

/** Áfa-státusz – még nincs eldöntve (alanyi adómentes vagy áfás) */
export const vatNote = TODO("áfa-státusz: alanyi adómentes vagy áfás, és az 5 000 Ft bruttó-e");

export const price = {
  monthlyHuf: "5 000 Ft",
  trialDays: 10,
};

/** A dokumentumok hatálybalépése / utolsó módosítása */
export const legalUpdatedAt = "2026. szeptember 5.";

export const authority = {
  naih: {
    name: "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)",
    address: "1055 Budapest, Falk Miksa utca 9–11.",
    postal: "1363 Budapest, Pf. 9.",
    phone: "+36 1 391 1400",
    email: "ugyfelszolgalat@naih.hu",
    web: "https://naih.hu",
  },
  arbitration: {
    name: "Budapesti Békéltető Testület",
    address: "1016 Budapest, Krisztina krt. 99. III. em. 310.",
    postal: "1253 Budapest, Pf. 10.",
    email: "bekelteto.testulet@bkik.hu",
    web: "https://bekeltet.bkik.hu",
  },
  odr: "https://ec.europa.eu/odr",
};
