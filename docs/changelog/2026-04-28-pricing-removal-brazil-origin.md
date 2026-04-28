# 2026-04-28 — Pricing removed, all stone origins set to Brazil

Two client-requested changes that touch every product page.

## What changed

### Pricing is no longer shown on the website

Every product card on the four collection pages (Natural Stone, Quartz, Shower Panels, Cabinets) used to show a price like "$89/sq ft" in terracotta type at the top of the card. That price has been replaced with a small **"BY INQUIRY"** eyebrow label in the same slot.

The three product detail pages (Natural Stone / Quartz, Shower Panels, Cabinets) used to show a large terracotta price plus a price range below the product name. That block has been replaced with a refined **"PRICING ON REQUEST"** line followed by *"Contact us for a personalized quote."*

The intent behind the new treatment: signal that pricing is consultation-driven (a luxury-market convention) rather than leave a visible hole where the price used to be.

### All natural-stone origins now read "Brazil"

The Natural Stone collection previously labeled stones with origins like Italy, India, and Spain. Every product is now labeled **Brazil** — both in the small badge that sits on the card image and in the Origin field on the detail page. The detail-page prose has been rewritten so it no longer references "the famous Carrara region in Italy"; it now references "premium Brazilian quarries".

The product names themselves (Carrara Marble, Calacatta Marble Panel, etc.) are unchanged — those are industry-standard stylistic terms that describe the visual look, not the literal source.

### The origin filter dropdown was removed from Natural Stone

The Natural Stone collection page used to have four filter dropdowns: Type, Color, Finish, Origin. Since every stone is now from Brazil, the origin filter became a no-op control with only one meaningful value, so it was removed. The page now has three filter dropdowns: Type, Color, Finish.

## What did not change

- **Product names** (Carrara Marble, Emperador Dark, etc.) — kept; these describe the look, not the source.
- **The "BRAZIL" badge** on each card image — kept. Even though it's now uniform, it gives each card a sense of place.
- **Card layout, photography, and the spec grid on detail pages** — untouched.
- **Quartz / Cabinets / Shower Panels detail pages** — they don't display origin, so only their pricing changed.
- **Home, Appointments, and Contact pages** — untouched.

## Before / after

(Screenshots to be added when the work is committed. Place in `docs/changelog/assets/2026-04-28-pricing-removal-brazil-origin/` and embed below.)

- Before: Natural Stone card with terracotta price like "$89/sq ft" upper right
- After: same card with quiet "BY INQUIRY" eyebrow upper right
- Before: Detail page with large "$89/sq ft" + "Range: $80-100" under the H1
- After: Detail page with "PRICING ON REQUEST" eyebrow + "Contact us for a personalized quote." under the H1
- Before: Natural Stone filter row with 4 dropdowns including All Origins
- After: Natural Stone filter row with 3 dropdowns (no origin)
- Before: Natural Stone cards with mixed origin badges (ITALY, INDIA, SPAIN)
- After: All Natural Stone cards show BRAZIL badge

## Source

- Spec: [`docs/superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md`](../superpowers/specs/2026-04-28-pricing-removal-and-brazil-origin-design.md)
- Plan: [`docs/superpowers/plans/2026-04-28-pricing-removal-and-brazil-origin.md`](../superpowers/plans/2026-04-28-pricing-removal-and-brazil-origin.md)
- How to revise (re-introduce pricing or change the sourcing story): [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md)
