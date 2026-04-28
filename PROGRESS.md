# Project Progress

Living status document for the Premium Stones website. Reverse-chronological revision log below. Each entry links to the spec, plan, and changelog for that revision round — those are the source of truth; this file is just the index.

## Current state (as of 2026-04-28)

- **Pages live:** Home, Natural Stone listing + detail, Quartz listing + detail, Appointments, Contact. (6 of 8 collections rendering real content.)
- **Pages shadowed by Coming Soon:** Cabinets and Shower Panels (listing + detail) — see the 2026-04-28 shadowing entry below. The original components are preserved on disk; routes can be restored with a 1-line edit per route in `src/App.jsx`.
- **Palette:** terracotta `#B8431E` + warm sienna `#E07A3C` + peach-cream veil `#FBEBDD` on near-white `#FAFAF9` / near-black `#1C1917`. See `CLAUDE.md` "Palette" section.
- **Typography:** Cormorant serif (display) + Montserrat sans (body). Unchanged since editorial revamp.
- **Pricing & sourcing:** Pricing is **not displayed** anywhere on the site. Listing cards show a "BY INQUIRY" eyebrow; detail pages show a "PRICING ON REQUEST" line. Every Natural Stone product is sourced from **Brazil** (single-origin); the origin filter has been removed since variance is zero.
- **Data:** All product data is mocked in-component. Supabase client is wired up (`src/lib/supabase.js`) using publishable-key auth via Vite env vars; no tables are read yet, but the client is ready for the first data integration.
- **Testing:** Playwright visual regression covers 10 routes — 20 baseline screenshots in `tests/visual.spec.js-snapshots/`. Run `npm run test:visual` before committing any user-facing change.
- **Open items:** none currently tracked. If client feedback arrives, new revision rounds get their own spec + plan + changelog entry and append to the log below.

## Revision log

### 2026-04-28 — Brand logo added to nav, footer, and favicon

Client supplied a "C" monogram logo (terracotta+warm-sienna gradient — coincidentally already the brand palette). Placed at `public/logo.png` (renamed from `Logo No Background Just C.png` to drop spaces from the filename). Wired into the brand lockup in `Navigation.jsx` (40px high, left of the `PREMIUM | Stones` wordmark) and into the footer brand column in `Footer.jsx` (64px high, above the `Premium Stones` heading). Also set as favicon in `index.html`. Both placements use `alt="" aria-hidden="true"` since the wordmark/heading next to the icon already announces the brand to screen readers. 19 visual baselines regenerated to reflect the new lockup (nav on every page; footer on the routes that scroll deep enough to capture it).

Note on brand: the logo "C" suggests "Capri Stones", which matches the contact-info round's `@capristones.com` email domain — but the visible site brand everywhere is still "Premium Stones". Resolving that inconsistency (rename or keep) is a separate decision the client hasn't given direction on yet.

### 2026-04-28 — Detail-page Actions row + Tech Specs + Care removal

Stripped the Download Product Sheet / Save / Share button row from each detail page (none of the buttons did anything functional — placeholders from the original scaffold). Also removed the Technical Specifications and Care & Maintenance sections; their data was placeholder filler, not real product spec data, and showing made-up numbers on a showroom site does more harm than good. The orphaned Applications section (which used to share a 3-column grid with the two removed sections) was re-styled as a single centered `max-w-2xl` block so it reads as intentional rather than orphaned. Mock fields `specifications` and `care` removed; icon imports `FiDownload`, `FiHeart`, `FiShare2`, `FiCheck` removed; `isSaved` state removed. CSS bundle dropped ~0.5 kB. 2 visual baselines regenerated for the natural-stone detail route.

