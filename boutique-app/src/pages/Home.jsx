import { useMemo, useState } from 'react'
import { Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../contexts/StoreContext'
import Hero from '../components/storefront/Hero'
import ProductCard from '../components/storefront/ProductCard'
import CatalogFilters from '../components/storefront/CatalogFilters'
import { ProductCardSkeleton } from '../components/ui/Skeleton'
import { getEffectivePromotion, matchesStoreFilter, isDollProduct, isPatternProduct } from '../lib/utils'
import { BRAND_NAME } from '../lib/brand'
import { buildWhatsAppGeneralLink } from '../lib/whatsapp'

export default function Home() {
  const { products, settings, loading, activePromotions } = useStore()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [promoOnly, setPromoOnly] = useState(false)
  const [sort, setSort] = useState('newest')

  const brandName = settings?.boutique_name || BRAND_NAME

  const filtered = useMemo(() => {
    let list = [...products]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    }
    list = list.filter((p) => matchesStoreFilter(p, typeFilter))
    if (promoOnly) list = list.filter((p) => getEffectivePromotion(p, activePromotions) > 0)
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      default:
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        break
    }
    return list
  }, [products, search, typeFilter, promoOnly, sort, activePromotions])

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4)
  const dolls = products.filter((p) => isDollProduct(p)).slice(0, 4)
  const patterns = products.filter((p) => isPatternProduct(p)).slice(0, 4)
  const promoProducts = products.filter((p) => getEffectivePromotion(p, activePromotions) > 0).slice(0, 4)

  const waLink = settings?.whatsapp_number
    ? buildWhatsAppGeneralLink(settings.whatsapp_number, brandName)
    : '#'

  const countLabel =
    typeFilter === 'all'
      ? `${filtered.length} items`
      : typeFilter === 'doll'
        ? `${filtered.length} dolls`
        : `${filtered.length} patterns`

  return (
    <>
      <Hero brandName={brandName} />

      <section className="py-8 bg-cream">
        <div className="max-w-3xl mx-auto px-4 grid sm:grid-cols-2 gap-4">
          <a href="#dolls" className="glass-card p-8 block text-center hover:scale-[1.02] transition-transform">
            <span className="text-4xl">🧸</span>
            <h2 className="font-display text-2xl font-semibold mt-3 text-dark">Dolls</h2>
            <p className="text-sm text-muted mt-2">Handmade physical amigurumi</p>
          </a>
          <a href="#patterns" className="glass-card p-8 block text-center hover:scale-[1.02] transition-transform">
            <span className="text-4xl">📄</span>
            <h2 className="font-display text-2xl font-semibold mt-3 text-dark">Patterns</h2>
            <p className="text-sm text-muted mt-2">Instant download PDF</p>
          </a>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-semibold text-center text-dark mb-2">Featured</h2>
            <p className="text-center text-muted mb-10">Staff picks</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {dolls.length > 0 && (
        <section id="dolls" className="py-16 mx-4 sm:mx-6 rounded-[2rem] max-w-6xl lg:mx-auto bg-white/60 border border-dark/5">
          <div className="px-4 sm:px-6">
            <h2 className="font-display text-3xl font-semibold text-center text-dark">Dolls</h2>
            <p className="text-muted text-center mt-1 mb-8">Physical crochet dolls — shipped with care</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {dolls.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {patterns.length > 0 && (
        <section id="patterns" className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-semibold text-center text-dark">Patterns</h2>
            <p className="text-muted text-center mt-1 mb-8">Digital PDF patterns — instant download</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {patterns.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {promoProducts.length > 0 && (
        <section id="promotions" className="py-16 bg-accent/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-3xl font-semibold text-center text-dark">Sweet Deals</h2>
            <p className="text-center text-primary font-medium mb-10">Limited-time offers</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {promoProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="catalog" className="py-16 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-center text-dark">Shop All</h2>
          <p className="text-center text-muted mb-10">{countLabel}</p>
          <CatalogFilters
            search={search}
            onSearch={setSearch}
            typeFilter={typeFilter}
            onTypeFilter={setTypeFilter}
            promoOnly={promoOnly}
            onPromoOnly={setPromoOnly}
            sort={sort}
            onSort={setSort}
          />
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-16 text-muted">No products in this category yet.</p>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                  >
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <section id="about" className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Heart className="mx-auto text-primary mb-4" size={32} />
          <h2 className="font-display text-3xl font-semibold text-dark">Our Crochet Studio</h2>
          <p className="mt-6 text-muted leading-relaxed">
            Welcome to {brandName} — handmade dolls and crochet PDF patterns, stitched with patience and love.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Questions or custom orders? Message us on WhatsApp anytime.
          </p>
        </div>
      </section>

      <section id="contact" className="py-16 mb-8">
        <div className="max-w-xl mx-auto px-4 text-center bg-white/70 border border-dark/8 rounded-[2rem] p-10 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-dark">Let&apos;s Create Together</h2>
          <p className="text-muted mt-2 mb-6">Custom orders or just saying hi</p>
          {settings?.whatsapp_number && (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Chat on WhatsApp
            </a>
          )}
        </div>
      </section>
    </>
  )
}
