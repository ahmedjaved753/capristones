# Orange/White Theme — Design Spec

**Date:** 2026-04-22
**Scope:** Retheme the live site from the current bronze/gold editorial palette to an orange/white palette, with selected headings re-coloured to orange. Preserve the editorial-luxury design concept (layout, typography, animations, component structure) unchanged.

## Goals

- Deliver the "orange/white theme with orange-or-white headers" request without flattening typographic hierarchy.
- Keep the design feeling editorial and high-end — closer to Hermès/Aesop than Home Depot.
- Target ratio: ~15–20 % of any page's visual weight is orange; the rest is neutral. More than that reads commercial; less reads timid.

## Non-goals

- Layout, typography scale, motion, and component boundaries stay unchanged.
- Logo ("PREMIUM | STONES") is a brand mark, not a theme element — untouched.
- The five orphaned pre-revamp files (`HeroSection.jsx`, `AboutUs.jsx`, `ProductGallery.jsx`, `ProductCard.jsx`, `BookingForm.jsx`) are dead code — they carry stale `amber-500/orange-500` classes but are not imported anywhere. Out of scope.
- Semantic colours ("IN STOCK" green badge, focus outlines, scrollbar, section-divider lines) stay neutral.

## Palette

Three sibling tokens in one hue family. Contrast is the gate that keeps usage safe.

| Token | Hex | Contrast on `#FAFAF9` | Allowed for |
|---|---|---|---|
| `accent` | `#B8431E` (terracotta) | 5.54 : 1 ✓ AA | Body-sized text, prices, bullets, icons, badges, hovers, H1/H2 fill |
| `accent-warm` | `#E07A3C` (warm sienna) | 2.89 : 1 — decorative only | Large display italics on dark bg, hero gradient tail, footer brand — never smaller than ~24 px |
| `accent-veil` | `#FBEBDD` (peach-cream) | background only | Optional section washes |

Retained neutrals (unchanged):

| Token | Hex | Role |
|---|---|---|
| `surface.DEFAULT` | `#FAFAF9` | Page background |
| `surface.warm` | `#F5F5F4` | Muted surface |
| `surface.dark` | `#1C1917` | Body text, footer background, primary button fill |

## Heading strategy

Orange becomes the *dominant* heading colour but not the *only* one. Selective application protects hierarchy.

| Element | Current | New | Rationale |
|---|---|---|---|
| Hero H1 main word ("Surfaces Built") on dark image | white | white (unchanged) | Delivers the "white text" half of orange/white |
| Hero H1 italic word ("to Last") | gold `#D4A843` | `accent-warm` `#E07A3C` | Warm sienna on dark = editorial golden-hour glow |
| Page H1 main words on white bg ("Natural", "Book Your", "Let's Start", "Ready to Transform") | ink `#1C1917` | `accent` `#B8431E` | Confident delivery of "orange headers"; Cormorant serif at 60–96 px in terracotta is the luxury-orange move |
| Page H1 italic words on white bg ("Stone", "Appointment", "Your Project", "Your Space?") | inconsistent (sometimes bronze, sometimes ink) | `accent-warm` `#E07A3C` consistently | Normalises the inconsistency. Creates a deliberate two-tone H1: deep terracotta main word + lighter sienna italic word |
| Section H2 ("Explore the Finest Materials") | ink | `accent` `#B8431E` | Matches H1 for continuity across section intros |
| Structural H3s (every non-product H3 — e.g. "Technical Specifications", "Care & Maintenance", "Send Us a Message", "Visit Our Showroom", "Contact Information", "Schedule Your Visit", "Business Hours") | ink | `accent` `#B8431E` | Rule: any H3 that labels a section or card gets terracotta. These are wayfinders, not product names. |
| Product-name H3s (card titles like "Natural Stone", "Carrara Marble"; any H3 inside a product card) | ink, hover → bronze | ink `#1C1917`, hover → `accent` `#B8431E` | Product-name H3s are the explicit exception — stay ink so photography stays the star. |
| Product-detail H1 ("Carrara Marble Classic") | ink | ink `#1C1917` (unchanged) | Product names are dignified wayfinders; the price is the orange moment |
| Footer display ("Premium Stones") on dark bg | ink/white-ish | `accent-warm` `#E07A3C` | Same rule as hero: serif on dark = warm glow. Creates a brand echo between top and bottom of page |
| Body text | `#1C1917` | `#1C1917` (unchanged) | Never orange |
| Labels (uppercase tracked) | `#78716C` stone-500 | unchanged | Functional chrome stays neutral |

