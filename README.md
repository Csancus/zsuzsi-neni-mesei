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
| `WEB3FORMS_ACCESS_KEY` | Web3Forms hozzáférési kulcs. A web3forms.com oldalon kérhető ki arra az e-mail címre, ahova az értesítéseket várod (`csanad.peter.czarth@gmail.com`); a kulcs azonnal megjön levélben. Ugyanez a megoldás fut a lelkekgyogyasza.hu és a budapest-dietetikus.hu oldalon is. |

**Amíg ez nincs beállítva, a feliratkozás nem megy sehova**: az API 503-at ad,
az űrlap pedig kiírja, hogy a regisztráció még nem élesedett, és mutat egy e-mail címet.
Ez szándékos – nem akarunk úgy tenni, mintha felvennénk a címet.

## Ami még hátravan

- [ ] Login / fiók (a próbaidőszak és a kategória-beállítások fiókhoz kötése)
- [ ] Fizetés (5 000 Ft / hó, 10 nap trial után)
- [ ] Napi hármas kiküldése a feliratkozóknak (Resend vagy hasonló; a Web3Forms csak az admin-értesítőre való)
- [ ] Mese-adatbázis és olvasófelület (`/mese/[slug]`)
- [ ] Valódi domain + OG kép (jelenleg `zsuzsineni-mesei.hu` a placeholder az
      `app/layout.tsx`, `app/robots.ts` és `app/sitemap.ts` fájlokban)
