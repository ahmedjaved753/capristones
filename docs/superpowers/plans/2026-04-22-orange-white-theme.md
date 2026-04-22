# Orange/White Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retheme the live site from the bronze/gold accent palette to an orange/white palette per `docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`, keeping all layout, typography, and motion unchanged.

**Architecture:** Single-token migration first (auto-propagates to every existing `text-accent` / `bg-accent` consumer via Tailwind), then file-by-file heading-colour upgrades. Verification is visual (Playwright screenshots + computed-style assertions) since this is a CSS-only change with no logic.

**Tech Stack:** React 18 + Vite, Tailwind CSS (JIT), Framer Motion, react-router-dom (HashRouter), Playwright MCP for visual verification.

---

## File Structure

Theme surface — every file you touch, and its responsibility:

| File | Responsibility | Nature of change |
|---|---|---|
| `tailwind.config.js` | Accent token definitions | Redefine `accent.DEFAULT`; add `accent.warm`, `accent.veil`; drop `accent.light`, `accent.dark` |
| `src/index.css` | Global `::selection` colour | Single hex swap |
| `src/pages/HomePage.jsx` | Home hero, collections, CTA | Hero italic class rename, hero overlay gradient, section wash, 2 H2s, 1 H3 |
| `src/pages/NaturalStonePage.jsx` | Natural-stone listing | H1 split, H2, H3 |
| `src/pages/QuartzPage.jsx` | Quartz listing | H1 split, H2, H3 |
| `src/pages/ProductDetailPage.jsx` | Product detail | 3 sidebar H3s + 1 CTA H2 (product-name H1 stays ink) |
| `src/components/AppointmentsPage.jsx` | Appointments form + sidebar | H1 split, 2 H2s, 2 H3s |
| `src/components/ContactSection.jsx` | Contact page content | H2 split, 1 H3 |
| `src/components/Footer.jsx` | Footer brand | 1 H3 on dark bg |

Not touched (intentional): `Navigation.jsx`, `ScrollToTop.jsx`, `SafeIcon.jsx`, `App.jsx`, `App.css`, `pages/AppointmentsPage.jsx` (route shell only), `pages/ContactPage.jsx` (route shell only), orphaned legacy files (`HeroSection.jsx`, `AboutUs.jsx`, `ProductGallery.jsx`, `ProductCard.jsx`, `BookingForm.jsx`).

## Prerequisites

Dev server must be running on `http://localhost:5173`. If it isn't:

```bash
npm run dev
```

Playwright MCP tools are loaded. If a task reports them missing:

```
ToolSearch query "select:mcp__plugin_playwright_playwright__browser_navigate,mcp__plugin_playwright_playwright__browser_take_screenshot,mcp__plugin_playwright_playwright__browser_evaluate,mcp__plugin_playwright_playwright__browser_resize,mcp__plugin_playwright_playwright__browser_wait_for"
```

---

## Task 1: Establish new palette tokens

**Files:**
- Modify: `tailwind.config.js` (lines 14–25)
- Modify: `src/index.css` (line 32)
- Modify: `src/pages/HomePage.jsx` (line 58 — single class rename needed because `accent-light` is being retired)

- [ ] **Step 1: Update Tailwind token definitions**

Edit `tailwind.config.js` — replace the `colors.accent` block.

`old_string`:
```js
      colors: {
        accent: {
          DEFAULT: '#A16207',
          light: '#D4A843',
          dark: '#7C4D05',
        },
        surface: {
```

`new_string`:
```js
      colors: {
        accent: {
          DEFAULT: '#B8431E',
          warm: '#E07A3C',
          veil: '#FBEBDD',
        },
        surface: {
```

- [ ] **Step 2: Update `::selection` colour**

Edit `src/index.css`.

`old_string`:
```css
  ::selection {
    background-color: #A16207;
    color: #FFFFFF;
  }
```

`new_string`:
```css
  ::selection {
    background-color: #B8431E;
    color: #FFFFFF;
  }
```

