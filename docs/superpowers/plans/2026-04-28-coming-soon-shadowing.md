# 2026-04-28 — Implementation plan: Coming Soon shadowing

Plan for the spec at `docs/superpowers/specs/2026-04-28-coming-soon-shadowing-design.md`.

## Step 1 — Build the shared component

Create `src/pages/ComingSoonPage.jsx`:

- Default-export a function component accepting `{ category }` as a prop.
- Single `<section>` with `min-h-[calc(100vh-5rem)]`, `bg-accent-veil`, generous padding.
- Eyebrow uses `label-text`. Body in `font-display` (H1) + `font-body` (paragraphs). H1 follows the two-word + italic-sub-word pattern.
- Two CTAs: `<Link to="/natural-stone" className="btn-primary">` and `<Link to="/contact" className="btn-outline">`.
- Framer Motion entrance: `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.6 }}`.
- Top-of-file comment block explaining what this component does and how the shadowing works.

## Step 2 — Wire it into routes

Edit `src/App.jsx`:

1. Add `import ComingSoonPage from './pages/ComingSoonPage';` next to the other page imports.
2. Add a comment above the existing `Shower Panels` and `Cabinets` page imports explaining they're temporarily routed through ComingSoonPage but kept warm.
3. Swap each of the 4 route elements:
   - `<Route path="/shower-panels" element={<ComingSoonPage category="Shower Panels" />} />`
   - `<Route path="/shower-panels/:id" element={<ComingSoonPage category="Shower Panels" />} />`
   - `<Route path="/cabinets" element={<ComingSoonPage category="Cabinets" />} />`
   - `<Route path="/cabinets/:id" element={<ComingSoonPage category="Cabinets" />} />`
4. Add inline route comments naming the shadowed component and the 1-line restore action.

## Step 3 — Annotate the shadowed page files

Add a 3-line header comment at the top of each of:

- `src/pages/CabinetsPage.jsx`
- `src/pages/CabinetDetailPage.jsx`
- `src/pages/ShowerPanelsPage.jsx`
- `src/pages/ShowerPanelDetailPage.jsx`

Pattern:

```js
// Currently SHADOWED: the /<route> route in App.jsx renders <ComingSoonPage category="..." /> instead of this component.
// This file is intentionally preserved so the listing/detail can be restored by editing App.jsx — no need to rebuild it.
// To restore: in App.jsx, swap the /<route> Route element back to <ThisComponent />.
```

## Step 4 — Build and lint

```bash
npm run build
```

Should pass clean. If ESLint complains about unused imports, do NOT add `eslint-disable` directives — first try the build with the imports retained (React's JSX-aware lint config typically keeps them as "used" because they could appear in JSX). The build run after editing settled this without any directives.

## Step 5 — Verify with Playwright MCP

Boot the dev server. Walk:

- `/#/cabinets` — Coming Soon, "PREMIUM STONES · CABINETS" eyebrow, "Coming Soon." H1, both CTAs.
- `/#/cabinets/1` — same Coming Soon (detail route shadowed too).
- `/#/shower-panels` — Coming Soon with "SHOWER PANELS" eyebrow.
- `/#/shower-panels/1` — same.
- `/#/natural-stone`, `/#/quartz`, `/#/`, `/#/contact`, `/#/appointments` — unchanged.

Click `BROWSE COLLECTIONS` from a Coming Soon page → verify lands on `/natural-stone`. Click `CONTACT US` → verify lands on `/contact`.

## Step 6 — Visual regression

```bash
npm run test:visual
```

Expect 8 failures (cabinets-hero, cabinets-grid, cabinet-detail-hero, cabinet-detail-specs and the four shower-panels equivalents). The other 12 baselines should still pass.

If unrelated baselines fail, kill any stray dev server first (port-clash issue) then re-run.

```bash
npm run test:visual:update
```

Re-run `npm run test:visual` to confirm 20/20 pass.

## Step 7 — Documentation

1. Update `CLAUDE.md`:
   - Project Scope section — note that Cabinets and Shower Panels are currently shadowed by ComingSoonPage (link the spec).
   - Architecture section — add `ComingSoonPage` to the page inventory.
2. Update `PROGRESS.md` — new dated revision entry; update "Current state" to reflect 6-of-8 categories live + the shadowing arrangement.
3. Write `docs/changelog/2026-04-28-coming-soon-shadowing.md`.
4. Add a recipe to `docs/HOW-TO-REVISE.md` for shadowing/un-shadowing routes.

## Step 8 — Commit

Single atomic commit with the new component, route swap, shadowed-file comments, regenerated baselines, and all doc updates.
