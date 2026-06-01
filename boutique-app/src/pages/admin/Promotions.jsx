import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useStore } from '../../contexts/StoreContext'
import { createPromotion, updatePromotion, deletePromotion } from '../../services/api'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

export default function Promotions() {
  const { promotions, products } = useStore()
  const [modal, setModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [form, setForm] = useState({ name: '', discount_percent: '', product_ids: [], is_active: true })
  const [saving, setSaving] = useState(false)

  const toggleProduct = (id) => {
    setForm((f) => ({
      ...f,
      product_ids: f.product_ids.includes(id) ? f.product_ids.filter((x) => x !== id) : [...f.product_ids, id],
    }))
  }

  const save = async () => {
    if (!form.name || !form.discount_percent) return toast.error('Name and discount required')
    setSaving(true)
    try {
      await createPromotion({
        name: form.name,
        discount_percent: Number(form.discount_percent),
        product_ids: form.product_ids,
        is_active: form.is_active,
      })
      toast.success('Promotion created')
      setModal(false)
      setForm({ name: '', discount_percent: '', product_ids: [], is_active: true })
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (promo) => {
    try {
      await updatePromotion(promo.id, { is_active: !promo.is_active })
      toast.success(promo.is_active ? 'Promotion deactivated' : 'Promotion activated')
    } catch (err) {
      toast.error(err.message)
    }
  }

  const confirmDelete = async () => {
    try {
      await deletePromotion(deleteId)
      toast.success('Promotion deleted')
      setDeleteId(null)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-semibold">Promotions</h1>
        <button type="button" onClick={() => setModal(true)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-medium uppercase tracking-widest rounded-full">
          <Plus size={16} /> New Promotion
        </button>
      </div>

      <div className="space-y-4">
        {promotions.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-stone-500">{p.discount_percent}% off · {p.product_ids?.length || 0} products</p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => toggleActive(p)} className={`text-xs px-3 py-1 rounded-full ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-stone-200 text-stone-600'}`}>
                {p.is_active ? 'Active' : 'Inactive'}
              </button>
              <button type="button" onClick={() => setDeleteId(p.id)} className="p-2 text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title="New Promotion">
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <Input label="Campaign Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input label="Discount %" type="number" min="1" max="100" value={form.discount_percent} onChange={(e) => setForm({ ...form, discount_percent: e.target.value })} />
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500 mb-2">Select Products</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {products.map((pr) => (
                <label key={pr.id} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.product_ids.includes(pr.id)} onChange={() => toggleProduct(pr.id)} className="accent-accent" />
                  {pr.name}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end mt-6">
          <Button variant="ghost" onClick={() => setModal(false)}>Cancel</Button>
          <Button onClick={save} disabled={saving}>Create</Button>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete promotion?">
        <div className="flex gap-3 justify-end mt-4">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