- [ ] **Step 3: Rename the lone `accent-light` consumer (retires the old token cleanly)**

Edit `src/pages/HomePage.jsx` line 58.

`old_string`:
```jsx
              <span className="italic font-normal text-accent-light">
                to Last
              </span>
```

`new_string`:
```jsx
              <span className="italic font-normal text-accent-warm">
                to Last
              </span>
```

- [ ] **Step 4: Verify the build is green**

```bash
npm run build
```

Expected: build succeeds, no "unknown class" warnings in the output. If it fails with "Cannot apply `text-accent-light`" or similar, grep for any remaining references: `grep -rn "accent-light\|accent-dark" src/` — should return nothing.

- [ ] **Step 5: Verify the swap rendered**

With the dev server running, navigate Playwright to `http://localhost:5173/` and assert the hero italic word's colour is now warm sienna:

```js
// via mcp__plugin_playwright_playwright__browser_evaluate
() => {
  const s = document.querySelector('h1 span.italic');
  return { text: s?.innerText, color: getComputedStyle(s).color };
}
```

Expected: `{ text: "to Last", color: "rgb(224, 122, 60)" }` (which is `#E07A3C`).

Also take a screenshot for the record: `baseline-task1-home-hero.png`.

- [ ] **Step 6: Commit**

```bash
git add tailwind.config.js src/index.css src/pages/HomePage.jsx
git commit -m "Retheme accent tokens: terracotta + warm sienna + peach veil"
```

---

## Task 2: Retheme `HomePage.jsx`

**Files:**
- Modify: `src/pages/HomePage.jsx` (lines 37, 119, 181, 191, 193, 216)

- [ ] **Step 1: Hero overlay gradient with terracotta whisper**

`old_string`:
```jsx
        <div className="absolute inset-0 bg-surface-dark/60" />
```

`new_string`:
```jsx
        <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/60 via-accent/10 to-surface-dark/80" />
```

- [ ] **Step 2: "Explore the Finest Materials" H2 → terracotta**

`old_string`:
```jsx
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-dark leading-[1.05]">
                Explore the<br />Finest Materials
              </h2>
```

`new_string`:
```jsx
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-accent leading-[1.05]">
                Explore the<br />Finest Materials
              </h2>
```

- [ ] **Step 3: CTA section wash → peach-cream**

`old_string`:
```jsx
      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-surface">
```

`new_string`:
```jsx
      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 bg-accent-veil">
```

- [ ] **Step 4: "Ready to Transform Your Space?" H2 — main word terracotta, italic warm sienna**

`old_string`:
```jsx
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-[1.05] mb-6">
                Ready to Transform{' '}
                <span className="italic font-normal">Your Space?</span>
              </h2>
```

`new_string`:
```jsx
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent leading-[1.05] mb-6">
                Ready to Transform{' '}
                <span className="italic font-normal text-accent-warm">Your Space?</span>
              </h2>
```

- [ ] **Step 5: "Contact Information" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-surface-dark mb-8">
                Contact Information
              </h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-accent mb-8">
                Contact Information
              </h3>
```

- [ ] **Step 6: Visual verify all changes rendered on `/`**

Navigate Playwright to `http://localhost:5173/`. Scroll through each section and screenshot:
- Viewport top (hero) → `task2-home-hero.png` — verify gradient has warm undertone in mid-band
- Scroll to `y=900` → `task2-home-collections.png` — verify "Explore the Finest Materials" is terracotta
- Scroll to `y=1958` → `task2-home-cta.png` — verify the CTA section background is visibly cream-peach (compared to the plain white collections section above), and both the H2 "Ready to Transform" and the italic "Your Space?" are terracotta-family, and "Contact Information" H3 is terracotta.

Assert computed colours:

