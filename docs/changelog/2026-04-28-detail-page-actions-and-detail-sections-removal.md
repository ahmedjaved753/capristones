# 2026-04-28 — Detail pages: removed Download/Save/Share + Tech Specs + Care sections

Per client request, three things were removed from every product detail page.

## What changed

### The Action row is gone

The black "**Download Product Sheet**" button (with the heart Save and Share buttons next to it) used to sit below the Quick Specs card on every detail page. All three buttons have been removed. None of them did anything functional — Download had no PDF wired up, Save toggled a session-only state with no persistence, Share had no handler. Removing the row eliminates the "click and nothing happens" trust hit.

The page's primary action is now the existing CTA section at the bottom — *"Ready to Use This Material?"* with **Schedule a Consultation** and **Contact Us** buttons — which routes visitors into the same consultation-driven flow as the rest of the site.

### The Technical Specifications section is gone

The 7-row spec table (Thickness / Density / Absorption / Compressive Strength / Flexural Strength / Abrasion Resistance / Frost Resistance — and the equivalents for cabinets and shower panels) has been removed. The numbers in the mock were placeholder values, not real product data. Showing made-up specs on a showroom-grade site reads worse than showing no specs to a knowledgeable visitor (designer, contractor). When real spec sheets are available, they can come back as downloadable PDFs or as properly populated data.

### The Care & Maintenance section is gone

The bulleted care-instruction list ("Seal regularly with marble sealer", "Clean with pH-neutral stone cleaner", etc.) has been removed. Same reasoning — generic boilerplate that didn't reflect the specific product. Care questions are better handled in a sales conversation.

## What did NOT change

- **The hero layout** — image gallery on the left, badge row + product name + Pricing on Request + Quick Specs card on the right — unchanged.
- **Quick Specs card** — still shows Origin, Finish, Material in a 3-column row.
- **The Applications section** — still present below the hero, but now sits centered in a narrower column (it used to share a 3-column grid with Tech Specs and Care; now that they're gone, it's the only item left and was re-centered to feel intentional rather than orphaned).
- **The "Ready to Use This Material?" CTA section** — unchanged. Still anchors the bottom of every detail page with Schedule / Contact buttons.

## What was simplified under the hood

- The detail-page mock objects no longer carry `specifications` or `care` data — those fields are gone.
- The icon imports that were only used by the removed sections (`FiDownload`, `FiHeart`, `FiShare2`, `FiCheck`) are gone.
- The Save heart toggle's React state (`isSaved` / `setIsSaved`) is gone.
- The CSS bundle dropped a fraction (~0.5 kB) as Tailwind purged utility classes that were only used by the removed sections.

## Pages affected

- Natural Stone detail (`/natural-stone/<id>`) — visible right now.
- Quartz detail (`/quartz/<id>`) — visible right now (same `ProductDetailPage` component).
- Cabinets detail (`/cabinets/<id>`) — same component-level edits, but the route is currently shadowed by Coming Soon.
- Shower Panels detail (`/shower-panels/<id>`) — same; currently shadowed.

## Before / after

(Screenshots to be added when committed. Place in `docs/changelog/assets/2026-04-28-detail-page-actions-and-detail-sections-removal/` and embed below.)

- Before: detail page with Download/Save/Share row below the spec card, plus a 3-column Applications | Technical Specifications | Care & Maintenance grid below the hero
- After: detail page with no action row, and a single centered Applications block below the hero — followed by the existing "Ready to Use This Material?" CTA

## Source

- Spec: [`docs/superpowers/specs/2026-04-28-detail-page-actions-and-detail-sections-removal-design.md`](../superpowers/specs/2026-04-28-detail-page-actions-and-detail-sections-removal-design.md)
- Plan: [`docs/superpowers/plans/2026-04-28-detail-page-actions-and-detail-sections-removal.md`](../superpowers/plans/2026-04-28-detail-page-actions-and-detail-sections-removal.md)
- Restore recipe: [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 14
