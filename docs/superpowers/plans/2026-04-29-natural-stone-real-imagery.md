# Natural Stone — Real Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 4 hardcoded mock natural-stone products with 25 real photos from the public Supabase Storage bucket `stones`, displayed as 25 placeholder-named products on the Natural Stone listing and detail pages.

**Architecture:** Three-layer change. (1) URL helper in `src/lib/supabase.js` builds public URLs from `supabase.storage.from('stones').getPublicUrl(...)`. (2) New `src/data/naturalStones.js` module owns the 25-product array. (3) `NaturalStonePage.jsx` and `ProductDetailPage.jsx` import from the data module; listing page strips search/filters/empty-state and simplifies the card; detail page adds lookup-by-id with a hardcoded fallback for Quartz routes.

**Tech Stack:** React 18, React Router (HashRouter), Tailwind CSS, Framer Motion, `@supabase/supabase-js` (already installed), Playwright (visual regression).

**Spec:** [`docs/superpowers/specs/2026-04-29-natural-stone-real-imagery-design.md`](../specs/2026-04-29-natural-stone-real-imagery-design.md)

**Testing reality:** This codebase has no unit-test framework — only Playwright visual regression (`npm run test:visual`). Each task verifies via `npm run build` (catches typos and broken imports) and a manual browser check on the dev server. Visual baselines for the 4 affected routes get regenerated in Task 5.

---

## Task 1: Add `stoneImageUrl` helper to `src/lib/supabase.js`

**Files:**
- Modify: `src/lib/supabase.js`

- [ ] **Step 1: Add the helper export**

Open `src/lib/supabase.js`. The current file is:

```js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local (see .env.example).'
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
```

Append the helper at the bottom of the file:

```js

export const stoneImageUrl = (filename) =>
  supabase.storage.from('stones').getPublicUrl(filename).data.publicUrl
```

