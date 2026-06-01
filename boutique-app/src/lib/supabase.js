import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL?.trim()
const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

/** False when Vercel/local build has no Supabase env vars (app still renders). */
export const isSupabaseConfigured = Boolean(url && key)

if (!isSupabaseConfigured && import.meta.env.PROD) {
  console.error(
    '[The Dollies] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
      'Add them in Vercel → Project → Settings → Environment Variables, then redeploy.'
  )
}

export const supabase = isSupabaseConfigured ? createClient(url, key) : null

export const SETTINGS_ID = '00000000-0000-0000-0000-000000000001'
export const STORAGE_BUCKET = 'product-images'