```js
() => {
  const allH2 = [...document.querySelectorAll('h2')];
  const allH3 = [...document.querySelectorAll('h3')];
  return {
    exploreFinest: allH2.find(h => h.innerText.includes('Explore'))?.style ? null : getComputedStyle(allH2.find(h => h.innerText.includes('Explore'))).color,
    readyToTransform: allH2.find(h => h.innerText.includes('Ready'))?.outerHTML.slice(0,200),
    readyToTransformColor: getComputedStyle(allH2.find(h => h.innerText.includes('Ready'))).color,
    yourSpaceColor: getComputedStyle(allH2.find(h => h.innerText.includes('Ready')).querySelector('span')).color,
    contactInfoColor: getComputedStyle(allH3.find(h => h.innerText.includes('Contact Information'))).color,
    ctaSectionBg: getComputedStyle(document.querySelectorAll('section')[2]).backgroundColor,
  };
}
```

Expected:
- `exploreFinest` = `rgb(184, 67, 30)` (`#B8431E` terracotta)
- `readyToTransformColor` = `rgb(184, 67, 30)`
- `yourSpaceColor` = `rgb(224, 122, 60)` (`#E07A3C` warm sienna)
- `contactInfoColor` = `rgb(184, 67, 30)`
- `ctaSectionBg` = `rgb(251, 235, 221)` (`#FBEBDD` veil)

If any fails, check the `old_string` matched exactly — inspect the line with Read before re-editing.

- [ ] **Step 7: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "Retheme home page: orange H2s/H3, peach CTA wash, warm hero overlay"
```

---

## Task 3: Retheme `NaturalStonePage.jsx`

**Files:**
- Modify: `src/pages/NaturalStonePage.jsx` (lines 107–110, 284, 310)

- [ ] **Step 1: H1 split colours**

`old_string`:
```jsx
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-surface-dark leading-[0.95] tracking-tight mb-8">
              Natural<br />
              <span className="italic font-normal text-accent">Stone</span>
            </h1>
```

`new_string`:
```jsx
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-accent leading-[0.95] tracking-tight mb-8">
              Natural<br />
              <span className="italic font-normal text-accent-warm">Stone</span>
            </h1>
```

- [ ] **Step 2: "No stones found" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-3xl font-bold text-surface-dark mb-4">No stones found</h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No stones found</h3>
```

- [ ] **Step 3: "Experience Natural Beauty" H2 → terracotta**

`old_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark mb-6">
              Experience Natural Beauty
            </h2>
```

`new_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Experience Natural Beauty
            </h2>
```

- [ ] **Step 4: Visual verify**

Navigate Playwright to `http://localhost:5173/#/natural-stone`. Screenshot at `y=0` (`task3-natural-stone-hero.png`) and at scroll position near the CTA bottom (`task3-natural-stone-cta.png`).

```js
() => ({
  h1Color: getComputedStyle(document.querySelector('h1')).color,
  h1ItalicColor: getComputedStyle(document.querySelector('h1 span.italic')).color,
  h2Color: getComputedStyle([...document.querySelectorAll('h2')].find(h => h.innerText.includes('Experience'))).color,
})
```

Expected: `h1Color` = `rgb(184, 67, 30)`; `h1ItalicColor` = `rgb(224, 122, 60)`; `h2Color` = `rgb(184, 67, 30)`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/NaturalStonePage.jsx
git commit -m "Retheme natural-stone page: orange H1/H2/H3, warm italic"
```

---

## Task 4: Retheme `QuartzPage.jsx`

**Files:**
- Modify: `src/pages/QuartzPage.jsx` (lines 115–117, 315, 341)

- [ ] **Step 1: H1 split colours**

`old_string`:
```jsx
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-surface-dark leading-[0.95] tracking-tight mb-8">
              Engineered<br />
              <span className="italic font-normal text-accent">Quartz</span>
            </h1>
```

`new_string`:
```jsx
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-accent leading-[0.95] tracking-tight mb-8">
              Engineered<br />
              <span className="italic font-normal text-accent-warm">Quartz</span>
            </h1>
```

- [ ] **Step 2: "No products found" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-3xl font-bold text-surface-dark mb-4">No products found</h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No products found</h3>
```

