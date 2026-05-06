# Home collection cards — lifestyle imagery (bathroom + kitchen)

**Date:** 2026-05-06

## What changed

The two preview cards in the **Our Collections** section on the home page (Natural Stone, Quartz) were re-shot from raw slab close-ups to lifestyle photography that shows each material installed in a finished space:

- **Natural Stone card:** a luxurious bathroom clad in dramatic Calacatta-style marble — bold gold-and-grey veining on walls, vanity, and floors. Communicates the organic, varied character of natural stone.
- **Quartz card:** a bright modern kitchen with a clean white quartz waterfall island, pendant lights, and white shaker cabinets. Communicates the calm, uniform, engineered surface that defines quartz.

The card layout, captions, hover states, numeral labels, and arrow chrome are unchanged — only the underlying image swapped.

## Why

Direct continuation of the same client direction that drove the hero round earlier today:

> For the homepage, I don't want to immediately show slabs. I'd prefer two elegant visuals…

The hero swap addressed slides 1 and 2; this round addresses the collection-card thumbnails directly underneath. The client also sent a reference image showing a 3-column gallery (TILES / NATURAL STONE / QUARTZ) with lifestyle photography in each card. Both cards now match that reference style, while staying visually distinct from each of the hero slides (the hero kitchen has dark cabinetry with dramatic marble; the quartz card kitchen is bright with a calm uniform island, so they don't read as redundant).

## Where the images came from

Both photos were sourced from Pexels (royalty-free, no attribution required for commercial use):

- Natural Stone — [Pexels #8146211](https://www.pexels.com/photo/modern-bathroom-with-double-vanity-8146211/)
- Quartz — [Pexels #9937448](https://www.pexels.com/photo/pendant-lamps-above-a-kitchen-counter-9937448/)

If real photography from showroom-installed customer projects becomes available, swap them in via `docs/HOW-TO-REVISE.md` Recipe 21.

## Before / after

- **Before:** the cards rendered two Unsplash slab close-ups (a tilted-slab shot for Natural Stone, a turbulent dark-grey wave-pattern slab for Quartz). See git ref before this commit.
- **After:** see the live home page or scroll to the **Our Collections** section.

## Scope notes

- The card-design itself (aspect-4/3 frame, terracotta-on-hover heading, numeral top-left, arrow-box bottom-right) is unchanged. Only the `src` of the two `<img>` tags swapped.
- Images are bundled locally in `/public/collections/`. Unlike the hero — which falls back to local copies if the Supabase bucket 404s — the collection cards have no Supabase backing path. They're a fixed pair that change once per revision round, so the bucket-swap workflow would be overhead.
- `*.jpg` is gitignored project-wide; the round added `!public/hero/*.jpg` and `!public/collections/*.jpg` carve-outs alongside the existing `!public/logo.png` so all locally-bundled imagery actually deploys past a fresh checkout / CI build. The previous hero round's JPGs (`Hero-kitchen-cristallus.jpg`, `Hero-quartz-feature-wall.jpg`) get committed to git as a side-effect of this fix.
- Visual-test impact: none. `tests/visual.spec.js` masks every `<img>` except `.hero-slide-img`, so the collection-card imagery is not part of the snapshot. All 19 visual tests pass without baseline updates. Manual visual verification was performed by loading the dev server and screenshotting the **Our Collections** viewport.

## Files touched

- `src/pages/HomePage.jsx` — `productCategories[].image` swapped from Unsplash URLs to local `/collections/...` paths.
- `public/collections/Collection-natural-stone-bathroom.jpg`, `public/collections/Collection-quartz-kitchen-island.jpg` — new files (~186 KB and ~287 KB at 2000 px wide).
- `.gitignore` — added `!public/hero/*.jpg` and `!public/collections/*.jpg` carve-outs to the existing `*.jpg` block.
- `CLAUDE.md` — Data section updated to mention the local-bundled collection imagery.
- `PROGRESS.md` — Current state Data bullet updated; new revision-log entry prepended.
- `docs/HOW-TO-REVISE.md` — Recipe 21 added.
