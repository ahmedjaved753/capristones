import { stoneImageUrl } from '../lib/supabase'

// 25 client-supplied photos in the public 'stones' Supabase bucket, mapped to
// the named products on capristones.com/natural-stone (the client's existing
// site). Each stone uses its supplied IMG_*.PNG/JPG as the catalog-card hero
// AND the first gallery thumbnail; positions 2–4 in the gallery come from
// additional reference imagery the client has uploaded as <slug>-<n>.jpg.
//
// Slugs intentionally match capristones.com URLs so the inventory line-up is
// recognizable to anyone who already knows the legacy site. Two products
// appear twice — Dakar and Calacatta — because the client photographed two
// different cuts of each; each cut gets a unique slug (`<slug>` and
// `<slug>-2`) so URLs are unique.
//
// Per-stone `size` and (optional) `color` come from each product's cs.com
// detail page (parsed from the og:description meta tag, round 2026-05-06).
// Thickness is universally `3/4"` across cs.com's natural-stone catalog so
// it lives in the SHARED block below rather than per-stone. Finish is
// `Polished` for every product except Cygnus (Leathered) — also handled in
// the per-stone block.
//
// Schema mirrors what capristones.com shows on each detail page (MATERIAL /
// SIZE / THICKNESS), replacing the previous Origin/Finish/Material trio that
// preceded the round. ProductDetailPage renders these three fields for
// natural stone; quartz still uses the older Origin/Finish/Material schema.

const SHARED_THICKNESS = '3/4"'
const baseApplications = ['Countertops', 'Backsplashes', 'Flooring', 'Wall Cladding']

// `material` is the specific classification (Quartzite / Marble / Granite /
// Onyx) — for products where cs.com generically lists "Natural Stone" we
// keep the specific material here for filterability and UI clarity.
//
// Low-confidence flag: where the visually-matched local photo doesn't
// clearly correspond to the cs.com og:image hero, we keep the cs.com name
// (because cuts can look different) but note it inline. IMG_1862 was
// previously named "Amazon Quartzite" but cs.com Amazon is color=Green and
// the photo is white-with-black-veining; reassigned as Calacatta 2nd cut.

