import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { STORE_FILTERS } from '../../lib/productTypes'

export default function CatalogFilters({
  search,
  onSearch,
  typeFilter,
  onTypeFilter,
  promoOnly,
  onPromoOnly,
  sort,
  onSort,
}) {
  return (
    <div className="space-y-5 mb-10">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/40" size={18} />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search dolls & patterns…"
          className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-dark/10 focus:outline-none focus:ring-2 focus:ring-primary/25 text-dark placeholder:text-dark/40 transition-shadow"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4">
        {/* Fixed category bar — All | Dolls | Patterns only */}
        <div
          className="inline-flex p-1 rounded-full bg-white border border-dark/10 shadow-sm"
          role="tablist"
          aria-label="Product category"
        >
          {STORE_FILTERS.map((f) => {
            const active = typeFilter === f.id
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTypeFilter(f.id)}
                className="relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300 z-[1]"
              >
                {active && (
                  <motion.span
                    layoutId="catalog-type-pill"
                    className="absolute inset-0 bg-primary rounded-full shadow-md shadow-primary/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative ${active ? 'text-white' : 'text-dark'}`}>{f.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
          <label className="flex items-center gap-2 text-sm cursor-pointer text-muted">
            <input
              type="checkbox"
              checked={promoOnly}
              onChange={(e) => onPromoOnly(e.target.checked)}
              className="rounded accent-primary"
            />
            On sale
          </label>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value)}
            className="px-3 py-2 text-sm font-medium rounded-xl bg-white border border-dark/10 text-dark"
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
