# 2026-05-06 — Real Quartz imagery wired up + card simplified to match Natural Stone

The Quartz listing now shows 25 real product photos sourced from the Capri Stones catalogue (with client-confirmed permission), served from a public Supabase Storage bucket. The previous 4 placeholder products (Pure White, Midnight Black, Concrete Gray, Warm Brown) and their stock-photography images are gone. This is the second category to move from placeholder to real content (Natural Stone moved 2026-04-29). Same-day follow-up: the Quartz card was simplified to mirror Natural Stone's card exactly so the two listing pages now read as a coherent set.

## What changed

### Quartz listing page (`/quartz`)

- 25 product cards, one per photo. Same 2-column grid (desktop) / single-column (mobile) layout as before, with the list-view toggle preserved in the upper-right.
- **Card design simplified to match Natural Stone exactly:** hero photo with a single bottom-right `Engineered` pill, name H3, `By Inquiry` eyebrow, `View Details` arrow. Removed: POPULAR badge, brand pill, star rating, description paragraph, four-spec mini-grid (Pattern / Finish / Thickness / Brand), feature chips. The card markup is now structurally identical to `NaturalStonePage.jsx`'s card.
- The four filter dropdowns (Brand / Color / Pattern / Finish) and the search input are preserved. Dropdown options were rebuilt to match the actual data so no option ever filters to zero — `Brand` is single-option (`Premium Stones`, the house brand) since Capri exposes no upstream brand metadata, and `Finish` is single-option (`Polished`). The search input still works against each product's `description` field, even though that text no longer appears on the card.

### Quartz detail pages (`/quartz/:id`)

- Each card now correctly routes to its own detail page. Previously every quartz card landed on the same hardcoded "Carrara Marble Classic" page regardless of which one was clicked — the same latent bug Natural Stone hit on 2026-04-29, now fixed for both categories.
- URLs use the product slug rather than a numeric id (e.g., `/quartz/venetian-white` instead of `/quartz/1`). Slug is human-readable and stable as the catalogue grows.
- The detail-page hero shows the same photo as the listing card. The thumbnail strip is hidden when there's only one photo (the case for all 25 right now).
- Quick Specs reads `Quartz` / `Polished` / `Engineered` for material/finish/origin.

### Source-data curation

For 6 products (1002, 1006, 1007, 1008, 1009, 1010), the first image returned by Capri's WooCommerce gallery was a "with hand for scale" shot. We swapped those for the cleaner full-slab warehouse shots Capri uses on its own listing page, so cards lead with product, not anatomy.

For 4 product pairs Capri serves byte-identical files under two SKUs (1001≡urban, 1003≡integrity, 1004≡argento, 1005≡idyllic). We dropped the numeric-side duplicates rather than show the same photo under two names — net 25 unique products from the 29 SKUs Capri lists.

### Naming and metadata

The 25 product names came from each Capri product page's H1: 16 are descriptive (`Venetian White`, `Calacatta Negro`, `Rio Light`, `Calacatta Gold`, `Calacatta Gold LQ`, `Carrara Riva`, `Placid`, `Idyllic`, `Artic Gray`, `Intricate`, `Steel Gray`, `Integrity`, `Argento`, `Dreamy`, `Urban`, `Avenza`) and 9 are internal SKU codes (`8038`, `8083`, `8130`, `1002`, `1006`, `1007`, `1008`, `1009`, `1010`) — those are how Capri's own catalogue presents them.

Color and pattern are inferred from the product names (e.g., Calacatta Negro → Black/Veined, Steel Gray → Gray/Solid). Finish is uniformly `Polished`. When the client supplies real metadata, it's a single edit to `src/data/quartz.js`.

## What did NOT change

- Home page, Natural Stone listing, Natural Stone detail page, Appointments, Contact pages — all unchanged.
- Cabinets and Shower Panels are still shadowed by Coming Soon.
- Pricing & sourcing copy — "By Inquiry" / "Pricing on Request" continue throughout.
- The card SHAPE changed (simplified to match Natural Stone), but the typography, color tokens, hover behavior, and grid spacing are unchanged.

## Verification

- `npm run build` — passes.
- `npm run test:visual` — `quartz-grid` baseline regenerated twice in the same round: first for the data swap, then for the card simplification. Other 19 baselines unchanged.
- Manual cross-check: 18 of 25 image filenames match Capri's listing-page thumbnail exactly; the other 7 are different photos of the same SKU (intentionally swapped for cleaner shots).

## Before / after

(Screenshots to be added when this round is committed and reviewed. Place under `docs/changelog/assets/2026-05-06-quartz-real-imagery/` and embed below.)

- Before: Quartz listing — 4 cards with stock photos (Pure White, Midnight Black, Concrete Gray, Warm Brown) and `Caesarstone` / `Silestone` / `HanStone` / `Cambria` brands in the filter dropdown
- After: Quartz listing — 25 cards with real Capri-sourced quartz photos, single-option `Premium Stones` brand
- Before: `/quartz/1` → "Carrara Marble Classic" hardcoded fallback
- After: `/quartz/venetian-white` → real Venetian White detail page with the matching slab image
