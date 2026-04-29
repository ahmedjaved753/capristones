# 2026-04-29 — Replaced furnished-interior photos with stone-surface imagery

The site previously sold itself with photos of *finished rooms* — leather couches, fitted kitchens, staged bathrooms — that happened to feature stone surfaces. The client wanted that flipped: the photos should foreground the **product** (the stone) rather than the rooms it ends up in. This round replaces 14 image URLs across four pages so every product card now shows the actual material.

## What changed

### Home page — collections preview (2 cards)

- **Natural Stone** card → close-up of dramatic white-and-grey marble veining
- **Quartz** card → close-up of layered grey marble with engineered-looking veining

The hero background was deliberately left unchanged for this round — that's a separate decision the client is still considering.

### Natural Stone listing — 4 product cards

Each card now shows a stone surface that visually represents the named product:

| Product | New imagery |
|---|---|
| Carrara Marble | Close-up of white marble with subtle grey veining |
| Absolute Black Granite | Close-up of black marble/granite with crackle veining |
| Travertine Romano | Warm golden-beige granite (closest free-CDN proxy for travertine warmth) |
| Emperador Dark | Dark stone with cream/gold veining matching the Emperador profile |

### Quartz listing — 4 product cards

| Product | New imagery |
|---|---|
| Pure White | Very clean white surface (engineered look) |
| Midnight Black | Dramatic black marble with cream-white veining |
| Concrete Gray | Grey speckled granite — concrete-like appearance |
| Warm Brown | Warm tan-brown granite with darker speckles |

### Natural Stone detail page — Carrara Marble Classic gallery (4 slots)

Reframed as a story: three close-ups of the marble itself (hero, countertop edge with depth, alternative veining variation) plus one **aerial shot of a marble quarry** in the final slot to honor the "all stone is sourced from Brazil" sourcing narrative without putting it front-and-centre. This replaces the previous gallery, which showed bathrooms and a stock photo of two people with a laptop — neither of which had anything to do with the stone being sold.

## Why this approach

The earlier 2026-04-29 cabinet swap put quarry photos onto the (currently shadowed) cabinet pages. That worked there because cabinets aren't a stone product, so a sourcing-story image carried the page on its own. It would NOT have worked here — putting four near-identical quarry photos across every Natural Stone and Quartz product card would have looked repetitive and wouldn't have told a buyer anything specific about what they're considering. Each product needs an image that *visually represents that product*; quarry imagery is reserved for sourcing-narrative slots (one slot per detail page).

## What did NOT change

- **Home hero background** — leather-couch living room scene; client asked to leave it.
- **Cabinet listing / detail pages** — kept the quarry imagery from the earlier 2026-04-29 swap. Those routes are still shadowed by `ComingSoonPage` so the swap isn't visible on the live site, but the imagery is in place when the routes are restored.
- **Shower Panels** — currently shadowed; placeholder shown.
- **Card layout, copy, filters, anchors, descriptions** — none of these changed. Only the `image:` and `gallery:` URL strings.
- **Visual baselines** — all 20 visual tests pass without updates because `tests/visual.spec.js` masks every `<img>` element by design (`mask: [page.locator('img')]`). Card and gallery images are out of scope of the visual diff.

## Verification

Restarted the dev server, navigated each touched page in Chrome via Playwright (Home / Natural Stone / Quartz / Natural-Stone-detail), screenshotted them. All four pages render the new imagery cleanly: stones that look like what their cards say they are, no more living rooms or kitchens. `npm run build` and `npm run test:visual` both pass.

## Before / after

(Screenshots to be added when this round is committed and reviewed. Place under `docs/changelog/assets/2026-04-29-stone-surface-imagery/` and embed below.)

- Before: home page collections preview showing a bathroom + a sectional-sofa living room
- After: home page collections preview showing two close-up marble surfaces
- Before: Natural Stone listing — 4 cards showing leather couch / kitchen / bathroom / sectional sofa
- After: Natural Stone listing — 4 cards each showing the stone the card names
- Before: Quartz listing — same 4 furnished-interior photos as Natural Stone
- After: Quartz listing — 4 distinct stone-surface photos matching each colour
- Before: Carrara Marble Classic detail page — bathroom hero + 3 thumbnails (one a stock photo of two people)
- After: Carrara Marble Classic detail page — 3 marble close-ups + 1 aerial marble-quarry shot