const stones = [
  {
    id: 'white-macaubas-quartzite',
    name: 'White Macaubas Quartzite',
    material: 'Quartzite',
    size: '118" X 66"',
    main: 'IMG_1636.PNG',
    extras: ['white-macaubas-quartzite-2.jpg', 'white-macaubas-quartzite-3.jpg', 'white-macaubas-quartzite-4.jpg'],
  },
  {
    id: 'mustang',
    name: 'Mustang',
    material: 'Quartzite',
    size: '128" X 69"',
    main: 'IMG_1637.PNG',
    extras: ['mustang-2.jpg', 'mustang-3.jpg'],
  },
  {
    id: 'black-diamond-quartzite',
    name: 'Black Diamond Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1642.jpg',
    extras: ['black-diamond-quartzite-2.jpg', 'black-diamond-quartzite-3.jpg'],
  },
  {
    id: 'brilliant-black-quartzite',
    name: 'Brilliant Black Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1643.PNG',
    extras: ['brilliant-black-quartzite-2.jpg', 'brilliant-black-quartzite-3.jpg'],
  },
  {
    id: 'dakar',
    name: 'Dakar',
    material: 'Quartzite',
    size: '127" X 76"',
    main: 'IMG_1644.PNG',
    extras: ['dakar-2.jpg', 'dakar-3.jpg', 'dakar-4.jpg'],
  },
  {
    id: 'everest',
    name: 'Everest',
    material: 'Granite',
    size: '119" X 80"',
    main: 'IMG_1647.PNG',
    extras: ['everest-2.jpg', 'everest-3.jpg', 'everest-4.jpg'],
  },
  {
    id: 'rocky-mountain-quartzite',
    name: 'Rocky Mountain Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1652.PNG',
    extras: ['rocky-mountain-quartzite-2.jpg', 'rocky-mountain-quartzite-3.jpg'],
  },
  {
    id: 'dakar-2',
    name: 'Dakar',
    material: 'Quartzite',
    size: '127" X 76"',
    // Second cut of the same product — bolder banding than the soft cut above.
    // Detail page shares the Dakar reference gallery; only the hero differs.
    main: 'IMG_1654.PNG',
    extras: ['dakar-2.jpg', 'dakar-3.jpg', 'dakar-4.jpg'],
  },
  {
    id: 'calabata-white-quartzite',
    name: 'Calabata White Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1656.PNG',
    extras: ['calabata-white-quartzite-2.jpg', 'calabata-white-quartzite-3.jpg'],
  },
  {
    id: 'lavezzi-quartzite',
    name: 'Lavezzi Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1837.PNG',
    extras: ['lavezzi-quartzite-2.jpg', 'lavezzi-quartzite-3.jpg'],
  },
  {
    id: 'genova',
    name: 'Genova',
    material: 'Marble',
    size: '120" X 76"',
    main: 'IMG_1838.jpg',
    extras: ['genova-2.jpg', 'genova-3.jpg', 'genova-4.jpg'],
  },
  {
    id: 'calacatta',
    name: 'Calacatta',
    material: 'Marble',
    size: '120" X 78"',
    main: 'IMG_1842.PNG',
    extras: ['calacatta-2.jpg', 'calacatta-3.jpg', 'calacatta-4.jpg'],
  },
  {
    id: 'kristallus',
    name: 'Kristallus',
    material: 'Quartzite',
    size: '100" X 55"',
    main: 'IMG_1844.PNG',
    extras: ['kristallus-2.jpg', 'kristallus-3.jpg'],
  },
  {
    id: 'monaco',
    name: 'Monaco',
    material: 'Quartzite',
    size: '134" X 70"',
    main: 'IMG_1847.PNG',
    extras: ['monaco-2.jpg', 'monaco-3.jpg'],
  },
  {
    id: 'copenhagen-quartzite',
    name: 'Copenhagen Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1850.jpg',
    extras: ['copenhagen-quartzite-2.jpg', 'copenhagen-quartzite-3.jpg'],
  },
  {
    id: 'arabescato',
    name: 'Arabescato',
    material: 'Marble',
    // Arabescato's capristones.com detail page 404s — no extra gallery imagery
    // available, and no scraped size from cs.com. Size left blank; UI hides
    // the field for products without a size. Detail page renders with just
    // the hero until the client supplies more.
    size: '',
    main: 'IMG_1852.PNG',
    extras: [],
  },
  {
    id: 'leblon-quartzite',
    name: 'Leblon Quartzite',
    material: 'Quartzite',
    size: '127" X 76"',
    main: 'IMG_1854.PNG',
    extras: ['leblon-quartzite-2.jpg', 'leblon-quartzite-3.jpg'],
  },
  {
    id: 'taj-mahal-quartzite',
    name: 'Taj Mahal Quartzite',
    material: 'Quartzite',
    // cs.com classifies Taj Mahal as Marble; industry consensus treats it as
    // a quartzite (it's silica-rich). We keep Quartzite for accuracy.
    size: '130" X 80"',
    main: 'IMG_1856.PNG',
    extras: ['taj-mahal-quartzite-2.jpg', 'taj-mahal-quartzite-3.jpg', 'taj-mahal-quartzite-4.jpg'],
  },
  {
    id: 'luxury-white-quartzite',
    name: 'White Macaubas Quartzite',
    material: 'Quartzite',
    size: '117" X 77"',
    // Capristones lists this as a sibling to White Macaubas (its slug there is
    // white-macaubas-quartzite-2). Internally we use `luxury-white-quartzite`
    // so the URL is unique without the awkward "-2" suffix.
    main: 'IMG_1858.PNG',
    extras: ['luxury-white-quartzite-2.jpg', 'luxury-white-quartzite-3.jpg', 'luxury-white-quartzite-4.jpg'],
  },
  {
    id: 'vibranium-quartzite',
    name: 'Vibranium Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1860.PNG',
    extras: ['vibranium-quartzite-2.jpg', 'vibranium-quartzite-3.jpg'],
  },
  {
    id: 'calacatta-2',
    name: 'Calacatta',
    material: 'Marble',
    size: '120" X 78"',
    // Second cut of Calacatta — bolder black diagonal veining than the soft
    // cut above. Originally mislabelled as "Amazon Quartzite" until
    // 2026-05-06 — cs.com Amazon is color=Green so a white-with-black slab
    // can't be Amazon. Reassigned as a Calacatta variant; gallery reuses
    // Calacatta reference photos until client provides cut-specific imagery.
    main: 'IMG_1862.jpg',
    extras: ['calacatta-2.jpg', 'calacatta-3.jpg', 'calacatta-4.jpg'],
  },
  {
    id: 'titanio',
    name: 'Titanio',
    material: 'Quartzite',
    size: '126" X 78"',
    main: 'IMG_1864.PNG',
    extras: ['titanio-2.jpg', 'titanio-3.jpg', 'titanio-4.jpg'],
  },
  {
    id: 'panda',
    name: 'Panda',
    material: 'Marble',
    size: '120" X 82"',
    main: 'IMG_1867.PNG',
    extras: ['panda-2.jpg', 'panda-3.jpg', 'panda-4.jpg'],
  },
  {
    id: 'alpine-white-quartzite',
    name: 'Alpine White Quartzite',
    material: 'Quartzite',
    size: '112" X 78"',
    main: 'IMG_1869.PNG',
    extras: ['alpine-white-quartzite-2.jpg', 'alpine-white-quartzite-3.jpg'],
  },
  {
    id: 'onyx-bianco',
    name: 'Onyx Bianco',
    material: 'Onyx',
    size: '109" X 68"',
    main: 'IMG_1877.PNG',
    extras: ['onyx-bianco-2.jpg', 'onyx-bianco-3.jpg', 'onyx-bianco-4.jpg'],
  },
]

export const naturalStones = stones.map(({ id, name, material, size, main, extras }) => ({
  id,
  name,
  material,
  size,
  thickness: SHARED_THICKNESS,
  // Origin and Finish kept on the data shape so listing-page filter UI and
  // any consumer of the older API continues to work — they're just not
  // rendered on the detail page anymore (cs.com schema doesn't show them).
  origin: 'Brazil',
  finish: 'Polished',
  applications: baseApplications,
  image: stoneImageUrl(main),
  gallery: [stoneImageUrl(main), ...extras.map(stoneImageUrl)],
}))
