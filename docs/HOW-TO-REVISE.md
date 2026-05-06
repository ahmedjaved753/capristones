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

**When you'd do this:** client says *"the italic word in the hero / page titles should be a different tone"* (it's the lighter orange used on "to Last", "Stone", "Quartz", "Your Project", "Your Space?", and the footer brand).

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

Example — to wash the Contact "Business Hours" card:

```jsx
// In src/components/ContactSection.jsx:
<div className="border border-stone-200 p-6">
// becomes:
<div className="border border-stone-200 p-6 bg-accent-veil">
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

- `src/data/naturalStones.js` → `filenames` array (25 cards). Updated 2026-04-29: Natural Stone images come from filenames in the public `stones` Supabase Storage bucket. To swap an image, upload the replacement to the bucket and either reuse the existing filename (overwrite) or update the filename in the array. To swap the *whole catalog*, see Recipe 16.
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

## Recipe 16 — Add a new stone product to the catalog

**When you'd do this:** the client sends a new natural-stone photo and asks you to add it to the listing.

**Where to edit:** `src/data/naturalStones.js`.

**Steps:**

1. Upload the new image to the public `stones` Supabase Storage bucket via the Supabase dashboard. Note the exact filename (case-sensitive). Recommended formats: JPG or PNG (HEIC won't render in Chrome/Firefox).
2. Open `src/data/naturalStones.js`. Append the new filename to the `filenames` array. The new product's `id`, `name`, `image`, and `gallery` are derived automatically — its `id` is the new array length, its `name` is `Stone NN` (zero-padded).
3. `npm run build` — confirm no syntax errors.
4. `npm run test:visual` — the listing-page baseline will fail because the grid grew. Run `npm run test:visual:update` to accept.
5. Commit the data-file change AND the regenerated baselines together.

**To remove a product:** delete the matching filename from the `filenames` array. The remaining products' IDs will shift down — if any existing bookmarks point at `/natural-stone/15`, those will now resolve to a different product. Acceptable while the catalog is still placeholder; reconsider once real product names are in.

**To override a product's name or applications:** the current `naturalStones.map(...)` derives all fields from the filename only. To customize, refactor the data module to accept per-product overrides — when you do, key the overrides by FILENAME (the stable, content-derived identifier), not by `id` (which is positional and shifts when the array changes).

**Effort:** 2–3 minutes per product.

---

## Recipe 17 — Add or replace a Quartz product

**When you'd do this:** the client sends new quartz photos to add, swap, or rename one of the existing 25.

**Where to edit:** `src/data/quartz.js`.

**Steps:**

1. Upload the new image to the public `quartz` Supabase Storage bucket via the Supabase dashboard. Use a slug-style filename (`<slug>.jpg` or `<slug>.png`); avoid spaces or capitalization. Keep the file under ~2 MB for fast page loads.
2. Open `src/data/quartz.js`. The `products` array near the top is the source of truth — add or edit an entry with these fields:

   ```js
   { slug: 'cathedral-white', file: 'cathedral-white.jpg', name: 'Cathedral White',
     color: 'White', pattern: 'Veined' }
   ```

   - `slug` becomes the URL (e.g., `/quartz/cathedral-white`) and the `id` field on the product object — must be unique across the array.
   - `file` must exactly match the filename in Supabase (case-sensitive).
   - `name` is the H1 / card heading shown to visitors.
   - `color` and `pattern` populate the listing-page filter dropdowns; valid values today are White / Black / Gray for color and Solid / Veined / Speckled for pattern. Add new values to `filterOptions` in `src/pages/QuartzPage.jsx` if you introduce a new color or pattern.

3. The `STANDARD` block in the same file applies brand/finish/thickness/material/origin/rating/description/features/applications uniformly — only edit it if the change is truly site-wide. Per-product overrides live in the `products` array; refactor `STANDARD` into a per-entry merge if real metadata varies.
4. `npm run build` — confirm no syntax errors.
5. `npm run test:visual` — the listing-page baseline will fail because the visible cards changed. Run `npm run test:visual:update` to accept.
6. Commit the data-file change AND the regenerated baselines together.

**To rename a product:** changing `name` is safe and updates the card + detail page H1. Changing `slug` breaks any existing bookmarks pointing at the old slug — do this only when the catalog is still placeholder, or add a redirect.

**To remove a product:** delete its entry from the `products` array. Slugs are stable identifiers (unlike Natural Stone's positional `id`), so removing one doesn't shift any other product's URL.

**Effort:** 2–3 minutes per product.

---

## Recipe 18 — Restore an appointments / booking flow

**When you'd do this:** client reverses the walk-in policy and wants visitors to schedule a visit again. Removed on 2026-05-06; see `docs/changelog/2026-05-06-remove-appointments.md` for what was retired and why.

**Where to edit:**

1. **Restore the page files** — bring back `src/pages/AppointmentsPage.jsx` (thin wrapper) and `src/components/AppointmentsPage.jsx` (the form). Easiest path: `git show <commit-before-removal>:src/components/AppointmentsPage.jsx > src/components/AppointmentsPage.jsx` and the same for the pages file. Either pull from history or have a fresh form built — the original was a structured in-page booking form (name, email, date, service type, message) with a confirmation state.
2. **`src/App.jsx`** — re-import `AppointmentsPage` and add the route back: `<Route path="/appointments" element={<AppointmentsPage />} />`.
3. **`src/components/Navigation.jsx`** — append `{ name: 'Appointments', path: '/appointments' }` to `navLinks` (between Collections and Contact).
4. **`src/components/Footer.jsx`** — add `{ name: 'Appointments', href: '#/appointments' }` to `quickLinks`.
5. **CTAs** — decide which "Visit Our Showroom" buttons should switch back to "Book Appointment" / "Schedule Consultation". The seven affected files are: `HomePage.jsx` (hero + CTA section), `ProductDetailPage.jsx`, `NaturalStonePage.jsx`, `QuartzPage.jsx`, `ShowerPanelsPage.jsx`, `CabinetsPage.jsx`, `ShowerPanelDetailPage.jsx`, `CabinetDetailPage.jsx`. Each currently links primary button to `/contact`; swap target back to `/appointments` and update label as the client wants.
6. **Hours copy** — if Sunday should go back to "By Appointment", edit `src/components/Footer.jsx` (Mon-Fri/Sat/Sun block) and `src/components/ContactSection.jsx` (the `[day, hours]` array).
7. **Visual tests** — re-add `appointments-hero` and `appointments-form` entries to `tests/visual.spec.js`, then `npm run test:visual:update` to regenerate baselines.
8. **Docs** — update `CLAUDE.md` (Project Scope: replace "Walk-in policy" block with an Appointments bullet; Architecture: restore the AppointmentsPage wrapper note), add a `PROGRESS.md` entry, and write a new `docs/changelog/<date>-restore-appointments.md`.

**Effort:** 30–45 minutes if pulling files from git; 2–3 hours if rebuilding the form.

---

## Recipe 19 — Edit, move, or remove the home brand-story section

**When you'd do this:** client tweaks the "From Quarry to Home" copy on the homepage, asks for a different headline, wants the section relocated, or asks for it removed entirely.

**Where it lives:** `src/pages/HomePage.jsx`, the `{/* Brand Story — ... */}` section between the hero and the Product Categories section. Two paragraphs of body copy in a 12-column grid (5-col headline + 7-col copy). **The same two paragraphs are mirrored in `src/components/Footer.jsx`** (brand column, under the "Premium Stones" wordmark) — when you edit the body copy, edit both places so the site speaks with one voice.

**Common edits:**

- **Change the body copy.** Replace the text inside the two `<p className="font-body ...">` elements on `HomePage.jsx`, AND replace the matching pair in `Footer.jsx`'s brand column (same two paragraphs, same wording). Keep them as separate paragraphs — the home spacing comes from the parent `space-y-6`; the footer pair uses `mb-4` between paragraphs and `mb-6` after the second to clear the social-icon row. Don't add a third paragraph without bumping the home grid breathing room (the section is already balanced visually) and re-checking that the footer column still fits within `max-w-xs`.
- **Change the headline.** The H2 has a terracotta first phrase (`From Quarry`) and a warm-sienna italic second phrase (`to Home`). Edit the inner text but keep the wrapper `<span className="italic font-normal text-accent-warm">…</span>` for whichever word(s) should sit in the warm-sienna italic — that's the established editorial pattern (see HOW-TO-REVISE Recipe 2 for the full list of italic words across the site).
- **Change the eyebrow.** The `<p className="label-text mb-4">Who We Are</p>` line. Anything 1–3 words, all-caps via the `label-text` utility.
- **Move the section to a different position on Home.** It's a self-contained `<section>` block; cut it and paste at the new location. If you move it, double-check the `tests/visual.spec.js` scrolls — `home-about` is currently at scroll 750 and `home-collections` / `home-cta` at 1400 / 2300. Adjust those values so each named test still captures the section it claims to.
- **Remove it.** Delete the `{/* Brand Story — ... */}` `<section>` AND the immediately-following `{/* Divider */}` block (the divider was added for this section). Then in `tests/visual.spec.js`, drop the `home-about` route and shift `home-collections` back to ~900 / `home-cta` back to ~2000 (the pre-2026-05-06 values). Run `npm run test:visual:update`.

**Standard flow:** edit → `npm run build` → `npm run test:visual` → if intentional, `npm run test:visual:update` → commit code + baselines together. PROGRESS.md entry only if the change is more than a copy tweak.

**Effort:** 2 minutes for a copy edit, 10 minutes for a move (because of the visual-test scroll updates), 5 minutes for removal.

---

## Recipe 20 — Edit, replace, or reorder hero-carousel slides

**When you'd do this:** client supplies new hero photography, asks for different slide captions, wants the carousel to slow down / speed up, or wants slides re-ordered.

**Where it lives:** the carousel itself is `src/components/HeroCarousel.jsx`. The `SLIDES` array near the top declares the slides (currently 2 — slide 0 is a kitchen with a CRISTALLUS-style natural-stone waterfall island, slide 1 is a quartz/marble feature wall in a living-dining room). Slide files live in either the `hero-section` Supabase Storage bucket (production) or `/public/hero/` (local copy — used both when the env var is missing AND when Supabase 404s a filename, via the `motion.img` `onError` that swaps to `heroImageLocalFallback()` in `src/lib/supabase.js`).

**Common edits:**

- **Replace one image, keeping the filename.** Upload the new file to the `hero-section` Supabase bucket using the same filename that's listed in `SLIDES[i].file`. No code change needed — `heroImageUrl()` will pick up the new bytes on next page load. If you want to replace the local copy too (so the test baseline matches), drop the same file at `public/hero/<filename>`. Then `npm run test:visual:update` to regenerate the `home-hero` baseline.
- **Use a different filename.** Edit the `file` field on the relevant `SLIDES[i]` entry, drop the new file at `public/hero/<newname>`, and update `alt` to describe the new image. The carousel will render from the local copy immediately (the `onError` fallback handles the case where Supabase doesn't have the new filename yet); upload to the bucket later when convenient.
- **Change a caption.** Edit the `title` and/or `meta` field on `SLIDES[i]`. The title renders display-serif; meta renders body-sans uppercase tracking-widest. Keep them short (title 1-3 words, meta 2-4 words) — the index strip is sized for that rhythm. Don't name countries other than Brazil unless the single-origin sourcing story has been retired (see Recipe 10).
- **Re-order slides.** Reorder the `SLIDES` array. Slide 0 is the one that loads first (`fetchpriority="high"`, `loading="eager"`) — keep the lowest-cost / most-representative image in slot 0.
- **Add a 3rd slide.** Append a new entry to `SLIDES`. Layout is robust — the desktop index strip currently uses `grid-cols-[repeat(2,1fr)_auto]`; for 3 slides change to `grid-cols-[repeat(3,1fr)_auto]`. Mobile uses `flex` with no count cap, no edit needed there. The auto-advance, progress bar, and keyboard handlers are count-agnostic.
- **Remove a slide.** Delete its entry from `SLIDES`. Same desktop grid note as above (`repeat(1,1fr)_auto` for 1 slide). With a single slide, consider just inlining a static `<img>` and dropping the carousel altogether.
- **Change the per-slide hold time.** Edit `SLIDE_HOLD_MS` (currently 6000ms). The progress-bar animation uses the same constant, so they stay in sync. Anything below ~3500ms feels jittery (caption barely registers); anything above ~9000ms feels stalled.
- **Change the crossfade duration / easing.** Edit `FADE_MS` (1200ms) and `FADE_EASE` (`[0.22, 1, 0.36, 1]`, expo-out). Both crossfade and the inactive-slide scale-back share these — keeping them aligned is intentional so the outgoing slide's fade-out and zoom-back finish together.
- **Disable Ken Burns (no scale drift).** Replace the `scale: prefersReduced ? 1 : isActive ? 1.06 : 1` line with `scale: 1`. The crossfade keeps working.
- **Disable auto-advance entirely.** In the auto-advance `useEffect`, change the early return condition from `if (isPaused) return` to `return`. The pause/play toggle and ←/→ navigation still work; the slideshow just won't auto-tick.

**Image specs:**

- **Format:** JPEG fine; AVIF/WebP would be smaller but the existing JPGs are <500 KB which is acceptable. Don't use HEIC — Chrome/Firefox don't render it.
- **Aspect:** anything horizontal works; the carousel uses `object-cover` to crop to the section size (`min-h-[calc(100vh+5rem)]`, full-bleed). Mildly squarer (4:3) crops fine too — the section is 1440×980 on desktop. Tall portraits will crop heavily — avoid them.
- **Resolution:** 2000-2500px wide is the sweet spot. Both current slides are 2400px wide.
- **Subject:** the asymmetric scrim is anchored to the lower-left where the H1 sits. Images with a dark / high-contrast lower-left work best (the scrim fades to transparent at the upper-right, so a bright upper-right is fine). If a new slide has a busy lower-left subject, AA contrast on the H1 may fail — deepen the scrim by editing the `radial-gradient` alpha values in `HeroCarousel.jsx` or pick a different image.

**Standard flow:** edit / upload → `npm run build` → `npm run test:visual` → if intentional, `npm run test:visual:update` → commit code + baselines together. Update `PROGRESS.md` if the change is more than a copy tweak.

**Effort:** 2 minutes for a caption edit, 5 minutes to swap a single image (with the local fallback you can ship before uploading to Supabase), 15 minutes to add or remove a slide (because of the grid template + visual-test regeneration).

---

## Recipe 21 — Swap a home collection-card image

**When you'd do this:** client supplies new lifestyle photography for the Natural Stone or Quartz card on the home page, or the existing photo no longer represents the category well.

**Where it lives:** `src/pages/HomePage.jsx`, the `productCategories` array near the top of the component. Each entry has an `image` field that points at a local file in `/public/collections/`. Files are bundled with the app — there is no Supabase fallback for the collection cards (deliberate: only 2 files, swapped once per revision round).

**Common edits:**

- **Replace one image, keeping the filename.** Drop the new file at `public/collections/<existing-filename>.jpg`. No code change — Vite serves the new bytes on next dev/build.
- **Use a different filename.** Drop the new file in `public/collections/`, then update the matching `image` field in the `productCategories` array (e.g., `image: '/collections/<newname>.jpg'`). Old files don't auto-clean — delete the previous one if it's no longer referenced anywhere.
- **Change the description.** Edit the `description` field on the same entry. Body sans, ~10 words max — the line clamps at the card width.

**Image specs:**

- **Format:** JPEG. Don't use HEIC.
- **Aspect:** the card frame is `aspect-[4/3]` with `object-cover`, so anything roughly horizontal crops cleanly. Mildly wider (16:9) is fine; portraits will crop heavily.
- **Resolution:** 1600-2400px wide. Both current images are 2000px wide, ~180-290 KB.
- **Subject:** show the **material installed** in a finished space, not a slab close-up — that was the entire point of the 2026-05-06 swap. Natural Stone reads best as a dramatic, varied surface (marble veining, character); Quartz reads best as a clean, uniform surface (engineered, calm). The card overlay has a subtle dark wash on hover plus a small white-bordered arrow box bottom-right and an `01`/`02` numeral top-left — keep those zones from being dominated by white-on-white or busy-on-busy clashes.

**Image sourcing:** Pexels and Unsplash are both fine (royalty-free for commercial use under their default license — Pexels needs no attribution, Unsplash recommends but doesn't require it). Search terms like `marble bathroom vanity`, `quartz kitchen island`, `marble feature wall` produce strong candidates. Use the highest-quality version available (`?w=2000` query param on Pexels; resolution selector on Unsplash).

**.gitignore note:** `*.jpg` is gitignored site-wide. The carve-outs `!public/hero/*.jpg` and `!public/collections/*.jpg` ensure the bundled imagery actually ships — don't remove them, and add a parallel carve-out if a new image folder is introduced.

**Standard flow:** drop the file → edit `image` field if filename changed → `npm run build` → `npm run test:visual` (passes unchanged because img tags are masked, **but** manually open the page in the browser to verify the new image renders well — the visual test won't catch a wrong-aspect or visually-broken image) → commit. Update `PROGRESS.md` revision log and the relevant entry in `docs/changelog/` for client visibility.

**Effort:** 5 minutes to swap one image with a known good source; 15-30 minutes if you need to find the right photo.

---

## Recipe 22 — Edit phone numbers, addresses, hours, or add/remove a showroom

**When you'd do this:** client opens a third location, closes one, changes a phone number, shifts business hours, or finally supplies the missing email address.

The same contact data is rendered in **three places**, and they don't share a constant — each component holds its own array. If you only update one, the site will silently disagree with itself. The three places:

1. **`src/components/Footer.jsx`** — the "Visit Us" column on every page (footer is rendered globally). Two stacked address+tel blocks + a hours block.
2. **`src/components/ContactSection.jsx`** — the `showrooms` array near the top of the component (used on the `/contact` page). Two map-pin cards + a Business Hours card.
3. **`src/pages/HomePage.jsx`** — the bottom CTA section. Two pieces:
   - The `Call (XXX) XXX-XXXX` outline button (currently uses **San Rafael** as the primary number — `(415) 686-5392`).
   - The "Two Showrooms" card on the right side, populated from a 2-entry inline array.

### To change a phone number

For each of the three files, find the matching number and replace **both** the display string `(415) 686-5392` AND the `tel:` href value `+14156865392` (the second has no spaces, no dashes, no parens). The HomePage CTA button is the only place where the number also appears in plain button label text — don't miss it.

### To change an address

For each of the three files, find the matching address. Footer uses two `<p>` tags; ContactSection uses an `addressLines: ['line1', 'line2']` array; HomePage CTA uses a `\n`-separated `address: 'line1\nline2'` string with `whitespace-pre-line` rendering. Match the format that's already there.

### To change hours

Two files only — Footer.jsx and ContactSection.jsx. Footer has a small two-line block (`Mon — Sat: 9AM — 5PM` / `Sun: 10AM — 4PM`); ContactSection has a `[day, hours]` 2-tuple array inside the Business Hours card. The HomePage CTA section does NOT display hours — it links visitors to the Contact page for that.

If you change Sunday from "10 AM – 4 PM" to "Closed", or vice versa, **also update** the "Walk-in policy" section in `CLAUDE.md` (Project Scope) so future Claude Code sessions don't recommend the wrong story.

### To add a third showroom

1. Append a new entry to the `showrooms` array in `ContactSection.jsx` (`{ name, addressLines, phone, tel }`). The card layout is `space-y-4`, so a third card will stack cleanly without grid edits.
2. Append a new block to the Footer "Visit Us" column. Match the structure of the existing San Rafael / Concord blocks (eyebrow with city name in `text-accent-warm`, two `<p>` lines for address, `<a href="tel:...">` for phone). The Footer column will simply get taller — no grid change needed since the column is one of four that flow vertically on all breakpoints.
3. Append to the inline `[{...}, {...}]` array in `HomePage.jsx`'s "Two Showrooms" card. Each entry is `{ name, address, phone, tel }`. Update the heading from **"Two Showrooms"** to whatever now matches (e.g., **"Three Showrooms"**) and consider whether the CTA button still pointing only at the San Rafael number is right — you may want a dropdown or to change which line is primary.
4. **Update `CLAUDE.md`** Walk-in policy section to list the third location, and **`PROGRESS.md`** Current state similarly.

### To remove a showroom

1. Delete its entry from the `showrooms` array in ContactSection, the matching block in Footer, and the matching entry in HomePage CTA's array.
2. If you're left with **one** showroom, the "Two Showrooms" heading on HomePage stops making sense — change it to "Visit Our Showroom" or similar, and consider folding the array back to the single inline block. The Contact page card layout still works with 1 entry. Footer too.
3. Update CLAUDE.md and PROGRESS.md to drop the removed location.

### To add the email back when the client supplies it

The site currently displays NO email anywhere — the `FiMail` import was dropped from `ContactSection.jsx` and `HomePage.jsx` along with the placeholder `info@premiumstone.com`.

To restore:

1. **ContactSection.jsx** — add `FiMail` back to the destructured `react-icons/fi` import. Below the `showrooms` map (or as a third card alongside the two locations), add an Email card following the same pattern as the showroom cards but with `FiMail` and a `mailto:` link.
2. **Footer.jsx** — add the email line back inside one of the showroom blocks, OR as a separate block above the hours divider. Pattern: `<a href="mailto:...">...</a>` styled like the existing tel link.
3. **HomePage.jsx** — optional. The CTA card was renamed to "Two Showrooms" specifically to focus on locations; adding a contact-method row would dilute that. Consider leaving the home page as-is and surfacing email only on `/contact` and in the footer.

### Standard finish

`npm run build`, `npm run test:visual`. Note that some of the affected views (the `contact` route at scroll 0, and the `home-cta` route at scroll 2300) may produce diffs that fall **under** the 60000-pixel threshold so the test still passes — but the baseline screenshot will be stale. For text-only contact-info edits this is usually fine; the next visual test that does fail will pick up the staleness eventually. To force the baselines to match the new content immediately, **delete the affected baseline PNGs from `tests/visual.spec.js-snapshots/`** and run `npm run test:visual:update` — fresh baselines will be written from scratch.

Footer-affecting edits will additionally cause the four shadowed-route tests (`cabinets-grid`, `shower-panels-grid`, `cabinet-detail-specs`, `shower-panel-detail-specs`) to fail, because at scroll 700–800 those routes scroll past the short Coming Soon section into the footer. `npm run test:visual:update` accepts those baselines as the new look.

Update `PROGRESS.md` revision log and add a `docs/changelog/<date>-<description>.md` entry. Commit code + baselines + docs together.

**Effort:** 5 minutes for a single number / address / hours change; 15-20 minutes to add or remove a showroom because of the three-place edit + the doc updates.

---

## Fallback — if you want something none of these cover

Describe what you want in plain language. A design spec will be written, concrete options will be proposed, you'll choose one, and it will be implemented, tested, and changelogged. The brainstorming → spec → plan → implementation workflow documented in `docs/superpowers/` is how every previous revision round on this project was handled.

---

## Swapping in real product data for a category

When the client supplies real products for a category, replace the data — no other changes needed.

**File per category:**

- Natural Stone → `src/data/naturalStones.js` (data module; 25 placeholder products derived from a `filenames` array). To accept real names/specs, refactor the `.map(...)` to take per-product overrides keyed by **filename** (the only stable identifier; `id` is positional and shifts when entries are added/removed).
- Quartz → `src/data/quartz.js` (data module; 25 real products, slug-keyed). To swap one product or add another, see Recipe 17.
- Shower Panels → `src/pages/ShowerPanelsPage.jsx` (inline array: `showerPanels`, 4 cards) **— shadowed**
- Cabinets → `src/pages/CabinetsPage.jsx` (inline array: `cabinets`, 4 cards) **— shadowed**

Note: Natural Stone moved to a data module on 2026-04-29; Quartz followed on 2026-05-06 (with the `quartz` Supabase bucket). Shower Panels and Cabinets still hold their data inline near the top of the page component — when those routes are restored from Coming Soon, do the same migration.

**Steps:**

1. Open the file (data module for Natural Stone / Quartz, page component for Shower Panels / Cabinets) and find the product array.
2. Replace each object with real data, keeping the same field names. Listing-card filter keys (where they still exist) are `brand`/`color`/`pattern`/`finish` for quartz, `material`/`color`/`size`/`finish` for shower panels, `style`/`wood`/`color`/`doorType` for cabinets. Natural Stone has no filters anymore — when real product types arrive, restore the filter UI in `NaturalStonePage.jsx` along with the data. For quartz, also update `filterOptions` in `QuartzPage.jsx` if you introduce a new color/pattern value not currently listed.
3. `ProductDetailPage.jsx` resolves both Natural Stone (numeric id) and Quartz (slug id) lookups via `String(p.id) === id`. Shower Panel and Cabinet detail pages (currently shadowed) follow the same pattern in their own files. The `fallbackProduct` only fires for stale/malformed URLs and rarely needs editing.
4. Run `npm run build`, then `npm run test:visual`. Card images and product-name text will shift — if the shift is intentional, run `npm run test:visual:update` and commit the new baselines.

**Why it's simple:** the listing logic (grid layout, card template) doesn't care about product identities. It just iterates whatever is in the array. Adding a 5th or 26th product works the same way — push a new entry.
