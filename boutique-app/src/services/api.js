import { supabase, SETTINGS_ID, STORAGE_BUCKET } from '../lib/supabase'
import { compressImage } from '../lib/utils'

function db() {
  if (!supabase) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
  return supabase
}

// ─── Products ─────────────────────────────────────────────
export async function createProduct(payload) {
  const { data, error } = await db().from('products').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateProduct(id, payload) {
  const { data, error } = await db().from('products').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await db().from('products').delete().eq('id', id)
  if (error) throw error
}

// ─── Categories ───────────────────────────────────────────
export async function createCategory(name) {
  const { data, error } = await db().from('categories').insert({ name }).select().single()
  if (error) throw error
  return data
}

export async function updateCategory(id, name) {
  const { data, error } = await db().from('categories').update({ name }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteCategory(id) {
  const { error } = await db().from('categories').delete().eq('id', id)
  if (error) throw error
}

// ─── Promotions ───────────────────────────────────────────
export async function createPromotion(payload) {
  const { data, error } = await db().from('promotions').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updatePromotion(id, payload) {
  const { data, error } = await db().from('promotions').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deletePromotion(id) {
  const { error } = await db().from('promotions').delete().eq('id', id)
  if (error) throw error
}

// ─── Settings ─────────────────────────────────────────────
export async function updateSettings(payload) {
  const { data, error } = await db()
    .from('settings')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', SETTINGS_ID)
    .select()
    .single()
  if (error) throw error
  return data
}

// ─── Storage ──────────────────────────────────────────────
export async function uploadProductImage(file) {
  const blob = await compressImage(file)
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
  const { error } = await db().storage.from(STORAGE_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  })
  if (error) throw error
  const { data } = db().storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function updateProfileRole(userId, role) {
  const { error } = await db().from('profiles').update({ role }).eq('id', userId)
  if (error) throw error
}
