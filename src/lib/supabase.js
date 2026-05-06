import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

const hasCredentials = Boolean(supabaseUrl && supabasePublishableKey)

if (!hasCredentials) {
  // Soft-fail rather than throw: a missing env var would otherwise crash the
  // entire app at module load (this file is now imported transitively from
  // every page via src/data/naturalStones.js). Loud-but-non-fatal lets the
  // rest of the site render while making the deploy misconfig obvious in the
  // console. Set VITE_SUPABASE_URL + VITE_SUPABASE_PUBLISHABLE_KEY at build
  // time to fix (see .env.example).
  console.error(
    'Missing Supabase env vars. Natural Stone imagery will not load. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY at build time ' +
    '(see .env.example).'
  )
}

export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null

export const stoneImageUrl = (filename) =>
  supabase?.storage.from('stones').getPublicUrl(filename).data.publicUrl ?? ''

export const quartzImageUrl = (filename) =>
  supabase?.storage.from('quartz').getPublicUrl(filename).data.publicUrl ?? ''

// Hero slideshow imagery on HomePage. Falls back to the local /hero/ copy in
// /public when Supabase isn't configured (or before the bucket is populated)
// so the homepage still renders during dev / first deploy. Once the bucket is
// live, no code change is needed — the Supabase URL takes over automatically.
export const heroImageUrl = (filename) =>
  supabase?.storage.from('hero-section').getPublicUrl(filename).data.publicUrl
    ?? `/hero/${filename}`

// Local fallback path for a hero filename — the same `/hero/<filename>` shape
// `heroImageUrl` returns when Supabase isn't configured. Use this with an
// img `onError` so a slide whose filename hasn't been uploaded to the bucket
// yet still renders from the bundled copy. This is the "transitional" state
// after a slide is renamed locally but before the client uploads the new
// bytes — without it the img would 404 and the hero would go black.
export const heroImageLocalFallback = (filename) => `/hero/${filename}`
