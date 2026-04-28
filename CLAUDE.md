# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev                # Start dev server (Vite) at localhost:5173
npm run build              # Lint + production build (outputs to dist/)
npm run lint               # Run ESLint across all files
npm run lint:error         # ESLint, errors only (no warnings)
npm run preview            # Preview production build
npm run test:visual        # Visual regression — screenshot every route, fail if any diverges from baseline
npm run test:visual:update # Accept current look as new baseline (run after intentional design changes)
```

**When to run the visual tests:** before committing any change that could affect how pages render — CSS, Tailwind classes, token edits, component markup, Framer Motion. If a test fails and the change was *intentional*, run `test:visual:update` to regenerate baselines; if the change was accidental, fix the code. Baselines live in `tests/visual.spec.js-snapshots/` and are committed. Full rationale and caveats in `tests/README.md`.

## Documentation Workflow

This project is client-facing and goes through revision rounds over time. To keep documentation accurate rather than letting it rot, **every change follows the workflow below.** Future Claude Code sessions: treat this as a hard rule, not a suggestion.

### Where every doc lives, and what it owns

| File | Owns | Update when… |
|---|---|---|
| `CLAUDE.md` (this file) | Commands, architecture, palette, conventions, carve-outs | Anything in those areas changes |
| `PROGRESS.md` | Current state summary + reverse-chron revision log | Every revision round (new entry with date + links) |
| `docs/changelog/<date>-<topic>.md` | Client-facing release notes with before/after screenshots | Every revision round that affects what the client sees |
| `docs/HOW-TO-REVISE.md` | Recipes for common client-feedback tweaks | When a new kind of tweak becomes common OR a recipe stops being accurate |
| `docs/superpowers/specs/<date>-<topic>.md` | Engineering rationale for a specific round (tokens, rules, risks) | Written once per round during brainstorming; not edited after |
| `docs/superpowers/plans/<date>-<topic>.md` | Task-by-task edit list for a specific round | Written once per round during planning; not edited after |
| `tests/README.md` | How the visual-regression system works | If the testing setup itself changes |
| `tests/visual.spec.js-snapshots/` | Source of truth for "what the site should look like" | After every intentional visual change (`npm run test:visual:update`) |

### The per-change checklist

For every meaningful change (features, CSS edits, palette tweaks, scope changes — not typo-fixes in a comment):

1. **Make the change.**
2. **Run `npm run build`** — catch class-name typos before commit.
3. **Run `npm run test:visual`.** If it fails:
   - Intentional → `npm run test:visual:update` → stage the updated baselines alongside the code change.
   - Unintentional → fix the code.
4. **Update `CLAUDE.md`** if the change touched: commands, architecture, palette, conventions, or the carve-out list.
5. **Update `PROGRESS.md`** if this is a meaningful revision round — add a new dated entry to the revision log with links to the spec/plan/changelog for the round.
6. **Update `docs/HOW-TO-REVISE.md`** if the change either:
   - Introduced a new tweakable knob that future revisions might target (add a recipe), OR
   - Made an existing recipe obsolete (remove or correct it).
7. **Add to `docs/changelog/`** if the change is client-facing — new dated file with before/after screenshots.
8. **Commit the code AND the doc updates together.** Not in two separate commits — one atomic unit.

### Rules of thumb

- **Don't create a new doc if an existing one can absorb the update.** Doc proliferation is what causes rot. The inventory above is the complete set; extending it requires a good reason.
- **Edit, don't append.** When palette or conventions change, EDIT the `CLAUDE.md` palette section to reflect the new state — don't leave the old description next to "UPDATE: now different." CLAUDE.md reads from top to bottom; stale mixed with current is worse than missing.
- **Changelogs are append-only.** Never rewrite a previous changelog entry. If you undo a change, write a new entry saying "reverted X because Y."
- **Dates are immutable.** Spec, plan, and changelog filenames use `YYYY-MM-DD`. The date reflects when the work happened; don't rename later.
- **If you skip a step, say why in the commit message.** E.g., "Skipped CLAUDE.md update — no architectural change, just a minor copy edit on contact page." Keeps the workflow honest without blocking trivial edits.
- **Doc rot warning signs to watch for on every session start:** the palette section in CLAUDE.md refers to colors not in `tailwind.config.js`; `PROGRESS.md` "Current state" describes something the code doesn't do; a HOW-TO-REVISE recipe references a line number that no longer matches. If you spot any, fix it as part of whatever else you're doing.

## Project Scope (updated 2026-04-28)

Client-confirmed scope for the Premium Stones website. Design direction: sharp, structured, sophisticated, high-end.

**In-scope pages:**
- **Home** (`/`) — hero with premium visuals, headline + CTAs; featured product categories preview (Natural Stone, Quartz only — the dropdown surfaces the full set); quick links to appointments and contact.
- **Natural Stone listing** (`/natural-stone`) — grid/gallery view with filtering (type, color, finish) and search. (Origin filter was removed on 2026-04-28; all stone is sourced from Brazil.)
- **Quartz listing** (`/quartz`) — same pattern as Natural Stone.
- **Shower Panels listing** (`/shower-panels`) — **CURRENTLY SHADOWED** by `ComingSoonPage`. Filters on material, color, size, finish exist in the preserved `ShowerPanelsPage` component but aren't reachable until the route is restored.
- **Cabinets listing** (`/cabinets`) — **CURRENTLY SHADOWED** by `ComingSoonPage`. Filters on style, wood, color, door type exist in the preserved `CabinetsPage` component.
- **Product detail pages:**
  - `/natural-stone/:id` and `/quartz/:id` share `ProductDetailPage` (stone-centric specs).
  - `/shower-panels/:id` uses dedicated `ShowerPanelDetailPage` (panel-centric specs: thickness, substrate, edge treatment, etc.) — **currently shadowed**.
  - `/cabinets/:id` uses dedicated `CabinetDetailPage` (cabinet-centric specs: box construction, door style, hardware, etc.) — **currently shadowed**.
- **Appointments / Booking** (`/appointments`) — structured in-page booking form. No floating widgets.
- **Contact** (`/contact`) — phone, email, address, business hours.
- **Coming Soon** — `ComingSoonPage.jsx` renders for the four shadowed routes above. Single shared component, parameterized by `category` prop. See `docs/superpowers/specs/2026-04-28-coming-soon-shadowing-design.md` for rationale and `docs/HOW-TO-REVISE.md` Recipe 12 for the restore procedure.

History: Slabs, Tiles, Cabinets, Resources, Portfolio, and Catalog were removed on 2026-04-16. On 2026-04-22 the client reinstated Cabinets and added Shower Panels as a net-new category. On 2026-04-28 both Cabinets and Shower Panels were temporarily shadowed by Coming Soon (collections not ready); the components remain in the repo for restoration. Slabs/Tiles/Resources/Portfolio/Catalog remain fully out of scope.

## Architecture

Single-page React app for a premium natural stone & quartz showroom. Uses `HashRouter` (not `BrowserRouter`) for routing — all routes start with `#/`.

