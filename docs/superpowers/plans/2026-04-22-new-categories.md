# Shower Panels & Cabinets Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Shower Panels and Cabinets as new product categories, each with its own listing page and its own dedicated detail page, extending the Collections dropdown from 2 items to 4.

**Architecture:** Four new React page components (`ShowerPanelsPage`, `ShowerPanelDetailPage`, `CabinetsPage`, `CabinetDetailPage`), each modeled on an existing sibling (`NaturalStonePage.jsx` or `ProductDetailPage.jsx`). Four new routes in `App.jsx`. Nav dropdown extended. Existing stone/quartz pages untouched. Per project scope, all product data is hardcoded mock data — no backend.

**Tech Stack:** React 18, React Router DOM (`HashRouter`), Framer Motion, Tailwind CSS, `react-icons/fi` via `SafeIcon` wrapper. Testing via Playwright visual regression (`tests/visual.spec.js`), not unit tests.

**Reference spec:** [`docs/superpowers/specs/2026-04-22-new-categories-design.md`](../specs/2026-04-22-new-categories-design.md)

---

## File Structure

**Create:**
- `src/pages/ShowerPanelsPage.jsx` — listing, filters, grid/list of 4 mock shower panel products
- `src/pages/ShowerPanelDetailPage.jsx` — single shower panel detail view
- `src/pages/CabinetsPage.jsx` — listing, filters, grid/list of 4 mock cabinet products
- `src/pages/CabinetDetailPage.jsx` — single cabinet detail view
- `docs/changelog/2026-04-22-new-categories.md` — client-facing change note

**Modify:**
- `src/App.jsx` — 4 imports + 4 routes
- `src/components/Navigation.jsx` — dropdown from 2 items to 4
- `src/components/AppointmentsPage.jsx` — add "Shower Panel Consultation" to `serviceTypes`
- `tests/visual.spec.js` — add 4 new route entries
- `CLAUDE.md` — update "Project Scope" (8 pages) and "Architecture" (peer detail components)
- `PROGRESS.md` — new revision log entry, updated "Current state"
- `docs/HOW-TO-REVISE.md` — add "swapping mock products" recipe

---

## Task 1: Create Shower Panels listing page

