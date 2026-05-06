# 2026-05-06 — Appointments removed (walk-in showroom)

Per client direction — *"please remove the appointment request. We're a company where customers can walk in and view the stones without needing an appointment."* — the entire appointments flow has been retired. Visitors can now walk into the showroom during business hours; the site no longer asks them to book.

## What changed

### The Appointments page is gone

- The `/appointments` route was removed from `src/App.jsx`. Anyone who follows an old `#/appointments` link will land on the home page (HashRouter falls through to `/` when no route matches).
- `Appointments` was removed from the top navigation and from the footer's Navigation column.
- The page components (`src/pages/AppointmentsPage.jsx`, `src/components/AppointmentsPage.jsx`) and their visual-regression baselines were deleted.

### Every "Book / Schedule" CTA now reads "Visit Our Showroom"

Eight CTA buttons across the site previously linked to `/appointments`. They now all link to `/contact` and use a consistent label — **Visit Our Showroom**:

| Page | Before | After |
|---|---|---|
| Home — hero | "Book Appointment" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Home — bottom CTA | "Schedule Consultation" → `/appointments` (with "Contact Us" → `/contact` next to it) | "Visit Our Showroom" → `/contact` (with **Call (555) 123-4567** `tel:` link as the secondary action) |
| Home — bottom CTA eyebrow | "BOOK A CONSULTATION" | "WALK-INS WELCOME" |
| Natural Stone listing | "Visit Our Showroom" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Quartz listing | "Schedule Consultation" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Shower Panels listing\* | "Visit Our Showroom" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Cabinets listing\* | "Book Consultation" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Stone / Quartz product detail | "Schedule Consultation" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Shower Panel detail\* | "Schedule Consultation" → `/appointments` | "Visit Our Showroom" → `/contact` |
| Cabinet detail\* | "Book Consultation" → `/appointments` | "Visit Our Showroom" → `/contact` |

\* Shower Panels and Cabinets routes are currently shadowed by the Coming Soon page. The CTA edits are in place for when those routes are restored.

Surrounding paragraph copy was updated wherever it said "book a visit" / "schedule a consultation" — those now read "stop by the showroom" / "walk-ins welcome."

### Sunday hours

`Sunday: By Appointment` was inconsistent with the new walk-in policy, so it was changed to `Sunday: Closed` in both places it appears: the footer's hours block and the Contact page's Business Hours card.

### What did NOT change

- **Contact page** is untouched apart from the Sunday hours line. Phone, email, address, the contact form, the Mon–Sat hours all unchanged.
- **Navigation dropdown** still lists all four collections. Walk-in friendly messaging only affected the conversion CTAs.
- **Pricing & sourcing rules** — still no prices on the site, all stone still sourced from Brazil.

## Before / after

(Screenshots to be added when committed. Place in `docs/changelog/assets/2026-05-06-remove-appointments/` and embed below.)

- Before: `/appointments` → in-page booking form (date/time/service/message) with confirmation state
- After: `/appointments` → falls through to home page (route removed)
- Before: top navigation — Home / Collections / Appointments / Contact
- After: top navigation — Home / Collections / Contact
- Before: home hero — "BOOK APPOINTMENT" + "EXPLORE COLLECTIONS"
- After: home hero — "VISIT OUR SHOWROOM" + "EXPLORE COLLECTIONS"
- Before: home CTA — "Book a Consultation" eyebrow, "Schedule Consultation" + "Contact Us" buttons
- After: home CTA — "Walk-Ins Welcome" eyebrow, "Visit Our Showroom" + "Call (555) 123-4567" buttons
- Before: footer hours — "Sun: By Appointment"
- After: footer hours — "Sun: Closed"

## If the policy changes again

If the client later wants visitors to book again, the work is documented in `docs/HOW-TO-REVISE.md` Recipe 18. The shortest path is to pull the deleted page files from git history and reverse the route / CTA / hours edits listed above.

## Source

- Restore recipe: [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 18
- Project status: [`PROGRESS.md`](../../PROGRESS.md) (2026-05-06 entry)