(One blank line before the export so it's separated from the `createClient` line.)

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds with no errors. The helper is unused at this point so the bundler won't complain — it's only an exported function.

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase.js
git commit -m "Add stoneImageUrl helper for Supabase Storage public URLs"
```

---

## Task 2: Create `src/data/naturalStones.js` data module

**Files:**
- Create: `src/data/naturalStones.js`

- [ ] **Step 1: Create the directory if it doesn't exist**

Run: `ls src/data 2>/dev/null || mkdir src/data`

- [ ] **Step 2: Write the data module**

Create `src/data/naturalStones.js` with exactly this content:

```js
import { stoneImageUrl } from '../lib/supabase'

// 25 photos from the public 'stones' bucket. Filenames captured 2026-04-29
// by querying storage.objects WHERE bucket_id = 'stones'.
//
// TODO: convert IMG_1841.heic to JPG/PNG and re-upload, then add as the
// 26th entry below. HEIC won't render in Chrome/Firefox so it's excluded
// for now. See docs/superpowers/specs/2026-04-29-natural-stone-real-imagery-design.md D5.
const filenames = [
  'IMG_1636.PNG', 'IMG_1637.PNG', 'IMG_1642.jpg', 'IMG_1643.PNG', 'IMG_1644.PNG',
  'IMG_1647.PNG', 'IMG_1652.PNG', 'IMG_1654.PNG', 'IMG_1656.PNG', 'IMG_1837.PNG',
  'IMG_1838.jpg', 'IMG_1842.PNG', 'IMG_1844.PNG', 'IMG_1847.PNG', 'IMG_1850.jpg',
  'IMG_1852.PNG', 'IMG_1854.PNG', 'IMG_1856.PNG', 'IMG_1858.PNG', 'IMG_1860.PNG',
  'IMG_1862.jpg', 'IMG_1864.PNG', 'IMG_1867.PNG', 'IMG_1869.PNG', 'IMG_1877.PNG',
]

export const naturalStones = filenames.map((filename, i) => {
  const url = stoneImageUrl(filename)
  return {
    id: i + 1,
    name: `Stone ${String(i + 1).padStart(2, '0')}`,
    image: url,
    origin: 'Brazil',
    material: 'Stone',
    finish: 'Polished',
    applications: ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding'],
    gallery: [url],
  }
})
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds. Module is unused so no error; bundle is unchanged for now.

- [ ] **Step 4: Commit**

```bash
git add src/data/naturalStones.js
git commit -m "Add naturalStones data module with 25 placeholder products"
```

---

## Task 3: Refactor `NaturalStonePage.jsx` — strip search/filters/empty-state, simplify card, import data

**Files:**
- Modify: `src/pages/NaturalStonePage.jsx` (full rewrite)

This task makes the listing page consume the new data module and removes everything that depends on placeholder type/color/finish/description/characteristics. After this task, the page renders 25 simplified cards with lazy-loaded hero images, the "Brazil" origin pill, the placeholder name, "By Inquiry", and "View Details".

**Important:** the data module's product objects do NOT have `type`, `color`, `description`, `characteristics`, or `featured` fields. Any reference to those in the page would render `undefined` or break. The full rewrite below removes every such reference in one commit so the codebase stays in a working state.

- [ ] **Step 1: Replace the file with the rewritten version**

Open `src/pages/NaturalStonePage.jsx` and replace its entire contents with:

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { naturalStones } from '../data/naturalStones';

const { FiGrid, FiList, FiArrowRight } = FiIcons;

const NaturalStonePage = () => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Hero */}
      <section className="py-24 px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="label-text mb-4">Collection</p>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-accent leading-[0.95] tracking-tight mb-8">
              Natural<br />
              <span className="italic font-normal text-accent-warm">Stone</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Discover the timeless beauty of natural stone. Each piece tells a story
              millions of years in the making, bringing unique character to your space.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Count + view toggle */}
      <section className="py-6 px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-end gap-4">
            <span className="font-body text-xs text-stone-500">
              {naturalStones.length} {naturalStones.length === 1 ? 'stone' : 'stones'}
            </span>
            <div className="flex border border-stone-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-surface-dark text-white' : 'text-stone-400 hover:text-surface-dark'
                }`}
              >
                <SafeIcon icon={FiGrid} className="text-sm" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-surface-dark text-white' : 'text-stone-400 hover:text-surface-dark'
                }`}
              >
                <SafeIcon icon={FiList} className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stones Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {naturalStones.map((stone, index) => (
                <motion.div
                  key={stone.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/natural-stone/${stone.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={stone.image}
                          alt={stone.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {stone.origin}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-8 ${viewMode === 'list' ? 'md:w-3/5 flex flex-col justify-between' : ''}`}>
                        <div className="flex justify-between items-start">
                          <h3 className="font-display text-2xl font-bold text-surface-dark group-hover:text-accent transition-colors duration-200">
                            {stone.name}
                          </h3>
                          {/* "By Inquiry" replaces the former price — quiet eyebrow keeps the card photography as hero. */}
                          <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500 mt-2">
                            By Inquiry
                          </span>
                        </div>

                        {/* View Details */}
                        <div className="flex items-center gap-2 mt-6 font-body text-xs font-semibold uppercase tracking-widest text-surface-dark group-hover:text-accent transition-colors duration-200">
                          View Details
                          <SafeIcon icon={FiArrowRight} className="text-sm transition-transform duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="label-text mb-4">Visit Us</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Experience Natural Beauty
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Visit our showroom to see and feel these magnificent natural stones.
              Each piece has its own unique character.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Visit Our Showroom</button>
              </Link>
              <Link to="/contact">
                <button className="btn-outline">Contact Us</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NaturalStonePage;
```

What this removes vs. the previous file:
- Search input section (`Search` motion block + `<input>` + `FiSearch` icon)
- Filter dropdowns section (the three `<select>` elements)
- `filterOptions`, `filters` state, `searchQuery` state, `filteredStones` derivation, `handleFilterChange`
- Inline `naturalStones` array (now imported from `../data/naturalStones`)
- "No stones found" empty state JSX
- `featured` badge JSX on each card
- `type`/`finish` eyebrow row inside each card
- `description` paragraph inside each card
- `characteristics` pill chips inside each card
- `FiSearch` from the destructured icon imports

What this adds vs. the previous file:
- `import { naturalStones } from '../data/naturalStones'`
- `loading="lazy"` on each card `<img>`
- `flex justify-between items-start` directly on the card content row (since there's no longer a nested div for the title/eyebrow group)

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds, lint passes. If lint flags an unused import or unused state variable, re-check the file against the version above.

- [ ] **Step 3: Manual browser smoke test**

Run: `npm run dev`
Open: `http://localhost:5173/#/natural-stone`

Expected:
- 25 cards in a 2-column grid (desktop). Each card shows a hero photo + "Brazil" pill + name like "Stone 01" + "By Inquiry" + "View Details" arrow.
- No search input. No filter dropdowns. The view-mode toggle (grid/list) is in the upper-right of the controls bar.
- Toggling list mode flips cards to horizontal. Toggling back to grid restores the 2-column layout.
- Scrolling shows progressive image loading (network panel: images for cards below the fold should request only as you scroll near them, thanks to `loading="lazy"`).

Stop the dev server (`Ctrl+C`) when done.

- [ ] **Step 4: Commit**

```bash
git add src/pages/NaturalStonePage.jsx
git commit -m "Wire NaturalStonePage to Supabase imagery; strip filters and search"
```

---

## Task 4: Update `ProductDetailPage.jsx` — lookup by id with hardcoded Quartz fallback

**Files:**
- Modify: `src/pages/ProductDetailPage.jsx`

The detail page currently uses a hardcoded `product` object regardless of `:id`. With 25 cards routing here, every click would land on the same "Carrara Marble Classic" page. This task adds a Natural Stone lookup with a fallback that preserves Quartz behavior unchanged.

- [ ] **Step 1: Replace the file with the rewritten version**

Open `src/pages/ProductDetailPage.jsx` and replace its entire contents with:

```jsx
import React, { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { naturalStones } from '../data/naturalStones';

const { FiArrowLeft } = FiIcons;

// Fallback used when (a) route is /quartz/:id, or (b) /natural-stone/:id has
// no matching product in the data module. Preserves the previous hardcoded
// behavior so Quartz and out-of-range IDs don't break.
const fallbackProduct = {
  name: 'Carrara Marble Classic',
  material: 'Marble',
  finish: 'Polished',
  origin: 'Brazil',
  applications: ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding', 'Bathroom Vanities'],
  gallery: [
    'https://images.unsplash.com/photo-1623197532650-bacb8a68914e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540177656454-3f6c4547bed1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1640280882429-204f63d777e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1745985966566-06866a284a4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  ],
  featured: true
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeImage, setActiveImage] = useState(0);

  const categoryPath = location.pathname.startsWith('/quartz') ? '/quartz' : '/natural-stone';
  const categoryLabel = categoryPath === '/quartz' ? 'Quartz' : 'Natural Stone';

  // Look up the product in the data module for /natural-stone routes;
  // fall back to the hardcoded product for /quartz and out-of-range IDs.
  const numericId = parseInt(id, 10);
  const found = categoryPath === '/natural-stone'
    ? naturalStones.find((s) => s.id === numericId)
    : null;
  const product = found ?? { id: numericId, ...fallbackProduct };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-8 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to={categoryPath}>
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-surface-dark transition-colors duration-200 cursor-pointer">
              <SafeIcon icon={FiArrowLeft} className="text-sm" />
              Back to {categoryLabel}
            </span>
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-[4/3] overflow-hidden border border-stone-200">
                <img
                  src={product.gallery[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-3">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square overflow-hidden border cursor-pointer transition-colors duration-200 ${
                        activeImage === index ? 'border-surface-dark' : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-8"
            >
              {/* Badges */}
              <div className="flex items-center gap-3">
                {product.featured && (
                  <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                    Featured
                  </span>
                )}
                <span className="border border-stone-300 text-stone-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                  {product.material}
                </span>
              </div>

              {/* Title */}
              <div>
                {/* Product name stays ink — orange would compete with the product photography. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {product.name}
                </h1>
                {/* "Pricing on request" replaces the former price block — single quiet terracotta line keeps the H1 supported without competing with photography. */}
                <p className="mt-4 font-body text-xs font-semibold uppercase tracking-widest text-accent">
                  Pricing on Request
                </p>
                <p className="mt-2 font-body text-sm text-stone-500">
                  Contact us for a personalized quote.
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-3 gap-6 border border-stone-200 p-6">
                {[
                  { label: 'Origin', value: product.origin },
                  { label: 'Finish', value: product.finish },
                  { label: 'Material', value: product.material }
                ].map((spec) => (
                  <div key={spec.label}>
                    <span className="label-text">{spec.label}</span>
                    <p className="font-body text-sm font-medium text-surface-dark mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* Applications — single centered block now that Tech Specs / Care were removed. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-24 max-w-2xl mx-auto"
          >
            <h3 className="font-display text-2xl font-bold text-accent mb-6">Applications</h3>
            <div className="space-y-2">
              {product.applications.map((application) => (
                <div key={application} className="flex items-center gap-3 py-3 border-b border-stone-100">
                  <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                  <span className="font-body text-sm text-stone-700">{application}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-surface border-t border-stone-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="label-text mb-4">Next Steps</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Ready to Use This Material?
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Our experts can help you calculate quantities, plan installation,
              and ensure the perfect result for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Schedule Consultation</button>
              </Link>
              <Link to={categoryPath}>
                <button className="btn-outline">Browse More {categoryLabel}</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
```

What changed vs. the previous file:
- Added `import { naturalStones } from '../data/naturalStones'`
- Extracted the previous hardcoded product object to a top-level `fallbackProduct` constant
- Computed `product` from `naturalStones.find` on `/natural-stone` routes; fell back to `fallbackProduct` for `/quartz` and unknown IDs
- Wrapped the thumbnail-strip `<div className="grid grid-cols-4 ...">` in `{product.gallery.length > 1 && (...)}` so single-image galleries don't render a 1-thumb-plus-3-empty-cells row
- Everything else (badges, title, Quick Specs, Applications, CTA) is unchanged

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Manual browser smoke test**

Run: `npm run dev`

Hit each of these URLs and confirm:

| URL | Expected |
|---|---|
| `http://localhost:5173/#/natural-stone/3` | H1 reads "Stone 03". Hero image matches the third card on the listing page. No thumbnail strip below the hero (single-image gallery hidden). Quick Specs row shows Origin: Brazil / Finish: Polished / Material: Stone. "Back to Natural Stone" breadcrumb. |
| `http://localhost:5173/#/natural-stone/15` | H1 reads "Stone 15". Different hero image. |
| `http://localhost:5173/#/natural-stone/999` | Falls back to "Carrara Marble Classic" with the original 4-image gallery and thumbnail strip. No crash. |
| `http://localhost:5173/#/quartz/1` | Still renders "Carrara Marble Classic" with the original 4-image gallery and thumbnail strip. "Back to Quartz" breadcrumb. (Out of scope to fix in this round.) |

Stop the dev server when done.

- [ ] **Step 4: Commit**

```bash
git add src/pages/ProductDetailPage.jsx
git commit -m "Look up Natural Stone product by id; preserve Quartz fallback"
```

---

## Task 5: Regenerate visual baselines for the affected routes

**Files:**
- Modify: `tests/visual.spec.js-snapshots/natural-stone-hero-*.png`
- Modify: `tests/visual.spec.js-snapshots/natural-stone-grid-*.png`
- Modify: `tests/visual.spec.js-snapshots/product-detail-hero-*.png`
- Modify: `tests/visual.spec.js-snapshots/product-detail-specs-*.png`

The visual tests mask `<img>` elements (`tests/visual.spec.js` line 33), so image-URL changes don't break baselines — but layout changes (search bar removed, filters removed, simplified card, single-thumb gallery) DO. The 4 baselines listed above will fail; this task accepts the new look as the intended baseline.

- [ ] **Step 1: Run the visual tests to see what fails**

Run: `npm run test:visual`

Expected output: 4 failures on `natural-stone-hero`, `natural-stone-grid`, `product-detail-hero`, `product-detail-specs`. Other routes pass.

If different failures appear, stop and investigate — they may indicate an unintended regression on home/quartz/contact/etc. that needs fixing rather than baseline regeneration.

- [ ] **Step 2: Review the diffs visually**

Open `test-results/` (created by Playwright). Each failed test has a `*-diff.png` showing the pixel-level diff. Confirm by eye that each diff matches the expected change:
- `natural-stone-hero`: search input gone (was below the hero copy).
- `natural-stone-grid`: filter dropdowns gone, simpler cards (no description/eyebrow/characteristics rows).
- `product-detail-hero`: H1 reads "Stone 01" (was "Carrara Marble Classic"), no thumbnail strip below the hero image.
- `product-detail-specs`: same H1 change carrying through; Quick Specs shows Material: Stone / Finish: Polished / Origin: Brazil.

If anything looks wrong (e.g., layout jumped, spacing off, content cut off), **fix the underlying code** instead of accepting the diff.

- [ ] **Step 3: Accept the new baselines**

Run: `npm run test:visual:update`

This regenerates the baseline PNGs in `tests/visual.spec.js-snapshots/`.

- [ ] **Step 4: Confirm the suite passes against the new baselines**

Run: `npm run test:visual`
Expected: all 20 tests pass.

- [ ] **Step 5: Commit**

```bash
git add tests/visual.spec.js-snapshots/
git commit -m "Regenerate visual baselines for natural-stone and detail-page changes"
```

---

## Task 6: Update documentation

**Files:**
- Modify: `CLAUDE.md`
- Modify: `PROGRESS.md`
- Modify: `docs/HOW-TO-REVISE.md`
- Create: `docs/changelog/2026-04-29-natural-stone-real-imagery.md`

- [ ] **Step 1: Update `CLAUDE.md` data-architecture sentence**

Open `CLAUDE.md`. Find the "Data" paragraph (currently around line 100, in the Architecture section, beginning with "All product data is currently hardcoded as mock objects").

Replace this sentence:

```
**Data**: All product data is currently hardcoded as mock objects inside each page component. There is no state management layer. Supabase is wired up — `src/lib/supabase.js` exports a shared `supabase` client built from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). The credentials live in `.env.local` (gitignored via `*.local`). No tables are read yet; the client is ready for the first data integration. Use **publishable** keys only in this Vite frontend — never the `service_role` / secret key, since `VITE_*` env vars are bundled into the browser build.
```

With:

```
**Data**: Product data is hardcoded as mock objects inside each page component, with one exception: Natural Stone reads its 25 products from `src/data/naturalStones.js`, which builds image URLs via `stoneImageUrl(filename)` from `src/lib/supabase.js` against the public `stones` Supabase Storage bucket. There is no state management layer and no Supabase tables are read — only Storage. Supabase is wired up — `src/lib/supabase.js` exports a shared `supabase` client built from `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` (see `.env.example`). The credentials live in `.env.local` (gitignored via `*.local`). Use **publishable** keys only in this Vite frontend — never the `service_role` / secret key, since `VITE_*` env vars are bundled into the browser build.
```

- [ ] **Step 2: Update `PROGRESS.md`**

Open `PROGRESS.md`. Two edits:

**Edit 1** — update the "Data:" bullet under "## Current state (as of 2026-04-29)" (around line 12):

Replace:
```
- **Data:** All product data is mocked in-component. Supabase client is wired up (`src/lib/supabase.js`) using publishable-key auth via Vite env vars; no tables are read yet, but the client is ready for the first data integration.
```

With:
```
- **Data:** Natural Stone reads its 25 products from `src/data/naturalStones.js`, with image URLs served from the public `stones` Supabase Storage bucket. Other categories (Quartz, etc.) still mock in-component. No Supabase tables are read yet — only Storage. Client is wired up (`src/lib/supabase.js`) using publishable-key auth.
```

**Edit 2** — insert a new revision-log entry at the top of the "## Revision log" section, BEFORE the existing "### 2026-04-29 — Stone-surface imagery..." entry. The new entry:

```markdown
### 2026-04-29 — Real natural-stone imagery from Supabase Storage

The 4 hardcoded mock natural-stone products were replaced with 25 real photos served from the public `stones` Supabase Storage bucket the client populated. Names/types/descriptions remain placeholder ("Stone 01" through "Stone 25") because the client hasn't supplied product copy yet — the round is image-only by design. The listing page lost its search input and filter dropdowns (cosmetic-only against placeholder data) and the card content was simplified to image + Brazil pill + name + "By Inquiry" + "View Details". The detail page got a long-overdue fix: it now looks up the product by `:id` from the data module instead of hardcoding "Carrara Marble Classic" for every URL; Quartz and out-of-range IDs fall back to the previous hardcoded behavior so Quartz keeps working without scope creep. New helper `stoneImageUrl(filename)` in `src/lib/supabase.js` builds public URLs via `supabase.storage.from('stones').getPublicUrl(...)`. New module `src/data/naturalStones.js` owns the 25-product array. One photo (`IMG_1841.heic`) is excluded — Chrome/Firefox don't render HEIC; TODO in the data file to convert and re-add as a 26th entry. 4 visual baselines regenerated for natural-stone and detail-page routes; all 20 tests now pass.

- **Spec:** [`docs/superpowers/specs/2026-04-29-natural-stone-real-imagery-design.md`](docs/superpowers/specs/2026-04-29-natural-stone-real-imagery-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-29-natural-stone-real-imagery.md`](docs/superpowers/plans/2026-04-29-natural-stone-real-imagery.md)
- **Client changelog:** [`docs/changelog/2026-04-29-natural-stone-real-imagery.md`](docs/changelog/2026-04-29-natural-stone-real-imagery.md)

```

(Note the trailing blank line — leave it so the next existing entry stays separated.)

- [ ] **Step 3: Add Recipe 16 to `docs/HOW-TO-REVISE.md`**

Open `docs/HOW-TO-REVISE.md`. Find the line `## Fallback — if you want something none of these cover` (around line 591). Insert the new recipe BEFORE that line, after Recipe 15:

```markdown
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

**To override a product's name or applications:** the current `naturalStones.map(...)` derives all fields from the filename only. To customize, refactor the data module to accept per-product overrides (object literals next to filenames). Out of scope for a simple add/remove.

**Effort:** 2–3 minutes per product.

---

```

(Note the trailing `---` separator and blank line.)

- [ ] **Step 4: Create the client changelog**

Create `docs/changelog/2026-04-29-natural-stone-real-imagery.md`:

```markdown
# 2026-04-29 — Real natural-stone imagery wired up

The Natural Stone listing now shows 25 real product photos from the client-supplied collection, served from a public Supabase Storage bucket. The previous 4 placeholder products (Carrara Marble, Absolute Black Granite, Travertine Romano, Emperador Dark) and their stock-photography images are gone. This is the first piece of *real* product content on the site — every other category is still on placeholder data.

## What changed

### Natural Stone listing page (`/natural-stone`)

- 25 product cards, one per photo. Cards are arranged in a 2-column grid (desktop) or single column (mobile); a list-view toggle is still available in the upper-right.
- Card content was simplified to: hero photo, "Brazil" origin pill, name (placeholder, see below), "By Inquiry" eyebrow, "View Details" arrow.
- The search input and filter dropdowns (Type / Color / Finish) were removed. They depended on real product metadata that hasn't been supplied yet — keeping cosmetic-only filters around would be misleading. They'll come back when the client sends real product names and types.

### Natural Stone detail pages (`/natural-stone/:id`)

- Each card now correctly routes to its own detail page. Previously every card landed on the same hardcoded "Carrara Marble Classic" page regardless of which one was clicked — a latent bug that became glaring with 25 cards.
- The detail-page hero shows the same photo as the listing card. The thumbnail strip is hidden when there's only one photo (which is the case for all 25 products at the moment).
- Quick Specs, "Pricing on Request" line, and the "Ready to Use This Material?" CTA section are unchanged.

### Placeholder data (intentional)

The 25 products are named "Stone 01" through "Stone 25". Material is "Stone", finish is "Polished", origin is "Brazil", applications are a generic ["Countertops", "Backsplashes", "Flooring", "Wall Cladding"] list. Once the client provides real product names and specifications, those fields get filled in via a single edit to `src/data/naturalStones.js`.

## Why placeholders, not invented names

We considered three alternatives for the non-image data:
1. Recycle the previous 4 names (Carrara Marble, etc.) cyclically across the 25 products → looks weird with 6–7 cards in a row sharing the same name.
2. Invent 25 plausible-sounding names → risk of fake names going live attached to real photos.
3. Generic placeholders + strip filters and search → honest, doesn't dress up incomplete data.

We picked option 3.

## What did NOT change

- Home page, Quartz listing, Quartz detail page, Appointments, Contact pages — all unchanged.
- Quartz detail page (`/quartz/:id`) still shows the previous hardcoded "Carrara Marble Classic" content because Quartz photos haven't been supplied yet. This is preserved deliberately to keep the round image-only for Natural Stone.
- Pricing & sourcing copy — "By Inquiry" / "Pricing on Request" / "Brazil" continue throughout.

## One known TODO

One photo (`IMG_1841.heic`) is in the Supabase bucket but not rendered. HEIC is an Apple-camera format that Chrome and Firefox can't display. To add it as a 26th product, convert it to JPG or PNG, re-upload, and append the new filename to `src/data/naturalStones.js`. Tracked as a code comment in that file.

## Verification

- `npm run build` — passes.
- `npm run test:visual` — 4 baselines regenerated (natural-stone listing × 1, detail page × 2, plus the listing hero where the search input used to live). Other 16 baselines unchanged.
- Manual browser pass on `/natural-stone`, three random `/natural-stone/:id` pages, `/quartz`, `/quartz/1` — Natural Stone shows the new content; Quartz is unchanged.

## Before / after

(Screenshots to be added when this round is committed and reviewed. Place under `docs/changelog/assets/2026-04-29-natural-stone-real-imagery/` and embed below.)

- Before: Natural Stone listing — 4 cards with stock stone photos, search bar, filter dropdowns, full card content (description, characteristics, type/finish eyebrow)
- After: Natural Stone listing — 25 cards with real photos, simplified card content, no search/filters
- Before: `/natural-stone/3` — "Carrara Marble Classic" with 4-thumb gallery
- After: `/natural-stone/3` — "Stone 03" with hero-only gallery (single image)
```

- [ ] **Step 5: Verify all docs render correctly**

Run: `npm run build`
Expected: passes (the build doesn't touch markdown files but confirms nothing else broke).

Quick eyeball pass: open `PROGRESS.md` in your editor and confirm the new revision-log entry appears at the top of the log section, above the prior 2026-04-29 stone-surface-imagery entry. Open `docs/HOW-TO-REVISE.md` and confirm Recipe 16 sits between Recipe 15 and the "Fallback" section.

- [ ] **Step 6: Commit the doc bundle**

```bash
git add CLAUDE.md PROGRESS.md docs/HOW-TO-REVISE.md docs/changelog/2026-04-29-natural-stone-real-imagery.md
git commit -m "Document 2026-04-29 natural-stone real-imagery round"
```

---

## Done

After Task 6:
- 6 commits on the branch (one per task).
- `/natural-stone` and `/natural-stone/:id` render real photos from Supabase Storage.
- `/quartz` and `/quartz/:id` are unchanged.
- All visual tests pass.
- Documentation reflects the new state.

If anything failed in earlier tasks, do NOT push or merge; revisit the failing task.
