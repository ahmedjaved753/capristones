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

## Recipe 10 — Change the single-origin sourcing story (e.g., add a second country)

**When you'd do this:** client says *"we're now sourcing some stones from Italy too — we need an origin filter back"* or *"actually update everything to Vermont, not Brazil"*.

The site currently treats every Natural Stone product as Brazilian. The origin filter dropdown was removed for this reason (a one-option filter is just noise). If origin variance returns, the filter has to come back too.

**To change the single-origin label** (e.g., Brazil → Vermont):

1. Open `src/pages/NaturalStonePage.jsx`. Find the four product mocks. Change every `origin: 'Brazil'` to the new label.
2. Open `src/pages/ProductDetailPage.jsx`. Change `origin: 'Brazil'` on the mock to the new label.
3. Update the longDescription strings in `ProductDetailPage.jsx` and `ShowerPanelDetailPage.jsx` so any prose mentioning "Brazilian quarries" matches.
4. Standard flow (build, visual regression, update baselines, changelog).

**To re-introduce the origin filter** (multi-country sourcing):

1. In `src/pages/NaturalStonePage.jsx`:
   - Add `origin: 'All'` back to the initial `useState` filter object.
   - Add `origin: ['All', 'Brazil', 'Italy', ...]` back to `filterOptions`.
   - Add `const matchesOrigin = filters.origin === 'All' || stone.origin === filters.origin;` and include `matchesOrigin` in the `return` expression.
   - Add `: filterType === 'origin' && option === 'All' ? 'All Origins'` back into the dropdown label ternary.
   - Update the empty-state Clear-Filters button to reset `origin: 'All'`.
2. Update mock data so each stone gets the appropriate origin label (not all Brazil).
3. Standard flow.

**Effort:** 15-30 minutes including doc updates.

---

## Recipe 11 — Re-introduce pricing on cards or detail pages

**When you'd do this:** client says *"actually let's show prices again — it's costing us inquiries that don't convert"*.

