# 2026-04-28 — Implementation plan: pricing removal + Brazil origin

Plan for the spec at `docs/superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md`.

## Order of operations

Edit listings first, then detail pages, then run build + visual regression, then update docs. This order keeps the diff easy to review and makes any failure isolatable to a single area.

## Step 1 — Listing pages (4 files)

For each of `NaturalStonePage.jsx`, `QuartzPage.jsx`, `CabinetsPage.jsx`, `ShowerPanelsPage.jsx`:

1. Delete the `price: '$Xy/...'` line from each of the 4 product mocks.
2. Replace the price `<span>` in the card's flex-justify-between header with the "By Inquiry" eyebrow:

```jsx
{/* "By Inquiry" replaces the former price — quiet eyebrow keeps the card photography as hero. */}
<span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500 mt-2">
  By Inquiry
</span>
```

**Additional steps for `NaturalStonePage.jsx` only** (because it owns the origin filter and the country mocks):

3. Set `origin: 'Brazil'` on all 4 stone mocks.
4. Remove the `origin: 'All'` key from the initial `useState` filter object.
5. Remove the `origin: [...]` key from `filterOptions`.
6. Remove the `matchesOrigin` line from `filteredStones.filter(...)` and from the `return` expression.
7. Remove the `: filterType === 'origin' && option === 'All' ? 'All Origins'` branch from the dropdown label ternary.
8. Update the empty-state Clear-Filters button's reset payload to drop the `origin` key.

## Step 2 — Detail pages (3 files)

For each of `ProductDetailPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelDetailPage.jsx`:

1. Delete `price` and `priceRange` from the mock object.
2. Replace the Title & Price block with Title-only + "Pricing on Request" treatment:

```jsx
{/* Title */}
<div>
  {/* Product name stays ink — orange would compete with the product photography. */}
  <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
    {product.name}
  </h1>
  {/* "Pricing on request" replaces the former price block — single quiet terracotta line keeps the H1 supported without competing with photography. */}
  <p className="mt-4 font-body text-xs font-semibold uppercase tracking-widest text-accent">
    Pricing on Request
  </p>
  <p className="mt-2 font-body text-sm text-stone-500">
    Contact us for a personalized quote.
  </p>
</div>
```

(Use the appropriate variable name — `product`, `cabinet`, or `panel` — in each file.)

**Additional steps for `ProductDetailPage.jsx` only:**

3. Set `origin: 'Brazil'` on the mock product object.
4. Rewrite `longDescription` so it no longer mentions "Carrara region in Italy" or "Italy"; replace with a Brazilian-sourced framing.

**Additional steps for `ShowerPanelDetailPage.jsx` only:**

5. Rewrite `longDescription` so it no longer mentions "the finest Carrara quarries"; replace with "premium Brazilian quarries".

## Step 3 — Verify build

```bash
npm run build
```

Expect a clean build. If anything fails, the most likely cause is a stray reference (e.g., a forgotten `{stone.price}` in a place I missed). Search the modified files for `price` and confirm the only remaining matches are the explanatory comments next to the eyebrow spans.

## Step 4 — Verify in browser via Playwright MCP

Boot the dev server and walk the changed routes:

- `/#/natural-stone` — confirm 3 filter dropdowns (no origin), "BY INQUIRY" eyebrow, "BRAZIL" badge on each card.
- `/#/natural-stone/1` — confirm "PRICING ON REQUEST" + "Contact us…" line, ORIGIN: Brazil, prose mentions Brazilian quarries.
- `/#/quartz`, `/#/cabinets`, `/#/shower-panels` — confirm "BY INQUIRY" eyebrow on each card.
- `/#/cabinets/1`, `/#/shower-panels/1` — confirm "PRICING ON REQUEST" treatment renders the same as the natural-stone detail.

If anything looks off (visual hole, mis-aligned eyebrow, line-wrap quirk), iterate before regenerating baselines.

## Step 5 — Visual regression

```bash
npm run test:visual
```

Expect ~10 failures: the 4 listing-grid baselines and the 6 detail-page baselines (hero + specs each). Listing-hero, home, appointments, contact baselines should still pass — those routes weren't touched.

If unrelated baselines fail, investigate before updating (likely a port-clash issue with the dev server).

```bash
npm run test:visual:update
```

Then re-run `npm run test:visual` to confirm 20/20 pass against the new baselines.

## Step 6 — Documentation

1. Update `CLAUDE.md` — find the heading carve-out section and update the comment that referenced "the orange moment" to no longer mention pricing.
2. Add new dated entry to `PROGRESS.md` revision log; update "Current state" date if appropriate.
3. Write `docs/changelog/2026-04-28-pricing-removal-brazil-origin.md` with what changed and why (client-facing).
4. Add two new recipes to `docs/HOW-TO-REVISE.md`:
   - **Recipe — re-introduce pricing on cards / detail pages.** Where to put the price field back; which class names to use; visual-regression note.
   - **Recipe — change the single-origin sourcing story.** Where the origin field lives now; how to re-introduce the origin filter if the client adds a second country later.

## Step 7 — Commit

Single atomic commit including the code changes, regenerated baselines, and all doc updates.
