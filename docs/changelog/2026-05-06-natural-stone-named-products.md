# 2026-05-06 — Natural-stone products named + galleries restored

The 25 Natural Stone products are no longer "Stone 01" through "Stone 25". Each one was matched against the client's existing capristones.com catalog and renamed (Mustang, Calacatta, Vibranium Quartzite, Onyx Bianco, etc.). Detail pages also gain back their thumbnail galleries — each product now carries 2–4 photos (the client's hero photo + supporting reference shots from the legacy site) instead of a single image.

This is the follow-up that completes the natural-stone work started 2026-04-29 (`docs/changelog/2026-04-29-natural-stone-real-imagery.md`).

## What changed

### `src/data/naturalStones.js` — full rewrite

The previous version mapped 25 phone-photo filenames to generic placeholders:
```js
{ id: 1, name: 'Stone 01', material: 'Stone', ..., gallery: [url] }
```

The new version is keyed by product slug and carries a real material classification + a multi-image gallery:
```js
{
  id: 'mustang',
  name: 'Mustang',
  material: 'Quartzite',
  origin: 'Brazil',
  finish: 'Polished',
  applications: [...],
  image: stoneImageUrl('IMG_1637.PNG'),
  gallery: [
    stoneImageUrl('IMG_1637.PNG'),
    stoneImageUrl('mustang-2.jpg'),
    stoneImageUrl('mustang-3.jpg'),
  ],
}
```

The `id` is now a slug (matching the Quartz convention), so URLs are `/natural-stone/mustang` instead of `/natural-stone/1`.

### 25-product mapping (positions = original `Stone 0n`)

| # | Old | New name | Material | Slug |
|---|---|---|---|---|
| 1 | Stone 01 | White Macaubas Quartzite | Quartzite | white-macaubas-quartzite |
| 2 | Stone 02 | Mustang | Quartzite | mustang |
| 3 | Stone 03 | Black Diamond Quartzite | Quartzite | black-diamond-quartzite |
| 4 | Stone 04 | Brilliant Black Quartzite | Quartzite | brilliant-black-quartzite |
| 5 | Stone 05 | Dakar | Quartzite | dakar |
| 6 | Stone 06 | Everest | Granite | everest |
| 7 | Stone 07 | Rocky Mountain Quartzite | Quartzite | rocky-mountain-quartzite |
| 8 | Stone 08 | Dakar (second cut, bolder banding) | Quartzite | dakar-2 |
| 9 | Stone 09 | Calabata White Quartzite | Quartzite | calabata-white-quartzite |
| 10 | Stone 10 | Lavezzi Quartzite | Quartzite | lavezzi-quartzite |
| 11 | Stone 11 | Genova | Marble | genova |
| 12 | Stone 12 | Calacatta | Marble | calacatta |
| 13 | Stone 13 | Kristallus | Quartzite | kristallus |
| 14 | Stone 14 | Monaco | Quartzite | monaco |
| 15 | Stone 15 | Copenhagen Quartzite | Quartzite | copenhagen-quartzite |
| 16 | Stone 16 | Arabescato | Marble | arabescato |
| 17 | Stone 17 | Leblon Quartzite | Quartzite | leblon-quartzite |
| 18 | Stone 18 | Taj Mahal Quartzite | Quartzite | taj-mahal-quartzite |
| 19 | Stone 19 | White Macaubas Quartzite (Luxury White cut) | Quartzite | luxury-white-quartzite |
| 20 | Stone 20 | Vibranium Quartzite | Quartzite | vibranium-quartzite |
| 21 | Stone 21 | Amazon Quartzite | Quartzite | amazon-quartzite |
| 22 | Stone 22 | Titanio | Quartzite | titanio |
| 23 | Stone 23 | Panda | Marble | panda |
| 24 | Stone 24 | Alpine White Quartzite | Quartzite | alpine-white-quartzite |
| 25 | Stone 25 | Onyx Bianco | Onyx | onyx-bianco |

