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

## Project Scope (updated 2026-04-16)

Client-confirmed scope for the Premium Stones website. Design direction: sharp, structured, sophisticated, high-end.

**In-scope pages:**
- **Home** (`/`) — hero with premium visuals, headline + CTAs; featured product categories preview (Natural Stone, Quartz); quick links to appointments and contact.
- **Natural Stone listing** (`/natural-stone`) — grid/gallery view with filtering (color, style) and search.
- **Quartz listing** (`/quartz`) — same pattern as Natural Stone.
- **Product detail** (`/natural-stone/:id`, `/quartz/:id`) — shared `ProductDetailPage` with image gallery, specifications, description, care instructions.
- **Appointments / Booking** (`/appointments`) — structured in-page booking form. No floating widgets.
- **Contact** (`/contact`) — phone, email, address, business hours.

Slabs, Tiles, Cabinets, Resources, Portfolio, and Catalog were removed on 2026-04-16 to align with the confirmed scope.

## Architecture

Single-page React app for a premium natural stone & quartz showroom. Uses `HashRouter` (not `BrowserRouter`) for routing — all routes start with `#/`.

**Routing pattern** (`src/App.jsx`): Each product category has a listing page plus a detail page sharing `ProductDetailPage`:
- `/natural-stone`, `/quartz` → category listing
- `/natural-stone/:id`, `/quartz/:id` → `ProductDetailPage` (uses `useLocation` to infer the category for back-nav)

**Pages vs Components**: `src/pages/` are route-level containers; `src/components/` are reusable UI pieces composed inside pages. Some route files wrap same-named components (e.g., `pages/AppointmentsPage.jsx` is a thin shell that imports `components/AppointmentsPage.jsx`; `pages/ContactPage.jsx` wraps `components/ContactSection.jsx`).

**`src/common/SafeIcon.jsx`**: Wrapper around `react-icons/fi` (Feather Icons). Always use this instead of importing icons directly — it falls back gracefully on missing icons. Usage: `<SafeIcon icon={FiArrowRight} />` or `<SafeIcon name="ArrowRight" />`.

**Styling**: Tailwind CSS with custom animations defined in `tailwind.config.js`. Path alias `@` resolves to `src/`.

**Palette** (updated 2026-04-22 — orange/white retheme): three-tier accent system anchored on near-white `surface` (`#FAFAF9`) and near-black `surface-dark` (`#1C1917`). Tokens in `tailwind.config.js`:
- `accent` `#B8431E` (terracotta) — H1/H2/structural H3 main words, prices, bullets, nav underline, icons, badges, `hover:bg-accent` states. AA-legal on white for body-sized text.
- `accent-warm` `#E07A3C` (warm sienna) — decorative only: H1 italic sub-words, hero gradient mid-band, footer brand on dark. Not legible on white below ~24px.
- `accent-veil` `#FBEBDD` (peach-cream) — section-wash backgrounds. Currently used only on home CTA section.

**Heading carve-out** (important — comments in source flag this so it's not "fixed" as an inconsistency): product-name H1 on `ProductDetailPage` and product-card H3s inside product-grid loops on `HomePage`/`NaturalStonePage`/`QuartzPage` intentionally stay `text-surface-dark` (ink). Orange on those would compete with product photography. Full design rule: `docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`.

**Animations**: Framer Motion is used throughout. Standard pattern is `initial={{ opacity: 0, y: 30 }}` + `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` for scroll-triggered animations.

**Data**: All product data is currently hardcoded as mock objects inside each page component. There is no API or state management layer — `@supabase/supabase-js` is installed but not yet wired up.
