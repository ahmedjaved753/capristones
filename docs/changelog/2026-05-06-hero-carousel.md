# 2026-05-06 — Home-page hero carousel

You asked for the three quarry photos at the top of `capristones.com` to be brought over and turned into an auto-sliding hero on this site. Done — the homepage hero now cycles through the three quarry images every 6 seconds with a slow crossfade. The headline, your eyebrow, the sub-paragraph and the two CTAs stay completely still while the imagery changes underneath.

## What you'll see on the homepage

When you land on `/`, the hero now shows:

- **Slide 1 — The Quarry** (open-pit white-marble quarry, the wide one with the excavator)
- **Slide 2 — The Block** (drilling rig at work in a tiered marble wall)
- **Slide 3 — The Range** (mountain panorama with the marble cliff face on the left)

Each slide holds for 6 seconds, then crossfades to the next over 1.2 seconds. Underneath each active slide there's a very slow, very subtle zoom-in (Ken Burns) — you'll only notice it if you look for it; it's there to keep the imagery feeling alive rather than static.

The headline reads as before:

> **Surfaces Built _to Last_**

It does NOT change between slides — that's deliberate. The slabs are the variation; the words are the constant. This is what makes the hero feel curated rather than like a generic carousel.

At the bottom of the hero there's a small **index strip** in the same editorial style as the rest of the site:

```
01                 02                 03
The Quarry         The Block          The Range
OPEN-PIT · BRAZIL  CUT · EXTRACTION   HIGHLAND · SOURCE
```

The active slide's column is in white; the other two are dimmed. A thin terracotta line under the active column fills left-to-right as the 6 seconds tick down — it's both the navigation marker and the auto-advance timer at the same time. Click any column to jump to that slide. There's a tiny pause / play toggle at the right end if you want to hold on a particular slide.

On mobile the index strip collapses to three short progress bars stacked above the active slide's title — same idea, just sized for a thumb.

## Why this design over a "normal" carousel

A standard 3-dot Bootstrap-style carousel would have looked like every other website. The brief was *editorial*, *gallery-grade*. A few choices that follow from that:

- **Crossfade, not slide.** Sliding implies "next page" — a transactional pattern. Crossfade implies "the same room, different light" — an editorial pattern. Stone is a still subject; horizontal motion fights the material.
- **Stationary headline.** Most carousels rotate the text alongside the image, which gives the user three competing things to read in 18 seconds. Locking the headline lets visitors actually read it once, fully.
- **Asymmetric scrim.** Instead of a uniform dark overlay that would mute every slide equally, the dark wash is anchored only to the lower-left where the headline lives — the right side and top of every photograph stays untouched, so the marble itself reads clearly.
- **The index strip as navigation + caption + timer.** One element does three jobs; a typical carousel uses three separate widgets (dots, captions, a progress bar) and ends up looking busy.

## Where the images live

You named the Supabase bucket `hero-section`. The carousel is wired up to read from that bucket using the filenames `Hero-2-1.jpg`, `Hero-3-1.jpg`, and `Hero-12-1.jpg` (those are the original filenames from your existing site — preserved so nothing has to change once you upload).

Until you upload them, the carousel falls back to local copies in `/public/hero/` so the homepage still works during development. As soon as you upload to the bucket, the Supabase URLs take over automatically — no code change needed at switchover.

If you want to swap one image, change a caption, slow the carousel down, or add a fourth slide, the steps are in [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 20.

## A note on the third image

The third photo (the mountain panorama, "Hero-12-1") was only available at 1000×475 on your existing site's CDN — significantly smaller than the other two (which are 2500×1680). It still looks good at the size it's used, but if you ever have a higher-resolution original of that shot, this is the slot to upgrade. Drop it into the Supabase bucket with the same filename and it'll replace itself.

## A note on the captions

The captions follow the "From Quarry to Home" thread already established in the brand-story section directly below the hero. The meta lines deliberately don't name countries other than Brazil — the site's sourcing story is single-origin Brazil (per the spec round on 2026-04-28), so claiming "Italy" on slide 3 (which COULD be the Italian Apuan Alps, but also COULD be Brazilian highlands) would have created an inconsistency with the rest of the site.

If you'd like to change the captions (e.g., reveal specific quarries, identify slabs, swap to your preferred phrasing), Recipe 20 covers the edit.

## Accessibility

- Each slide carries an `alt` description of what's in the photograph.
- A live region announces the active slide name to screen readers when it changes.
- ←/→ arrow keys step through slides; the pause/play toggle is keyboard-reachable.
- Visitors with "reduce motion" enabled in their OS settings get an instant cut between slides instead of a 1.2s fade, and the Ken Burns zoom is disabled — auto-advance still works because that's a content concern, not a motion one, but they're not subjected to anything that could trigger motion sensitivity.
- Auto-advance pauses while the browser tab is in the background, while the user is hovering the index strip, and any time the visitor toggles pause.

## What did NOT change

- The "Surfaces Built / to Last" headline copy is unchanged.
- The "Premium Natural Stone & Quartz" eyebrow is unchanged.
- The two CTAs ("Visit Our Showroom" and "Explore Collections") are unchanged.
- Everything below the hero — brand story, collections preview, walk-ins CTA, footer — is unchanged.
- Every other page on the site is unchanged.

## Before / after

(Screenshots to be added when committed. Place in `docs/changelog/assets/2026-05-06-hero-carousel/` and embed below.)

- Before: a single static stock image
- After: 3 quarry photographs auto-sliding with editorial chrome

## If you want this changed later

Most edits — swapping an image, editing a caption, slowing the timing, adding/removing a slide — are 2 to 15 minutes. Steps are in [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 20.

## Source

- Edit recipe: [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 20
- Project status: [`PROGRESS.md`](../../PROGRESS.md) (2026-05-06 entry — "Home-page hero carousel")
- Source images (3 JPGs downloaded from `capristones.com`): [`hero-carousel-source/`](../../hero-carousel-source/)
- Local fallback served during development: [`public/hero/`](../../public/hero/)
