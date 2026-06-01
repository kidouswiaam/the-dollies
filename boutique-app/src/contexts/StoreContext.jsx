import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'

const StoreContext = createContext()

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [promotions, setPromotions] = useState([])
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    const [p, c, pr, s] = await Promise.all([
      supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
      supabase.from('promotions').select('*').order('created_at', { ascending: false }),
      supabase.from('settings').select('*').single(),
    ])
    if (p.data) setProducts(p.data)
    if (c.data) setCategories(c.data)
    if (pr.data) setPromotions(pr.data)
    if (s.data) setSettings(s.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()

    const channels = [
      supabase.channel('products').on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        supabase.from('products').select('*, categories(name)').order('created_at', { ascending: false }).then(({ data }) => data && setProducts(data))
      }),
      supabase.channel('categories').on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, () => {
        supabase.from('categories').select('*').order('name').then(({ data }) => data && setCategories(data))
      }),
      supabase.channel('promotions').on('postgres_changes', { event: '*', schema: 'public', table: 'promotions' }, () => {
        supabase.from('promotions').select('*').order('created_at', { ascending: false }).then(({ data }) => data && setPromotions(data))
      }),
      supabase.channel('settings').on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, () => {
        supabase.from('settings').select('*').single().then(({ data }) => data && setSettings(data))
      }),
    ]

    channels.forEach((ch) => ch.subscribe())
    return () => channels.forEach((ch) => supabase.removeChannel(ch))
  }, [fetchAll])

  const activePromotions = promotions.filter((p) => p.is_active)
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        promotions,
        activePromotions,
        settings,
        featuredProducts,
        loading,
        refresh: fetchAll,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