- [ ] **Step 3: "Why Choose Engineered Quartz?" H2 → terracotta**

`old_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark mb-6">
              Why Choose Engineered Quartz?
            </h2>
```

`new_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Why Choose Engineered Quartz?
            </h2>
```

- [ ] **Step 4: Visual verify**

Navigate to `http://localhost:5173/#/quartz`. Screenshot hero (`task4-quartz-hero.png`) and CTA (`task4-quartz-cta.png`).

```js
() => ({
  h1Color: getComputedStyle(document.querySelector('h1')).color,
  h1ItalicColor: getComputedStyle(document.querySelector('h1 span.italic')).color,
  whyH2Color: getComputedStyle([...document.querySelectorAll('h2')].find(h => h.innerText.includes('Why Choose'))).color,
})
```

Expected: `h1Color` = `rgb(184, 67, 30)`; `h1ItalicColor` = `rgb(224, 122, 60)`; `whyH2Color` = `rgb(184, 67, 30)`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/QuartzPage.jsx
git commit -m "Retheme quartz page: orange H1/H2/H3, warm italic"
```

---

## Task 5: Retheme `ProductDetailPage.jsx`

**Files:**
- Modify: `src/pages/ProductDetailPage.jsx` (lines 202, 219, 238, 262)

Note: product-name H1 at line 133 and price at line 137 **stay as they are**. The H1 product name stays `text-surface-dark` (ink) per spec; the price stays `text-accent` (which now auto-resolves to terracotta).

- [ ] **Step 1: "Applications" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-surface-dark mb-6">Applications</h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Applications</h3>
```

- [ ] **Step 2: "Technical Specifications" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-surface-dark mb-6">Technical Specifications</h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Technical Specifications</h3>
```

- [ ] **Step 3: "Care & Maintenance" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-surface-dark mb-6">Care & Maintenance</h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Care & Maintenance</h3>
```

- [ ] **Step 4: "Ready to Use This Material?" H2 → terracotta**

`old_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark mb-6">
              Ready to Use This Material?
            </h2>
```

`new_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-accent mb-6">
              Ready to Use This Material?
            </h2>
```

- [ ] **Step 5: Visual verify**

Navigate to `http://localhost:5173/#/natural-stone/1`. Screenshot at `y=0` (`task5-product-detail-hero.png`) and at `y=900` (`task5-product-detail-specs.png`).

```js
() => ({
  // H1 product name MUST stay ink black
  h1Color: getComputedStyle(document.querySelector('h1')).color,
  priceColor: getComputedStyle([...document.querySelectorAll('span')].find(s => s.innerText?.includes('$89'))).color,
  applicationsColor: getComputedStyle([...document.querySelectorAll('h3')].find(h => h.innerText === 'Applications')).color,
  specsColor: getComputedStyle([...document.querySelectorAll('h3')].find(h => h.innerText === 'Technical Specifications')).color,
  careColor: getComputedStyle([...document.querySelectorAll('h3')].find(h => h.innerText === 'Care & Maintenance')).color,
})
```

Expected:
- `h1Color` = `rgb(28, 25, 23)` (stays ink)
- `priceColor` = `rgb(184, 67, 30)` (already accent, auto-updated)
- `applicationsColor`, `specsColor`, `careColor` = `rgb(184, 67, 30)`

- [ ] **Step 6: Commit**

```bash
git add src/pages/ProductDetailPage.jsx
git commit -m "Retheme product detail: orange structural H3/H2, product name stays ink"
```

---

## Task 6: Retheme `components/AppointmentsPage.jsx`

**Files:**
- Modify: `src/components/AppointmentsPage.jsx` (lines 67, 111–114, 130, 275, 299)

- [ ] **Step 1: Confirmation state H2 → terracotta**

`old_string`:
```jsx
            <h2 className="font-display text-3xl font-bold text-surface-dark mb-4">
              Appointment Confirmed
            </h2>
```

`new_string`:
```jsx
            <h2 className="font-display text-3xl font-bold text-accent mb-4">
              Appointment Confirmed
            </h2>
```

