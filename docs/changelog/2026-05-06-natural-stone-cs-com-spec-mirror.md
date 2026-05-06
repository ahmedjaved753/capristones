# 2026-05-06 — Natural Stone Quick Specs now mirror capristones.com

The Natural Stone detail-page Quick Specs section now shows **Material / Size / Thickness** instead of **Origin / Finish / Material** — matching what every cs.com natural-stone detail page shows. Per-product size data was scraped from each cs.com product's `og:description` meta tag and added to `naturalStones.js`. One previously-mislabelled product was reassigned: `IMG_1862.jpg` (was "Amazon Quartzite") is now a 2nd cut of Calacatta — see "What changed" below.

This is the follow-up audit to `2026-05-06-natural-stone-named-products.md`. After the client uploaded the 56 gallery files I'd staged, a Playwright-based visual cross-check against cs.com surfaced two corrections worth making.

## What changed

### Quick Specs schema swap (Natural Stone only)

`ProductDetailPage.jsx` now dispatches on `categoryPath`:

```jsx
{(categoryPath === '/natural-stone'
  ? [
      { label: 'Material',  value: product.material },
      { label: 'Size',      value: product.size || '—' },
      { label: 'Thickness', value: product.thickness || '—' },
    ]
  : [
      { label: 'Origin',   value: product.origin },
      { label: 'Finish',   value: product.finish },
      { label: 'Material', value: product.material },
    ]
).map(...)}
```

Quartz pages still show the older Origin/Finish/Material trio (their cs.com analogue, which we haven't audited).

### Per-stone size data (scraped from cs.com)

Each cs.com product's detail page renders MATERIAL/SIZE/THICKNESS under the slab image. The values are duplicated into the page's `og:description` meta tag (e.g. Dakar reads `MATERIAL Natural Stone   SIZE 127" X 76"   THICKNESS 3/4"`). I scraped that meta for all 30 cs.com natural-stone products and added the per-product `size` to each entry in `naturalStones.js`. Thickness is universally `3/4"` so it lives in a `SHARED_THICKNESS` constant. Examples:

| Stone | Size |
|---|---|
| White Macaubas Quartzite | 118" X 66" |
| Mustang | 128" X 69" |
| Black Diamond Quartzite | 112" X 78" |
| Dakar | 127" X 76" |
| Calacatta | 120" X 78" |
| Taj Mahal Quartzite | 130" X 80" |
| Vibranium Quartzite | 112" X 78" |
| Onyx Bianco | 109" X 68" |

(Full set in `src/data/naturalStones.js`.)

### IMG_1862 reassigned: Amazon → Calacatta (2nd cut)

cs.com Amazon Quartzite has `COLOR: Green` and the og:image shows the famous green-grey wavy quartzite. The slab at `IMG_1862.jpg` is white with bold black diagonal veining — definitely not Amazon. The closest cs.com match visually is **Calacatta** (which the bold veining variant is famous for). Following the existing dual-cut precedent (Dakar / Dakar 2nd cut), the entry becomes:

```js
{
  id: 'calacatta-2',
  name: 'Calacatta',
  material: 'Marble',
  size: '120" X 78"',
  main: 'IMG_1862.jpg',
  extras: ['calacatta-2.jpg', 'calacatta-3.jpg', 'calacatta-4.jpg'],
}
```

URL is now `/natural-stone/calacatta-2` (was `/natural-stone/amazon-quartzite`). The detail page reuses the existing Calacatta gallery extras (already in the bucket) — no new uploads needed.

### Material classifications refined per cs.com data

Where cs.com lists a specific material in the meta tag (Quartzite / Marble / Granite / Onyx) we use it. Where cs.com lists generic "Natural Stone" we keep the more specific material we'd already inferred. One deliberate divergence: cs.com classifies **Taj Mahal as Marble**; we keep it as Quartzite per industry consensus (Taj Mahal is silica-rich and behaves like a quartzite — sealing, hardness, etc.). Code comment flags this carve-out.

## What we considered and didn't do

### Renaming the other "low-confidence" matches

The post-upload audit flagged Copenhagen / Panda / Alpine White as visually different from their cs.com og:images. After scraping the full cs.com spec tables, two of those flags relaxed:

- **Copenhagen Quartzite** — cs.com lists `COLOR: White, Grey`. The local `IMG_1850.jpg` is silver-grey-pale with horizontal banding — broadly consistent. Different cuts of the same stone routinely look different from a single hero photo. Kept.
- **Alpine White Quartzite** — cs.com lists `COLOR: White`. The local `IMG_1869.PNG` is pale crystalline white — consistent. Kept.
- **Panda** — cs.com lists material as generic "Natural Stone" with no color spec. Dramatic black-on-white pattern in the og:image, but we have no positive evidence the local slab isn't a different cut. Kept.

The seven cs.com products we don't carry inventory for (Negresco, Onyx Oro, Cygnus Quartzite, Amorado Amarula, Arara Blue/Gold, Blue Splendour) don't visually fit any of these three local photos either. So the conservative call is "keep the names, the cuts may just look different." Client can correct if any are wrong.

### Refreshing hero imagery from cs.com

The 25 hero photos are the **client's own photographs**, not cs.com og:images. We don't override those with cs.com imagery. The 56 gallery extras (positions 2–4) are cs.com reference photos and they're already correct.

### Adding Finish + Color fields

A few cs.com pages (Onyx Bianco, Black Diamond, Brilliant Black, etc.) show 5 fields: Material/Size/Thickness/Finish/Color. Most show only 3. Adding variable-fields-per-product would be a meaningful UX complication for marginal gain, and Finish is uniformly "Polished" except Cygnus (Leathered, which we don't currently carry). Kept the 3-field form.

## Verification

- `npm run build` passes (lint + Vite build, 639kb bundle).
- `npm run test:visual:update` — all 19 routes pass after baseline regen. Snapshots refreshed for natural-stone-grid, product-detail-hero, product-detail-specs (the routes affected by the Calacatta-2 rename + spec schema swap).
- Manual screenshot of `/#/natural-stone/calacatta-2` confirms the page renders with: MARBLE badge, "Calacatta" H1, MATERIAL: Marble, SIZE: 120" X 78", THICKNESS: 3/4", and a 4-thumb gallery.
- Manual screenshot of `/#/natural-stone/dakar` confirms the new schema (MATERIAL: Quartzite, SIZE: 127" X 76", THICKNESS: 3/4") and 4-thumb gallery.

## What didn't change

- The 24 other product names and slugs.
- The 25 client hero photos in Supabase.
- The 56 gallery extras already uploaded by the client.
- Quartz detail-page schema (still Origin/Finish/Material).
- Pricing & sourcing copy ("By Inquiry" / "Pricing on Request" / "Brazil") — unchanged.
- Listing-card rendering — `NaturalStonePage.jsx` doesn't show specs on the card, only on the detail page.

## Known follow-ups

- Re-route any external link to `/natural-stone/amazon-quartzite` — that URL no longer resolves (now `calacatta-2`). The site has no external inbound links to product pages currently, but if any are added later, the redirect needs to happen at the host level.
- If the client confirms the local IMG_1850/1867/1869 slabs are actually different products from Copenhagen/Panda/Alpine White, we'll need another round of renames + URL adjustments.
- Quartz detail-page schema mirroring against cs.com /quartz/ is a separate question for a later round.
