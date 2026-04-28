# 2026-04-28 — Detail-page Actions row + Tech Specs + Care removal

Client request: remove the Actions row (Download Product Sheet + Save heart + Share) and the two below-fold sections (Technical Specifications, Care & Maintenance) from every product detail page.

## Background

After the earlier 2026-04-28 rounds (pricing removal + Brazil origin, then In-Stock/description/Color pruning), each detail page rendered:

- **Right column (top half):** badge row → Title block → Quick Specs (3-col bordered card) → Actions row (Download / Save / Share)
- **Below the fold:** 3-column grid: Applications | Technical Specifications | Care & Maintenance

This round removes the Actions row and both of those bottom-grid sections. After removal:

- **Right column (top half):** badge row → Title block → Quick Specs. (No Actions row below.)
- **Below the fold:** Applications only.

## Goals

1. Delete the Actions row JSX (and its associated state/imports) from each detail page. The Download button never had a handler; the Save heart only toggled a local `isSaved` state with no persistence; the Share button was inert. With pricing already removed and the site posture leaning toward consultation-driven inquiry, dropping the row is a coherent move.
2. Delete the Technical Specifications and Care & Maintenance JSX from each detail page.
3. Reflow the now-orphaned Applications section: the `lg:grid-cols-3` wrapper that was holding three sibling columns no longer makes sense with one column. Restructure as a single centered block.
4. Delete the now-unused `specifications` and `care` mock-data fields, plus the now-unused icon imports (`FiDownload`, `FiHeart`, `FiShare2`, `FiCheck`) and the `isSaved` / `setIsSaved` state pair.

## Design rationale

### Why the Actions row goes too

Earlier in the day I asked the client what the Download Product Sheet button should do — the answer was effectively "nothing" (it was an unwired placeholder). The Save heart and Share button were also non-functional placeholders. Three dead controls in the most visually prominent action slot of the page would actively erode trust if someone clicks one and nothing happens. Removing them is the right move.

The page's "primary action" now lives in the existing CTA section at the bottom: **"Ready to Use This Material?"** with `Schedule a Consultation` and `Contact Us` buttons. That's the consultation-driven posture established by the earlier "Pricing on Request" round; the Actions row was a leftover from a transactional-commerce template that no longer fits.

### Why drop Tech Specs and Care entirely (not just hide them)

These weren't real product data — they were Lorem-ipsum-style filler from the original scaffold (e.g., the natural-stone Carrara Classic listed `compressiveStrength: '131 MPa'` and `flexuralStrength: '15.3 MPa'`, made up). Showing fake numbers on a high-end showroom site is worse than showing none at all — a knowledgeable visitor (interior designer, contractor) would notice and lose confidence. If the client supplies real spec sheets later, they should arrive as either downloadable PDFs (the Download button could be re-wired to point at them) or a properly populated data layer; reintroducing the fake numbers from the mock isn't useful.

Care instructions had the same problem — generic boilerplate that didn't reflect the specific product. Better to leave it out and route maintenance questions through a sales conversation.

### Why centered max-w-2xl for Applications

Three options were considered for the orphaned Applications section:

- **Drop Applications too** — but the user only circled Tech Specs and Care; Applications is the last bit of below-fold information density. Dropping it leaves the page very thin.
- **Stretch Applications to full container width** — looks visually weak with only 5 short bullet items at full width (~1280px). The line length wastes horizontal real estate and the section reads as "where did the rest of the content go?"
- **Centered, narrowed (`max-w-2xl mx-auto`)** ✅ — gives the block focused presence. The narrower container also visually echoes the centered "Ready to Use This Material?" CTA below it, creating a vertical rhythm: hero (wide split) → focused Applications (narrow centered) → focused CTA (narrow centered). Per ui-ux-pro-max layout heuristics: prefer intentional narrowed measure over edge-to-edge sparse content.

Same H3 styling (`font-display text-2xl font-bold text-accent`), same row treatment (terracotta square bullet + bottom-bordered row), same Framer Motion entrance — it reads as the same component, just relocated.

### Code hygiene — delete the now-orphan fields and imports

CLAUDE.md's anti-pattern note: *"If you are certain that something is unused, you can delete it completely."* On detail-page mocks:

- `specifications: { ... }` — only consumed by the Tech Specs JSX, which is gone. Delete.
- `care: [ ... ]` — only consumed by the Care JSX, which is gone. Delete.

Imports:

- `FiDownload`, `FiHeart`, `FiShare2` — only used by the Actions row. Delete.
- `FiCheck` — only used by the Care list. Delete.

State:

- `isSaved` / `setIsSaved` — only used by the Save heart. Delete.

Bundle drops slightly as a result (CSS 23.17 → 22.69 kB after Tailwind purges the now-unused utility classes; JS shrinks similarly).

## Out of scope

- The CTA section below the detail page ("Ready to Use This Material?" with Schedule / Contact buttons) stays. It's a separate `<section>` from the removed Actions row, and it's the page's actual primary action.
- Listing pages (`NaturalStonePage`, `QuartzPage`, etc.) are unchanged.
- Featured/Material chips, Title block, Pricing on Request line, Quick Specs card all stay.
- The image gallery and thumbnails stay.

## Risk

Low. All edits are removals + a single-block restructuring. No routing, state, or build pipeline changes.

## Files affected

| File | What changes |
|---|---|
| `src/pages/ProductDetailPage.jsx` | Remove `FiDownload, FiHeart, FiShare2, FiCheck` from icon import; remove `isSaved` state; remove `specifications`, `care` from mock; remove Actions row JSX; remove Tech Specs + Care motion divs; rewrite the surrounding `grid-cols-3` Detailed Info wrapper as a centered single-column Applications block. |
| `src/pages/CabinetDetailPage.jsx` | Same edits, scoped to the cabinet mock and `cabinet.applications`. |
| `src/pages/ShowerPanelDetailPage.jsx` | Same edits, scoped to the panel mock and `panel.applications`. |
| `tests/visual.spec.js-snapshots/product-detail-hero-chromium-darwin.png` | Regenerated. |
| `tests/visual.spec.js-snapshots/product-detail-specs-chromium-darwin.png` | Regenerated. |
| `cabinet-detail-*` and `shower-panel-detail-*` baselines | **Not regenerated** — those routes are shadowed by ComingSoonPage; component edits will surface when the routes are restored. |
| `CLAUDE.md` | Update the Detail-page content rules paragraph to reflect the removed sections. |
| `PROGRESS.md` | New revision-log entry. |
| `docs/changelog/2026-04-28-detail-page-actions-and-detail-sections-removal.md` | New client-facing entry. |
| `docs/HOW-TO-REVISE.md` | Add Recipe 14 — restoring the Actions row, Tech Specs, or Care. |
