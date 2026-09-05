# Zsuzsi néni meséi

Előfizetéses esti mese szolgáltatás landing oldala. Naponta 3 mese e-mailben, a gyerek
választ egyet. 10 nap ingyenes próbaidőszak, utána 5 000 Ft / hó.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19
- Tailwind CSS v4 (design tokenek a `app/globals.css` `@theme` blokkjában)
- TypeScript
- Deploy: Vercel

## Fejlesztés

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkciós build (Vercel is ezt futtatja)
npm run lint
```

## Felépítés

| Útvonal | Mi van benne |
| --- | --- |
| `app/page.tsx` | A teljes landing: hero, napi hármas, hogyan működik, kategóriák, előnyök, árak, GYIK, záró CTA |
| `app/api/signup/route.ts` | Feliratkozás fogadása (validáció + honeypot + Web3Forms értesítő) |
| `app/api/track/route.ts` | Kattintásszámláló (aggregált, süti és azonosító nélkül) |
| `app/api/stats/route.ts` | A számok kiolvasása jelszóval |
| `app/szamok/` | Belső statisztika-oldal (noindex) |
| `app/aszf/`, `app/adatkezelesi-tajekoztato/`, `app/cookie-szabalyzat/` | Jogi oldalak |
| `components/StoryPicker.tsx` | Interaktív demó: a látogató kiválasztja a mai mesét |
| `components/CategoryPicker.tsx` | Kategória-választó, a választás `localStorage`-ban marad |
| `components/usePreferences.ts` | `useSyncExternalStore` alapú kategória-tároló |
| `lib/content.ts` | Kategóriák, demó mesék, GYIK szövegek, márkaadatok (FB-link, szlogen) |
| `public/` | Márkagrafikák a Facebook-oldalról: `logo.webp` (profilkép átlátszó háttérrel), `meseles.jpg` (a borító középső illusztrációja), `borito.jpg` (teljes borító), `og.jpg` (megosztási kép) |

## Arculat

A paletta és a képek a Facebook-oldal grafikáiról készültek
(https://www.facebook.com/zsuzsinenimesei/). Az eredeti, vágatlan fájlok helye:
`C:\Users\csana\Documents\zsuzsinenimesei`.

- **Színek** (`app/globals.css`, `@theme`): éjkék `#0E2039`–`#233550`, krém `#FBF3E4`,
  arany `#D9932A` / `#F5CB84`
- **Betűk**: Baloo 2 (címek), Nunito (szöveg), Caveat (kézírásos szlogen)

## Környezeti változók

Másold a `.env.example` fájlt `.env.local` néven, és töltsd ki:

| Változó | Mire kell |
| --- | --- |
| `SZAMOK_PW` | Jelszó a `/szamok` oldalhoz |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob írási token a kattintásszámlálóhoz. A Vercel Storage fülön létrehozott Blob store csatolásakor magától bekerül; lokálisan `vercel env pull` hozza le. |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms hozzáférési kulcs. **Alternatíva:** beírhatod a `lib/forms.ts` `HARDCODED_KEY` mezőjébe, mint a lelkekgyogyasza.hu és a budapest-dietetikus.hu oldalon – a Web3Forms kulcsa nem titok, azokon az oldalakon is látszik a HTML-ben. A kulcs a web3forms.com oldalon kérhető ki arra a címre, ahova az értesítéseket várod (`csanad.peter.czarth@gmail.com`). |

**Amíg ez nincs beállítva, a feliratkozás nem megy sehova**: az API 503-at ad,
az űrlap pedig kiírja, hogy a regisztráció még nem élesedett, és mutat egy e-mail címet.
Ez szándékos – nem akarunk úgy tenni, mintha felvennénk a címet.

## Kattintásmérés (`/szamok`)

Ugyanaz a minta, mint a budapest-dietetikus.hu oldalon: **nincs külső analitika**, csak
egy saját, aggregált számláló Vercel Blobban. Egy kattintásnál ennyi kerül a tárolóba:
`nap + eseménynév + címke + darabszám`. **Nem tárolunk IP-t, user agentet, azonosítót,
sütit vagy localStorage-kulcsot**, ezért a mérés nem személyes adat, és nem igényel
süti-hozzájárulást. A `/cookie-szabalyzat` oldal ezt szó szerint le is írja – ha a mérés
változik, azt a szöveget is frissíteni kell.

Mért események: `header_cta`, `nav_klikk`, `mese_megnyitas`, `kategoria_be`,
`gyik_nyitas`, `feliratkozas_kuldes`, `feliratkozas_siker`, `facebook_klikk`,
`jogi_megnyitas` (lásd `lib/counters.ts`). Új gomb bekötése: `track(\"esemeny\", \"címke\")`
a `lib/track.ts`-ből, vagy `<TrackedLink>` linknél.

A `/szamok` oldalon a **„Eddigieket tesztnek jelölöm”** gomb az addigi számokat fejlesztői
alapvonalnak veszi és levonja – élesítés után érdemes egyszer megnyomni.

## SEO

Minden nyilvános oldal indexelhető, és benne van a `sitemap.xml`-ben. A `/szamok`
`noindex, nofollow`, és a `robots.txt` is tiltja, ahogy az `/api/` útvonalakat is.

## Ami még hátravan

- [ ] Login / fiók (a próbaidőszak és a kategória-beállítások fiókhoz kötése)
- [ ] Fizetés (5 000 Ft / hó, 10 nap trial után)
- [ ] Napi hármas kiküldése a feliratkozóknak (Resend vagy hasonló; a Web3Forms csak az admin-értesítőre való)
- [ ] Mese-adatbázis és olvasófelület (`/mese/[slug]`)
- [ ] Valódi domain + OG kép (jelenleg `zsuzsineni-mesei.hu` a placeholder az
      `app/layout.tsx`, `app/robots.ts` és `app/sitemap.ts` fájlokban)
