---
name: New categories — Shower Panels & Cabinets
description: Add Shower Panels and Cabinets to the Collections dropdown with dedicated listing + detail pages, matching the existing Natural Stone / Quartz shape.
type: design-spec
date: 2026-04-22
---

# Shower Panels & Cabinets — design spec

## Context and motivation

Client requested, on 2026-04-22, to add **Shower Panels** and **Cabinets** to the Collections dropdown, each with its own page. This partially reverses the 2026-04-16 scope pruning (which removed Cabinets along with Slabs, Tiles, Resources, Portfolio, and Catalog). Shower Panels is a net-new category that was not in the original scope.

After this round the in-scope site grows from six pages to eight:

- Home (unchanged)
- Natural Stone listing + detail (unchanged)
- Quartz listing + detail (unchanged)
- **Shower Panels listing + detail (new)**
- **Cabinets listing + detail (new)**
- Appointments (one-line tweak — new service-type option)
- Contact (unchanged)

## Goals

1. Two new category pages that read as first-class siblings of Natural Stone and Quartz — same structure, same visual language, same animation pattern.
2. Each new category gets its own detail page with category-appropriate fields, rather than squeezing cabinet construction or shower-panel install systems into the stone-centric `ProductDetailPage`.
3. Zero visual regression on the existing six pages. The 2026-04-22 baselines must still pass.

## Non-goals

- No Supabase wiring. Mock data stays hardcoded in the page files, matching the existing pattern.
- No palette changes, no new design tokens. Everything uses the existing `accent` / `accent-warm` / `accent-veil` / `surface` / `surface-dark` tokens.
- No home-page changes. The "featured categories" section on `HomePage` keeps its current Natural Stone + Quartz pair. The new categories are discoverable via the Collections dropdown only. This preserves the signed-off home-page visual baseline.
- No shared/abstract base component for the three detail pages. They stay as independent files, matching the existing pattern where `NaturalStonePage.jsx` and `QuartzPage.jsx` already duplicate most of their structure without a shared abstraction. Abstracting prematurely for four pages would cost more than it saves; revisit if a fifth category lands.
- No refactor of the existing `ProductDetailPage` to be more generic. It stays stone/quartz-specific (it already dispatches between them via `useLocation`).

## Architecture

### Routes (`src/App.jsx`)

Add four new routes, patterned on the existing stone/quartz pair:

```jsx
<Route path="/shower-panels" element={<ShowerPanelsPage />} />
<Route path="/shower-panels/:id" element={<ShowerPanelDetailPage />} />
<Route path="/cabinets" element={<CabinetsPage />} />
<Route path="/cabinets/:id" element={<CabinetDetailPage />} />
```

### Files created

```
src/pages/ShowerPanelsPage.jsx          # listing
src/pages/ShowerPanelDetailPage.jsx     # detail
src/pages/CabinetsPage.jsx              # listing
src/pages/CabinetDetailPage.jsx         # detail
```

Each new listing page is a near-copy of `NaturalStonePage.jsx` with category-specific mock data, copy, and filter axes. Each new detail page is a near-copy of `ProductDetailPage.jsx` with category-specific summary fields, spec table fields, and care instructions. Duplication is deliberate; see "Non-goals."

### Files modified

- `src/App.jsx` — add four routes + four imports.
- `src/components/Navigation.jsx` — extend `navLinks[1].dropdown` from 2 items to 4 items. No other changes; mobile menu picks up new items automatically because it iterates the array.
- `src/components/AppointmentsPage.jsx` — add `"Shower Panel Consultation"` to the `serviceTypes` array. `"Cabinet Design"` is already present.
- `tests/visual.spec.js` — add four new routes to the screenshot sweep: `/shower-panels`, `/shower-panels/1`, `/cabinets`, `/cabinets/1`.

### Nav dropdown order

Collections dropdown items, in display order:
1. Natural Stone
2. Quartz
3. Shower Panels
4. Cabinets

## Shower Panels — page details

### Listing (`/shower-panels`)

- Hero: label "Collection" + H1 "Shower / *Panels*" — "Shower" in terracotta `text-accent`, "Panels" italic in warm sienna `text-accent-warm`, following the existing heading pattern.
- Intro copy (~40 words): large-format natural-stone and engineered shower panel systems; seamless, waterproof alternative to tile.
- Filter axes (4, per the "I'll pick sensible defaults" decision):
  - **Material**: All / Marble / Quartz / Porcelain / Laminate
  - **Color**: All / White / Black / Gray / Beige / Brown
  - **Size**: All / 4x8 / 5x10 / Custom
  - **Finish**: All / Polished / Matte
