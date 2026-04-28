# 2026-04-28 — Cabinets and Shower Panels show "Coming Soon"

These two collections aren't ready for public viewing yet. Until they are, anyone visiting `/cabinets` or `/shower-panels` (or any deep link inside them) will see a Coming Soon page.

## What changed

### A new Coming Soon page

Routes affected: `/cabinets`, `/cabinets/<id>`, `/shower-panels`, `/shower-panels/<id>`. All four now render the same Coming Soon page, parameterized to show the correct collection name.

The page uses the same editorial visual language as the rest of the site:

- A peach-cream washed background that signals an intentional "moment" (the same wash that's used on the home CTA section).
- A two-word headline in the same Cormorant serif used everywhere else — "Coming" in terracotta and "Soon." in the warm-sienna italic style. Same as "Natural / Stone", "Engineered / Quartz", etc., so it reads as part of the family of pages.
- A `PREMIUM STONES · CABINETS` (or `· SHOWER PANELS`) eyebrow that tells the visitor which collection they hit.
- A two-line message: *"Our cabinets collection is being curated to the same standard as the rest of the showroom. In the meantime, explore our available collections or get in touch — we'd love to talk about your project."*
- Two CTAs: **Browse Collections** (primary) routes to Natural Stone; **Contact Us** (secondary) routes to the contact page. Visitors are never dead-ended.

No fake launch date is shown. Claiming a date and missing it would erode trust; leaving the timeline open is the safer choice.

### What did NOT change

- **The original Cabinets and Shower Panels pages and detail components are preserved on disk.** They are not deleted. When the collections are ready, restoring them is a 1-line edit per route in `src/App.jsx`. The product mocks, filters, and detail-page templates stay exactly as they were.
- **Navigation dropdown still lists all 4 collections.** Visitors who tap Cabinets or Shower Panels in the dropdown land on the Coming Soon page; the link itself isn't hidden or grayed out. If you'd like the dropdown items to be removed or marked "Coming Soon", that's a follow-up.
- **Natural Stone and Quartz are unchanged.** Browse them at `/natural-stone` and `/quartz` as before.
- **All other pages** — Home, Appointments, Contact — are untouched.

## Before / after

(Screenshots to be added when committed. Place in `docs/changelog/assets/2026-04-28-coming-soon-shadowing/` and embed below.)

- Before: `/cabinets` → 4-product grid with filters
- After: `/cabinets` → Coming Soon page with PREMIUM STONES · CABINETS eyebrow
- Before: `/shower-panels` → 4-product grid with filters
- After: `/shower-panels` → Coming Soon page with PREMIUM STONES · SHOWER PANELS eyebrow
- After: clicking "BROWSE COLLECTIONS" routes to Natural Stone
- After: clicking "CONTACT US" routes to Contact

## How to bring the pages back

When the client gives the go-ahead, see Recipe 12 in `docs/HOW-TO-REVISE.md` for the 4-line restore.

## Source

- Spec: [`docs/superpowers/specs/2026-04-28-coming-soon-shadowing-design.md`](../superpowers/specs/2026-04-28-coming-soon-shadowing-design.md)
- Plan: [`docs/superpowers/plans/2026-04-28-coming-soon-shadowing.md`](../superpowers/plans/2026-04-28-coming-soon-shadowing.md)
- Restore recipe: [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 12
