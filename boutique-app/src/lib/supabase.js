import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !key) {
  console.warn(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Copy .env.example to .env and add your Supabase credentials.'
  )
}

export const supabase = createClient(url || '', key || '')
export const SETTINGS_ID = '00000000-0000-0000-0000-000000000001'
export const STORAGE_BUCKET = 'product-images'