- 4 mock products. Draft names and approximate prices:
  1. Calacatta Marble Panel — Marble / White / 5x10 / Polished — ~$120/sq ft — featured
  2. Statuario Porcelain Panel — Porcelain / White / 5x10 / Matte — ~$55/sq ft
  3. Walnut Laminate Panel — Laminate / Brown / 4x8 / Matte — ~$45/sq ft
  4. Carrara Quartz Panel — Quartz / White / Custom / Polished — ~$85/sq ft
- Product card: identical layout to the stone card. The bottom-right white-chip badge (currently used for `origin` on stone) shows the panel size. H3 product name stays `text-surface-dark` (ink) per the heading carve-out rule — orange here would compete with product photography.

### Detail (`ShowerPanelDetailPage.jsx`)

- Same page chrome as `ProductDetailPage`: breadcrumb back-link, 2-column gallery-and-details grid, specifications table, care list, CTAs.
- Top-of-page summary field relabels:
  - `material` → **Material** (unchanged)
  - `finish` → **Finish** (unchanged)
  - `origin` field slot → **Panel Size** (e.g., `60" × 120"`)
- Specifications table fields (replacing stone-specific `density` / `compressiveStrength` / `flexuralStrength` / `abrasionResistance` / `frostResistance`):
  - **Thickness** — e.g., `6mm / 10mm`
  - **Substrate** — e.g., `Porcelain-backed marble`
  - **Water Absorption** — e.g., `<0.5%`
  - **Edge Treatment** — e.g., `Mitered`
  - **Install System** — e.g., `Adhesive + trim`
  - **Fire Rating** — e.g., `Class A`
- Care list rewritten for panel maintenance: silicone reseal at perimeters, pH-neutral cleaner, avoid abrasive pads, check seam integrity annually, etc.
- Breadcrumb text: "Back to Shower Panels". Since this is a dedicated detail page, no `useLocation`-based dispatch is needed.

## Cabinets — page details

### Listing (`/cabinets`)

- Hero: label "Collection" + H1 "Custom / *Cabinets*" — "Custom" in terracotta, "Cabinets" italic in warm sienna.
- Intro copy (~40 words): custom vanity, kitchen, and built-in cabinetry designed to complement the stone and surface work.
- Filter axes:
  - **Style**: All / Shaker / Flat Panel / Raised Panel / Slab
  - **Wood**: All / Oak / Maple / Walnut / Cherry / Painted MDF
  - **Color**: All / White / Natural / Espresso / Gray / Custom
  - **Door Type**: All / Full Overlay / Inset / Partial
- 4 mock products. Draft names and prices (note unit change):
  1. Shaker White Oak — Shaker / Oak / Natural / Full Overlay — ~$420/linear ft — featured
  2. Frameless Walnut Flat-Panel — Flat Panel / Walnut / Natural / Full Overlay — ~$520/linear ft
  3. Inset Cherry Raised-Panel — Raised Panel / Cherry / Natural / Inset — ~$650/linear ft
  4. Modern Slab Espresso — Slab / Painted MDF / Espresso / Full Overlay — ~$380/linear ft
- Price unit change: `$/linear ft` instead of `$/sq ft`. All four mocks and the listing card use this unit.
- Product card: same layout as stone. In place of the stone `origin` badge, the cabinet card shows **Door Type** (e.g., "Full Overlay"). H3 name stays ink per the carve-out rule.

### Detail (`CabinetDetailPage.jsx`)

- Same page chrome as `ProductDetailPage`.
- Top-of-page summary field relabels:
  - `material` field slot → **Wood Species** (e.g., `White Oak`)
  - `finish` → **Finish** (unchanged)
  - `origin` field slot → **Construction** (e.g., `Frameless` / `Face-frame`)
- Price unit is `/linear ft`.
- Specifications table fields:
  - **Box Construction** — e.g., `3/4" plywood, dovetail joinery`
  - **Door Style** — e.g., `Shaker, 5-piece`
  - **Finish Type** — e.g., `Conversion varnish`
  - **Hardware** — e.g., `Blum soft-close hinges`
  - **Drawer Glides** — e.g., `Full-extension undermount`
  - **Warranty** — e.g., `Lifetime limited`
