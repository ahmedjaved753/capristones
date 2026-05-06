# 2026-05-06 — Footer brand description replaced with brand-story copy

The footer's brand-block description previously read *"Transforming homes with premium natural stone and engineered quartz surfaces for over 15 years."* That line was placeholder marketing copy that pre-dated the client's brand voice and made an unverifiable claim ("over 15 years"). Replaced with the same two-paragraph "Who We Are" copy the client supplied for the home brand-story section, so the footer now speaks in the same voice as the rest of the site.

## What changed

Single edit, single file: `src/components/Footer.jsx` brand column (the column with the logo, "Premium Stones" wordmark, and social icons). The old single placeholder paragraph was replaced with the two paragraphs of client copy:

> At Capri Stone, innovation, creativity, and sustainability guide everything we do — delivering excellence from the quarry to your home.
>
> We import premium natural stone, quartz, and kitchen cabinetry, offering carefully curated materials to elevate both residential and commercial spaces with timeless beauty and quality.

Same `font-body text-sm text-stone-400 leading-relaxed max-w-xs` styling as before, split across two `<p>` tags with `mb-4` between them so the rhythm matches the other columns.

The same copy already appears verbatim on the home page in the "Who We Are / From Quarry to Home" section. Keeping the two surfaces in lockstep is intentional — when the client edits one, both should change. See `HOW-TO-REVISE.md` Recipe 19 for the edit recipe (now updated to mention the footer mirror).

## Visual-test impact

4 baselines regenerated: `cabinets-grid`, `shower-panels-grid`, `cabinet-detail-specs`, `shower-panel-detail-specs`. These are the shadowed Coming Soon routes whose pages are short enough that the footer enters the viewport at scroll 700–800. The other 15 baselines were unchanged because their snapshot regions don't include the footer. Build + 19/19 visual tests pass.

## Source

- Edit recipe: [`docs/HOW-TO-REVISE.md`](../HOW-TO-REVISE.md) Recipe 19
- Project status: [`PROGRESS.md`](../../PROGRESS.md) (2026-05-06 — Footer brand-story copy)
