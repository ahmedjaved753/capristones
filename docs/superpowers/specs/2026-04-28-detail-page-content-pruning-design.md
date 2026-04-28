# 2026-04-28 — Detail-page content pruning (In Stock, description, Color)

Client request: on every product detail page, remove the **In Stock** badge, the **description** prose block, and the **Color** field from the Quick Specs grid.

## Background

Each detail page (`ProductDetailPage` for Natural Stone & Quartz, `CabinetDetailPage`, `ShowerPanelDetailPage`) currently renders:

1. A 3-chip badge row: `Featured`, `<Material/Style>`, `In Stock` (green check).
2. A title block (`H1` + `Pricing on Request` line).
3. A horizontal divider.
4. A 2-paragraph description block (short `description` + longer `longDescription`).
5. A bordered Quick Specs card showing 4 fields in a 2×2 grid.
6. An action row (Download Product Sheet + Save + Share).

The client wants the badge's "In Stock" pill, the entire description block, and the Color spec removed.

## Goals

1. Remove the "In Stock" badge JSX from each detail page; the `inStock` field becomes unused and is removed from each mock object.
2. Remove the description block (both paragraphs) from each detail page; the `description` and `longDescription` fields become unused on the detail page mocks and are removed.
3. Remove the Color spec from each detail page's Quick Specs grid; the `color` field becomes unused on the detail page mocks and is removed.
4. Re-balance the layout so the page doesn't end up with visible holes or unbalanced grids.

## Design rationale

### Badge row — drops to 2 chips

`Featured` (dark inverse) + `Material` (outlined). Reads cleanly. No layout adjustment needed; the chips were `gap-3` siblings, removing one just tightens the row.

### Description removal — also removes the divider above it

The current vertical sequence is:

```
Title + Pricing on Request
─── divider ───
Description (~6 lines of body type)
Quick Specs (bordered card with its own border-top)
Actions
```

Removing only the description leaves the lone divider sitting against the bordered Quick Specs card — a double rule that reads as a UI bug. Solution: remove the divider too. New sequence:

```
Title + Pricing on Request
Quick Specs
Actions
```

Tighter, more product-spec-driven. This is consistent with how high-end material catalogs (Hermès Maison, fine-art galleries) present line items: photography + name + provenance + a tight spec block, with the marketing prose deferred to brochure copy or a sales conversation. The page is now closer to a "spec sheet" tone and away from a "marketing landing page" tone — appropriate for a showroom-driven business.

### Color removal — switch grid from 2 to 3 columns

The Quick Specs grid currently uses `grid-cols-2` with 4 items in a 2×2 layout (Origin/Finish/Color/Material on the stone page; Construction/Finish/Color/Wood Species on cabinets; Panel Size/Finish/Color/Material on shower panels). Removing one item leaves 3 items in a 2×2 grid — the last item hangs alone in the left column. Per ui-ux-pro-max layout heuristics: avoid hanging items in fixed-column grids; either fill the slot or change the column count.

Switching to `grid-cols-3` lays the remaining 3 fields out in a single row. The labels still wrap if a value is long, but with the value strings on the existing detail pages (Brazil, Polished, Marble, Face-frame, Clear Conversion Varnish, etc.) they all fit comfortably at desktop widths. On narrow viewports the existing `gap-6` and the natural text wrapping handle reflow.

The bordered card (`border border-stone-200 p-6`) stays; it groups the fields visually and gives them weight in the layout now that the description above them is gone.

### Why also delete the unused fields from mock data?

CLAUDE.md is explicit about the dead-code anti-pattern: *"If you are certain that something is unused, you can delete it completely."* On the detail pages, `inStock`, `description`, `longDescription`, `color` had only one consumer each — the JSX block being removed. Leaving them as ghost fields would invite future devs to wire them back up in a way the client doesn't want. Listing-page mocks keep their `description` field since the listing pages still consume it (card body text + search filter).

### Listing pages are out of scope

The user's screenshot shows the detail page only. Listing cards (Natural Stone, Quartz, Cabinets, Shower Panels) are not affected — they still show description text and material/origin chips. If the client wants similar pruning on listing cards later, that's a follow-up round.

## Risk

Low. All edits are presentational + dead-code removal. No routing, state, or build changes.

## Files affected

| File | What changes |
|---|---|
| `src/pages/ProductDetailPage.jsx` | Remove `inStock`, `color`, `description`, `longDescription` from mock; remove In Stock badge JSX; remove description block + preceding divider; remove Color spec; switch Quick Specs grid to `grid-cols-3`. |
| `src/pages/CabinetDetailPage.jsx` | Same edit pattern (Color → was `cabinet.color`). |
| `src/pages/ShowerPanelDetailPage.jsx` | Same edit pattern (Color → was `panel.color`). |
| `tests/visual.spec.js-snapshots/product-detail-hero-chromium-darwin.png` | Regenerated. |
| `tests/visual.spec.js-snapshots/product-detail-specs-chromium-darwin.png` | Regenerated. |
| `cabinet-detail-*` and `shower-panel-detail-*` baselines | **Not regenerated** — the `/cabinets/:id` and `/shower-panels/:id` routes are currently shadowed by ComingSoonPage (see 2026-04-28-coming-soon-shadowing). The component edits are still valid for when those routes are restored, but the visual baselines won't reflect the changes until the shadowing is lifted. |
| `CLAUDE.md` | Note in the Detail-pages section that the description block and Color spec were removed; In Stock badge gone. |
| `PROGRESS.md` | New revision-log entry. |
| `docs/changelog/2026-04-28-detail-page-content-pruning.md` | New client-facing entry. |
| `docs/HOW-TO-REVISE.md` | Add recipe for "restore the description / In Stock / Color on detail pages". |