## Accent-mark rules

All small/functional accent uses → `accent` `#B8431E` (the deep one):

- Nav active text + 1 px underline
- Price numbers (product cards, product-detail large display)
- Square bullets, inline form-label icons, contact-info icons
- Care-and-maintenance checkmarks
- "Featured" and "Bestseller" badge fills (white text on terracotta)
- Rating stars (filled state)
- Primary-button hover fill
- `::selection` highlight (white text on terracotta)
- Card-title hover transition target
- "VIEW DETAILS →" link hover

## One strategic surface change: the CTA wash

The "Ready to Transform Your Space?" section (home page) currently sits on `#FAFAF9`, making it visually merge with the collections section above. Change its section background to `accent-veil` `#FBEBDD`. Effect: dark CTA button and contact card pop; page gains rhythm. No other section receives the wash in this iteration.

## Strategic surface change #2: the hero gradient

Current hero overlay on the background image is a plain dark gradient. Switch to `from-black/60 via-[#B8431E]/8 to-black/80` — a whisper of terracotta in the mid-band for a subtle golden-hour effect. ~3 % shift; reinforces the palette without being loud.

## What stays unchanged (protects the design)

- Surface neutrals (`#FAFAF9`, `#F5F5F4`, `#1C1917`) — the cool-neutral field is what makes terracotta pop.
- Primary buttons: dark fill + white text + terracotta hover. Terracotta-filled buttons on white would flip to a commercial register.
- Logo mark ("PREMIUM | STONES").
- Section divider lines (`bg-stone-300`) — staying neutral preserves their structural meaning.
- Focus outlines (`#1C1917`) — accessibility.
- Scrollbar colours.
- Green semantic badges ("IN STOCK", etc.).
- Uppercase tracked labels in `stone-500`.
- All layout, spacing, Framer Motion animations, and font-family choices.

## Implementation surface

Only three files carry ~90 % of the diff:

1. **`tailwind.config.js`** — redefine `accent.DEFAULT`, add `accent.warm` and `accent.veil` tokens. Retire `accent.light` and `accent.dark` (dark is unused; light rolls into `accent-warm`).
2. **`src/index.css`** — update `::selection` color from `#A16207` to `#B8431E`.
3. **Page files** — add `text-accent` to H1/H2 main words currently reading `text-surface-dark`; normalise italic spans to `text-accent-warm`; update CTA section bg; update hero overlay gradient; update footer brand colour.

No new dependencies. No new components. No new tokens beyond the three declared.

## Verification plan

After each edit batch, reload all six routes in Playwright at 1440×900:

1. `/` (home)
2. `/#/natural-stone`
3. `/#/natural-stone/1` (detail)
4. `/#/quartz`
5. `/#/appointments`
6. `/#/contact`

Screenshot each at the same scroll positions as the pre-change baseline (`01-`–`09-*.png`) and compare. Flag any heading that looks muddy, any hover that looks weak, any wash that looks tinted-not-intentional. Iterate on hex values before committing.

Additionally: run `npm run build` to confirm no class-name typos break the Tailwind build.

## Contrast budget (pre-verified)

| Foreground | Background | Ratio | AA? |
|---|---|---|---|
| `#B8431E` | `#FAFAF9` | 5.54 : 1 | ✓ normal + large |
| `#B8431E` | `#FBEBDD` | 4.98 : 1 | ✓ normal + large |
| `#FFFFFF` | `#B8431E` | 5.54 : 1 | ✓ normal + large |
| `#E07A3C` | `#1C1917` | 5.29 : 1 | ✓ normal + large |
| `#E07A3C` | `#FAFAF9` | 2.89 : 1 | ✗ decorative only (large display ≥ 24 px OK) |
| `#1C1917` | `#FBEBDD` | 15.6 : 1 | ✓ body text on wash remains legible |

## Risks

1. **Page H1 in terracotta may feel too warm** for users expecting "neutral luxury." Mitigation: single-source hex so we can shift in one edit (e.g. to `#9A3A1A` slightly browner, or `#C44E24` slightly brighter) after visual review.
2. **Two-tone H1 (deep + warm) may look stripy** rather than gradient-like. Mitigation: verify in Playwright after the first page; if stripy, fall back to both words in `accent` (deep only).
3. **The CTA wash may clash with the footer dark bg** sitting directly below it. Mitigation: verify the transition; if harsh, add the section divider line between them (already the current pattern elsewhere).