- [ ] **Step 2: H1 split colours ("Book Your" main + "Appointment" italic)**

`old_string`:
```jsx
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-surface-dark leading-[1.05] mb-6">
            Book Your{' '}
            <span className="italic font-normal">Appointment</span>
          </h1>
```

`new_string`:
```jsx
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-accent leading-[1.05] mb-6">
            Book Your{' '}
            <span className="italic font-normal text-accent-warm">Appointment</span>
          </h1>
```

- [ ] **Step 3: "Schedule Your Visit" H2 → terracotta**

`old_string`:
```jsx
              <h2 className="font-display text-2xl font-bold text-surface-dark mb-8">
                Schedule Your Visit
              </h2>
```

`new_string`:
```jsx
              <h2 className="font-display text-2xl font-bold text-accent mb-8">
                Schedule Your Visit
              </h2>
```

- [ ] **Step 4: "Visit Our Showroom" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-xl font-bold text-surface-dark mb-6">
                Visit Our Showroom
              </h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-xl font-bold text-accent mb-6">
                Visit Our Showroom
              </h3>
```

- [ ] **Step 5: "What to Expect" H3 → terracotta**

`old_string`:
```jsx
              <h3 className="font-display text-xl font-bold text-surface-dark mb-6">
                What to Expect
              </h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-xl font-bold text-accent mb-6">
                What to Expect
              </h3>
```

- [ ] **Step 6: Visual verify**

Navigate to `http://localhost:5173/#/appointments`. Screenshot hero (`task6-appointments-hero.png`) and sidebar area (`task6-appointments-sidebar.png`).

```js
() => ({
  h1Color: getComputedStyle(document.querySelector('h1')).color,
  h1ItalicColor: getComputedStyle(document.querySelector('h1 span.italic')).color,
  scheduleH2Color: getComputedStyle([...document.querySelectorAll('h2')].find(h => h.innerText.includes('Schedule'))).color,
  showroomH3Color: getComputedStyle([...document.querySelectorAll('h3')].find(h => h.innerText.includes('Showroom'))).color,
  expectH3Color: getComputedStyle([...document.querySelectorAll('h3')].find(h => h.innerText.includes('Expect'))).color,
})
```

Expected: all five values = `rgb(184, 67, 30)` for main/H2/H3, except `h1ItalicColor` = `rgb(224, 122, 60)`.

- [ ] **Step 7: Commit**

```bash
git add src/components/AppointmentsPage.jsx
git commit -m "Retheme appointments page: orange H1/H2/H3, warm italic"
```

---

## Task 7: Retheme `components/ContactSection.jsx`

**Files:**
- Modify: `src/components/ContactSection.jsx` (lines 46–49, 117)

- [ ] **Step 1: H2 split colours ("Let's Start" + italic "Your Project")**

`old_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-surface-dark leading-[1.05]">
              Let's Start{' '}
              <span className="italic font-normal">Your Project</span>
            </h2>
```

`new_string`:
```jsx
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-accent leading-[1.05]">
              Let's Start{' '}
              <span className="italic font-normal text-accent-warm">Your Project</span>
            </h2>
```

- [ ] **Step 2: "Send Us a Message" H3 → terracotta**

`old_string`:
```jsx
            <h3 className="font-display text-2xl font-bold text-surface-dark mb-8">
              Send Us a Message
            </h3>
```

`new_string`:
```jsx
            <h3 className="font-display text-2xl font-bold text-accent mb-8">
              Send Us a Message
            </h3>
```

- [ ] **Step 3: Visual verify**

Navigate to `http://localhost:5173/#/contact`. Screenshot (`task7-contact.png`).

```js
() => ({
  h2MainColor: getComputedStyle(document.querySelector('h2')).color,
  h2ItalicColor: getComputedStyle(document.querySelector('h2 span.italic')).color,
  sendMessageH3Color: getComputedStyle([...document.querySelectorAll('h3')].find(h => h.innerText.includes('Send Us'))).color,
})
```

