# 2026-04-28 — Remove pricing and standardize origin to Brazil

Client request: pricing will not be shown on the website. All natural-stone origins should read "Brazil" since all stone is sourced from Brazil.

## Background

The site currently displays prices on every product card across the four listing pages (Natural Stone, Quartz, Shower Panels, Cabinets) and on every detail page (`ProductDetailPage`, `ShowerPanelDetailPage`, `CabinetDetailPage`). Stone origins on the Natural Stone listing carry a mix of country labels (Italy, India, Spain) and a filter dropdown allows filtering by origin.

The client has decided not to publish pricing publicly — pricing will be quoted on inquiry — and wants a single, accurate sourcing story: every stone is from Brazil.

## Goals

1. Remove every price display and underlying mock `price` / `priceRange` field from listings and detail pages.
2. Replace the price slot on listing cards with a refined "By Inquiry" treatment so the card layout doesn't end up with a visible hole.
3. Replace the price block on detail pages with a "Pricing on Request" treatment that signals consultation-driven sales and supports the existing CTAs (Download Product Sheet, Save, Share, Appointments).
4. Standardize all natural-stone origins to "Brazil" — both in mock data and in any prose that named another country.
5. Remove the now-meaningless origin filter dropdown from the Natural Stone listing (filtering when every value is identical is UI noise).

## Design rationale

### Why "By Inquiry" / "Pricing on Request" instead of nothing or a CTA button?

Three options were weighed:

- **Empty space** — drop the price entirely and let the card breathe. Risk: looks like an unfinished design or a missing field, especially against the right-aligned `font-display 2xl` block the price used to occupy.
- **CTA button** — replace the price with a "Request Quote" button. Risk: introduces a second primary action competing with "View Details" and breaks the existing card pattern (no card has an inline button today).
- **Quiet eyebrow label** — small caps tracking-widest, stone-500. ✅ **Chosen.**

The eyebrow approach is a luxury convention (Hermès, fine art galleries, premium-tile vendors): the absence of a posted price is itself a signal of the price band. Done quietly, it reinforces consultation-driven sales without competing with photography.

### Typography for the eyebrow

Listing cards (replacing `font-display text-2xl font-bold text-accent`):

```
font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500
```

This matches the existing micro-label idiom already used elsewhere on the cards (the type/finish meta row, the Brazil badge, etc.), so it reads as part of the established hierarchy rather than as a new element.

Detail pages (replacing the large `text-accent` price + `text-stone-400` range pair):

```
mt-4 font-body text-xs font-semibold uppercase tracking-widest text-accent
```

followed by:

```
mt-2 font-body text-sm text-stone-500
> "Contact us for a personalized quote."
```

The terracotta on the detail page is intentional — it preserves the "orange moment" that the price block used to provide so the H1 still has visible support below it. On listing cards, the eyebrow stays stone-500 because there are already other terracotta elements competing (hover states, "View Details" arrow); making this one orange too would crowd the card.

### Heading carve-out — unchanged

The existing rule (product-name H1s and product-card H3s stay ink-black so photography keeps visual dominance) is preserved. Only the **comment** on the detail-page Title block is updated, since it previously referenced "the price below is the orange moment" — a justification that no longer applies.

### Origin filter removal

When all four mock products have the same origin value, the dropdown becomes a single-option control whose only behavior is to filter no-ops. Per ui-ux-pro-max heuristics: avoid useless controls; respect content priority; reserve filter UI for fields with meaningful variance. The dropdown is removed; the filter state shape, the filter loop, and the "Clear Filters" reset are all updated to drop the `origin` key.

### Origin badge on cards — kept

The "BRAZIL" badge in the lower-right of each card image is **kept**. Even when uniform, it gives the card a sense of place and reinforces the sourcing story (which is exactly the point of the client's request).

### Prose updates

`ProductDetailPage.jsx` and `ShowerPanelDetailPage.jsx` had longDescription strings explicitly referencing "the famous Carrara region in Italy" and "the finest Carrara quarries". These are updated to "premium Brazilian quarries" so the prose doesn't contradict the Origin spec field. The product **names** (e.g., "Carrara Marble", "Calacatta Marble Panel") are kept — they're industry stylistic terms that describe the look, not the literal source.

## Out of scope

- Changing card or detail-page **layout** beyond the price-replacement edit. The card grid, image aspect ratio, spec block, and CTA row stay as-is.
- Changing the origin **field** on Quartz, Cabinets, or Shower Panels — none of those pages display origin.
- Wiring the "Request a Quote" CTA on detail pages to actually link somewhere new. The existing button row (Download Product Sheet / Save / Share) handles intent capture today; routing to the Appointments page from the detail-page price block is a possible future revision but not part of this scope.

## Risk

Low. All edits are scoped to mock data and presentational classes; no architectural changes, no new dependencies, no routing or state-management changes. Visual regression baselines are updated as the final step so that any future accidental drift in these areas will fail loudly.

## Files affected

| File | What changes |
|---|---|
| `src/pages/NaturalStonePage.jsx` | Drop `price` from 4 mocks; set `origin: 'Brazil'` on all 4; drop `origin` from `filterOptions`, `filters` state, filter loop, label-mapping ternary, and the Clear-Filters reset; replace card price span with "By Inquiry" eyebrow. |
| `src/pages/QuartzPage.jsx` | Drop `price` from 4 mocks; replace card price span with "By Inquiry" eyebrow. |
| `src/pages/CabinetsPage.jsx` | Drop `price` from 4 mocks; replace card price span with "By Inquiry" eyebrow. |
| `src/pages/ShowerPanelsPage.jsx` | Drop `price` from 4 mocks; replace card price span with "By Inquiry" eyebrow. |
| `src/pages/ProductDetailPage.jsx` | Drop `price`, `priceRange`; set `origin: 'Brazil'`; rewrite longDescription to drop Italy/Carrara reference; replace Title & Price block with Title + "Pricing on Request" treatment. |
| `src/pages/CabinetDetailPage.jsx` | Drop `price`, `priceRange`; replace Title & Price block with Title + "Pricing on Request" treatment. |
| `src/pages/ShowerPanelDetailPage.jsx` | Drop `price`, `priceRange`; rewrite longDescription to drop Carrara reference; replace Title & Price block with Title + "Pricing on Request" treatment. |
| `tests/visual.spec.js-snapshots/*.png` | 10 baselines re-generated (the 4 grid screenshots + 6 detail-page screenshots, hero + specs). |
| `CLAUDE.md` | Update the heading carve-out section comment about "the orange moment" since the price block it referenced no longer exists. |
| `PROGRESS.md` | New revision-log entry. |
| `docs/changelog/2026-04-28-pricing-removal-brazil-origin.md` | New client-facing entry. |
| `docs/HOW-TO-REVISE.md` | Add recipe for "re-introduce pricing"; add recipe for "change the single-origin sourcing story". |