**Files:**
- Create: `src/pages/ShowerPanelsPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create the listing page**

Create the file `src/pages/ShowerPanelsPage.jsx` with this exact content:

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList, FiArrowRight, FiSearch } = FiIcons;

const ShowerPanelsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    material: 'All',
    color: 'All',
    size: 'All',
    finish: 'All'
  });

  const showerPanels = [
    {
      id: 1,
      name: 'Calacatta Marble Panel',
      material: 'Marble',
      color: 'White',
      size: '5x10',
      finish: 'Polished',
      price: '$120/sq ft',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Book-matched Calacatta marble in a single seamless panel, transforming the shower into a statement wall.',
      characteristics: ['Book-matched veining', 'Seamless install', 'Grout-free'],
      applications: ['Shower walls', 'Tub surrounds', 'Wet rooms'],
      featured: true
    },
    {
      id: 2,
      name: 'Statuario Porcelain Panel',
      material: 'Porcelain',
      color: 'White',
      size: '5x10',
      finish: 'Matte',
      price: '$55/sq ft',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Large-format porcelain with Statuario-inspired veining, offering marble looks at a fraction of the maintenance.',
      characteristics: ['Near-zero absorption', 'Stain resistant', 'Low maintenance'],
      applications: ['Shower walls', 'Feature walls', 'Commercial wet areas']
    },
    {
      id: 3,
      name: 'Walnut Laminate Panel',
      material: 'Laminate',
      color: 'Brown',
      size: '4x8',
      finish: 'Matte',
      price: '$45/sq ft',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Warm walnut-grain laminate for a spa-like shower, engineered for daily water exposure.',
      characteristics: ['Waterproof core', 'Warm tones', 'Budget-friendly'],
      applications: ['Shower walls', 'Accent panels', 'Guest baths']
    },
    {
      id: 4,
      name: 'Carrara Quartz Panel',
      material: 'Quartz',
      color: 'White',
      size: 'Custom',
      finish: 'Polished',
      price: '$85/sq ft',
      image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Engineered quartz panel fabricated to your exact shower dimensions, with Carrara-style veining throughout.',
      characteristics: ['Custom sizing', 'Non-porous', 'Consistent pattern'],
      applications: ['Shower walls', 'Tub surrounds', 'Luxury master baths']
    }
  ];

  const filterOptions = {
    material: ['All', 'Marble', 'Quartz', 'Porcelain', 'Laminate'],
    color: ['All', 'White', 'Black', 'Gray', 'Beige', 'Brown'],
    size: ['All', '4x8', '5x10', 'Custom'],
    finish: ['All', 'Polished', 'Matte']
  };

  const filteredPanels = showerPanels.filter(panel => {
    const matchesSearch = panel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         panel.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMaterial = filters.material === 'All' || panel.material === filters.material;
    const matchesColor = filters.color === 'All' || panel.color === filters.color;
    const matchesSize = filters.size === 'All' || panel.size === filters.size;
    const matchesFinish = filters.finish === 'All' || panel.finish === filters.finish;
    return matchesSearch && matchesMaterial && matchesColor && matchesSize && matchesFinish;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

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
              Shower<br />
              <span className="italic font-normal text-accent-warm">Panels</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Large-format shower panels in natural stone, engineered quartz, porcelain, and laminate.
              Seamless, waterproof surfaces that transform the shower into a single continuous statement.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-xl mt-12"
          >
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search shower panels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-stone-200 bg-white font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-6 px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <select
                  key={filterType}
                  value={filters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="px-4 py-2 border border-stone-200 font-body text-xs uppercase tracking-wider focus:outline-none focus:border-surface-dark bg-white cursor-pointer"
                >
                  {options.map(option => (
                    <option key={option} value={option}>{filterType === 'material' && option === 'All' ? 'All Materials' : filterType === 'color' && option === 'All' ? 'All Colors' : filterType === 'size' && option === 'All' ? 'All Sizes' : filterType === 'finish' && option === 'All' ? 'All Finishes' : option}</option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-stone-500">
                {filteredPanels.length} {filteredPanels.length === 1 ? 'panel' : 'panels'}
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
        </div>
      </section>

      {/* Panels Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {filteredPanels.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/shower-panels/${panel.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={panel.image}
                          alt={panel.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {panel.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {panel.size}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-8 ${viewMode === 'list' ? 'md:w-3/5 flex flex-col justify-between' : ''}`}>
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              {/* Product names stay ink — orange here would compete with the product photography. */}
                              <h3 className="font-display text-2xl font-bold text-surface-dark group-hover:text-accent transition-colors duration-200">
                                {panel.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                                  {panel.material}
                                </span>
                                <span className="w-px h-3 bg-stone-300" />
                                <span className="font-body text-[10px] font-medium uppercase tracking-wider text-stone-400">
                                  {panel.finish}
                                </span>
                              </div>
                            </div>
                            <span className="font-display text-2xl font-bold text-accent">
                              {panel.price}
                            </span>
                          </div>

                          <p className="font-body text-sm text-stone-500 leading-relaxed mt-4">
                            {panel.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {panel.characteristics.map((char) => (
                              <span
                                key={char}
                                className="px-3 py-1 border border-stone-200 font-body text-[10px] font-medium uppercase tracking-wider text-stone-600"
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>

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

          {filteredPanels.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No panels found</h3>
              <p className="font-body text-sm text-stone-500 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilters({ material: 'All', color: 'All', size: 'All', finish: 'All' });
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
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
              See the Panels in Person
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Book a showroom visit to see our shower panel displays at full scale and talk install options with our team.
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

export default ShowerPanelsPage;
```

- [ ] **Step 2: Wire the route into `src/App.jsx`**

Modify `src/App.jsx`. Add the import alongside the existing page imports (after the `QuartzPage` import):

```jsx
import ShowerPanelsPage from './pages/ShowerPanelsPage';
```

Add the route inside the `<Routes>` block, after the `quartz/:id` route:

```jsx
<Route path="/shower-panels" element={<ShowerPanelsPage />} />
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: build completes with no errors. Any "Unknown Tailwind class" or "Cannot resolve" error means a class/import typo — fix before continuing.

- [ ] **Step 4: Manual dev-server check**

Run: `npm run dev`

Navigate to `http://localhost:5173/#/shower-panels` and confirm:
- Hero renders ("Shower / *Panels*" with italic warm-sienna "Panels")
- Search input + 4 filter dropdowns visible
- 4 product cards render in a 2-column grid
- Clicking a filter value narrows the visible cards (e.g., Material=Laminate → 1 card)
- Cards are links to `/shower-panels/{id}` (clicking will 404 on the detail page until Task 2 — expected)

Stop the dev server with Ctrl-C when done.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ShowerPanelsPage.jsx src/App.jsx
git commit -m "Add Shower Panels listing page with 4 mock products"
```

---

## Task 2: Create Shower Panels detail page

**Files:**
- Create: `src/pages/ShowerPanelDetailPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create the detail page**

Create the file `src/pages/ShowerPanelDetailPage.jsx` with this exact content:

```jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiDownload, FiHeart, FiShare2, FiCheck } = FiIcons;

const ShowerPanelDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const panel = {
    id: parseInt(id),
    name: 'Calacatta Marble Panel',
    material: 'Marble',
    color: 'White',
    finish: 'Polished',
    size: '60" × 120"',
    price: '$120/sq ft',
    priceRange: '$110-135',
    description: 'Book-matched Calacatta marble in a single seamless panel, engineered for shower walls and wet rooms. Eliminates grout lines and creates a continuous veining pattern across the entire installation.',
    longDescription: 'Cut from the finest Carrara quarries, our Calacatta shower panels arrive as matched pairs that can be installed side-by-side for a mirrored, book-matched effect. Large-format sizing (up to 60" × 120") means a typical shower needs just 3 panels for complete coverage — dramatically reducing grout joints and install time compared to traditional tile.',
    applications: ['Shower walls', 'Tub surrounds', 'Wet rooms', 'Feature walls', 'Bath niches'],
    specifications: {
      thickness: '6mm / 10mm',
      substrate: 'Porcelain-backed marble',
      waterAbsorption: '< 0.5%',
      edgeTreatment: 'Mitered',
      installSystem: 'Adhesive + trim',
      fireRating: 'Class A'
    },
    care: [
      'Seal perimeter silicone annually',
      'Clean with pH-neutral stone cleaner',
      'Wipe water spots after each use to preserve shine',
      'Avoid acidic cleaners and abrasive pads',
      'Check seam integrity during annual maintenance'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-4f2a4b97bc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    inStock: true
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-8 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to="/shower-panels">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-surface-dark transition-colors duration-200 cursor-pointer">
              <SafeIcon icon={FiArrowLeft} className="text-sm" />
              Back to Shower Panels
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
                  src={panel.gallery[activeImage]}
                  alt={panel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {panel.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden border cursor-pointer transition-colors duration-200 ${
                      activeImage === index ? 'border-surface-dark' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${panel.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
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
                {panel.featured && (
                  <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                    Featured
                  </span>
                )}
                <span className="border border-stone-300 text-stone-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                  {panel.material}
                </span>
                {panel.inStock && (
                  <span className="border border-green-300 text-green-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <SafeIcon icon={FiCheck} className="text-xs" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                {/* Product name stays ink — price below is the orange moment; making both terracotta flattens hierarchy. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {panel.name}
                </h1>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="font-display text-4xl font-bold text-accent">
                    {panel.price}
                  </span>
                  <span className="font-body text-sm text-stone-400">
                    Range: {panel.priceRange}
                  </span>
                </div>
              </div>

              <div className="h-px bg-stone-200" />

              {/* Description */}
              <div>
                <p className="font-body text-base text-stone-600 leading-relaxed mb-4">
                  {panel.description}
                </p>
                <p className="font-body text-sm text-stone-500 leading-relaxed">
                  {panel.longDescription}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-6 border border-stone-200 p-6">
                {[
                  { label: 'Panel Size', value: panel.size },
                  { label: 'Finish', value: panel.finish },
                  { label: 'Color', value: panel.color },
                  { label: 'Material', value: panel.material }
                ].map((spec) => (
                  <div key={spec.label}>
                    <span className="label-text">{spec.label}</span>
                    <p className="font-body text-sm font-medium text-surface-dark mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

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
            </motion.div>
          </div>

          {/* Detailed Info */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Applications</h3>
              <div className="space-y-2">
                {panel.applications.map((application) => (
                  <div key={application} className="flex items-center gap-3 py-3 border-b border-stone-100">
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                    <span className="font-body text-sm text-stone-700">{application}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Technical Specifications</h3>
              <div className="space-y-0">
                {Object.entries(panel.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-stone-100">
                    <span className="font-body text-sm text-stone-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-body text-sm font-medium text-surface-dark">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Care & Maintenance</h3>
              <div className="space-y-3">
                {panel.care.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <SafeIcon icon={FiCheck} className="text-accent mt-0.5 flex-shrink-0 text-sm" />
                    <span className="font-body text-sm text-stone-600 leading-relaxed">{instruction}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
              Ready to Specify This Panel?
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Our team can help you measure, template, and plan installation for a seamless result.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Schedule Consultation</button>
              </Link>
              <Link to="/shower-panels">
                <button className="btn-outline">Browse More Panels</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShowerPanelDetailPage;
```

- [ ] **Step 2: Wire the route into `src/App.jsx`**

Add the import alongside the other page imports (after `ShowerPanelsPage`):

```jsx
import ShowerPanelDetailPage from './pages/ShowerPanelDetailPage';
```

Add the route inside `<Routes>`, right after the `/shower-panels` listing route:

```jsx
<Route path="/shower-panels/:id" element={<ShowerPanelDetailPage />} />
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Manual dev-server check**

Run: `npm run dev`

Navigate to `http://localhost:5173/#/shower-panels/1`. Confirm:
- Breadcrumb reads "Back to Shower Panels" and navigates to the listing
- Gallery with 4 thumbnails, clicking a thumbnail swaps the main image
- Product name H1 is ink-black (not orange); price is terracotta orange
- Quick specs grid shows **Panel Size** / Finish / Color / Material
- Specifications panel shows Thickness / Substrate / Water Absorption / Edge Treatment / Install System / Fire Rating
- Care list shows 5 items with terracotta check icons
- CTA buttons "Schedule Consultation" + "Browse More Panels" both link correctly

Stop the dev server with Ctrl-C.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ShowerPanelDetailPage.jsx src/App.jsx
git commit -m "Add Shower Panel detail page with panel-specific specs"
```

---

## Task 3: Create Cabinets listing page

**Files:**
- Create: `src/pages/CabinetsPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create the listing page**

Create the file `src/pages/CabinetsPage.jsx` with this exact content:

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiGrid, FiList, FiArrowRight, FiSearch } = FiIcons;

const CabinetsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    style: 'All',
    wood: 'All',
    color: 'All',
    doorType: 'All'
  });

  const cabinets = [
    {
      id: 1,
      name: 'Shaker White Oak',
      style: 'Shaker',
      wood: 'Oak',
      color: 'Natural',
      doorType: 'Full Overlay',
      price: '$420/linear ft',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Classic 5-piece Shaker doors in quarter-sawn white oak, finished with a clear conversion varnish that highlights the grain.',
      characteristics: ['Quarter-sawn grain', 'Soft-close hinges', 'Dovetail drawers'],
      applications: ['Kitchens', 'Vanities', 'Mudrooms'],
      featured: true
    },
    {
      id: 2,
      name: 'Frameless Walnut Flat-Panel',
      style: 'Flat Panel',
      wood: 'Walnut',
      color: 'Natural',
      doorType: 'Full Overlay',
      price: '$520/linear ft',
      image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'European-style frameless construction in rift-cut walnut, optimized for maximum interior storage and a seamless modern face.',
      characteristics: ['Frameless build', 'Rift-cut grain', 'Full-access interior'],
      applications: ['Modern kitchens', 'Home offices', 'Entertainment built-ins']
    },
    {
      id: 3,
      name: 'Inset Cherry Raised-Panel',
      style: 'Raised Panel',
      wood: 'Cherry',
      color: 'Natural',
      doorType: 'Inset',
      price: '$650/linear ft',
      image: 'https://images.unsplash.com/photo-1556909114-4f2a4b97bc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Traditional inset cabinetry in solid cherry with raised-panel doors, matched and beaded for heirloom-quality results.',
      characteristics: ['Solid cherry doors', 'Beaded face frame', 'Heirloom joinery'],
      applications: ['Traditional kitchens', 'Libraries', 'Bath vanities']
    },
    {
      id: 4,
      name: 'Modern Slab Espresso',
      style: 'Slab',
      wood: 'Painted MDF',
      color: 'Espresso',
      doorType: 'Full Overlay',
      price: '$380/linear ft',
      image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Clean, flush slab doors finished in deep espresso lacquer — a contemporary look with no visible hardware when paired with push-open.',
      characteristics: ['Flush slab face', 'Hand-sprayed lacquer', 'Push-open ready'],
      applications: ['Contemporary kitchens', 'Condo vanities', 'Minimalist built-ins']
    }
  ];

  const filterOptions = {
    style: ['All', 'Shaker', 'Flat Panel', 'Raised Panel', 'Slab'],
    wood: ['All', 'Oak', 'Maple', 'Walnut', 'Cherry', 'Painted MDF'],
    color: ['All', 'White', 'Natural', 'Espresso', 'Gray', 'Custom'],
    doorType: ['All', 'Full Overlay', 'Inset', 'Partial']
  };

  const filteredCabinets = cabinets.filter(cabinet => {
    const matchesSearch = cabinet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cabinet.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStyle = filters.style === 'All' || cabinet.style === filters.style;
    const matchesWood = filters.wood === 'All' || cabinet.wood === filters.wood;
    const matchesColor = filters.color === 'All' || cabinet.color === filters.color;
    const matchesDoorType = filters.doorType === 'All' || cabinet.doorType === filters.doorType;
    return matchesSearch && matchesStyle && matchesWood && matchesColor && matchesDoorType;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

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
              Custom<br />
              <span className="italic font-normal text-accent-warm">Cabinets</span>
            </h1>
            <p className="font-body text-base text-stone-500 max-w-2xl leading-relaxed">
              Custom-built kitchen, vanity, and built-in cabinetry, designed to complement our stone and surface work.
              Traditional joinery, modern hardware, finishes matched to your space.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-xl mt-12"
          >
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search cabinet styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-stone-200 bg-white font-body text-sm focus:outline-none focus:border-surface-dark transition-colors duration-200"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-6 px-6 lg:px-8 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-wrap gap-3">
              {Object.entries(filterOptions).map(([filterType, options]) => (
                <select
                  key={filterType}
                  value={filters[filterType]}
                  onChange={(e) => handleFilterChange(filterType, e.target.value)}
                  className="px-4 py-2 border border-stone-200 font-body text-xs uppercase tracking-wider focus:outline-none focus:border-surface-dark bg-white cursor-pointer"
                >
                  {options.map(option => (
                    <option key={option} value={option}>{filterType === 'style' && option === 'All' ? 'All Styles' : filterType === 'wood' && option === 'All' ? 'All Woods' : filterType === 'color' && option === 'All' ? 'All Colors' : filterType === 'doorType' && option === 'All' ? 'All Door Types' : option}</option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-body text-xs text-stone-500">
                {filteredCabinets.length} {filteredCabinets.length === 1 ? 'cabinet' : 'cabinets'}
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
        </div>
      </section>

      {/* Cabinets Grid */}
      <section className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
            <AnimatePresence>
              {filteredCabinets.map((cabinet, index) => (
                <motion.div
                  key={cabinet.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Link to={`/cabinets/${cabinet.id}`} className="group block">
                    <div className={`bg-white border border-stone-200 hover:border-stone-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'md:w-2/5 aspect-[4/3] md:aspect-auto md:min-h-[280px]' : 'aspect-[4/3]'
                      }`}>
                        <img
                          src={cabinet.image}
                          alt={cabinet.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {cabinet.featured && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-white/90 text-surface-dark px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-wider">
                            {cabinet.doorType}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className={`p-8 ${viewMode === 'list' ? 'md:w-3/5 flex flex-col justify-between' : ''}`}>
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              {/* Product names stay ink — orange here would compete with the product photography. */}
                              <h3 className="font-display text-2xl font-bold text-surface-dark group-hover:text-accent transition-colors duration-200">
                                {cabinet.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                                  {cabinet.style}
                                </span>
                                <span className="w-px h-3 bg-stone-300" />
                                <span className="font-body text-[10px] font-medium uppercase tracking-wider text-stone-400">
                                  {cabinet.wood}
                                </span>
                              </div>
                            </div>
                            <span className="font-display text-2xl font-bold text-accent">
                              {cabinet.price}
                            </span>
                          </div>

                          <p className="font-body text-sm text-stone-500 leading-relaxed mt-4">
                            {cabinet.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {cabinet.characteristics.map((char) => (
                              <span
                                key={char}
                                className="px-3 py-1 border border-stone-200 font-body text-[10px] font-medium uppercase tracking-wider text-stone-600"
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        </div>

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

          {filteredCabinets.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h3 className="font-display text-3xl font-bold text-accent mb-4">No cabinets found</h3>
              <p className="font-body text-sm text-stone-500 mb-8">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilters({ style: 'All', wood: 'All', color: 'All', doorType: 'All' });
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
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
              Design Your Cabinets With Us
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Book a cabinet-design consultation and we'll walk you through samples, hardware, and layout options in person.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Book Consultation</button>
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

export default CabinetsPage;
```

- [ ] **Step 2: Wire the route into `src/App.jsx`**

Add the import (after `ShowerPanelDetailPage`):

```jsx
import CabinetsPage from './pages/CabinetsPage';
```

Add the route inside `<Routes>`, after the shower-panels detail route:

```jsx
<Route path="/cabinets" element={<CabinetsPage />} />
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Manual dev-server check**

Run: `npm run dev`

Navigate to `http://localhost:5173/#/cabinets`. Confirm:
- Hero renders ("Custom / *Cabinets*")
- 4 filter dropdowns: Style / Wood / Color / Door Type
- 4 product cards render; bottom-right badge shows **door type** (e.g., "Full Overlay"), not size
- Price format is `$420/linear ft` (note: linear, not sq)
- Filtering by Style=Shaker narrows to 1 card ("Shaker White Oak")

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CabinetsPage.jsx src/App.jsx
git commit -m "Add Cabinets listing page with 4 mock products"
```

---

## Task 4: Create Cabinets detail page

**Files:**
- Create: `src/pages/CabinetDetailPage.jsx`
- Modify: `src/App.jsx`

- [ ] **Step 1: Create the detail page**

Create the file `src/pages/CabinetDetailPage.jsx` with this exact content:

```jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowLeft, FiDownload, FiHeart, FiShare2, FiCheck } = FiIcons;

const CabinetDetailPage = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const cabinet = {
    id: parseInt(id),
    name: 'Shaker White Oak',
    style: 'Shaker',
    wood: 'White Oak',
    color: 'Natural',
    finish: 'Clear Conversion Varnish',
    construction: 'Face-frame',
    price: '$420/linear ft',
    priceRange: '$380-480',
    description: 'Classic 5-piece Shaker doors in quarter-sawn white oak, finished with a clear conversion varnish that highlights the grain.',
    longDescription: 'Our signature Shaker-style cabinetry is built with old-world joinery and modern hardware. Every box is plywood with dovetailed drawer construction; every door is solid white oak rail-and-stile with a flat recessed panel. Quarter-sawn oak gives the rails and stiles a ray-fleck figure that only becomes more beautiful with age, and the clear conversion varnish finish is both hand-rubbed smooth and engineered for daily kitchen life.',
    applications: ['Kitchens', 'Bath vanities', 'Mudrooms', 'Laundry rooms', 'Built-in storage'],
    specifications: {
      boxConstruction: '3/4" plywood, dovetail joinery',
      doorStyle: 'Shaker, 5-piece solid wood',
      finishType: 'Conversion varnish',
      hardware: 'Blum soft-close hinges',
      drawerGlides: 'Full-extension undermount',
      warranty: 'Lifetime limited'
    },
    care: [
      'Clean with a damp cloth and wood-safe cleaner',
      'Avoid standing water near toe-kicks and door edges',
      'Adjust hinge tension annually if doors drift',
      'Use the touch-up kit for surface scratches',
      'Keep away from direct heat sources above 140°F'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-4f2a4b97bc7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    inStock: true
  };

  return (
    <div className="min-h-screen bg-surface pt-20">
      {/* Breadcrumb */}
      <section className="py-6 px-6 lg:px-8 border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link to="/cabinets">
            <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-widest text-stone-500 hover:text-surface-dark transition-colors duration-200 cursor-pointer">
              <SafeIcon icon={FiArrowLeft} className="text-sm" />
              Back to Cabinets
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
                  src={cabinet.gallery[activeImage]}
                  alt={cabinet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {cabinet.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square overflow-hidden border cursor-pointer transition-colors duration-200 ${
                      activeImage === index ? 'border-surface-dark' : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${cabinet.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
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
                {cabinet.featured && (
                  <span className="bg-surface-dark text-white px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                    Featured
                  </span>
                )}
                <span className="border border-stone-300 text-stone-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest">
                  {cabinet.style}
                </span>
                {cabinet.inStock && (
                  <span className="border border-green-300 text-green-700 px-3 py-1 font-body text-[10px] font-semibold uppercase tracking-widest flex items-center gap-1">
                    <SafeIcon icon={FiCheck} className="text-xs" />
                    In Stock
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                {/* Product name stays ink — price below is the orange moment; making both terracotta flattens hierarchy. */}
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-surface-dark leading-tight">
                  {cabinet.name}
                </h1>
                <div className="flex items-baseline gap-4 mt-4">
                  <span className="font-display text-4xl font-bold text-accent">
                    {cabinet.price}
                  </span>
                  <span className="font-body text-sm text-stone-400">
                    Range: {cabinet.priceRange}
                  </span>
                </div>
              </div>

              <div className="h-px bg-stone-200" />

              {/* Description */}
              <div>
                <p className="font-body text-base text-stone-600 leading-relaxed mb-4">
                  {cabinet.description}
                </p>
                <p className="font-body text-sm text-stone-500 leading-relaxed">
                  {cabinet.longDescription}
                </p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-6 border border-stone-200 p-6">
                {[
                  { label: 'Construction', value: cabinet.construction },
                  { label: 'Finish', value: cabinet.finish },
                  { label: 'Color', value: cabinet.color },
                  { label: 'Wood Species', value: cabinet.wood }
                ].map((spec) => (
                  <div key={spec.label}>
                    <span className="label-text">{spec.label}</span>
                    <p className="font-body text-sm font-medium text-surface-dark mt-1">{spec.value}</p>
                  </div>
                ))}
              </div>

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
            </motion.div>
          </div>

          {/* Detailed Info */}
          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Applications</h3>
              <div className="space-y-2">
                {cabinet.applications.map((application) => (
                  <div key={application} className="flex items-center gap-3 py-3 border-b border-stone-100">
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                    <span className="font-body text-sm text-stone-700">{application}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Technical Specifications</h3>
              <div className="space-y-0">
                {Object.entries(cabinet.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-stone-100">
                    <span className="font-body text-sm text-stone-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-body text-sm font-medium text-surface-dark">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Care */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="font-display text-2xl font-bold text-accent mb-6">Care & Maintenance</h3>
              <div className="space-y-3">
                {cabinet.care.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <SafeIcon icon={FiCheck} className="text-accent mt-0.5 flex-shrink-0 text-sm" />
                    <span className="font-body text-sm text-stone-600 leading-relaxed">{instruction}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
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
              Design This Cabinetry
            </h2>
            <p className="font-body text-base text-stone-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Schedule a design consultation and we'll size the boxes, match the finish, and quote the job.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/appointments">
                <button className="btn-primary">Book Consultation</button>
              </Link>
              <Link to="/cabinets">
                <button className="btn-outline">Browse More Cabinets</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CabinetDetailPage;
```

- [ ] **Step 2: Wire the route into `src/App.jsx`**

Add the import (after `CabinetsPage`):

```jsx
import CabinetDetailPage from './pages/CabinetDetailPage';
```

Add the route inside `<Routes>`, after the `/cabinets` listing route:

```jsx
<Route path="/cabinets/:id" element={<CabinetDetailPage />} />
```

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 4: Manual dev-server check**

Run: `npm run dev`

Navigate to `http://localhost:5173/#/cabinets/1`. Confirm:
- Breadcrumb reads "Back to Cabinets" and navigates to the listing
- Quick specs grid shows **Construction** / Finish / Color / **Wood Species**
- Specifications panel shows Box Construction / Door Style / Finish Type / Hardware / Drawer Glides / Warranty
- Price format is `$420/linear ft`

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/pages/CabinetDetailPage.jsx src/App.jsx
git commit -m "Add Cabinet detail page with cabinet-specific specs"
```

---

## Task 5: Extend Collections dropdown

**Files:**
- Modify: `src/components/Navigation.jsx`

- [ ] **Step 1: Extend the dropdown array**

In `src/components/Navigation.jsx`, find the `navLinks` declaration (currently at line 28) and replace the Collections entry.

**Find:**
```jsx
    {
      name: 'Collections',
      dropdown: [
        { name: 'Natural Stone', path: '/natural-stone' },
        { name: 'Quartz', path: '/quartz' }
      ]
    },
```

**Replace with:**
```jsx
    {
      name: 'Collections',
      dropdown: [
        { name: 'Natural Stone', path: '/natural-stone' },
        { name: 'Quartz', path: '/quartz' },
        { name: 'Shower Panels', path: '/shower-panels' },
        { name: 'Cabinets', path: '/cabinets' }
      ]
    },
```

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Manual dev-server check**

Run: `npm run dev`

Navigate to `http://localhost:5173/`. Confirm:
- Hover over "Collections" in the desktop nav → dropdown shows all 4 items in order: Natural Stone, Quartz, Shower Panels, Cabinets
- Clicking each item navigates to the corresponding listing page
- On mobile (resize browser to < 1024px), open the hamburger menu and confirm the same 4 items appear under the "Collections" label

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navigation.jsx
git commit -m "Add Shower Panels and Cabinets to Collections dropdown"
```

---

## Task 6: Add Shower Panel Consultation to appointments form

**Files:**
- Modify: `src/components/AppointmentsPage.jsx`

- [ ] **Step 1: Extend the `serviceTypes` array**

In `src/components/AppointmentsPage.jsx`, find the `serviceTypes` declaration (currently at line 20) and add one item.

**Find:**
```jsx
  const serviceTypes = [
    'Stone Consultation',
    'Cabinet Design',
    'General Visit',
    'Installation Planning',
    'Maintenance Consultation'
  ];
```

**Replace with:**
```jsx
  const serviceTypes = [
    'Stone Consultation',
    'Shower Panel Consultation',
    'Cabinet Design',
    'General Visit',
    'Installation Planning',
    'Maintenance Consultation'
  ];
```

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 3: Manual dev-server check**

Run: `npm run dev`

Navigate to `http://localhost:5173/#/appointments`. Open the Service Type dropdown and confirm 6 options are listed in this order:

1. Stone Consultation
2. Shower Panel Consultation
3. Cabinet Design
4. General Visit
5. Installation Planning
6. Maintenance Consultation

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add src/components/AppointmentsPage.jsx
git commit -m "Add Shower Panel Consultation to appointments service types"
```

---

## Task 7: Add visual-regression coverage for new routes

**Files:**
- Modify: `tests/visual.spec.js`
- Add new baselines under: `tests/visual.spec.js-snapshots/`

- [ ] **Step 1: Extend the `routes` array**

In `tests/visual.spec.js`, find the `routes` array (currently at lines 4–17) and add four entries.

**Find:**
```js
const routes = [
  { name: 'home-hero',            path: '/',                      scroll: 0 },
  { name: 'home-collections',     path: '/',                      scroll: 900 },
  { name: 'home-cta',             path: '/',                      scroll: 2000 },
  { name: 'natural-stone-hero',   path: '/#/natural-stone',       scroll: 0 },
  { name: 'natural-stone-grid',   path: '/#/natural-stone',       scroll: 800 },
  { name: 'product-detail-hero', path: '/#/natural-stone/1',     scroll: 0 },
  { name: 'product-detail-specs', path: '/#/natural-stone/1',     scroll: 700 },
  { name: 'quartz-hero',          path: '/#/quartz',              scroll: 0 },
  { name: 'quartz-grid',          path: '/#/quartz',              scroll: 800 },
  { name: 'appointments-hero',    path: '/#/appointments',        scroll: 0 },
  { name: 'appointments-form',    path: '/#/appointments',        scroll: 900 },
  { name: 'contact',              path: '/#/contact',             scroll: 0 },
];
```

**Replace with:**
```js
const routes = [
  { name: 'home-hero',            path: '/',                      scroll: 0 },
  { name: 'home-collections',     path: '/',                      scroll: 900 },
  { name: 'home-cta',             path: '/',                      scroll: 2000 },
  { name: 'natural-stone-hero',   path: '/#/natural-stone',       scroll: 0 },
  { name: 'natural-stone-grid',   path: '/#/natural-stone',       scroll: 800 },
  { name: 'product-detail-hero', path: '/#/natural-stone/1',     scroll: 0 },
  { name: 'product-detail-specs', path: '/#/natural-stone/1',     scroll: 700 },
  { name: 'quartz-hero',          path: '/#/quartz',              scroll: 0 },
  { name: 'quartz-grid',          path: '/#/quartz',              scroll: 800 },
  { name: 'shower-panels-hero',   path: '/#/shower-panels',       scroll: 0 },
  { name: 'shower-panels-grid',   path: '/#/shower-panels',       scroll: 800 },
  { name: 'shower-panel-detail-hero',  path: '/#/shower-panels/1', scroll: 0 },
  { name: 'shower-panel-detail-specs', path: '/#/shower-panels/1', scroll: 700 },
  { name: 'cabinets-hero',        path: '/#/cabinets',            scroll: 0 },
  { name: 'cabinets-grid',        path: '/#/cabinets',            scroll: 800 },
  { name: 'cabinet-detail-hero',  path: '/#/cabinets/1',          scroll: 0 },
  { name: 'cabinet-detail-specs', path: '/#/cabinets/1',          scroll: 700 },
  { name: 'appointments-hero',    path: '/#/appointments',        scroll: 0 },
  { name: 'appointments-form',    path: '/#/appointments',        scroll: 900 },
  { name: 'contact',              path: '/#/contact',             scroll: 0 },
];
```

- [ ] **Step 2: Run visual tests to surface missing baselines**

Run: `npm run test:visual`

Expected: the 8 new tests fail with "A snapshot doesn't exist" messages. All pre-existing tests still pass. If any pre-existing test now fails, **stop and investigate** — our new pages should not have regressed the existing ones.

- [ ] **Step 3: Generate baselines for the new routes**

Run: `npm run test:visual:update`

Expected: all tests pass. New PNG files appear under `tests/visual.spec.js-snapshots/` — specifically:
- `shower-panels-hero-*.png`
- `shower-panels-grid-*.png`
- `shower-panel-detail-hero-*.png`
- `shower-panel-detail-specs-*.png`
- `cabinets-hero-*.png`
- `cabinets-grid-*.png`
- `cabinet-detail-hero-*.png`
- `cabinet-detail-specs-*.png`

(The exact filename suffix depends on the Playwright runner — there may be a `-chromium-darwin.png` suffix; that's fine.)

- [ ] **Step 4: Visually inspect the new baselines**

Open each new PNG file and confirm:
- Shower Panels hero: H1 reads "Shower / *Panels*" with italic warm-sienna "Panels"
- Shower Panels grid: 4 cards with panel names and size badges (4x8, 5x10, Custom) in bottom-right
- Shower Panel detail hero: breadcrumb "Back to Shower Panels", product name "Calacatta Marble Panel" in ink
- Shower Panel detail specs: Panel Size / Finish / Color / Material quick-spec grid visible
- Cabinets hero: H1 reads "Custom / *Cabinets*"
- Cabinets grid: 4 cards with door-type badges (Full Overlay, Inset, etc.) in bottom-right; prices show `$/linear ft`
- Cabinet detail hero: breadcrumb "Back to Cabinets", product name "Shaker White Oak" in ink
- Cabinet detail specs: Construction / Finish / Color / Wood Species quick-spec grid visible

If anything looks wrong, fix the source file, re-run `npm run test:visual` (will fail) then `npm run test:visual:update`.

- [ ] **Step 5: Re-run tests to confirm green baseline**

Run: `npm run test:visual`
Expected: all tests pass, including the 8 new ones matching the freshly generated baselines.

- [ ] **Step 6: Commit**

```bash
git add tests/visual.spec.js tests/visual.spec.js-snapshots/
git commit -m "Add visual regression coverage for Shower Panels and Cabinets"
```

---

## Task 8: Update CLAUDE.md scope and architecture sections

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the "Project Scope" section**

In `CLAUDE.md`, find the "Project Scope (updated 2026-04-16)" header and replace the whole section.

**Find:**
```markdown
## Project Scope (updated 2026-04-16)

Client-confirmed scope for the Premium Stones website. Design direction: sharp, structured, sophisticated, high-end.

**In-scope pages:**
- **Home** (`/`) — hero with premium visuals, headline + CTAs; featured product categories preview (Natural Stone, Quartz); quick links to appointments and contact.
- **Natural Stone listing** (`/natural-stone`) — grid/gallery view with filtering (color, style) and search.
- **Quartz listing** (`/quartz`) — same pattern as Natural Stone.
- **Product detail** (`/natural-stone/:id`, `/quartz/:id`) — shared `ProductDetailPage` with image gallery, specifications, description, care instructions.
- **Appointments / Booking** (`/appointments`) — structured in-page booking form. No floating widgets.
- **Contact** (`/contact`) — phone, email, address, business hours.

Slabs, Tiles, Cabinets, Resources, Portfolio, and Catalog were removed on 2026-04-16 to align with the confirmed scope.
```

**Replace with:**
```markdown
## Project Scope (updated 2026-04-22)

Client-confirmed scope for the Premium Stones website. Design direction: sharp, structured, sophisticated, high-end.

**In-scope pages:**
- **Home** (`/`) — hero with premium visuals, headline + CTAs; featured product categories preview (Natural Stone, Quartz only — the dropdown surfaces the full set); quick links to appointments and contact.
- **Natural Stone listing** (`/natural-stone`) — grid/gallery view with filtering (type, color, finish, origin) and search.
- **Quartz listing** (`/quartz`) — same pattern as Natural Stone.
- **Shower Panels listing** (`/shower-panels`) — filters on material, color, size, finish.
- **Cabinets listing** (`/cabinets`) — filters on style, wood, color, door type.
- **Product detail pages:**
  - `/natural-stone/:id` and `/quartz/:id` share `ProductDetailPage` (stone-centric specs).
  - `/shower-panels/:id` uses dedicated `ShowerPanelDetailPage` (panel-centric specs: thickness, substrate, edge treatment, etc.).
  - `/cabinets/:id` uses dedicated `CabinetDetailPage` (cabinet-centric specs: box construction, door style, hardware, etc.).
- **Appointments / Booking** (`/appointments`) — structured in-page booking form. No floating widgets.
- **Contact** (`/contact`) — phone, email, address, business hours.

History: Slabs, Tiles, Cabinets, Resources, Portfolio, and Catalog were removed on 2026-04-16. On 2026-04-22 the client reinstated Cabinets and added Shower Panels as a net-new category; the other removals remain out of scope.
```

- [ ] **Step 2: Update the "Architecture" section**

In `CLAUDE.md`, find the "Pages vs Components" paragraph in the Architecture section.

**Find:**
```markdown
**Pages vs Components**: `src/pages/` are route-level containers; `src/components/` are reusable UI pieces composed inside pages. Some route files wrap same-named components (e.g., `pages/AppointmentsPage.jsx` is a thin shell that imports `components/AppointmentsPage.jsx`; `pages/ContactPage.jsx` wraps `components/ContactSection.jsx`).
```

**Replace with:**
```markdown
**Pages vs Components**: `src/pages/` are route-level containers; `src/components/` are reusable UI pieces composed inside pages. Some route files wrap same-named components (e.g., `pages/AppointmentsPage.jsx` is a thin shell that imports `components/AppointmentsPage.jsx`; `pages/ContactPage.jsx` wraps `components/ContactSection.jsx`).

**Detail pages — three peers, not one shared:** `ProductDetailPage.jsx` serves both Natural Stone and Quartz (it dispatches between them via `useLocation`). Shower Panels and Cabinets each have their own dedicated detail page (`ShowerPanelDetailPage.jsx`, `CabinetDetailPage.jsx`) because their specifications don't map onto stone vocabulary (panels have substrate / water absorption / install system; cabinets have box construction / door style / hardware). The three detail pages share ~80% of their structure; consolidating them with a fourth category would be a useful refactor, but with three categories the duplication is still cheaper than the abstraction.
```

- [ ] **Step 3: Update the heading carve-out paragraph**

In `CLAUDE.md`, find the "Heading carve-out" paragraph.

**Find:**
```markdown
**Heading carve-out** (important — comments in source flag this so it's not "fixed" as an inconsistency): product-name H1 on `ProductDetailPage` and product-card H3s inside product-grid loops on `HomePage`/`NaturalStonePage`/`QuartzPage` intentionally stay `text-surface-dark` (ink). Orange on those would compete with product photography. Full design rule: `docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`.
```

**Replace with:**
```markdown
**Heading carve-out** (important — comments in source flag this so it's not "fixed" as an inconsistency): product-name H1 on all three detail pages (`ProductDetailPage`, `ShowerPanelDetailPage`, `CabinetDetailPage`) and product-card H3s inside product-grid loops on `HomePage`/`NaturalStonePage`/`QuartzPage`/`ShowerPanelsPage`/`CabinetsPage` intentionally stay `text-surface-dark` (ink). Orange on those would compete with product photography. Full design rule: `docs/superpowers/specs/2026-04-22-orange-white-theme-design.md`.
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "Update CLAUDE.md for 8-page scope and peer detail components"
```

---

## Task 9: Update PROGRESS.md revision log

**Files:**
- Modify: `PROGRESS.md`

- [ ] **Step 1: Update the "Current state" section**

In `PROGRESS.md`, find and replace the "Current state" block.

**Find:**
```markdown
## Current state (as of 2026-04-22)

- **Pages live:** Home, Natural Stone listing + detail, Quartz listing + detail, Appointments, Contact.
- **Palette:** terracotta `#B8431E` + warm sienna `#E07A3C` + peach-cream veil `#FBEBDD` on near-white `#FAFAF9` / near-black `#1C1917`. See `CLAUDE.md` "Palette" section.
- **Typography:** Cormorant serif (display) + Montserrat sans (body). Unchanged since editorial revamp.
- **Data:** All product data is mocked in-component. Supabase is installed but not wired up.
- **Testing:** Playwright visual regression covers all 6 routes — 12 baseline screenshots in `tests/visual.spec.js-snapshots/`. Run `npm run test:visual` before committing any user-facing change.
- **Open items:** none currently tracked. If client feedback arrives, new revision rounds get their own spec + plan + changelog entry and append to the log below.
```

**Replace with:**
```markdown
## Current state (as of 2026-04-22)

- **Pages live:** Home, Natural Stone listing + detail, Quartz listing + detail, Shower Panels listing + detail, Cabinets listing + detail, Appointments, Contact. (8 pages total, up from 6.)
- **Palette:** terracotta `#B8431E` + warm sienna `#E07A3C` + peach-cream veil `#FBEBDD` on near-white `#FAFAF9` / near-black `#1C1917`. See `CLAUDE.md` "Palette" section.
- **Typography:** Cormorant serif (display) + Montserrat sans (body). Unchanged since editorial revamp.
- **Data:** All product data is mocked in-component. Supabase is installed but not wired up.
- **Testing:** Playwright visual regression covers 10 routes — 20 baseline screenshots in `tests/visual.spec.js-snapshots/`. Run `npm run test:visual` before committing any user-facing change.
- **Open items:** none currently tracked. If client feedback arrives, new revision rounds get their own spec + plan + changelog entry and append to the log below.
```

- [ ] **Step 2: Prepend a new revision log entry**

In `PROGRESS.md`, find the "## Revision log" heading. `PROGRESS.md` is reverse-chronological, so the new entry (most recent) goes at the top of the log, between `## Revision log` and the existing `### 2026-04-22 — Orange/white theme retheme` block.

**Insert immediately after the line `## Revision log`, pushing the existing `### 2026-04-22 — Orange/white theme retheme` entry below it:**
```markdown

### 2026-04-22 — Shower Panels and Cabinets categories

Added two new product categories (Shower Panels, Cabinets) to the Collections dropdown, each with its own listing page and dedicated detail page. Partially reversed the 2026-04-16 scope pruning for Cabinets; Shower Panels is a net-new category. Home page and existing stone/quartz pages untouched. Three detail components now: stone/quartz shared via `useLocation` dispatch, plus peer `ShowerPanelDetailPage` and `CabinetDetailPage` with category-appropriate specs. Visual regression extended from 12 to 20 baselines.

- **Spec:** [`docs/superpowers/specs/2026-04-22-new-categories-design.md`](docs/superpowers/specs/2026-04-22-new-categories-design.md)
- **Plan:** [`docs/superpowers/plans/2026-04-22-new-categories.md`](docs/superpowers/plans/2026-04-22-new-categories.md)
- **Client changelog (with before/after visuals):** [`docs/changelog/2026-04-22-new-categories.md`](docs/changelog/2026-04-22-new-categories.md)
- **Commits:** see `git log` for SHA range on `main`
```

The resulting structure in `PROGRESS.md`:
```
## Revision log

### 2026-04-22 — Shower Panels and Cabinets categories
(new, just inserted)

### 2026-04-22 — Orange/white theme retheme
(existing)

### 2026-04-16 — Editorial luxury revamp + scope pruning
(existing)

### Pre-2026-04-16 — Initial build
(existing)
```

- [ ] **Step 3: Commit**

```bash
git add PROGRESS.md
git commit -m "Update PROGRESS.md with new-categories revision entry"
```

---

## Task 10: Create client changelog

**Files:**
- Create: `docs/changelog/2026-04-22-new-categories.md`

- [ ] **Step 1: Create the changelog file**

Create the file `docs/changelog/2026-04-22-new-categories.md` with this content:

```markdown
# 2026-04-22 — Shower Panels and Cabinets categories

Two new collections added to the site, both discoverable from the **Collections** dropdown in the top nav.

## What's new

### Shower Panels (`/shower-panels`)

A new category page featuring large-format shower panels in marble, quartz, porcelain, and laminate. Filter by material, color, size, and finish. Click any product to see a dedicated detail page with panel-specific specs — thickness, substrate, water absorption, edge treatment, install system, and fire rating.

### Cabinets (`/cabinets`)

A new category page for custom cabinetry — kitchen, vanity, built-in. Filter by style (Shaker / Flat Panel / Raised Panel / Slab), wood (oak, maple, walnut, cherry, painted MDF), color, and door type (full overlay, inset, partial). Detail pages show box construction, door style, hardware, drawer glides, and warranty.

### Appointments form

The Service Type dropdown on `/appointments` now includes "Shower Panel Consultation" alongside the existing options.

## What did not change

- **Home page** — unchanged. The featured-categories section still shows Natural Stone and Quartz. The new categories are accessible via the Collections dropdown.
- **Natural Stone and Quartz pages** — unchanged. Visual regression baselines for those pages still match pixel-for-pixel.
- **Palette, typography, and layout language** — unchanged. The new pages reuse the same editorial look introduced in the 2026-04-22 orange/white retheme.

## Before / after

(Screenshots to be added when the work is committed. Place in `docs/changelog/assets/2026-04-22-new-categories/` and embed below.)

- Before: Collections dropdown — 2 items (Natural Stone, Quartz)
- After: Collections dropdown — 4 items (Natural Stone, Quartz, Shower Panels, Cabinets)
- After: Shower Panels listing hero
- After: Shower Panels detail page
- After: Cabinets listing hero
- After: Cabinets detail page

## Source

- Spec: [`docs/superpowers/specs/2026-04-22-new-categories-design.md`](../superpowers/specs/2026-04-22-new-categories-design.md)
- Plan: [`docs/superpowers/plans/2026-04-22-new-categories.md`](../superpowers/plans/2026-04-22-new-categories.md)
```

- [ ] **Step 2: Commit**

```bash
git add docs/changelog/2026-04-22-new-categories.md
git commit -m "Add client changelog for new categories"
```

---

## Task 11: Add "swapping mock products" recipe to HOW-TO-REVISE

**Files:**
- Modify: `docs/HOW-TO-REVISE.md`

- [ ] **Step 1: Inspect the current HOW-TO-REVISE structure**

Read `docs/HOW-TO-REVISE.md` to understand the existing recipe format, then append a new recipe at the end that matches the existing style.

- [ ] **Step 2: Append the recipe**

Add a new section at the bottom of `docs/HOW-TO-REVISE.md`:

```markdown

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
```

- [ ] **Step 3: Commit**

```bash
git add docs/HOW-TO-REVISE.md
git commit -m "Add HOW-TO-REVISE recipe for swapping mock product data"
```

---

## Final verification

After all 11 tasks are complete:

- [ ] **Run the full build one more time**

Run: `npm run build`
Expected: clean build, no errors.

- [ ] **Run visual regression**

Run: `npm run test:visual`
Expected: all 20 tests pass (12 pre-existing + 8 new).

- [ ] **Spot-check the nav flow end-to-end**

Run: `npm run dev`

- Navigate to `/` → hover Collections → verify 4 items.
- Click each of the 4 Collections items → verify each listing renders.
- Click the first product on each listing → verify each detail page renders with correct breadcrumb.
- Navigate to `/#/appointments` → verify Service Type dropdown has 6 options.

Stop the dev server.

- [ ] **Sanity-check git log**

Run: `git log --oneline main ^HEAD~12`
(Adjust the `~12` count to include all commits from Tasks 1–11.)

Expected: clean sequence of 11 focused commits, one per task, with clear messages.
