# 2026-05-06 — Real contact info wired in (two showrooms, San Rafael + Concord)

The site now displays the **real** business addresses, phone numbers, and hours that the client provided. Up until this round, every contact reference was a placeholder (`(555) 123-4567`, `1234 Stone Avenue, Premium District, CA 90210`, `info@premiumstone.com`). Visitors who tried to call or look up the address would have hit a dead end.

## What the client supplied

> **Capri Stone — San Rafael**
> 1925 Francisco Blvd E #15
> San Rafael, CA 94901
> (415) 686-5392
>
> **Capri Stone — Concord**
> 1379 Franquette Ave
> Concord, CA 94520
> (925) 786-4919
>
> **Hours**
> Monday through Saturday — 9 AM – 5 PM
> Sundays — 10 AM – 4 PM
> No appointment needed.
>
> **Email** — coming soon.

## What changed on the site

### Two showrooms, not one

Three places display the contact block; all three now show **both** locations side-by-side or stacked, with the address and a clickable phone link per location:

| Surface | Before | After |
|---|---|---|
| **Footer "Contact" column** (now relabeled **Visit Us**) | One placeholder address + one phone + one email + a 3-row hours block | Two stacked address+phone blocks (San Rafael, Concord) + a 2-row hours block; email line removed |
| **Contact page — Get in Touch** (`ContactSection.jsx`) | Three separate cards (Phone / Email / Address) plus a Business Hours card | Two showroom cards (each combining map-pin icon + city + address + tel-link) plus a Business Hours card with a "Walk-ins welcome — no appointment needed" footer line |
| **Home — bottom CTA** "Contact Information" card | Three rows (Address / Phone / Email) | Heading changed to **"Two Showrooms"**; two map-pin rows (San Rafael, Concord) each with address + tel-link |
| **Home — bottom CTA** secondary button | "Call (555) 123-4567" | **"Call (415) 686-5392"** (San Rafael — the primary line) |

### Hours updated everywhere

The previous Footer/Contact block read **Mon–Fri 9–6 / Sat 10–4 / Sun Closed**. That predated this round entirely (it was placeholder copy), AND earlier today's appointments-removal round had set Sunday to "Closed". The client's actual schedule is different on every day:

- **Mon–Sat: 9 AM – 5 PM** (Saturday now matches weekday hours instead of being shorter)
- **Sun: 10 AM – 4 PM** (Sunday is OPEN — superseded the "Closed" line set this morning)

Both `Footer.jsx` and `ContactSection.jsx` carry the new hours.

### Email removed (temporarily)

The client said the email address is coming. Until then, no `mailto:` link is wired anywhere on the site — the previous `info@premiumstone.com` references and the `FiMail` icon imports were dropped from `ContactSection.jsx` and `HomePage.jsx`. When the client provides the address, the email card can come back to the Contact page (and a third row to the Footer "Visit Us" column).

### Brand-name inconsistency — left as-is, flagged for the client

The client's message uses **Capri Stone** as the company name for both locations. The site already had a long-standing inconsistency: the **Navigation** wordmark says "Capri Stone" but the **Footer** brand `<h3>` and the Coming Soon page eyebrow say "Premium Stones". This round used "Capri Stone — &lt;city&gt;" everywhere a *location label* was added (matching the client's wording), but did **not** rename the brand wordmark. That's a bigger decision that should come from the client, not from a contact-info round.

## Before / after

(Screenshots will be added when committed. Place in `docs/changelog/assets/2026-05-06-real-contact-info/`.)

- Before — Footer Contact column: `1234 Stone Avenue / Premium District, CA 90210 / (555) 123-4567 / info@premiumstone.com / Mon-Fri 9AM–6PM / Sat 10AM–4PM / Sun Closed`
- After — Footer Visit Us column: `San Rafael — 1925 Francisco Blvd E #15 / San Rafael, CA 94901 / (415) 686-5392` followed by `Concord — 1379 Franquette Ave / Concord, CA 94520 / (925) 786-4919` followed by `Mon–Sat 9AM–5PM / Sun 10AM–4PM`
- Before — Contact page cards: `Phone (555) 123-4567 (Mon-Fri 9AM-6PM)`, `Email info@premiumstone.com`, `Address 1234 Stone Avenue, Premium District, CA 90210`, `Hours Mon–Fri 9–6 / Sat 10–4 / Sun Closed`
- After — Contact page cards: `Capri Stone — San Rafael · 1925 Francisco Blvd E #15 · San Rafael, CA 94901 · (415) 686-5392`, `Capri Stone — Concord · 1379 Franquette Ave · Concord, CA 94520 · (925) 786-4919`, `Hours Mon–Sat 9–5 / Sun 10–4 · Walk-ins welcome — no appointment needed`
- Before — Home CTA: "Visit Our Showroom" + **"Call (555) 123-4567"**, with "Contact Information" card listing Address / Phone / Email
- After — Home CTA: "Visit Our Showroom" + **"Call (415) 686-5392"**, with **"Two Showrooms"** card listing both locations

## If anything needs updating

If a number or address changes, or a third location is added, or the Sunday schedule shifts again, see the new **Recipe 22** in `docs/HOW-TO-REVISE.md`. The same data lives in three places (Footer, ContactSection, HomePage CTA) and the recipe walks through editing all three so they don't drift.

## Source

- Edit recipe (numbers / addresses / hours / new showroom): [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 22
- Project status: [`PROGRESS.md`](../../PROGRESS.md) (2026-05-06 — Real contact info wired in)
