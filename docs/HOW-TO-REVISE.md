# How to revise the design

Concrete recipes for common client-feedback scenarios. Every recipe ends with running the visual regression tests and updating the changelog.

Most revisions listed here are single-line or small diffs. The site was built with a token-first architecture specifically so that feedback rounds don't require touching every page.

## The standard flow for every revision

1. Make the change (recipes below).
2. `npm run build` — confirm no class-name typos broke Tailwind.
3. `npm run test:visual` — will fail where your intentional change landed; visually inspect the diff to confirm the result looks right (Playwright puts diff images in `test-results/`).
4. `npm run test:visual:update` — accept the new look as the baseline.
5. `git add` the code change AND the updated baseline PNGs.
6. Update `PROGRESS.md` — add a dated entry to the revision log.
7. Update or add to `docs/changelog/` if the change is client-facing enough to warrant a changelog entry (small tweaks usually don't; palette shifts always do).
8. Commit with a descriptive message.

---

## Recipe 1 — Change the terracotta shade

**When you'd do this:** client says *"the orange is too red / too brown / too bright / too dark"*.

**Where to edit:** `tailwind.config.js`, line ~16.

```js
// Current:
accent: {
  DEFAULT: '#B8431E',   // ← change this
  warm: '#E07A3C',
  veil: '#FBEBDD',
},
```

**Also update** `src/index.css` line ~32 (the `::selection` colour) to the same hex — these two must stay in sync:

```css
::selection {
  background-color: #B8431E;   /* ← match accent.DEFAULT */
  color: #FFFFFF;
}
```

**Contrast constraint:** the new hex must clear **4.5:1 against `#FAFAF9`** (the page background) so body-sized text (prices, small icons) remains AA-legible. Use a contrast checker like [WebAIM](https://webaim.org/resources/contrastchecker/) before committing.

**Common destinations:**
- Browner: `#9A3A1A`
- Redder: `#C4361A`
- Brighter: `#D14E1F`
- Lighter (risky — may fail contrast): `#E06030`

**Effort:** 5 minutes. Every `text-accent`, `bg-accent`, `border-accent`, `hover:bg-accent` in the codebase picks up the new value automatically. No other file needs editing.

---

## Recipe 2 — Change the warm-sienna accent shade

**When you'd do this:** client says *"the italic word in the hero / page titles should be a different tone"* (it's the lighter orange used on "to Last", "Stone", "Quartz", "Appointment", "Your Project", "Your Space?", and the footer brand).

**Where to edit:** `tailwind.config.js`, the `accent.warm` key.

```js
accent: {
  DEFAULT: '#B8431E',
  warm: '#E07A3C',   // ← change this
  veil: '#FBEBDD',
},
```

**Contrast constraint:** this token is used for **decorative display type only** (24px and larger). It doesn't have to clear 4.5:1 against white. But it DOES need to clear 3:1 against `#1C1917` (the dark footer background) for the "Premium Stones" heading to stay legible.

**Effort:** 5 minutes.

---

## Recipe 3 — Change the peach-cream wash tone

**When you'd do this:** client says *"the CTA section background is too pink / too yellow / too strong / too subtle"*.

**Where to edit:** `tailwind.config.js`, the `accent.veil` key.

```js
accent: {
  DEFAULT: '#B8431E',
  warm: '#E07A3C',
  veil: '#FBEBDD',   // ← change this
},
```

**Common destinations:**
- More peach: `#FBE3D0`
- More yellow: `#FCF1DD`
- Stronger: `#F5D9C2`
- More subtle (nearly invisible): `#FDF3EA`

**Constraint:** must keep at least 12:1 contrast with `#1C1917` body text so copy on the wash stays readable.

**Effort:** 5 minutes.

---

## Recipe 4 — Move a specific heading back to ink-black

**When you'd do this:** client says *"this particular heading shouldn't be orange — make it black like the others"*.

**Where to edit:** the specific page or component file where the heading lives.

**What to change:** replace `text-accent` with `text-surface-dark` in the heading's className. Leave every other class as-is.

Example — if you wanted to revert the "Explore the Finest Materials" H2:

```jsx
// In src/pages/HomePage.jsx, find the H2 and change:
<h2 className="font-display ... text-accent leading-[1.05]">
//                                ^^^^^^^^^^
// to:
<h2 className="font-display ... text-surface-dark leading-[1.05]">
//                                ^^^^^^^^^^^^^^^^
```

**Special case — if the heading has an italic sub-span:** remove `text-accent-warm` from the inner span's className too, so the whole heading reads as ink.

**Effort:** 2 minutes per heading.

---

## Recipe 5 — Move an ink-black heading TO orange

**When you'd do this:** client says *"this heading should be orange too"*.

Check first whether the heading is one of the **deliberate carve-outs** (product-card H3s on Home/NaturalStone/Quartz listings, or the product-name H1 on ProductDetail). Each of those has a comment in the source explaining why it's ink. If the client specifically wants to override the carve-out rule, proceed — but note it in the changelog so the decision is recorded.

**What to change:** add `text-accent` to the heading's className; remove `text-surface-dark` if present.

**Effort:** 2 minutes. But **run visual regression afterwards** — product-card H3s in particular sit next to photography, so the visual impact needs human review before accepting the new baseline.

---

## Recipe 6 — Add the peach-cream wash to another section

**When you'd do this:** client says *"make [some other] section feel softer / more distinct from the surrounding areas"*. The wash currently exists only on the Home CTA section.

**Where to edit:** the page file containing the section.

**What to change:** find the `<section>` tag wrapping that section. Replace `bg-surface` or `bg-white` on its className with `bg-accent-veil`.

Example — to wash the Appointments "What to Expect" card:

```jsx
// In src/components/AppointmentsPage.jsx:
<div className="border border-stone-200 p-8">
// becomes:
<div className="border border-stone-200 p-8 bg-accent-veil">
```

**Effort:** 2 minutes per section. **Design tip:** don't wash more than one or two sections per page — the whole value of the wash is that it marks a special moment. More washes = more noise.

---

## Recipe 7 — Swap to a different colour family entirely (e.g., "try green instead")

**When you'd do this:** client wants to explore a different direction.

This is bigger than the other recipes — treat it as a new revision round.

**Approach:**
1. Write a short spec in `docs/superpowers/specs/<date>-<name>.md` pinning the three new hexes and the contrast budget.
2. Edit the three values in `tailwind.config.js`. Every `text-accent`, `text-accent-warm`, `bg-accent-veil`, `::selection` will auto-update.
3. Run `npm run build` to confirm nothing broke.
4. Run `npm run test:visual` — every page will diff, which is expected.
5. Visually review each diff at the actual site. Pay special attention to:
   - Hero italic word against the dark hero image (does the new colour glow or disappear?)
   - Price numbers on product cards (contrast-check against `#FAFAF9`)
   - Footer "Premium Stones" against `#1C1917` (contrast-check)
   - Small nav underline and bullets (do they read as "a colour" or as "a smudge"?)
6. If the contrast check fails anywhere, adjust the hex until it passes AND looks right.
7. `npm run test:visual:update` to lock in the new baseline.
8. Write a new changelog entry in `docs/changelog/<date>-<name>.md` with before/after screenshots.

**Effort:** 1-2 hours, including visual review and hex-tuning. A good spec up-front cuts iteration.

---

## Recipe 8 — Revert to the previous bronze/gold editorial palette

**When you'd do this:** client says *"let's go back to how it was"*.

**Easy option:** `git revert <range-of-retheme-commits>`. This puts everything back exactly as it was — palette, CTA wash, hero gradient, heading rules. The spec, plan, and changelog docs stay in git history so the round isn't erased.

Specific commit range for the orange/white retheme: `2757000..2cbc78c` (inclusive). See `PROGRESS.md` for the list.

```bash
git revert --no-commit 2757000..2cbc78c
git commit -m "Revert orange/white retheme — see PROGRESS.md for context"
npm run test:visual:update   # baseline the restored look
```

**Effort:** 10 minutes.

---

## Recipe 9 — Add a new page and match the theme

**When you'd do this:** scope expands (e.g., "add a Portfolio page").

Follow the existing page patterns in `src/pages/` and apply these class conventions so the new page matches the rest of the site automatically:

- **Main page H1:** `font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-accent leading-[0.95] tracking-tight mb-8`
- **H1 italic sub-word (if any):** `italic font-normal text-accent-warm`
- **Section H2:** `font-display text-4xl sm:text-5xl font-bold text-accent`
- **Structural H3 (for cards, sidebars, forms):** `font-display text-2xl font-bold text-accent`
- **Product-name or content-name H3 (inside a product card):** `font-display text-2xl font-bold text-surface-dark group-hover:text-accent` + add this comment above: `{/* Product names stay ink — orange here would compete with the product photography. */}`
- **Body:** `font-body text-base text-stone-500` or `text-stone-600`
- **Eyebrow label:** `<p className="label-text mb-4">YOUR LABEL</p>`

After building the new page, add a test case to `tests/visual.spec.js`:

```js
{ name: 'portfolio-hero', path: '/#/portfolio', scroll: 0 },
```

Then `npm run test:visual:update` to create its baseline.

**Effort:** depends on page complexity — maybe 1-3 hours for a new listing page following existing patterns.

---

## Fallback — if you want something none of these cover

Describe what you want in plain language. A design spec will be written, concrete options will be proposed, you'll choose one, and it will be implemented, tested, and changelogged. The brainstorming → spec → plan → implementation workflow documented in `docs/superpowers/` is how every previous revision round on this project was handled.
