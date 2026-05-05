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