**Routing pattern** (`src/App.jsx`): Each product category has a listing page plus a detail page sharing `ProductDetailPage`:
- `/natural-stone`, `/quartz` → category listing
- `/natural-stone/:id`, `/quartz/:id` → `ProductDetailPage` (uses `useLocation` to infer the category for back-nav)
- `/shower-panels`, `/shower-panels/:id`, `/cabinets`, `/cabinets/:id` → currently routed to `<ComingSoonPage category="..." />`. The original page imports (`ShowerPanelsPage`, `ShowerPanelDetailPage`, `CabinetsPage`, `CabinetDetailPage`) are kept warm in `App.jsx` so restoring is a 1-line `element=` swap per route. Each shadowed page file has a header comment pointing at this arrangement.

**Pages vs Components**: `src/pages/` are route-level containers; `src/components/` are reusable UI pieces composed inside pages. Some route files wrap same-named components (e.g., `pages/AppointmentsPage.jsx` is a thin shell that imports `components/AppointmentsPage.jsx`; `pages/ContactPage.jsx` wraps `components/ContactSection.jsx`).

**Detail pages — three peers, not one shared:** `ProductDetailPage.jsx` serves both Natural Stone and Quartz (it dispatches between them via `useLocation`). Shower Panels and Cabinets each have their own dedicated detail page (`ShowerPanelDetailPage.jsx`, `CabinetDetailPage.jsx`) because their specifications don't map onto stone vocabulary (panels have substrate / water absorption / install system; cabinets have box construction / door style / hardware). The three detail pages share ~80% of their structure; consolidating them with a fourth category would be a useful refactor, but with three categories the duplication is still cheaper than the abstraction.

