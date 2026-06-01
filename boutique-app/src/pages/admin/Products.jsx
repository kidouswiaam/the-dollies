import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '../../contexts/StoreContext'
import { deleteProduct } from '../../services/api'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { formatPrice, isDollProduct, isPatternProduct } from '../../lib/utils'
import toast from 'react-hot-toast'

export default function Products() {
  const { products } = useStore()
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const confirmDelete = async () => {
    setDeleting(true)
    try {
      await deleteProduct(deleteId)
      toast.success('Product deleted')
      setDeleteId(null)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold">Products</h1>
          <p className="text-sm text-stone-500">Dolls & Patterns only</p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-dark text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-500 border-b border-primary/10">
                <th className="p-4">Product</th>
                <th className="p-4">Type</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4 w-24" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-primary/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.image_urls?.[0] && <img src={p.image_urls[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        isPatternProduct(p) ? 'bg-accent text-dark' : 'bg-primary/15 text-primary'
                      }`}
                    >
                      {isPatternProduct(p) ? 'Patterns' : 'Dolls'}
                    </span>
                  </td>
                  <td className="p-4">{formatPrice(p.price)}</td>
                  <td className="p-4">{isPatternProduct(p) ? 'PDF' : p.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link to={`/admin/products/${p.id}/edit`} className="p-2 hover:text-primary">
                        <Pencil size={16} />
                      </Link>
                      <button type="button" onClick={() => setDeleteId(p.id)} className="p-2 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!deleteId} onClose={() => setDeleteId(null)} title="Delete product?">
        <p className="text-stone-500 text-sm mb-6">This cannot be undone.</p>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
