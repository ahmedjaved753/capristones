# 2026-04-28 — Detail pages: removed In Stock badge, description, and Color

Per client request, three things were removed from every product detail page.

## What changed

### The In Stock badge is gone

Each detail page's top row used to show three chips: **Featured**, the material/style, and a green **✓ In Stock** badge. The In Stock badge has been removed. The row now reads as Featured + material/style only.

### The description prose is gone

Below the product name and "Pricing on Request" line, each detail page used to show two paragraphs of marketing prose (a short blurb, then a longer description with provenance and history). Both paragraphs — and the horizontal divider that separated them from the title — have been removed. The page now goes directly from the title block to the Quick Specs card.

### The Color field is gone from Quick Specs

The Quick Specs card used to show four labeled fields in a 2×2 grid: **Origin**, **Finish**, **Color**, **Material** (or the equivalent for cabinets and shower panels). The **Color** field has been removed. The remaining three fields are now laid out in a clean single row.

The new tone: tighter, more "showroom catalog spec sheet" and less "marketing landing page". Visitors who want to know more can reach out via the Contact page.

## What did NOT change

- **The Pricing on Request line** stays under the H1 (terracotta uppercase + supporting line).
- **The Origin, Finish, Material** specs all stay in the Quick Specs card.
- **The Featured chip and the Material chip** stay in the top row.
- **Listing-page cards** are unchanged. Cards still show their short description text under the product name. (If the client wants similar pruning on cards later, that's a follow-up.)
- **Detail-page actions row** — Download Product Sheet + Save (heart) + Share — unchanged.
- **The Applications, Technical Specifications, and Care & Maintenance sections** below the fold are unchanged.

## Pages affected

- Natural Stone detail (`/natural-stone/<id>`) — visible right now.
- Quartz detail (`/quartz/<id>`) — visible right now (uses the same `ProductDetailPage` component).
- Cabinets detail (`/cabinets/<id>`) — same component-level edit, but the route is currently shadowed by Coming Soon, so visitors don't see it yet. When the route is restored, the pruned layout is what will appear.
- Shower Panels detail (`/shower-panels/<id>`) — same; currently shadowed.

## Before / after

(Screenshots to be added when committed. Place in `docs/changelog/assets/2026-04-28-detail-page-content-pruning/` and embed below.)

- Before: detail page with 3 badges (FEATURED, MARBLE, ✓ IN STOCK), 2 description paragraphs, 2×2 Quick Specs grid including COLOR
- After: detail page with 2 badges (FEATURED, MARBLE), no description, 1×3 Quick Specs grid (ORIGIN, FINISH, MATERIAL)

## Source

- Spec: [`docs/superpowers/specs/2026-04-28-detail-page-content-pruning-design.md`](../superpowers/specs/2026-04-28-detail-page-content-pruning-design.md)
- Plan: [`docs/superpowers/plans/2026-04-28-detail-page-content-pruning.md`](../superpowers/plans/2026-04-28-detail-page-content-pruning.md)
- Restore recipe: [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 13
