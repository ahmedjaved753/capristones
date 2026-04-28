# 2026-04-28 — Coming Soon shadowing for Cabinets and Shower Panels

Client request: when a visitor goes to `/cabinets` or `/shower-panels`, show a "Coming Soon" page instead of the listing/detail. The actual listing and detail components should be preserved (not deleted) so they can be turned back on later without rebuilding.

## Background

The site currently routes:

- `/cabinets` → `CabinetsPage` (4-product grid + filters)
- `/cabinets/:id` → `CabinetDetailPage` (gallery + specs)
- `/shower-panels` → `ShowerPanelsPage` (4-product grid + filters)
- `/shower-panels/:id` → `ShowerPanelDetailPage` (gallery + specs)

The Cabinets and Shower Panels collections aren't ready for public consumption yet. Removing the routes entirely would break the Collections dropdown links and any inbound URLs; deleting the components would force a rebuild when the categories come back online.

## Goals

1. Anyone hitting `/cabinets`, `/cabinets/:id`, `/shower-panels`, or `/shower-panels/:id` sees a Coming Soon page instead of the real listing/detail.
2. The four original page components (`CabinetsPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelsPage.jsx`, `ShowerPanelDetailPage.jsx`) stay on disk untouched.
3. Restoring a category is a 1-line edit per route in `App.jsx` — no other file needs to change.
4. The Coming Soon page is on-brand: matches the editorial visual language already established (Cormorant + Montserrat, terracotta + warm-sienna italic H1 pattern, peach-cream wash for "moment" sections, ink-black CTA buttons).

## Design rationale

### Why a single shared `ComingSoonPage` instead of per-category placeholders?

The two collections need the same treatment, parameterized only by name. A shared component lets us evolve the layout in one place. The component takes a `category` prop (e.g., `"Cabinets"` or `"Shower Panels"`); the eyebrow and the body line interpolate it.

### Why route-layer shadowing instead of in-file early returns?

Three options were considered:

- **Edit each page to early-return `<ComingSoonPage />` at the top.** Risk: clutters the four page files; the "real" page code becomes dead code below an early return; restoring requires editing four files.
- **Move the page imports/exports under a feature flag.** Risk: introduces a new pattern (env-based flags) that doesn't exist elsewhere in this codebase; over-engineered for a temporary state.
- **Swap the route element in `App.jsx`.** ✅ **Chosen.** Single source of truth, single file edit. The original page components are still imported (so the import stays warm in the bundle and the file is unambiguously "kept"); restoring is `element={<ComingSoonPage .../>}` → `element={<CabinetsPage />}`. Eight characters per route.

A short JSDoc-style comment is added to the top of each shadowed page file pointing at the route that currently overrides it, so future-you finds the switch immediately.

### Visual treatment

A coming-soon page is a "moment" page. The site already has visual vocabulary for moments — the **peach-cream wash** (`bg-accent-veil`) currently used only on the home CTA section. Reusing it here is intentional: it tells visitors familiar with the site that this is a deliberate page, not an error page.

Layout — single hero-only section, full viewport height, content left-aligned to match every other page hero on the site. Within that:

- **Eyebrow** `Premium Stones · {Category}` — uses the existing `label-text` utility class. Tells the visitor which collection they hit.
- **H1** `Coming` (terracotta) `Soon.` (warm-sienna italic) — same two-word + italic-sub-word pattern as Natural / Stone, Engineered / Quartz, Custom / Cabinets, Shower / Panels. The pattern itself signals "this is part of the family of category pages".
- **Two-line copy** — first line acknowledges what they were looking for ("Our cabinets collection is being curated…"), second line offers next steps. The `our + plural` framing avoids the "a cabinets collection" indefinite-article-plural-noun grammar issue from the first iteration.
- **Two CTAs** — `Browse Collections` (primary, `btn-primary` ink-on-ink) routes to `/natural-stone`; `Contact Us` (secondary, `btn-outline` ghost) routes to `/contact`. Gives the visitor somewhere to go instead of dead-ending.

What was deliberately **not** included:

- **No fake launch date.** Claiming "Q3 2026" or similar would erode trust if it slips. Leaving the timeline open is more honest.
- **No newsletter signup.** No newsletter system exists on this site; adding one for a coming-soon page is scope creep.
- **No teaser images.** A photo of the wrong stone or a generic stock image would weaken the page; the type-driven hero is on-brand and self-supporting.

### Why route the detail variants too?

A visitor hitting `/cabinets/1` directly (from a saved bookmark, say) would otherwise land on a detail page that shows mock data with the price block already removed. That's a worse experience than landing on a clean Coming Soon page. Routing both `/cabinets` and `/cabinets/:id` to the same Coming Soon (with the same `category="Cabinets"` prop) gives every URL in the namespace a coherent experience.

## Out of scope

- Modifying the Collections dropdown in the navigation. The links continue to point at `/cabinets` and `/shower-panels`; visitors land on Coming Soon. If the client wants the dropdown items removed or labeled "Coming Soon", that's a follow-up.
- Wiring a newsletter signup or "notify me" form on the Coming Soon page.
- Visual regression coverage of the now-shadowed pages. The Playwright suite tests routes, and these routes now render Coming Soon. The shadowed components have no test coverage while they're not mounted; that's acceptable while they're frozen.

## Risk

Low. New file is additive. The route swap is local to `App.jsx`. The shadowed page components are unchanged on disk. Restoring is a four-line route edit.

## Files affected

| File | What changes |
|---|---|
| `src/pages/ComingSoonPage.jsx` | **New file.** Shared component, `category` prop. |
| `src/App.jsx` | Add `ComingSoonPage` import; swap `element` for the 4 cabinet/shower-panel routes; keep original imports with a `// eslint-disable` style suppression NOT needed (lint accepts them as part of the JSX-ready import set). Also add inline route comments explaining the swap. |
| `src/pages/CabinetsPage.jsx` | Add a 3-line header comment at the top explaining the route is currently shadowed and how to restore. No code change. |
| `src/pages/CabinetDetailPage.jsx` | Same header comment, scoped to the detail route. |
| `src/pages/ShowerPanelsPage.jsx` | Same header comment, scoped to the listing route. |
| `src/pages/ShowerPanelDetailPage.jsx` | Same header comment, scoped to the detail route. |
| `tests/visual.spec.js-snapshots/cabinets-*.png`, `cabinet-detail-*.png`, `shower-panels-*.png`, `shower-panel-detail-*.png` | 8 baselines re-generated to capture the Coming Soon look at each route. |
| `CLAUDE.md` | Update the "Project Scope" + "Routing pattern" sections to flag that 2 of 8 categories are currently shadowed; add a note pointing at the new `ComingSoonPage`. |
| `PROGRESS.md` | New revision-log entry; update "Current state" to reflect 6-of-8 categories live. |
| `docs/changelog/2026-04-28-coming-soon-shadowing.md` | New client-facing entry. |
| `docs/HOW-TO-REVISE.md` | Add recipe for "shadow a route with Coming Soon" / "restore a shadowed route". |
