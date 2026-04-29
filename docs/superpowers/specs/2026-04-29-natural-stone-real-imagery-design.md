# Natural Stone — real imagery from Supabase Storage

**Date:** 2026-04-29
**Status:** Approved (design phase complete; implementation plan to follow)
**Round type:** Data + content + first Supabase Storage integration

## Context

The Natural Stone listing page currently renders 4 hardcoded mock products with Unsplash URLs (`Carrara Marble`, `Absolute Black Granite`, `Travertine Romano`, `Emperador Dark`). The client provided 26 real product photos via Google Drive but has not yet supplied product names, types, finishes, or descriptions.

The client uploaded the photos to a Supabase Storage bucket named `stones` (public). 25 of the 26 files are browser-renderable PNG/JPG; the 26th is HEIC and won't render in Chrome/Firefox.

This round adds the 25 real photos to the Natural Stone listing as 25 distinct products, while keeping non-image data as honest placeholders (no fake-real names, no fake-real specs, no filters that don't actually filter).

## Decisions

### D1. Storage: Supabase Storage (already populated)

Public-asset URL pattern: `https://iiszfhkbfezclkjptdqu.supabase.co/storage/v1/object/public/stones/<filename>`. URLs are constructed via `supabase.storage.from('stones').getPublicUrl(filename)` — keeps the project URL out of the codebase.

Rejected alternatives:
- `/public/images/natural-stone/` static assets — simpler but every image swap requires a code commit, and the long-term goal includes a Supabase-backed product table, so starting in Storage now avoids a later migration.
- One-off bulk-upload script — overkill for a 26-file one-time upload; the client has already done the upload via the dashboard.

### D2. Catalog shape: 25 products, placeholder names

- 25 products, one per renderable photo (HEIC excluded — see D5).
- Names: `Stone 01` … `Stone 25` (zero-padded).
- Types/colors/finishes/descriptions: not displayed on listing cards (see D4).
- Detail-page fields filled with neutral placeholders: `material: 'Stone'`, `finish: 'Polished'`, `origin: 'Brazil'`, `applications: ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding']`, `gallery: [<single image>]`.

Rejected alternatives:
- Recycle the 4 existing mock names cyclically — looks weird with 6–7 cards in a row sharing the same name.
- Invent 25 plausible-sounding names — risk of fake names going live attached to real photos.

### D3. Listing-page card: stripped to image + minimal label

The current card renders `image`, `featured` badge, `origin` pill, `name` H3, `type`/`finish` eyebrow, `description` paragraph, `characteristics` pill chips, `By Inquiry`, and `View Details` arrow. With placeholder data, most of those fields are noise.

New card:
- Hero photo (with `loading="lazy"`)
- "Brazil" origin pill
- Name H3 (`Stone NN`)
- "By Inquiry" eyebrow
- "View Details" arrow

Removed from card:
- `featured` badge (no `featured: true` on any placeholder product)
- `type`/`finish` eyebrow (no real type/finish to show)
- `description` paragraph (no real description)
- `characteristics` pill chips (no real characteristics)

### D4. Filters and search: removed

The filter dropdowns (Type / Color / Finish) and the search input both depend on real product metadata. With placeholder data they would either filter against fake values (misleading) or return zero results (broken). Removing both is more honest than retaining cosmetic-only controls.

Removed from `NaturalStonePage.jsx`:
- `Search` motion block (the `<input>` + `FiSearch` icon)
- `Filters` block (the three `<select>` dropdowns mapped from `filterOptions`)
- `filterOptions`, `filters` state, `searchQuery` state, `filteredStones` derivation, `handleFilterChange`
- "No stones found" empty-state JSX (no filters → can never be empty)

Kept:
- Hero (`Collection` label + `Natural / Stone` heading + lead paragraph)
- Stone count + grid/list view toggle (uses `naturalStones.length` directly)
- CTA section ("Experience Natural Beauty" + Visit Showroom / Contact)

### D5. HEIC file: excluded with TODO

`IMG_1841.heic` (1.2 MB) is in the bucket but isn't rendered. Not added to the data file. A `TODO` comment in `src/data/naturalStones.js` records the action: convert to JPG/PNG and re-upload, then add as the 26th product entry.

### D6. Detail page: look up by ID for Natural Stone

`ProductDetailPage.jsx` currently hardcodes `'Carrara Marble Classic'` regardless of `:id`. With 25 cards all clicking through to the same hardcoded detail, the bug becomes glaring. Fix scoped to Natural Stone:

- On `/natural-stone/:id`, import `naturalStones` and find the product where `id === parseInt(params.id, 10)`. Render it.
- If not found, OR if route is `/quartz/:id`, fall back to the existing hardcoded product object. (This preserves current Quartz behavior with zero Quartz scope creep.)
- Wrap the thumbnail-strip render in `{product.gallery.length > 1 && ...}` so a single-image gallery doesn't render 1 thumb + 3 empty cells.

### D7. Performance: `loading="lazy"` only, optimization deferred

25 PNG files at average ~1.7 MB = ~40 MB if all loaded. With `loading="lazy"` on each `<img>`, only above-the-fold cards (typically 2–4 in the viewport) load on first paint; the rest stream in as the user scrolls.

Supabase Image Transformations could deliver smaller variants (`?width=600&quality=75`) but require the Pro plan (100 origin-images/month quota). Not used in this round; flagged as a follow-up if real-world performance is poor.

## Architecture

### File map

| File | Change |
|---|---|
| `src/lib/supabase.js` | Add `stoneImageUrl(filename)` helper |
| `src/data/naturalStones.js` | NEW — exports the 25-product `naturalStones` array |
| `src/pages/NaturalStonePage.jsx` | Strip search/filters/empty-state; simplify card; import from data module; add `loading="lazy"` to `<img>` |
| `src/pages/ProductDetailPage.jsx` | Look up product by `id` on `/natural-stone` route; fallback to hardcoded for `/quartz`; conditionally render thumbnail strip |
| `tailwind.config.js` | No change |
| `tests/visual.spec.js-snapshots/*` | Regenerate baselines for `/natural-stone` and `/natural-stone/:id` |
| `CLAUDE.md` | Update "All product data is currently hardcoded as mock objects" sentence |
| `PROGRESS.md` | Add 2026-04-29 revision-log entry |
| `docs/HOW-TO-REVISE.md` | Add Recipe 16 — "Add a new stone product to the catalog" |
| `docs/changelog/2026-04-29-natural-stone-real-imagery.md` | NEW — client changelog entry |

### Helper signature

```js
// src/lib/supabase.js
export const stoneImageUrl = (filename) =>
  supabase.storage.from('stones').getPublicUrl(filename).data.publicUrl
```

### Data-module shape

```js
// src/data/naturalStones.js
import { stoneImageUrl } from '../lib/supabase'

// TODO: convert IMG_1841.heic to JPG/PNG and re-upload, then add as 'Stone 26'.
const filenames = [
  'IMG_1636.PNG', 'IMG_1637.PNG', 'IMG_1642.jpg', 'IMG_1643.PNG', 'IMG_1644.PNG',
  'IMG_1647.PNG', 'IMG_1652.PNG', 'IMG_1654.PNG', 'IMG_1656.PNG', 'IMG_1837.PNG',
  'IMG_1838.jpg', 'IMG_1842.PNG', 'IMG_1844.PNG', 'IMG_1847.PNG', 'IMG_1850.jpg',
  'IMG_1852.PNG', 'IMG_1854.PNG', 'IMG_1856.PNG', 'IMG_1858.PNG', 'IMG_1860.PNG',
  'IMG_1862.jpg', 'IMG_1864.PNG', 'IMG_1867.PNG', 'IMG_1869.PNG', 'IMG_1877.PNG',
]

export const naturalStones = filenames.map((filename, i) => {
  const url = stoneImageUrl(filename)
  return {
    id: i + 1,
    name: `Stone ${String(i + 1).padStart(2, '0')}`,
    image: url,
    origin: 'Brazil',
    material: 'Stone',
    finish: 'Polished',
    applications: ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding'],
    gallery: [url],
  }
})
```

The 25 filenames were captured by querying `storage.objects WHERE bucket_id = 'stones'` on 2026-04-29.

## Out of scope

- Edits to `HomePage`, `QuartzPage`, `ShowerPanelsPage`, `CabinetsPage`. The Home-page collection-preview cards continue to use their existing Unsplash URLs.
- Migrating other product categories to Supabase Storage or a data module.
- Migrating non-image product data (names, descriptions) to a Supabase table — round is image-only by design.
- Quartz detail-page lookup — Quartz `/quartz/:id` continues to render the hardcoded Carrara Marble Classic content. Fixing that requires the client to provide Quartz photos and is a separate round.
- HEIC conversion. Tracked as TODO in the data file.
- Image transformation / Pro-plan upgrade.

## Risks

- **Visual-regression baselines:** layout changes (search/filter removal, simpler card) will break 2 baselines (`/natural-stone` desktop + mobile) and 2 detail baselines. Plan to run `npm run test:visual:update` and commit alongside.
- **Performance on slow connections:** lazy loading mitigates but doesn't eliminate the cost of 25 large PNGs. Worth a manual smoke test on a throttled network before committing.
- **Detail-page fallback logic:** the `if Natural Stone, look up; else use hardcoded` branch must be tested for both the happy path (`/natural-stone/3`) and the fallback path (`/quartz/1`, `/natural-stone/999` (out-of-range)).
- **Brand consistency:** the simplified card layout hasn't been used elsewhere. A browser-eyes pass before commit catches any awkward whitespace or visual imbalance from the removed fields.
- **Supabase Storage public-URL pattern leak:** the project ref appears in every image URL. Acceptable for a public showroom site; flag-only.

## Verification

Pre-commit checks:

1. `npm run build` — confirms no class-name typos and no broken imports.
2. `npm run test:visual` — expected to fail on 4 baselines; run `npm run test:visual:update` to accept the intentional changes.
3. Manual browser smoke test:
   - `/natural-stone` shows 25 cards in grid view; toggle to list view works; no search/filter UI present.
   - First few cards' images load; remaining lazy-load on scroll.
   - Click card 3 → `/natural-stone/3` shows "Stone 03" as the H1, hero image matches card 3, no thumbnail strip below the hero, "Pricing on Request" line present.
   - Click "Back to Natural Stone" → returns to listing.
   - `/quartz` and `/quartz/1` still render their existing hardcoded content (no regression).
   - `/natural-stone/999` (out-of-range) falls back to the hardcoded Carrara content rather than crashing.
4. Doc updates committed in the same commit as the code: `CLAUDE.md` data-architecture sentence, `PROGRESS.md` log entry, `docs/HOW-TO-REVISE.md` Recipe 16, `docs/changelog/2026-04-29-natural-stone-real-imagery.md`.
