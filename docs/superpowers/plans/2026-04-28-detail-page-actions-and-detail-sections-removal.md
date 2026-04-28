# 2026-04-28 — Implementation plan: detail-page Actions + Tech Specs + Care removal

Plan for the spec at `docs/superpowers/specs/2026-04-28-detail-page-actions-and-detail-sections-removal-design.md`.

## Step 1 — Edit each of 3 detail-page files identically

For each of `ProductDetailPage.jsx`, `CabinetDetailPage.jsx`, `ShowerPanelDetailPage.jsx`:

1. **Trim the icon import** to `const { FiArrowLeft } = FiIcons;` — the Back link is the only remaining icon consumer.
2. **Remove the `isSaved` state line** (`const [isSaved, setIsSaved] = useState(false);`). Keep `activeImage` — the gallery still uses it.
3. **Trim the mock object** — delete the `specifications: { ... }` and `care: [ ... ]` keys.
4. **Remove the Actions row** — the entire `<div className="flex gap-3">` containing the Download/Save/Share buttons.
5. **Replace the Detailed Info grid** — delete the `<div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">` wrapper and the two `motion.div` siblings (Specifications, Care). What remains is the Applications `motion.div` only — promote it to be its own top-level child of the section, change its className to `mt-24 max-w-2xl mx-auto`, and inline the same Framer Motion props it had before.

## Step 2 — Build + lint

```bash
npm run build
```

Should pass clean. The CSS bundle should drop by ~0.5 kB as Tailwind purges utility classes that were only used by the removed sections (e.g., `border-red-200`, `bg-red-50` from the heart-button toggle, `capitalize` from the spec-key formatter).

## Step 3 — Verify in Playwright MCP

Walk:

- `/#/natural-stone/1` — confirm: 2-chip badge row (FEATURED, MARBLE), title + Pricing on Request, 3-column Quick Specs (ORIGIN, FINISH, MATERIAL), gallery thumbnails. **No Actions row below the spec card.** Below the fold: a single centered `Applications` block with 5 bullets. Below that: the existing "Ready to Use This Material?" CTA section.
- `/#/quartz/1` — same component, same layout.
- Cabinets and Shower Panels detail routes are still shadowed by Coming Soon.

Confirm no console errors for missing `FiDownload` / `FiHeart` / `FiShare2` / `FiCheck` references.

## Step 4 — Visual regression

```bash
npm run test:visual
```

Expect 2 failures: `product-detail-hero`, `product-detail-specs`. Other 18 baselines pass.

```bash
npm run test:visual:update
npm run test:visual    # confirm 20/20
```

## Step 5 — Documentation

1. Update `CLAUDE.md` "Detail-page content rules" paragraph to note that the Actions row, Tech Specs, and Care sections were removed in this round; mock fields and icon imports cleaned up.
2. Add new dated entry to `PROGRESS.md` revision log.
3. Write `docs/changelog/2026-04-28-detail-page-actions-and-detail-sections-removal.md`.
4. Add Recipe 14 to `docs/HOW-TO-REVISE.md` for restoring any of the three removed pieces.

## Step 6 — Commit

Single atomic commit including all 3 page edits, regenerated baselines, and doc updates.