Expected: `h2MainColor` = `rgb(184, 67, 30)`; `h2ItalicColor` = `rgb(224, 122, 60)`; `sendMessageH3Color` = `rgb(184, 67, 30)`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactSection.jsx
git commit -m "Retheme contact page: orange H2/H3, warm italic"
```

---

## Task 8: Footer brand colour

**Files:**
- Modify: `src/components/Footer.jsx` (line 43)

- [ ] **Step 1: "Premium Stones" footer H3 → warm sienna on dark**

`old_string`:
```jsx
              <h3 className="font-display text-3xl font-bold mb-6">Premium Stones</h3>
```

`new_string`:
```jsx
              <h3 className="font-display text-3xl font-bold text-accent-warm mb-6">Premium Stones</h3>
```

- [ ] **Step 2: Visual verify (any page has the footer — use home, scrolled to bottom)**

Navigate to `http://localhost:5173/`, scroll to `y=2600`, screenshot (`task8-footer.png`). Verify the "Premium Stones" serif glows warm against the dark footer background.

```js
() => ({
  premiumStonesColor: getComputedStyle([...document.querySelectorAll('footer h3')].find(h => h.innerText === 'Premium Stones')).color,
})
```

Expected: `rgb(224, 122, 60)`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Retheme footer brand: warm sienna on dark"
```

---

## Task 9: Final verification sweep

- [ ] **Step 1: Confirm build is clean**

```bash
npm run build
```

Expected: build succeeds with no warnings.

- [ ] **Step 2: Grep for retired tokens — must return no hits**

```bash
grep -rn "accent-light\|accent-dark\|#A16207\|#D4A843" src/ tailwind.config.js
```

Expected: zero output. If any hit remains, update it to the new token and commit separately with message "Clean up: replace retired accent tokens".

- [ ] **Step 3: Run the Playwright sweep across all 6 routes**

Resize to `1440×900`, then navigate and screenshot each route at multiple scroll positions. File names: `final-<route>-<position>.png`.

Routes:
1. `http://localhost:5173/` — scroll 0, 900, 2000
2. `http://localhost:5173/#/natural-stone` — scroll 0, 800
3. `http://localhost:5173/#/natural-stone/1` — scroll 0, 700
4. `http://localhost:5173/#/quartz` — scroll 0, 800
5. `http://localhost:5173/#/appointments` — scroll 0, 900
6. `http://localhost:5173/#/contact` — scroll 0

Remember to `browser_wait_for({ time: 1 })` after each scroll so Framer Motion reveals complete before the screenshot.

- [ ] **Step 4: Sanity check (visual)**

Compare each `final-*.png` against its original baseline (`01-`–`09-*.png` from the pre-change sweep). Every place that was bronze should now be terracotta; every place that was gold should now be warm sienna; CTA section on home should be visibly peach-cream against adjacent white sections; footer "Premium Stones" should be warm-sienna; nothing layout-wise should have shifted.

Red flags to watch for (if any appear, do not mark the task complete — report to the user):
- Heading rendering as ink-black where terracotta was expected → `old_string` didn't match, edit was skipped
- Entire page looking unchanged → Tailwind JIT may not have picked up new classes; restart dev server with `npm run dev`
- CTA section still white → the `bg-accent-veil` class didn't make it into the HTML
- Footer still has ink-dark "Premium Stones" → text colour needs to override the inherited `text-white`

- [ ] **Step 5: Final commit of any screenshots (optional)**

Screenshots from `.playwright-mcp/` or the repo root can be deleted if untracked, or committed as reference if the user wants a visual trail.

---

## Rollback

If at any point the theme looks wrong and you want to revert completely:

```bash
git log --oneline | head -10   # find the commit right before Task 1
git reset --hard <sha-before-task-1>
```

To iterate on hex values after seeing live results, edit only `tailwind.config.js` — all consumers auto-update. E.g. if terracotta feels too brown, try `#C44E24`; if too bright, try `#9A3A1A`.
