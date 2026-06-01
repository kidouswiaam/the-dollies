import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../contexts/StoreContext'
import { createProduct, updateProduct } from '../../services/api'
import { PRODUCT_TYPE } from '../../lib/productTypes'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ImageUpload from '../../components/admin/ImageUpload'
import toast from 'react-hot-toast'

const empty = {
  name: '',
  description: '',
  price: '',
  old_price: '',
  promotion: 0,
  product_type: PRODUCT_TYPE.DOLL,
  stock: 0,
  featured: false,
  is_new: false,
  image_urls: [],
}

export default function ProductForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { products } = useStore()
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const isPattern = form.product_type === PRODUCT_TYPE.PATTERN

  useEffect(() => {
    if (isEdit) {
      const p = products.find((x) => x.id === id)
      if (p) {
        const type =
          p.product_type === PRODUCT_TYPE.PATTERN || p.product_type === 'digital'
            ? PRODUCT_TYPE.PATTERN
            : PRODUCT_TYPE.DOLL
        setForm({
          name: p.name,
          description: p.description || '',
          price: p.price,
          old_price: p.old_price || '',
          promotion: p.promotion || 0,
          product_type: type,
          stock: p.stock,
          featured: p.featured,
          is_new: p.is_new || false,
          image_urls: p.image_urls || [],
        })
      }
    }
  }, [id, isEdit, products])

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || form.price === '') {
      toast.error('Name and price are required')
      return
    }
    setSaving(true)
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      old_price: form.old_price ? Number(form.old_price) : null,
      promotion: Number(form.promotion) || 0,
      category_id: null,
      product_type: form.product_type,
      stock: isPattern ? 999 : Number(form.stock) || 0,
      featured: form.featured,
      is_new: form.is_new,
      image_urls: form.image_urls,
    }
    try {
      if (isEdit) {
        await updateProduct(id, payload)
        toast.success('Product updated')
      } else {
        await createProduct(payload)
        toast.success('Product created')
      }
      navigate('/admin/products')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl font-semibold mb-2">{isEdit ? 'Edit Product' : 'New Product'}</h1>
      <p className="text-stone-500 text-sm mb-8">Category: Dolls (physical) or Patterns (digital PDF)</p>

      <form onSubmit={handleSubmit} className="space-y-6 glass rounded-2xl p-6">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-primary mb-2">Product type *</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => set('product_type', PRODUCT_TYPE.DOLL)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                !isPattern ? 'border-primary bg-primary/10' : 'border-stone-200'
              }`}
            >
              <span className="text-2xl">🧸</span>
              <p className="font-semibold mt-2">Dolls</p>
              <p className="text-xs text-stone-500">Physical handmade doll</p>
            </button>
            <button
              type="button"
              onClick={() => set('product_type', PRODUCT_TYPE.PATTERN)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isPattern ? 'border-primary bg-primary/10' : 'border-stone-200'
              }`}
            >
              <span className="text-2xl">📄</span>
              <p className="font-semibold mt-2">Patterns</p>
              <p className="text-xs text-stone-500">Digital PDF download</p>
            </button>
          </div>
        </div>

        <Input label="Name *" value={form.name} onChange={(e) => set('name', e.target.value)} required />
        <label className="block">
          <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Description</span>
          <textarea
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg border border-accent bg-white"
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Price *" type="number" step="0.01" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} required />
          <Input label="Old price (sale)" type="number" step="0.01" min="0" value={form.old_price} onChange={(e) => set('old_price', e.target.value)} />
          <Input label="Promotion %" type="number" min="0" max="100" value={form.promotion} onChange={(e) => set('promotion', e.target.value)} />
          {!isPattern && (
            <Input label="Stock" type="number" min="0" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
          )}
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="accent-primary" />
            <span className="text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_new} onChange={(e) => set('is_new', e.target.checked)} className="accent-primary" />
            <span className="text-sm">NEW badge</span>
          </label>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Photos</span>
          <ImageUpload images={form.image_urls} onChange={(urls) => set('image_urls', urls)} />
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/products')}>Cancel</Button>
        </div>
      </form>
    </div>
  )
}