Pricing was removed wholesale on 2026-04-28 (see that round's spec for design rationale). Re-adding it means restoring both the data fields and the presentation classes that were swapped out for "By Inquiry" / "Pricing on Request".

**To restore prices on listing cards** — for each of `NaturalStonePage.jsx`, `QuartzPage.jsx`, `CabinetsPage.jsx`, `ShowerPanelsPage.jsx`:

1. Add `price: '$Xy/sq ft'` (or `'/linear ft'` for cabinets) back to each product mock.
2. Find the "By Inquiry" eyebrow span in the card layout. Replace it with the original price treatment:

```jsx
<span className="font-display text-2xl font-bold text-accent">
  {stone.price}    {/* or product / cabinet / panel — whichever variable the loop uses */}
</span>
```

(Remove the `{/* "By Inquiry" replaces… */}` comment above the span at the same time.)

**To restore prices on detail pages** — for each of `ProductDetailPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelDetailPage.jsx`:

1. Add `price: '$Xy/sq ft'` and `priceRange: '$X-Y'` back to the mock object.
2. Find the Title block (the H1 wrapper containing "Pricing on Request"). Replace the two `<p>` lines under the H1 with the original price + range pair:

```jsx
<div className="flex items-baseline gap-4 mt-4">
  <span className="font-display text-4xl font-bold text-accent">
    {product.price}    {/* or cabinet / panel */}
  </span>
  <span className="font-body text-sm text-stone-400">
    Range: {product.priceRange}
  </span>
</div>
```

3. Update the surrounding comment from "Pricing on request replaces…" back to "price below is the orange moment; making both terracotta flattens hierarchy."

**Then:** run `npm run build`, `npm run test:visual`, accept the new baselines with `npm run test:visual:update`, and write a changelog entry noting the reversal.

**Effort:** 20-30 minutes for the code; another 30 for the changelog if the client wants before/after visuals.

---

## Recipe 12 — Shadow a route with Coming Soon (or restore a shadowed route)

**When you'd do this:** client says *"hide the Cabinets / Shower Panels collection until we're ready"* (shadow), or *"the Shower Panels collection is ready — turn it back on"* (restore).

The site uses a **route-layer shadowing** pattern: a single `ComingSoonPage` component (`src/pages/ComingSoonPage.jsx`) accepts a `category` prop and is wired into `src/App.jsx` for any route that needs to be hidden. The original page components stay on disk untouched, so flipping a category on or off is a 1-line edit per route.

### To SHADOW a category that's currently live (e.g., new client request to hide Quartz)

1. Open `src/App.jsx`. Find the route(s) for that category. Currently for Quartz:

```jsx
<Route path="/quartz" element={<QuartzPage />} />
<Route path="/quartz/:id" element={<ProductDetailPage />} />
```

Change to:

```jsx
{/* Quartz — temporarily shadowed by ComingSoonPage. To restore: swap element back. */}
<Route path="/quartz" element={<ComingSoonPage category="Quartz" />} />
<Route path="/quartz/:id" element={<ComingSoonPage category="Quartz" />} />
```

2. Add a 3-line header comment to the top of the shadowed page file (`src/pages/QuartzPage.jsx`) so the next developer knows the route is overridden:

```js
// Currently SHADOWED: the /quartz route in App.jsx renders <ComingSoonPage category="Quartz" /> instead of this component.
// This file is intentionally preserved so the listing can be restored by editing App.jsx — no need to rebuild it.
// To restore: in App.jsx, swap the /quartz Route element back to <QuartzPage />.
```

3. Standard flow: `npm run build`, `npm run test:visual` (the listing/grid/detail baselines for that category will fail), `npm run test:visual:update`, changelog entry.

**Special case — shadowing Natural Stone:** if you shadow `/natural-stone`, also change the Coming Soon page's primary CTA (`Browse Collections → /natural-stone`) to point somewhere that still exists, otherwise visitors get bounced into a chain of Coming Soon pages.

### To RESTORE a shadowed category (e.g., Cabinets is finally ready)

1. Open `src/App.jsx`. Find the shadowed route(s):

```jsx
{/* Cabinets — temporarily shadowed by ComingSoonPage. ... */}
<Route path="/cabinets" element={<ComingSoonPage category="Cabinets" />} />
<Route path="/cabinets/:id" element={<ComingSoonPage category="Cabinets" />} />
```

Change to:

```jsx
<Route path="/cabinets" element={<CabinetsPage />} />
<Route path="/cabinets/:id" element={<CabinetDetailPage />} />
```

(Remove the inline comments too.)

2. Open the corresponding page file(s) in `src/pages/` and **delete** the 3-line "SHADOWED" header comment.

3. Standard flow: `npm run build`, `npm run test:visual` (the cabinets baselines will fail because they currently snapshot Coming Soon), `npm run test:visual:update`, changelog entry.

**If product data needs refreshing on restore:** see the bottom of this file ("Swapping in real product data for a category"). The mock data in the restored component is whatever was there before shadowing — if the client wants real products, replace the mock array per that recipe.

**Effort:** 5-10 minutes per category, plus baseline regen.

---

## Recipe 13 — Restore the In Stock badge, description prose, or Color spec on detail pages

**When you'd do this:** client says *"actually let's bring back the description"* / *"add In Stock back"* / *"the Color field needs to be there for filterable searches"*.

These three items were removed from every detail page on 2026-04-28. The component JSX and the mock fields were both deleted (no dead code preserved). To bring any of them back, you need to add the field to the mock object AND add the JSX.

### To restore the **In Stock** badge

In each of `ProductDetailPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelDetailPage.jsx`:

1. Add `inStock: true,` back to the mock object (next to `featured: true`).
2. In the badge row (the `<div className="flex items-center gap-3">`), add back the conditional after the material/style chip:

```jsx
{<x>.inStock && (
  <span className="border border-green-300 text-green-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1">
    <SafeIcon icon={FiCheck} className="text-xs" />
    In Stock
  </span>
)}
```

(Replace `<x>` with `product` / `cabinet` / `panel` as appropriate.) `FiCheck` is already imported.

### To restore the **description** block

In each detail page:

1. Add `description: '...'` and `longDescription: '...'` back to the mock object.
2. Above the Quick Specs grid, paste back the divider + description block:

```jsx
<div className="h-px bg-stone-200" />

{/* Description */}
<div>
  <p className="font-body text-base text-stone-600 leading-relaxed mb-4">
    {<x>.description}
  </p>
  <p className="font-body text-sm text-stone-500 leading-relaxed">
    {<x>.longDescription}
  </p>
</div>
```

### To restore the **Color** field in Quick Specs

In each detail page:

1. Add `color: '<value>'` back to the mock object.
2. In the Quick Specs grid array, add `{ label: 'Color', value: <x>.color },` back into the appropriate position.
3. Switch the grid wrapper from `grid-cols-3` back to `grid-cols-2` so the 4 fields lay out 2×2.

### Standard finish

`npm run build`, `npm run test:visual` (the natural-stone detail baselines will fail because they currently snapshot the pruned layout; cabinets/shower-panels detail baselines won't move because those routes are shadowed by Coming Soon), `npm run test:visual:update`, changelog entry.

**Effort:** 5 minutes per item per page; 15 minutes total to restore all three across all three detail pages.

---

## Recipe 14 — Restore the Actions row, Technical Specifications, or Care & Maintenance on detail pages

**When you'd do this:** client says *"add the Download Product Sheet button back — we have PDFs now"* / *"we want spec tables back, with real numbers"* / *"care instructions need to live on the page".*

These were removed wholesale on 2026-04-28 because the underlying data (PDFs, real specs, real care instructions) didn't exist. Restoring them means re-adding the JSX, the mock fields, the icon imports, and (for Save) the React state — and ideally wiring the data to something real, not the old placeholder values.

### To restore the **Actions row** (Download / Save / Share)

In each of `ProductDetailPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelDetailPage.jsx`:

1. Add the icons back to the import: `const { FiArrowLeft, FiDownload, FiHeart, FiShare2 } = FiIcons;`
2. Add `const [isSaved, setIsSaved] = useState(false);` next to the existing `activeImage` state.
3. Below the Quick Specs card (still inside the same `<motion.div>` that wraps the right-column content), paste back the Actions row:

```jsx
{/* Actions */}
<div className="flex gap-3">
  <button className="flex-1 btn-primary flex items-center justify-center gap-3">
    <SafeIcon icon={FiDownload} />
    Download Product Sheet
  </button>
  <button
    onClick={() => setIsSaved(!isSaved)}
    className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 cursor-pointer ${
      isSaved ? 'bg-red-50 border-red-200 text-red-500' : 'border-stone-200 text-stone-400 hover:border-stone-400'
    }`}
  >
    <SafeIcon icon={FiHeart} className={isSaved ? 'fill-current' : ''} />
  </button>
  <button className="w-12 h-12 border border-stone-200 text-stone-400 hover:border-stone-400 flex items-center justify-center transition-colors duration-200 cursor-pointer">
    <SafeIcon icon={FiShare2} />
  </button>
</div>
```

4. **Wire the Download button to a real PDF.** Per-product: drop PDFs into `public/product-sheets/<id>.pdf` and change `<button>` to `<a href={`/product-sheets/${<x>.id}.pdf`} download>`. Without a real download target, the button reads as broken on click — leaving it unwired is what got it removed in the first place.
5. Similarly, decide what Save and Share should do. If they're staying decorative, at least add a tooltip or remove them again.

### To restore **Technical Specifications**

In each detail page:

1. Add the spec data back to the mock object. For natural stone the original shape was:

```jsx
specifications: {
  thickness: '2cm, 3cm',
  density: '2.7 g/cm³',
  absorption: '0.1-0.4%',
  compressiveStrength: '131 MPa',
  flexuralStrength: '15.3 MPa',
  abrasionResistance: 'Excellent',
  frostResistance: 'Good'
},
```

**Use real product data, not the old placeholder values.** The placeholder numbers were the reason this section was removed.

2. Re-introduce a multi-column wrapper for the below-fold area. Replace the current centered Applications block:

```jsx
<motion.div className="mt-24 max-w-2xl mx-auto">  {/* Applications only */}
```

with a 2-column or 3-column grid:

```jsx
<div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">  {/* or lg:grid-cols-3 if Care also returns */}
  {/* Applications motion.div — remove max-w-2xl mx-auto */}
  {/* Specifications motion.div */}
</div>
```

3. Paste the Specifications motion.div:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.4 }}
>
  <h3 className="font-display text-2xl font-bold text-accent mb-6">Technical Specifications</h3>
  <div className="space-y-0">
    {Object.entries(<x>.specifications).map(([key, value]) => (
      <div key={key} className="flex justify-between py-3 border-b border-stone-100">
        <span className="font-body text-sm text-stone-500 capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </span>
        <span className="font-body text-sm font-medium text-surface-dark">{value}</span>
      </div>
    ))}
  </div>
</motion.div>
```

### To restore **Care & Maintenance**

In each detail page:

1. Add the `FiCheck` icon to the import.
2. Add `care: ['...', '...', ...]` back to the mock object — again, with real care instructions, not the boilerplate that was there before.
3. Switch the below-fold wrapper to `lg:grid-cols-3` if both Tech Specs and Care are coming back; remove `max-w-2xl mx-auto` from the Applications block.
4. Paste the Care motion.div:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  <h3 className="font-display text-2xl font-bold text-accent mb-6">Care & Maintenance</h3>
  <div className="space-y-3">
    {<x>.care.map((instruction, index) => (
      <div key={index} className="flex items-start gap-3">
        <SafeIcon icon={FiCheck} className="text-accent mt-0.5 flex-shrink-0 text-sm" />
        <span className="font-body text-sm text-stone-600 leading-relaxed">{instruction}</span>
      </div>
    ))}
  </div>
</motion.div>
```

### Standard finish

`npm run build`, `npm run test:visual` (the natural-stone detail baselines will fail; cabinets/shower-panels detail baselines won't move because those routes are shadowed by Coming Soon), `npm run test:visual:update`, changelog entry. If restoring across multiple detail pages, do one page at a time so you can spot-check the layout before committing all three.

**Effort:** 10-30 minutes per item per page, plus whatever the real data preparation requires.

---

## Recipe 15 — Swap card / gallery imagery on a category page

**When the client wants imagery on a listing or detail page changed** — e.g., "the cabinet photos look like furniture, replace them with quarry shots." The product arrays inline in each page file each carry an `image` field per product (and a `gallery` array on the detail pages); replace the URLs and the rest of the layout, filters, and card chrome adapt automatically.

**File map:**

- `src/pages/NaturalStonePage.jsx` → `naturalStones[].image` (4 cards)
- `src/pages/QuartzPage.jsx` → `quartzProducts[].image` (4 cards)
- `src/pages/ShowerPanelsPage.jsx` → `showerPanels[].image` (4 cards) **— shadowed**
- `src/pages/CabinetsPage.jsx` → `cabinets[].image` (4 cards) **— shadowed**
- `src/pages/ProductDetailPage.jsx` → `product.gallery` (4-image array, used by `/natural-stone/:id` and `/quartz/:id`)
- `src/pages/ShowerPanelDetailPage.jsx` → `panel.gallery` (4-image array) **— shadowed**
- `src/pages/CabinetDetailPage.jsx` → `cabinet.gallery` (4-image array) **— shadowed**
- `src/pages/HomePage.jsx` → `featuredCollections[].image` (2 cards on the home collections preview); the **hero** background lives separately on the `<section style={{ backgroundImage: ... }}` JSX (line ~34) and is NOT in any array.

**Where to source images:**

Existing imagery is hosted on Unsplash via direct CDN URLs of the form `https://images.unsplash.com/photo-{ID}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`. To find new ones:

1. Go to `https://unsplash.com/s/photos/<topic>` (e.g., `marble-quarry`, `granite-quarry`, `stone-quarry`).
2. Open a photo, copy its CDN URL from the page source — the `images.unsplash.com/photo-XXX` form is the free, hot-linkable variant. Skip `plus.unsplash.com/premium_photo-XXX` URLs unless the client has a paid Unsplash subscription.
3. Keep the query string (`?ixlib=...&w=1200&q=80`) consistent with the rest of the codebase so all images come down at the same dimensions and quality.

**Steps:**

1. Open the file in the map above for the page you want to change.
2. Replace each `image:` URL (or each entry in `gallery:`) with a new Unsplash URL. Use 4 distinct photos per page so cards don't visually duplicate.
3. If the page is **shadowed** (Cabinets, Shower Panels, their detail pages), temporarily un-shadow the route in `src/App.jsx` (see Recipe 12) for a browser preview, then revert. Visual tests won't catch image-quality regressions on shadowed routes — the routes render `ComingSoonPage` during testing.
4. `npm run build`. The visual tests **mask all `<img>` elements** (`tests/visual.spec.js` line ~33) so swaps won't fail baselines, but `npm run test:visual` should still be run as a sanity check.
5. The hero background-image on the home page is *not* an `<img>` and *is* visible to visual tests — if you change it, run `npm run test:visual:update` to accept the new `home-hero` baseline.

**Why it's safe:** card / gallery images are pure content. The card template, filter logic, layout, and animation behaviors don't depend on the URL. Only the hero background is part of the visual baseline; everything else is masked out of the screenshot diff.

**Effort:** 5-10 minutes per page, including finding photos that fit the page's aesthetic.

---

## Fallback — if you want something none of these cover

Describe what you want in plain language. A design spec will be written, concrete options will be proposed, you'll choose one, and it will be implemented, tested, and changelogged. The brainstorming → spec → plan → implementation workflow documented in `docs/superpowers/` is how every previous revision round on this project was handled.

---

## Swapping in real product data for a category

The four listing pages each hold their mock product data inline as a single array near the top of the component file. When the client supplies real products for a category, replace the array — no other changes needed.

**File per category:**

- Natural Stone → `src/pages/NaturalStonePage.jsx` (array: `naturalStones`)
- Quartz → `src/pages/QuartzPage.jsx` (array: `quartzProducts`)
- Shower Panels → `src/pages/ShowerPanelsPage.jsx` (array: `showerPanels`)
- Cabinets → `src/pages/CabinetsPage.jsx` (array: `cabinets`)

**Steps:**

1. Open the file, find the product array.
2. Replace each object with real data, keeping the same field names. Filter keys are `type`/`color`/`finish`/`origin` for stone, `brand`/`color`/`pattern`/`finish` for quartz, `material`/`color`/`size`/`finish` for shower panels, `style`/`wood`/`color`/`doorType` for cabinets.
3. The detail pages (`ProductDetailPage.jsx`, `ShowerPanelDetailPage.jsx`, `CabinetDetailPage.jsx`) currently hard-code a single product. Update the object there too if the client wants a specific featured product on the detail route.
4. Run `npm run build`, then `npm run test:visual`. Card images and product-name text will shift — if the shift is intentional, run `npm run test:visual:update` and commit the new baselines.

**Why it's simple:** none of the listing logic (filters, grid layout, card template) cares about the product identities. It just iterates whatever is in the array. Adding a 5th or 10th product works the same way — just push a new object onto the array.
