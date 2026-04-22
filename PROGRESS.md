# Project Progress

Living status document for the Premium Stones website. Reverse-chronological revision log below. Each entry links to the spec, plan, and changelog for that revision round — those are the source of truth; this file is just the index.

## Current state (as of 2026-04-22)

- **Pages live:** Home, Natural Stone listing + detail, Quartz listing + detail, Shower Panels listing + detail, Cabinets listing + detail, Appointments, Contact. (8 pages total, up from 6.)
- **Palette:** terracotta `#B8431E` + warm sienna `#E07A3C` + peach-cream veil `#FBEBDD` on near-white `#FAFAF9` / near-black `#1C1917`. See `CLAUDE.md` "Palette" section.
- **Typography:** Cormorant serif (display) + Montserrat sans (body). Unchanged since editorial revamp.
- **Data:** All product data is mocked in-component. Supabase is installed but not wired up.
- **Testing:** Playwright visual regression covers 10 routes — 20 baseline screenshots in `tests/visual.spec.js-snapshots/`. Run `npm run test:visual` before committing any user-facing change.
- **Open items:** none currently tracked. If client feedback arrives, new revision rounds get their own spec + plan + changelog entry and append to the log below.

## Revision log

### 2026-04-22 — Shower Panels and Cabinets categories

Added two new product categories (Shower Panels, Cabinets) to the Collections dropdown, each with its own listing page and dedicated detail page. Partially reversed the 2026-04-16 scope pruning for Cabinets; Shower Panels is a net-new category. Home page and existing stone/quartz pages untouched. Three detail components now: stone/quartz shared via `useLocation` dispatch, plus peer `ShowerPanelDetailPage` and `CabinetDetailPage` with category-appropriate specs. Visual regression extended from 12 to 20 baselines.

- **Spec:** [`docs/superpowers/specs/2026-04-22-new-categories-design.md`](docs/superpowers/specs/2026-04-22-new-categories-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-22-new-categories.md`](docs/superpowers/plans/2026-04-22-new-categories.md)
- **Client changelog (with before/after visuals):** [`docs/changelog/2026-04-22-new-categories.md`](docs/changelog/2026-04-22-new-categories.md)
- **Commits:** see `git log` for SHA range on `main`

### 2026-04-22 — Orange/white theme retheme

Swapped the editorial bronze/gold accent palette for an orange/white palette per client request. Added a third token (`accent-veil`) for soft section washes. Introduced a deliberate heading carve-out: product names stay ink-black so product photography keeps visual dominance. All small accents (prices, icons, bullets, badges, hovers) auto-propagated through the Tailwind token redefinition. Set up Playwright visual regression to lock the design in against accidental drift.

- **Spec:** [`docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`](docs/superpowers/specs/2026-04-22-orange-white-theme-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-22-orange-white-theme.md`](docs/superpowers/plans/2026-04-22-orange-white-theme.md)
- **Client changelog (with before/after visuals):** [`docs/changelog/2026-04-22-orange-white-theme.md`](docs/changelog/2026-04-22-orange-white-theme.md)
- **Revision playbook:** [`docs/HOW-TO-REVISE.md`](docs/HOW-TO-REVISE.md) (if the client asks for further tweaks, start here)
- **Commits:** `2757000…2cbc78c` on `main`

### 2026-04-16 — Editorial luxury revamp + scope pruning

Redirected the design away from the pre-revamp "amber gradient + rounded corners + soft shadows" styling to a sharp editorial aesthetic (Cormorant serif, 0px radius, 1px borders, structural uppercase labels, Framer Motion reveals on scroll). At the same time, pruned out-of-scope pages (Slabs, Tiles, Cabinets, Resources, Portfolio, Catalog) to match the client-confirmed six-page scope.

- **Commit:** `1e3148c Complete design revamp: editorial luxury aesthetic` (plus follow-ups `9338356` mobile gap, `1444ac6` scroll-to-top)
- Spec/plan not captured at the time — this revision predates the spec/plan/changelog workflow.

### Pre-2026-04-16 — Initial build

Initial project scaffold using `quest-react-starter`, Vite + React + Tailwind, HashRouter, mocked product data. Palette used raw `amber-500 / orange-500` gradients, rounded cards, glassmorphic touches.

## Conventions for future revisions

When adding a new entry to this log:

1. **Date format:** `YYYY-MM-DD — Short title` as the H3 heading.
2. **Body:** one short paragraph describing what changed and *why* (client request? bug? polish?). Link the spec, plan, and changelog docs.
3. **Commits:** include the SHA range on `main` so a future reader can `git log <range>` for detail.
4. **Update the "Current state" block above** if anything in it changed (palette, scope, active tests, etc.).
5. **Remove items from "Open items"** as they ship.

The workflow that keeps this file up to date lives in `CLAUDE.md` under "Documentation maintenance workflow" — future Claude Code sessions follow it automatically when they make a change.
