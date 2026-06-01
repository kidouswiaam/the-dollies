import { supabase, SETTINGS_ID, STORAGE_BUCKET } from '../lib/supabase'
import { compressImage } from '../lib/utils'

// ─── Products ─────────────────────────────────────────────
export async function createProduct(payload) {
  const { data, error } = await supabase.from('products').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateProduct(id, payload) {
  const { data, error } = await supabase.from('products').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// ─── Categories ───────────────────────────────────────────
export async function createCategory(name) {
  const { data, error } = await supabase.from('categories').insert({ name }).select().single()
  if (error) throw error
  return data
}

export async function updateCategory(id, name) {
  const { data, error } = await supabase.from('categories').update({ name }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteCategory(id) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}

// ─── Promotions ───────────────────────────────────────────
export async function createPromotion(payload) {
  const { data, error } = await supabase.from('promotions').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updatePromotion(id, payload) {
  const { data, error } = await supabase.from('promotions').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deletePromotion(id) {
  const { error } = await supabase.from('promotions').delete().eq('id', id)
  if (error) throw error
}

// ─── Settings ─────────────────────────────────────────────
export async function updateSettings(payload) {
  const { data, error } = await supabase
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
  const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, blob, {
    contentType: 'image/jpeg',
    upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function updateProfileRole(userId, role) {
  const { error } = await supabase.from('profiles').update({ role }).eq('id', userId)
  if (error) throw error
}
