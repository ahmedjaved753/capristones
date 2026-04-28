# 2026-04-28 — Implementation plan: detail-page content pruning

Plan for the spec at `docs/superpowers/specs/2026-04-28-detail-page-content-pruning-design.md`.

## Step 1 — Edit each of 3 detail-page files identically

For each of `ProductDetailPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelDetailPage.jsx`:

1. **Mock object cleanup** — delete these fields:
   - `inStock: true`
   - `color: '...'`
   - `description: '...'`
   - `longDescription: '...'`

2. **Remove the In Stock badge** — find the `{<x>.inStock && (...)}` block in the badge row (between `Featured` and `</div>`) and delete it including its parent conditional.

3. **Remove the description block + divider** — find:
   ```jsx
   <div className="h-px bg-stone-200" />

   {/* Description */}
   <div>
     <p ...>{<x>.description}</p>
     <p ...>{<x>.longDescription}</p>
   </div>
   ```
   …and delete both. The Title block now sits directly above the Quick Specs card.

4. **Remove the Color spec & re-grid** — in the Quick Specs grid:
   - Delete `{ label: 'Color', value: <x>.color },` from the array.
   - Change `grid-cols-2` to `grid-cols-3` on the wrapping `<div>`.

`FiCheck` import stays — it's still consumed by the Care & Maintenance bullet list further down each page.

## Step 2 — Build

```bash
npm run build
```

Should pass clean. If lint flags `inStock` / `description` / etc. as undefined, that means a stray reference was missed — grep for the field name in the file.

## Step 3 — Verify in Playwright MCP

Walk:

- `/#/natural-stone/1` — confirm: 2-chip badge row (FEATURED, MARBLE, no IN STOCK), no description prose, 3-column Quick Specs (ORIGIN, FINISH, MATERIAL).
- Cabinets and Shower Panels detail routes are still shadowed by Coming Soon, so visiting `/#/cabinets/1` will show Coming Soon — that's expected. The component edits will surface once the routes are restored.

## Step 4 — Visual regression

```bash
npm run test:visual
```

Expect 2 failures: `product-detail-hero` and `product-detail-specs`. Other 18 baselines pass.

```bash
npm run test:visual:update
npm run test:visual    # confirm 20/20
```

## Step 5 — Documentation

1. Update `CLAUDE.md` — note in the Detail-pages section that the description block, In Stock badge, and Color field were removed.
2. Add new revision entry to `PROGRESS.md`.
3. Write `docs/changelog/2026-04-28-detail-page-content-pruning.md`.
4. Add a HOW-TO-REVISE recipe for restoring the description/badge/Color if the client changes their mind.

## Step 6 — Commit

Single atomic commit with all 3 page edits, regenerated baselines, and doc updates.
