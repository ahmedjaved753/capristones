import { quartzImageUrl } from '../lib/supabase'

// 25 products from the public 'quartz' Supabase Storage bucket.
// Imagery sourced from Capri Stones with client-confirmed permission
// (round 2026-05-06). Display names came from each product's
// detail-page <h1>; spec metadata (color, pattern, etc.) is inferred
// from the product name where possible, otherwise carries a sensible
// default. Client to supply real metadata in a later round.
const products = [
  { slug: 'venetian-white',    file: 'venetian-white.jpg',    name: 'Venetian White',    color: 'White', pattern: 'Veined'},
  { slug: 'calacatta-negro',   file: 'calacatta-negro.jpg',   name: 'Calacatta Negro',   color: 'Black', pattern: 'Veined' },
  { slug: 'rio-light',         file: 'rio-light.jpg',         name: 'Rio Light',         color: 'White', pattern: 'Veined' },
  { slug: 'calacatta-gold',    file: 'calacatta-gold.jpg',    name: 'Calacatta Gold',    color: 'White', pattern: 'Veined'},
  { slug: 'calacatta-gold-lq', file: 'calacatta-gold-lq.jpg', name: 'Calacatta Gold LQ', color: 'White', pattern: 'Veined' },
  { slug: 'carrara-riva',      file: 'carrara-riva.jpg',      name: 'Carrara Riva',      color: 'White', pattern: 'Veined'},
  { slug: '8130',              file: '8130.jpg',              name: '8130',              color: 'White', pattern: 'Veined' },
  { slug: 'placid',            file: 'placid.png',            name: 'Placid',            color: 'White', pattern: 'Veined' },
  { slug: 'idyllic',           file: 'idyllic.jpg',           name: 'Idyllic',           color: 'White', pattern: 'Veined' },
  { slug: 'artic-gray',        file: 'artic-gray.jpg',        name: 'Artic Gray',        color: 'Gray',  pattern: 'Solid'  },
  { slug: 'intricate',         file: 'intricate.jpg',         name: 'Intricate',         color: 'White', pattern: 'Veined' },
  { slug: 'steel-gray',        file: 'steel-gray.png',        name: 'Steel Gray',        color: 'Gray',  pattern: 'Solid'  },
  { slug: 'integrity',         file: 'integrity.jpg',         name: 'Integrity',         color: 'White', pattern: 'Speckled' },
  { slug: 'argento',           file: 'argento.jpg',           name: 'Argento',           color: 'Gray',  pattern: 'Speckled' },
  { slug: 'dreamy',            file: 'dreamy.png',            name: 'Dreamy',            color: 'White', pattern: 'Veined' },
  { slug: 'urban',             file: 'urban.jpg',             name: 'Urban',             color: 'White', pattern: 'Speckled' },
  { slug: 'avenza',            file: 'avenza.png',            name: 'Avenza',            color: 'White', pattern: 'Veined' },
  { slug: '8038',              file: '8038.png',              name: '8038',              color: 'White', pattern: 'Veined' },
  { slug: '8083',              file: '8083.png',              name: '8083',              color: 'White', pattern: 'Veined' },
  { slug: '1002',              file: '1002.jpg',              name: '1002',              color: 'White', pattern: 'Veined' },
  { slug: '1006',              file: '1006.jpg',              name: '1006',              color: 'White', pattern: 'Veined' },
  { slug: '1007',              file: '1007.jpg',              name: '1007',              color: 'White', pattern: 'Veined' },
  { slug: '1008',              file: '1008.jpg',              name: '1008',              color: 'Gray',  pattern: 'Speckled' },
  { slug: '1009',              file: '1009.jpg',              name: '1009',              color: 'White', pattern: 'Veined' },
  { slug: '1010',              file: '1010.jpg',              name: '1010',              color: 'White', pattern: 'Veined' },
]

// Standard fields applied uniformly — engineered quartz characteristics.
// All Capri-sourced quartz is sold under the Premium Stones house brand;
// no upstream brand differentiation is exposed. `description` is what the
// listing-page search input matches against; not rendered on the card.
const STANDARD = {
  brand: 'Premium Stones',
  finish: 'Polished',
  material: 'Quartz',
  origin: 'Engineered',
  description: 'Premium engineered quartz surface with consistent color and exceptional durability.',
  applications: ['Countertops', 'Backsplashes', 'Islands'],
}

export const quartzProducts = products.map((p) => {
  const url = quartzImageUrl(p.file)
  return {
    id: p.slug,
    name: p.name,
    color: p.color,
    pattern: p.pattern,
    image: url,
    gallery: [url],
    ...STANDARD,
  }
})