Two entries are intentionally named "Dakar" — they're different cuts of the same material (a soft cut and a bold cut). Slugs differ (`dakar` and `dakar-2`) so each gets a unique URL; both share the same Dakar reference gallery beyond their own client-supplied hero photo.

One product (Arabescato) has no gallery beyond its hero — its capristones.com detail page returned 404 during the round so no reference imagery was available. Its detail page renders with the single client photo until the client supplies more.

### Supabase `stones` bucket — 56 new files

Each named product (except Arabescato) gets 2–3 supporting gallery photos pulled from the legacy capristones.com product page, renamed to `<slug>-<n>.jpg` and uploaded to the same `stones` bucket the hero photos already live in. Total 56 new files. Listed in `.tmp/gallery-uploads/README.md` (which is what the client used as an upload manifest).

### Test fixtures

`tests/visual.spec.js` — `product-detail-hero` and `product-detail-specs` previously navigated to `/#/natural-stone/1`. With slug ids, that URL no longer resolves; switched both to `/#/natural-stone/mustang`. New baselines regenerated.

### CLAUDE.md

Updated the Natural Stone scope paragraph (Project Scope section) and the Data architecture paragraph to reflect slug-based ids, named products, and gallery arrays.

## What didn't change

- Product detail page component (`ProductDetailPage.jsx`) — already used `String(p.id) === id` for lookup, so slug ids resolve without code changes. The thumbnail strip just becomes visible automatically once `gallery.length > 1`.
- The Natural Stone listing component (`NaturalStonePage.jsx`) — reads `stone.image`, `stone.name`, `stone.id`, `stone.origin`. All those fields still exist; only their values changed.
- Quartz, Cabinets, Shower Panels, Home, Contact — untouched.
- Pricing & sourcing copy ("By Inquiry" / "Pricing on Request" / "Brazil") — unchanged.

## Verification

- `npm run build` — passes (lint + Vite build, 638kb bundle, no warnings beyond the pre-existing chunk-size note).
- `npm run test:visual` — all 19 routes pass after baseline refresh. Snapshots regenerated for natural-stone-hero, natural-stone-grid, product-detail-hero, product-detail-specs (the four routes affected by the rename + gallery additions). The `home-hero` and `quartz-hero` runs occasionally network-idle-time-out on the first attempt; both pass on retry — pre-existing flake unrelated to this round.
- Spot-checked snapshots: `Mustang` renders with material badge `QUARTZITE`, three gallery thumbnails visible at the bottom of the hero. Listing grid shows real product names ("White Macaubas Quartzite", "Mustang", …) instead of "Stone 01"/"Stone 02".

## Why these matches and not others

The 25 photos were matched visually against reference imagery downloaded from each product page on capristones.com. High-confidence matches (Mustang, Calacatta, Negresco-style Black Diamond, Vibranium, Taj Mahal, etc.) used distinctive visual fingerprints — banding direction, vein color, texture density — to lock in. A handful of low-confidence matches (Copenhagen, Arabescato, Amazon, Panda, Alpine White) were assigned the closest reference product available and may need correction once the client confirms inventory.

The reference catalog has 31 products; we have 25 photos. Six products on capristones.com are *not* represented in the new site's natural-stone inventory (notably Negresco, Onyx Oro, Cygnus Granite, Amorado Amarula Quartzite, Arara Blue/Gold Quartzite, Blue Splendour Quartzite). That's intentional — the 25 photos define what the client currently has on hand; products without photos shouldn't exist as cards.

## Known follow-ups

- Low-confidence matches above. Easy to correct: update the `name` (and `id` if rename desired) in `src/data/naturalStones.js`, replace the gallery filenames if a different product's reference photos should be used, re-run `npm run test:visual:update`.
- The `IMG_1841.heic` photo is still in the bucket and still excluded (HEIC won't render in browsers). Convert + re-upload + append to the `stones` array if the client wants 26 products.
- Filter dropdowns (Type / Color / Finish) on the Natural Stone listing remain stripped. With real material classifications now in place, a `Material` filter dropdown is now feasible (values: Quartzite / Marble / Granite / Onyx). Hold off until the client asks — easy to add later.