- Care list rewritten for cabinets: wood cleaner only, avoid standing water, adjust hinges annually, touch-up kit for scratches, etc.
- Breadcrumb text: "Back to Cabinets".

## Visual and interaction details

- Animations: identical to existing pages. `initial={{ opacity: 0, y: 20 or 30 }}` + `whileInView` + `viewport={{ once: true }}` on scroll-triggered sections; `initial animate` on hero.
- Typography: Cormorant serif for display, Montserrat for body. No new font loads.
- Heading carve-out: product-name H3s inside the product card loops on both new listing pages stay `text-surface-dark`. Product-name H1 on both new detail pages stays `text-surface-dark`. This matches the existing rule in `CLAUDE.md`.
- Accent usage on the new pages:
  - Hero H1 main word: `text-accent`
  - Hero H1 italic sub-word: `text-accent-warm`
  - Product price in card: `text-accent`
  - Back-link hover, "View Details" hover, CTA button hover: `text-accent` / `bg-accent`
  - Section-wash `bg-accent-veil` — **not used** on the new pages (currently used only on the home CTA section; adding it elsewhere would reopen palette scope).

## Mock image sourcing

- All images Unsplash, `auto=format&fit=crop&w=1200&q=80`, same as the existing pages. Listing cards use `w=1200`, detail page galleries use `w=1200`.
- Imagery should read as shower panels / cabinets respectively. Specific URLs to be picked during implementation; any plausible interior/material photography is acceptable as long as it reads clearly as the right category.

## Appointments form

Add `"Shower Panel Consultation"` to `src/components/AppointmentsPage.jsx` `serviceTypes`, positioned after `"Stone Consultation"`:

```js
const serviceTypes = [
  'Stone Consultation',
  'Shower Panel Consultation',
  'Cabinet Design',
  'General Visit',
  'Installation Planning',
  'Maintenance Consultation'
];
```

No other appointments-form changes.

## Testing

### Build

- `npm run build` must pass. This catches Tailwind class typos and missing imports.

### Visual regression

- Add four new routes to `tests/visual.spec.js`: `/shower-panels`, `/shower-panels/1`, `/cabinets`, `/cabinets/1`. Existing two-viewport setup means 8 new baselines.
- After implementation, run `npm run test:visual` once to surface diffs, then `npm run test:visual:update` to accept the new baselines for the new routes. The existing six routes must still match their 2026-04-22 baselines — if they diverge, that is an unintentional regression and must be fixed rather than re-baselined.

### Manual check

- Click through the Collections dropdown: all four links navigate correctly.
- On each new listing, change each filter and confirm the product grid updates.
- Click into one product card on each new listing and verify the detail page renders with the correct fields and the correct "Back to X" breadcrumb.
- On the Appointments page, open the Service Type select and confirm "Shower Panel Consultation" and "Cabinet Design" both appear.

## Documentation updates (part of this round, per `CLAUDE.md` workflow)

1. **`CLAUDE.md`** — update the "Project Scope" section to list the 8 in-scope pages; add a one-liner to the Architecture section about the two new peer detail components and the carve-out extending to their cards.
2. **`PROGRESS.md`** — new dated revision-log entry; update "Current state" to reflect the 8-page scope.
3. **`docs/changelog/2026-04-22-new-categories.md`** — client-facing note with before/after screenshots of the Collections dropdown and each new page.
4. **`docs/HOW-TO-REVISE.md`** — add a "swapping mock products for a category" recipe pointing at all four listing-page files.

## Risks and trade-offs

- **Duplication.** Four listing files and three detail files will share ~80% of their structure. Accepted deliberately — abstracting four pages into a common component costs more context than it saves, and any change that *needs* to affect all four can be applied by editing them in parallel. If a fifth category shows up, that is the time to extract.
- **Visual regression footprint grows.** Going from 6 to 10 tested routes (6 existing + 4 new) roughly doubles the `test:visual:update` surface area. This is a cost, not a bug — locking in the new pages is the whole point.
- **Price-unit divergence.** Cabinets use `$/linear ft` while all other categories use `$/sq ft`. Handled by storing the full price string (e.g., `"$420/linear ft"`) in the mock data, same as the existing pattern — no conditional formatting logic needed.
