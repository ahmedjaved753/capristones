# 2026-04-29 — Real natural-stone imagery wired up

The Natural Stone listing now shows 25 real product photos from the client-supplied collection, served from a public Supabase Storage bucket. The previous 4 placeholder products (Carrara Marble, Absolute Black Granite, Travertine Romano, Emperador Dark) and their stock-photography images are gone. This is the first piece of *real* product content on the site — every other category is still on placeholder data.

## What changed

### Natural Stone listing page (`/natural-stone`)

- 25 product cards, one per photo. Cards are arranged in a 2-column grid (desktop) or single column (mobile); a list-view toggle is still available in the upper-right.
- Card content was simplified to: hero photo, "Brazil" origin pill, name (placeholder, see below), "By Inquiry" eyebrow, "View Details" arrow.
- The search input and filter dropdowns (Type / Color / Finish) were removed. They depended on real product metadata that hasn't been supplied yet — keeping cosmetic-only filters around would be misleading. They'll come back when the client sends real product names and types.

### Natural Stone detail pages (`/natural-stone/:id`)

- Each card now correctly routes to its own detail page. Previously every card landed on the same hardcoded "Carrara Marble Classic" page regardless of which one was clicked — a latent bug that became glaring with 25 cards.
- The detail-page hero shows the same photo as the listing card. The thumbnail strip is hidden when there's only one photo (which is the case for all 25 products at the moment).
- Quick Specs, "Pricing on Request" line, and the "Ready to Use This Material?" CTA section are unchanged.

### Placeholder data (intentional)

The 25 products are named "Stone 01" through "Stone 25". Material is "Stone", finish is "Polished", origin is "Brazil", applications are a generic ["Countertops", "Backsplashes", "Flooring", "Wall Cladding"] list. Once the client provides real product names and specifications, those fields get filled in via a single edit to `src/data/naturalStones.js`.

## Why placeholders, not invented names

We considered three alternatives for the non-image data:
1. Recycle the previous 4 names (Carrara Marble, etc.) cyclically across the 25 products → looks weird with 6–7 cards in a row sharing the same name.
2. Invent 25 plausible-sounding names → risk of fake names going live attached to real photos.
3. Generic placeholders + strip filters and search → honest, doesn't dress up incomplete data.

We picked option 3.

## What did NOT change

- Home page, Quartz listing, Quartz detail page, Appointments, Contact pages — all unchanged.
- Quartz detail page (`/quartz/:id`) still shows the previous hardcoded "Carrara Marble Classic" content because Quartz photos haven't been supplied yet. This is preserved deliberately to keep the round image-only for Natural Stone.
- Pricing & sourcing copy — "By Inquiry" / "Pricing on Request" / "Brazil" continue throughout.

## One known TODO

One photo (`IMG_1841.heic`) is in the Supabase bucket but not rendered. HEIC is an Apple-camera format that Chrome and Firefox can't display. To add it as a 26th product, convert it to JPG or PNG, re-upload, and append the new filename to `src/data/naturalStones.js`. Tracked as a code comment in that file.

## Verification

- `npm run build` — passes.
- `npm run test:visual` — 4 baselines regenerated (natural-stone listing × 1, detail page × 2, plus the listing hero where the search input used to live). Other 16 baselines unchanged.
- Manual browser pass on `/natural-stone`, three random `/natural-stone/:id` pages, `/quartz`, `/quartz/1` — Natural Stone shows the new content; Quartz is unchanged.

## Before / after

(Screenshots to be added when this round is committed and reviewed. Place under `docs/changelog/assets/2026-04-29-natural-stone-real-imagery/` and embed below.)

- Before: Natural Stone listing — 4 cards with stock stone photos, search bar, filter dropdowns, full card content (description, characteristics, type/finish eyebrow)
- After: Natural Stone listing — 25 cards with real photos, simplified card content, no search/filters
- Before: `/natural-stone/3` — "Carrara Marble Classic" with 4-thumb gallery
- After: `/natural-stone/3` — "Stone 03" with hero-only gallery (single image)
