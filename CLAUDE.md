# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Lint + production build (outputs to dist/)
npm run lint       # Run ESLint across all files
npm run lint:error # ESLint, errors only (no warnings)
npm run preview    # Preview production build
```

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

**Pages vs Components**: `src/pages/` are route-level containers; `src/components/` are reusable UI pieces composed inside pages. Several pages import same-named components (e.g., `pages/ResourcesPage.jsx` wraps `components/ResourcesPage.jsx`).

**`src/common/SafeIcon.jsx`**: Wrapper around `react-icons/fi` (Feather Icons). Always use this instead of importing icons directly — it falls back gracefully on missing icons. Usage: `<SafeIcon icon={FiArrowRight} />` or `<SafeIcon name="ArrowRight" />`.

**Styling**: Tailwind CSS with custom animations (`fade-in`, `slide-up`, `bounce-gentle`) defined in `tailwind.config.js`. Path alias `@` resolves to `src/`. Brand colors are `amber-500`/`orange-500` gradients on white/gray-50 backgrounds.

**Animations**: Framer Motion is used throughout. Standard pattern is `initial={{ opacity: 0, y: 30 }}` + `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` for scroll-triggered animations.

**Data**: All product data is currently hardcoded as mock objects inside each page component. There is no API or state management layer — `@supabase/supabase-js` is installed but not yet wired up.
