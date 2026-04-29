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
