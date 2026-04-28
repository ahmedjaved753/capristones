# 2026-04-29 — Cabinet imagery swapped to quarry photos

Per client direction: replace photos of furniture across the site with stock photos of a stone quarry. The hero background on the home page was explicitly excluded from this round and is unchanged.

## What changed

### All eight cabinet-page images replaced with quarry photography

Two pages were affected (both are currently shadowed by `ComingSoonPage` on the live site, but their components are kept warm for restoration — see CLAUDE.md and HOW-TO-REVISE Recipe 12):

- **`src/pages/CabinetsPage.jsx`** — the four cabinet listing cards (Shaker White Oak, Frameless Walnut Flat-Panel, Inset Cherry Raised-Panel, Modern Slab Espresso) each carry a different quarry shot.
- **`src/pages/CabinetDetailPage.jsx`** — the four-image gallery on the detail route uses the same four quarry photos in the same order.

The four photos chosen (all sourced from Unsplash, free CDN URLs):

1. **Sweeping multi-tier rock-wall quarry** — wide horizontal shot, blue sky, classic premium feel.
2. **Aerial marble quarry with turquoise water** — dramatic overhead view, autumn trees framing the rim.
3. **Light-gray quarry walls beneath forest** — sophisticated, ground-level, sharp tonal contrast.
4. **Aerial cream-and-white tiered quarry** — luxury feel, monochromatic palette that complements the site's near-white surface.

The selection deliberately skips photos that read as "construction site" (yellow excavators, grimy machinery) so the imagery stays consistent with the site's premium positioning.

### What was *not* changed

- **The home-page hero background** — the client asked to leave this for a separate round.
- **All Natural Stone, Quartz, and home collections imagery** — these depict stone surfaces, not furniture, so they fall outside the client's "remove furniture photos" directive. The home collections preview, in particular, showcases stone collections and is conceptually correct as-is.
- **Shower Panels imagery** — these are bathroom/shower scenes, not furniture; left in place.
- **Card layout, captions, descriptions, and product mock data** — only the `image` URLs (and `gallery` URLs) changed. The product names ("Shaker White Oak," etc.) are still about cabinetry and may want a separate copy edit if the swap to quarry imagery becomes permanent direction. Flagged for the client's review.

## Verification

Cabinet routes are shadowed → the swap doesn't show on the live site today. To preview, the routes were temporarily un-shadowed in `App.jsx`, the dev server was started, and both `/cabinets` and `/cabinets/1` were screenshotted via Playwright. The swap renders cleanly: each card pulls a distinct quarry photo at full resolution, and the detail-page gallery cycles through the four shots via the existing thumbnail strip. The route was re-shadowed before commit.

`npm run test:visual` passes — the visual baselines for cabinet routes capture the `ComingSoonPage` placeholder (which doesn't display these images) so no baseline updates were required. As a bonus, the visual test suite already masks all `<img>` elements via `mask: [page.locator('img')]` in `tests/visual.spec.js`, so card imagery on un-shadowed pages is also resilient to swaps.

## Before / after

(Screenshots to be added when the work is committed. Place in `docs/changelog/assets/2026-04-29-cabinet-imagery-quarry-swap/` and embed below.)

- Before: cabinet listing cards showing kitchen / cabinetry photography.
- After: cabinet listing cards showing four distinct quarry photographs.
- Before: cabinet detail page with kitchen photo as the main gallery image.
- After: cabinet detail page with sweeping quarry photo as the main gallery image; thumbnail strip shows all four quarry shots.
