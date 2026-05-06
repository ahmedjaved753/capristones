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

## Project Scope (updated 2026-05-06)

Client-confirmed scope for the Premium Stones website. Design direction: sharp, structured, sophisticated, high-end.

**In-scope pages:**
- **Home** (`/`) — hero with premium visuals, headline + CTAs; brand-story section ("From Quarry to Home") with two paragraphs of client-supplied copy about Capri Stone's values + offerings (added 2026-05-06, sits between hero and collections, `bg-white`); featured product categories preview (Natural Stone, Quartz only — the dropdown surfaces the full set); walk-in showroom CTA pointing at `/contact` (primary) plus a `tel:` call link (secondary). All "Book Appointment" / "Schedule Consultation" CTAs were retired on 2026-05-06 — see Walk-in policy below.
- **Natural Stone listing** (`/natural-stone`) — grid/gallery view of **25 named products** from `src/data/naturalStones.js`, each backed by Supabase Storage in the `stones` bucket (round 2026-05-06: each placeholder `Stone 01`–`Stone 25` was matched to its corresponding product on the client's existing capristones.com catalog and renamed accordingly — Mustang, Calacatta, Vibranium Quartzite, Onyx Bianco, etc.; full mapping in the changelog for that round). Each entry now also carries a multi-image `gallery` (1 client hero photo + 2–3 reference photos sourced from the legacy site) which feeds the detail-page thumbnails. The `id` field is now a **slug** (e.g. `mustang`, `white-macaubas-quartzite`) so URLs are `/natural-stone/<slug>` instead of `/natural-stone/<n>`. Materials are now distinguished as `Quartzite` / `Marble` / `Granite` / `Onyx` per the legacy catalog. Each entry also carries `size` and `thickness` fields scraped from the product's cs.com og:description meta tag (round 2026-05-06 audit) — these populate the new Material/Size/Thickness Quick Specs schema (see Detail-page content rules). One product appears twice in the inventory: **Calacatta** (`calacatta` and `calacatta-2`) — the 2nd-cut entry was previously mislabelled as "Amazon Quartzite" until 2026-05-06; cs.com Amazon is color=Green so a white-with-black-veining slab can't be Amazon, and the bold dramatic veining of `IMG_1862.jpg` is consistent with Calacatta. Same dual-cut treatment as Dakar (`dakar` + `dakar-2`). Filters (type, color, finish) and search were removed on 2026-04-29 because product metadata was placeholder; with real product names + materials now in place they could be reinstated when the client confirms the filter set. (Origin filter was removed on 2026-04-28; all stone is sourced from Brazil.)
- **Quartz listing** (`/quartz`) — grid/gallery with search + brand/color/pattern/finish filters; **25 real products** from `src/data/quartz.js` served from the public `quartz` Supabase Storage bucket (round 2026-05-06). Card design mirrors Natural Stone exactly (image with bottom-right `Engineered` pill → H3 + `By Inquiry` eyebrow → `View Details` arrow); the elaborate brand-pill / popular-badge / star-rating / spec-grid / feature-chips card was simplified out the same day to keep the two listing pages visually consistent. Filter dropdowns are derived from the actual product set: `brand` is single-option (`Premium Stones`, the house brand) since no upstream brand metadata is exposed; `finish` is single-option (`Polished`); `color` and `pattern` carry the values present in the data. Display names came from each Capri Stones detail page's H1; spec metadata (color, pattern) is inferred from product names where possible — replace with real client metadata when available.
- **Shower Panels listing** (`/shower-panels`) — **CURRENTLY SHADOWED** by `ComingSoonPage`. Filters on material, color, size, finish exist in the preserved `ShowerPanelsPage` component but aren't reachable until the route is restored.
- **Cabinets listing** (`/cabinets`) — **CURRENTLY SHADOWED** by `ComingSoonPage`. Filters on style, wood, color, door type exist in the preserved `CabinetsPage` component.
- **Product detail pages:**
  - `/natural-stone/:id` and `/quartz/:id` share `ProductDetailPage` (stone-centric specs).
  - `/shower-panels/:id` uses dedicated `ShowerPanelDetailPage` (panel-centric specs: thickness, substrate, edge treatment, etc.) — **currently shadowed**.
  - `/cabinets/:id` uses dedicated `CabinetDetailPage` (cabinet-centric specs: box construction, door style, hardware, etc.) — **currently shadowed**.
- **Contact** (`/contact`) — phone, email, address, business hours. This is the destination for every "Visit Our Showroom" CTA across the site.
- **Coming Soon** — `ComingSoonPage.jsx` renders for the four shadowed routes above. Single shared component, parameterized by `category` prop. See `docs/superpowers/specs/2026-04-28-coming-soon-shadowing-design.md` for rationale and `docs/HOW-TO-REVISE.md` Recipe 12 for the restore procedure.

**Walk-in policy** (added 2026-05-06; addresses + hours updated 2026-05-06): the business runs **two walk-in showrooms** — Capri Stone — San Rafael (1925 Francisco Blvd E #15, San Rafael, CA 94901, (415) 686-5392) and Capri Stone — Concord (1379 Franquette Ave, Concord, CA 94520, (925) 786-4919). Both are walk-in-friendly during business hours; no appointment is required. **Hours:** Mon–Sat 9 AM – 5 PM, Sun 10 AM – 4 PM (both showrooms; encoded in `Footer.jsx` and `ContactSection.jsx`). The `/appointments` route, the `AppointmentsPage` component pair, and every `Book Appointment` / `Schedule Consultation` / `Book Consultation` CTA were removed on 2026-05-06; all former appointment CTAs now read **Visit Our Showroom** and link to `/contact`. **Email** is intentionally NOT displayed anywhere on the site — the client will supply the address later; until then no `mailto:` link should be wired. Restoring an appointment flow later: see `docs/HOW-TO-REVISE.md` Recipe 18. Editing contact info (numbers, addresses, hours): see Recipe 22.

History: Slabs, Tiles, Cabinets, Resources, Portfolio, and Catalog were removed on 2026-04-16. On 2026-04-22 the client reinstated Cabinets and added Shower Panels as a net-new category. On 2026-04-28 both Cabinets and Shower Panels were temporarily shadowed by Coming Soon (collections not ready); the components remain in the repo for restoration. On 2026-05-06 the Appointments page and all booking CTAs were removed (walk-in showroom). Slabs/Tiles/Resources/Portfolio/Catalog remain fully out of scope.

## Architecture

Single-page React app for a premium natural stone & quartz showroom. Uses `HashRouter` (not `BrowserRouter`) for routing — all routes start with `#/`.

**Routing pattern** (`src/App.jsx`): Each product category has a listing page plus a detail page sharing `ProductDetailPage`:
- `/natural-stone`, `/quartz` → category listing
- `/natural-stone/:id`, `/quartz/:id` → `ProductDetailPage` (uses `useLocation` to infer the category for back-nav)
- `/shower-panels`, `/shower-panels/:id`, `/cabinets`, `/cabinets/:id` → currently routed to `<ComingSoonPage category="..." />`. The original page imports (`ShowerPanelsPage`, `ShowerPanelDetailPage`, `CabinetsPage`, `CabinetDetailPage`) are kept warm in `App.jsx` so restoring is a 1-line `element=` swap per route. Each shadowed page file has a header comment pointing at this arrangement.

**Pages vs Components**: `src/pages/` are route-level containers; `src/components/` are reusable UI pieces composed inside pages. Some route files wrap same-named components — currently `pages/ContactPage.jsx` wraps `components/ContactSection.jsx` (the same wrapper pattern used by the now-retired AppointmentsPage pair).

**Detail pages — three peers, not one shared:** `ProductDetailPage.jsx` serves both Natural Stone and Quartz (it dispatches between them via `useLocation`). Shower Panels and Cabinets each have their own dedicated detail page (`ShowerPanelDetailPage.jsx`, `CabinetDetailPage.jsx`) because their specifications don't map onto stone vocabulary (panels have substrate / water absorption / install system; cabinets have box construction / door style / hardware). The three detail pages share ~80% of their structure; consolidating them with a fourth category would be a useful refactor, but with three categories the duplication is still cheaper than the abstraction.

**Detail-page content rules** (updated 2026-05-06): every detail page renders Title block (H1 + "Pricing on Request") → Quick Specs (3-column bordered card) → centered Applications block (`max-w-2xl mx-auto`) → existing "Ready to Use This Material?" CTA section. The Quick Specs **schema differs by category**: Natural Stone shows **Material / Size / Thickness** (mirroring capristones.com — every cs.com natural-stone detail page uses these three fields, populated from each product's og:description meta tag, scraped 2026-05-06; size varies per product e.g. Dakar 127" X 76", Calacatta 120" X 78", Onyx Bianco 109" X 68"; thickness is universally 3/4"). Quartz still shows **Origin / Finish / Material** (cs.com quartz pages use the older trio). Dispatch happens in `ProductDetailPage.jsx` based on `categoryPath`. Size suppresses to "—" when blank (only Arabescato — its cs.com page 404s so no scraped size). The In Stock badge, marketing description, and Color spec were removed in the content-pruning round; the Action row (Download Product Sheet / Save / Share), Technical Specifications, and Care & Maintenance sections were removed in the actions-and-detail-sections-removal round. Mock fields stripped on each detail page: `inStock`, `description`, `longDescription`, `color`, `specifications`, `care`. Icon imports stripped: `FiDownload`, `FiHeart`, `FiShare2`, `FiCheck`. `isSaved` state stripped. Listing-page mocks for Cabinets / Shower Panels still keep their `description` field (used in card body + search). Quartz keeps `description` only for the search input — its card no longer renders the description (mirrored to Natural Stone's simplified shape on 2026-05-06). Natural Stone has never carried a `description` because its data module derives content from filenames only. Restoring any of these: see `docs/HOW-TO-REVISE.md` Recipes 13 (descriptions/badge/Color) and 14 (Actions/Specs/Care).

**`src/common/SafeIcon.jsx`**: Wrapper around `react-icons/fi` (Feather Icons). Always use this instead of importing icons directly — it falls back gracefully on missing icons. Usage: `<SafeIcon icon={FiArrowRight} />` or `<SafeIcon name="ArrowRight" />`.

**Styling**: Tailwind CSS with custom animations defined in `tailwind.config.js`. Path alias `@` resolves to `src/`.

**Palette** (updated 2026-04-22 — orange/white retheme): three-tier accent system anchored on near-white `surface` (`#FAFAF9`) and near-black `surface-dark` (`#1C1917`). Tokens in `tailwind.config.js`:
- `accent` `#B8431E` (terracotta) — H1/H2/structural H3 main words, the "Pricing on Request" eyebrow on detail pages, bullets, nav underline, icons, badges, `hover:bg-accent` states. AA-legal on white for body-sized text.
- `accent-warm` `#E07A3C` (warm sienna) — decorative only: H1 italic sub-words, hero gradient mid-band, footer brand on dark. Not legible on white below ~24px.
- `accent-veil` `#FBEBDD` (peach-cream) — section-wash backgrounds. Currently used only on home CTA section.

**Heading carve-out** (important — comments in source flag this so it's not "fixed" as an inconsistency): product-name H1 on all three detail pages (`ProductDetailPage`, `ShowerPanelDetailPage`, `CabinetDetailPage`) and product-card H3s inside product-grid loops on `HomePage`/`NaturalStonePage`/`QuartzPage`/`ShowerPanelsPage`/`CabinetsPage` intentionally stay `text-surface-dark` (ink). Orange on those would compete with product photography. Full design rule: `docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`.

**Pricing & sourcing rules** (added 2026-04-28): pricing is not displayed anywhere on the site. Each listing card shows a `By Inquiry` eyebrow (font-body, 10px, uppercase tracking-widest, text-stone-500) where the price used to live. Each detail page shows a `Pricing on Request` line (font-body, xs, uppercase tracking-widest, text-accent) followed by `Contact us for a personalized quote.` (font-body, sm, text-stone-500) where the price block used to live — the terracotta accent there preserves the visual support under the H1. All Natural Stone products are sourced from Brazil (single-origin); the origin filter dropdown was removed since variance is zero. If the client adds a second country later, see `docs/HOW-TO-REVISE.md` Recipe 10 — "change the single-origin sourcing story". Full rationale: `docs/superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md`.

**Animations**: Framer Motion is used throughout. Standard pattern is `initial={{ opacity: 0, y: 30 }}` + `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` for scroll-triggered animations.

**Hero carousel** (added 2026-05-06; slides re-shot to lifestyle imagery 2026-05-06 per client direction): the home-page hero is a 2-slide auto-advancing carousel rendered by `src/components/HeroCarousel.jsx`. Slides crossfade every 6s (1.2s expo-out fade) with a slow Ken Burns scale on the active slide; reduced-motion users get a 0.2s cut and no drift. The editorial frame (eyebrow / H1 / sub / CTAs) is passed in as `children` from `HomePage.jsx` and stays static — only the imagery changes. Bottom of the section carries a museum-placard index strip ("01 The Kitchen / 02 The Wall") with a per-column hairline + terracotta progress bar that doubles as the auto-advance timer; far-right is a pause/play toggle. Mobile collapses the strip to 2 segmented bars + the active caption. Slides show finished installations of the materials being sold — not slabs/quarries: slide 0 is a luxury kitchen with a CRISTALLUS-style white-marble waterfall island ("The Kitchen · Natural Stone · Installed"); slide 1 is a living/dining room with white-and-gold marble feature panels framing a marble dining table ("The Wall · Quartz · Accent"). Captions intentionally do not name countries other than Brazil (single-origin stance — see Pricing & sourcing rules above). Imagery is served from the `hero-section` Supabase bucket via `heroImageUrl(filename)` in `src/lib/supabase.js`, with a local `/public/hero/<filename>` fallback so the carousel still renders before the bucket is populated. The img tag carries an `onError` handler (`heroImageLocalFallback` in the same module) that auto-swaps to the local copy when Supabase 404s a filename — covers the transitional state right after a slide is renamed locally but before the client uploads the new bytes. To swap an image or caption: `docs/HOW-TO-REVISE.md` Recipe 20.

**Data**: Product data is hardcoded as mock objects inside each page component for Cabinets and Shower Panels, but Natural Stone and Quartz both read from data modules backed by Supabase Storage. Natural Stone reads 25 products from `src/data/naturalStones.js` via `stoneImageUrl(filename)` against the `stones` bucket; product `id` is the slug (e.g., `mustang`, `white-macaubas-quartzite`) — same convention as Quartz — so `/natural-stone/:id` URLs are slug-based (round 2026-05-06 renamed each placeholder `Stone 0n` to its real product name from capristones.com). Each Natural Stone entry carries a `gallery` array — `[heroFromClientPhoto, ...referencePhotosFromLegacySite]` — keyed off filenames in the same `stones` bucket; the additional gallery files follow `<slug>-<n>.jpg`. Quartz reads 25 products from `src/data/quartz.js` via `quartzImageUrl(filename)` against the `quartz` bucket. The home-page hero pulls 2 images from the `hero-section` bucket via `heroImageUrl(filename)` (also in `src/lib/supabase.js`) — same publishable-key pattern as the other helpers, with a local `/public/hero/` fallback used both when the env var is missing AND when the bucket 404s a filename (img `onError`). The home-page collection cards (Natural Stone, Quartz) read lifestyle imagery directly from `/public/collections/` — these are bundled with the app and not Supabase-backed; swap files or filenames in `src/pages/HomePage.jsx`'s `productCategories` array. `ProductDetailPage` looks up products by `String(p.id) === id` so slug ids resolve directly from the URL param. There is no state management layer and no Supabase tables are read — only Storage. Supabase is wired up — `src/lib/supabase.js` exports a shared `supabase` client built from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). The credentials live in `.env.local` (gitignored via `*.local`). Use **publishable** keys only in this Vite frontend — never the `service_role` / secret key, since `VITE_*` env vars are bundled into the browser build.

**Visual-test mask exception** (added 2026-05-06): `tests/visual.spec.js` masks every `<img>` to keep snapshots stable across image-load flakiness — *except* hero-carousel slides (selector `img:not(.hero-slide-img)`). Those imgs ARE the design and they're bundled locally in `/public/hero/`, so they're deterministic enough to include in the snapshot. Any new img-driven hero or marquee should adopt the same `hero-slide-img` (or analogous) opt-out class so the visual test still validates the design.
