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
| `app/api/signup/route.ts` | Feliratkozás fogadása (validáció + honeypot + Resend értesítő) |
| `components/StoryPicker.tsx` | Interaktív demó: a látogató kiválasztja a mai mesét |
| `components/CategoryPicker.tsx` | Kategória-választó, a választás `localStorage`-ban marad |
| `components/usePreferences.ts` | `useSyncExternalStore` alapú kategória-tároló |
| `lib/content.ts` | Kategóriák, demó mesék, GYIK szövegek – ezeket kell szerkeszteni tartalomhoz |

## Környezeti változók

Másold a `.env.example` fájlt `.env.local` néven, és töltsd ki:

| Változó | Mire kell |
| --- | --- |
| `RESEND_API_KEY` | Resend API kulcs |
| `SIGNUP_FROM_EMAIL` | Feladó (verifikált Resend domain kell hozzá) |
| `SIGNUP_NOTIFY_TO` | Ide jön az értesítő minden új feliratkozásról |

**Amíg ezek nincsenek beállítva, a feliratkozás nem tárolódik sehol**: az API 503-at ad,
az űrlap pedig kiírja, hogy a regisztráció még nem élesedett, és mutat egy e-mail címet.
Ez szándékos – nem akarunk úgy tenni, mintha felvennénk a címet.

## Ami még hátravan

- [ ] Login / fiók (a próbaidőszak és a kategória-beállítások fiókhoz kötése)
- [ ] Fizetés (5 000 Ft / hó, 10 nap trial után)
- [ ] Resend: napi hármas kiküldése, nem csak admin-értesítő
- [ ] Mese-adatbázis és olvasófelület (`/mese/[slug]`)
- [ ] Valódi domain + OG kép (jelenleg `zsuzsineni-mesei.hu` a placeholder az
      `app/layout.tsx`, `app/robots.ts` és `app/sitemap.ts` fájlokban)
