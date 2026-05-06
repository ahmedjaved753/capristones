# 2026-05-06 — Footer "Services" column removed

The footer's third column ("Services") listed five offerings — *Natural Stone Surfaces*, *Engineered Quartz*, *Design Consultation*, *Showroom Visit*, *Installation* — as plain text (not links). It was placeholder content that didn't reflect Capri Stone's actual service mix and added visual noise without a click target. Removed entirely.

## What changed

`src/components/Footer.jsx`:

- Deleted the `services` array (5 strings).
- Deleted the `<motion.div>` block that rendered the Services column.
- Collapsed the footer grid from `lg:grid-cols-4` to `lg:grid-cols-3`. Mobile (`grid-cols-1`) and tablet (`md:grid-cols-2`) layouts unchanged.
- The remaining columns — **Brand**, **Navigation**, **Visit Us** — keep their order. The Visit Us column is now the third column instead of the fourth, so its motion delay was bumped from `0.3` to `0.2` to keep the cascade tight.

## Visual-test impact

4 baselines regenerated (force-deleted + re-genned because the layout shift fell within the `maxDiffPixels: 60000` tolerance and `--update-snapshots` doesn't rewrite passing tests): `cabinets-grid`, `shower-panels-grid`, `cabinet-detail-specs`, `shower-panel-detail-specs`. These are the shadowed Coming Soon routes whose pages are short enough that the footer enters the viewport at scroll 700–800. The other 15 baselines were unchanged because their snapshot regions don't include the footer. Build + 19/19 visual tests pass.

## If you want the Services column back

Re-add the `services` array (lines that were near the top of the component) and the `{/* Services */}` `<motion.div>` block (between Navigation and Contact). Bump the grid back to `lg:grid-cols-4` and bump the Visit Us column's motion delay back to `0.3`. Run `npm run test:visual:update` to regenerate the 4 affected baselines.

## Source

- Project status: [`PROGRESS.md`](../../PROGRESS.md) (2026-05-06 — Footer Services column removed)
