import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useStore } from '../../contexts/StoreContext'
import { createCategory, updateCategory, deleteCategory } from '../../services/api'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import toast from 'react-hot-toast'

export default function Categories() {
  const { categories } = useStore()
  const [modal, setModal] = useState(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const openCreate = () => { setModal('create'); setName('') }
  const openEdit = (c) => { setModal(c.id); setName(c.name) }

  const save = async () => {
    if (!name.trim()) return toast.error('Name required')
    setSaving(true)
    try {
      if (modal === 'create') {
        await createCategory(name.trim())
        toast.success('Category created')
      } else {
        await updateCategory(modal, name.trim())
        toast.success('Category updated')
      }
      setModal(null)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSaving(false)
    }
  }

  const confirmDelete = async () => {
    try {
      await deleteCategory(deleteId)
      toast.success('Category deleted')
      setDeleteId(null)
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-semibold">Categories</h1>
        <button type="button" onClick={openCreate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white text-xs font-medium uppercase tracking-widest rounded-full">
          <Plus size={16} /> Add Category
        </button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
            <span className="font-medium">{c.name}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => openEdit(c)} className="p-2 text-stone-500 hover:text-accent"><Pencil size={16} /></button>
              <button type="button" onClick={() => setDeleteId(c.id)} className="p-2 text-stone-500 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === 'create' ? 'New Category' : 'Edit Category'}>
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="flex gap-3 justify-end mt-6">
          <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</Button>
        </div>
      </Modal>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete category?">
        <p className="text-sm text-stone-500 mb-6">Products in this category will become uncategorized.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