- **Spec:** [`docs/superpowers/specs/2026-04-28-detail-page-actions-and-detail-sections-removal-design.md`](docs/superpowers/specs/2026-04-28-detail-page-actions-and-detail-sections-removal-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-28-detail-page-actions-and-detail-sections-removal.md`](docs/superpowers/plans/2026-04-28-detail-page-actions-and-detail-sections-removal.md)
- **Client changelog:** [`docs/changelog/2026-04-28-detail-page-actions-and-detail-sections-removal.md`](docs/changelog/2026-04-28-detail-page-actions-and-detail-sections-removal.md)
- **Restore recipe:** [`docs/HOW-TO-REVISE.md`](docs/HOW-TO-REVISE.md) Recipe 14

### 2026-04-28 — Detail-page content pruning (In Stock badge, description, Color)

Stripped three elements from each detail page: the green "✓ In Stock" badge in the top chip row, the two-paragraph description block (along with the divider above it), and the Color field from the Quick Specs grid. Quick Specs grid switched from 2-col to 3-col so the remaining 3 fields (Origin/Finish/Material — or category equivalents) sit cleanly in one row. Mock data fields `inStock`, `description`, `longDescription`, `color` removed from each detail-page mock since nothing consumes them anymore. Listing-page cards are unchanged. 2 visual baselines regenerated for the natural-stone detail route; cabinet/shower-panel detail baselines stayed unchanged because those routes are currently shadowed by Coming Soon — the component edits are in place for when the routes are restored.

- **Spec:** [`docs/superpowers/specs/2026-04-28-detail-page-content-pruning-design.md`](docs/superpowers/specs/2026-04-28-detail-page-content-pruning-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-28-detail-page-content-pruning.md`](docs/superpowers/plans/2026-04-28-detail-page-content-pruning.md)
- **Client changelog:** [`docs/changelog/2026-04-28-detail-page-content-pruning.md`](docs/changelog/2026-04-28-detail-page-content-pruning.md)
- **Restore recipe:** [`docs/HOW-TO-REVISE.md`](docs/HOW-TO-REVISE.md) Recipe 13

### 2026-04-28 — Cabinets and Shower Panels shadowed by Coming Soon

Added a new shared `ComingSoonPage` component and routed `/cabinets`, `/cabinets/:id`, `/shower-panels`, `/shower-panels/:id` through it. Original page components (`CabinetsPage`, `CabinetDetailPage`, `ShowerPanelsPage`, `ShowerPanelDetailPage`) are preserved on disk with a header comment in each pointing at the route swap. Restoring is a 1-line edit per route in `src/App.jsx`. Coming Soon page reuses the existing peach-cream wash and the two-word terracotta+sienna H1 pattern so it reads as part of the editorial family rather than a 404. 8 visual-regression baselines regenerated; 12 still pass pixel-for-pixel.

- **Spec:** [`docs/superpowers/specs/2026-04-28-coming-soon-shadowing-design.md`](docs/superpowers/specs/2026-04-28-coming-soon-shadowing-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-28-coming-soon-shadowing.md`](docs/superpowers/plans/2026-04-28-coming-soon-shadowing.md)
- **Client changelog:** [`docs/changelog/2026-04-28-coming-soon-shadowing.md`](docs/changelog/2026-04-28-coming-soon-shadowing.md)
- **Restore recipe:** [`docs/HOW-TO-REVISE.md`](docs/HOW-TO-REVISE.md) Recipe 12

### 2026-04-28 — Pricing removed, all stone origins set to Brazil

Removed the price field from every product card and detail page across all four collections (Natural Stone, Quartz, Shower Panels, Cabinets). Replaced with a quiet "BY INQUIRY" eyebrow on cards and a refined "PRICING ON REQUEST" + supporting line on detail pages, signalling consultation-driven sales. At the same time, set every Natural Stone product's origin to "Brazil" and removed the now-meaningless origin filter dropdown. Detail-page prose updated so it no longer references Italy / Carrara as a literal source. 10 visual-regression baselines regenerated; the other 10 still pass pixel-for-pixel.

- **Spec:** [`docs/superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md`](docs/superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-28-pricing-removal-and-brazil-origin.md`](docs/superpowers/plans/2026-04-28-pricing-removal-and-brazil-origin.md)
- **Client changelog (with before/after visuals):** [`docs/changelog/2026-04-28-pricing-removal-brazil-origin.md`](docs/changelog/2026-04-28-pricing-removal-brazil-origin.md)
- **Revision playbook:** new recipes added to [`docs/HOW-TO-REVISE.md`](docs/HOW-TO-REVISE.md) — "re-introduce pricing" and "change the single-origin sourcing story"

### 2026-04-28 — Supabase client wired up

Connected the Supabase JS client that was installed but unused. Added `src/lib/supabase.js` (shared `createClient` instance reading `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`), `.env.local` for the credentials (gitignored), and `.env.example` as a template. No UI changes — the module is not yet imported anywhere; this is foundational plumbing so a future revision round can replace mocked product data with real queries. Followed the latest publishable-key pattern from Supabase docs (verified via context7).

- **Files:** `src/lib/supabase.js`, `.env.local` (untracked), `.env.example`
- **No spec/plan/changelog:** infrastructure-only, no client-visible change yet. The first revision that actually reads from Supabase will get the full doc set.

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
