# Visual regression tests

Catches unintended visual changes. Takes a screenshot of every page at a known-good state and stores it as a "baseline" PNG. On every subsequent run, re-captures the same screenshots and fails the test if any page looks different than the baseline.

## Why it's here

This site's design has a few deliberate rules that are easy to break by accident — especially the "product-card H3s stay ink-black while all other H3s go terracotta" carve-out. A future edit that "fixes" the apparent inconsistency would pass code review (the class change looks reasonable in isolation) but visibly break the design. Visual regression catches that class of bug automatically.

## How to use it

```bash
npm run test:visual          # Run tests. Fails if anything looks different from the baseline.
npm run test:visual:update   # Accept the current look as the new baseline (run this after an intentional design change).
```

First run: no baselines exist, so Playwright creates them and the first invocation marks the tests as "new" rather than "pass." Subsequent runs compare against those baselines.

## What gets compared

Twelve screenshots across the six routes, at sensible scroll positions:
- Home: hero / collections / CTA
- Natural-stone listing: hero / grid
- Natural-stone product detail: hero / specs
- Quartz listing: hero / grid
- Appointments: hero / form
- Contact: full page

Images (Unsplash photos) are **masked** during comparison so a temporarily-broken image URL or a slow load doesn't cause false failures. The tests focus on layout, heading colours, section backgrounds, button states — the design concerns, not the content concerns.

## Tolerances

- `maxDiffPixels: 200` — up to 200 pixels of difference per screenshot are tolerated before the test fails. Soaks up sub-pixel rendering noise without hiding real design drift.
- `reducedMotion: 'reduce'` — Framer Motion animations are skipped to the final state so the screenshot isn't captured mid-animation.
- `waitForTimeout(1200)` after scroll — gives `whileInView` reveals a chance to settle.

## Caveats

- **OS-dependent**: Playwright's Chromium renders subtly differently on macOS / Linux / Windows (font hinting, sub-pixel anti-aliasing). Baselines generated on one OS will almost always fail on another. If you run tests in CI, generate the baselines inside the same container image that CI uses.
- **Maintenance tax**: every intentional visual change requires running `test:visual:update` to regenerate baselines. Budget a few seconds per design change.
- **Not a substitute for human review**: the tests catch *unintended* change. They can't tell you whether an intentional change is *good*.

## Baseline files

Live in `tests/visual.spec.js-snapshots/`. They are committed to git on purpose — they ARE the source of truth for "what this site should look like." If you change one, review it with the same care you'd review a UI change PR.