**Detail-page content rules** (updated 2026-04-28): every detail page renders Title block (H1 + "Pricing on Request") → Quick Specs (3-column bordered card) → centered Applications block (`max-w-2xl mx-auto`) → existing "Ready to Use This Material?" CTA section. The In Stock badge, marketing description, and Color spec were removed in the content-pruning round; the Action row (Download Product Sheet / Save / Share), Technical Specifications, and Care & Maintenance sections were removed in the actions-and-detail-sections-removal round. Mock fields stripped on each detail page: `inStock`, `description`, `longDescription`, `color`, `specifications`, `care`. Icon imports stripped: `FiDownload`, `FiHeart`, `FiShare2`, `FiCheck`. `isSaved` state stripped. Listing-page mocks still keep their `description` field (used in card body + search). Restoring any of these: see `docs/HOW-TO-REVISE.md` Recipes 13 (descriptions/badge/Color) and 14 (Actions/Specs/Care).

**`src/common/SafeIcon.jsx`**: Wrapper around `react-icons/fi` (Feather Icons). Always use this instead of importing icons directly — it falls back gracefully on missing icons. Usage: `<SafeIcon icon={FiArrowRight} />` or `<SafeIcon name="ArrowRight" />`.

**Styling**: Tailwind CSS with custom animations defined in `tailwind.config.js`. Path alias `@` resolves to `src/`.

**Palette** (updated 2026-04-22 — orange/white retheme): three-tier accent system anchored on near-white `surface` (`#FAFAF9`) and near-black `surface-dark` (`#1C1917`). Tokens in `tailwind.config.js`:
- `accent` `#B8431E` (terracotta) — H1/H2/structural H3 main words, the "Pricing on Request" eyebrow on detail pages, bullets, nav underline, icons, badges, `hover:bg-accent` states. AA-legal on white for body-sized text.
- `accent-warm` `#E07A3C` (warm sienna) — decorative only: H1 italic sub-words, hero gradient mid-band, footer brand on dark. Not legible on white below ~24px.
- `accent-veil` `#FBEBDD` (peach-cream) — section-wash backgrounds. Currently used only on home CTA section.

**Heading carve-out** (important — comments in source flag this so it's not "fixed" as an inconsistency): product-name H1 on all three detail pages (`ProductDetailPage`, `ShowerPanelDetailPage`, `CabinetDetailPage`) and product-card H3s inside product-grid loops on `HomePage`/`NaturalStonePage`/`QuartzPage`/`ShowerPanelsPage`/`CabinetsPage` intentionally stay `text-surface-dark` (ink). Orange on those would compete with product photography. Full design rule: `docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`.

**Pricing & sourcing rules** (added 2026-04-28): pricing is not displayed anywhere on the site. Each listing card shows a `By Inquiry` eyebrow (font-body, 10px, uppercase tracking-widest, text-stone-500) where the price used to live. Each detail page shows a `Pricing on Request` line (font-body, xs, uppercase tracking-widest, text-accent) followed by `Contact us for a personalized quote.` (font-body, sm, text-stone-500) where the price block used to live — the terracotta accent there preserves the visual support under the H1. All Natural Stone products are sourced from Brazil (single-origin); the origin filter dropdown was removed since variance is zero. If the client adds a second country later, see `docs/HOW-TO-REVISE.md` Recipe 10 — "change the single-origin sourcing story". Full rationale: `docs/superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md`.

**Animations**: Framer Motion is used throughout. Standard pattern is `initial={{ opacity: 0, y: 30 }}` + `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` for scroll-triggered animations.

**Data**: All product data is currently hardcoded as mock objects inside each page component. There is no state management layer. Supabase is wired up — `src/lib/supabase.js` exports a shared `supabase` client built from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). The credentials live in `.env.local` (gitignored via `*.local`). No tables are read yet; the client is ready for the first data integration. Use **publishable** keys only in this Vite frontend — never the `service_role` / secret key, since `VITE_*` env vars are bundled into the browser build.
