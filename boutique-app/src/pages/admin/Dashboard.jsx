import { motion } from 'framer-motion'
import { Package, Percent, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../../contexts/StoreContext'
import { formatPrice } from '../../lib/utils'

function StatCard({ icon: Icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 shadow-sm"
    >
      <Icon className="text-accent mb-3" size={24} />
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-stone-500 mt-1">{label}</p>
    </motion.div>
  )
}

export default function Dashboard() {
  const { products, promotions, activePromotions } = useStore()
  const recent = products.slice(0, 5)

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard icon={Package} label="Total Products" value={products.length} delay={0} />
        <StatCard icon={Percent} label="Active Promotions" value={activePromotions.length} delay={0.05} />
        <StatCard icon={Clock} label="Recent Updates" value={recent.length} delay={0.1} />
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-stone-700">
          <h2 className="font-semibold">Recent Products</h2>
          <Link to="/admin/products/new" className="text-sm text-accent hover:underline">+ Add product</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-stone-500 border-b border-stone-200 dark:border-stone-700">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Featured</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((p) => (
                <tr key={p.id} className="border-b border-stone-100 dark:border-stone-800 last:border-0">
                  <td className="p-4">
                    <Link to={`/admin/products/${p.id}/edit`} className="hover:text-accent font-medium">{p.name}</Link>
                  </td>
                  <td className="p-4">{formatPrice(p.price)}</td>
                  <td className="p-4">{p.stock}</td>
                  <td className="p-4">{p.featured ? 'Yes' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
