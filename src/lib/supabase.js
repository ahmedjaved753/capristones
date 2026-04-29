import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in .env.local (see .env.example).'
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)

export const stoneImageUrl = (filename) =>
  supabase.storage.from('stones').getPublicUrl(filename).data.publicUrl
