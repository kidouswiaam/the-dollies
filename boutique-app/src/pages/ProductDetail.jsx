import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Package, Download } from 'lucide-react'
import { useStore } from '../contexts/StoreContext'
import {
  formatPrice,
  getStockStatus,
  getEffectivePromotion,
  getProductBadges,
  canOrderProduct,
  isPatternProduct,
  getProductTypeLabel,
} from '../lib/utils'
import { buildWhatsAppOrderLink } from '../lib/whatsapp'
import { ProductCardSkeleton } from '../components/ui/Skeleton'

const badgeStyles = {
  new: 'bg-accent text-dark font-bold',
  sale: 'bg-primary text-white',
  pattern: 'bg-dark text-white',
}

export default function ProductDetail() {
  const { id } = useParams()
  const { products, settings, activePromotions, loading } = useStore()
  const product = products.find((p) => p.id === id)
  const [activeImage, setActiveImage] = useState(0)

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <ProductCardSkeleton />
      </div>
    )
  }
  if (!product) {
    return <Navigate to="/#catalog" replace />
  }

  const pattern = isPatternProduct(product)
  const discount = getEffectivePromotion(product, activePromotions)
  const badges = getProductBadges(product, activePromotions)
  const stock = getStockStatus(product)
  const canOrder = canOrderProduct(product)
  const images = product.image_urls?.length ? product.image_urls : []
  const waLink = settings?.whatsapp_number
    ? buildWhatsAppOrderLink(settings.whatsapp_number, { ...product, promotion: discount })
    : '#'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
    >
      <Link to="/#catalog" className="text-sm text-primary font-semibold hover:underline mb-8 inline-block">
        ← Back to shop
      </Link>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-14">
        <div className="glass p-3 rounded-[2rem]">
          <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-accent/30">
            {images[activeImage] ? (
              <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">🧶</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto p-1">
              {images.map((url, i) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                    activeImage === i ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {badges.map((b) => (
              <span
                key={b.label}
                className={`px-3 py-1 text-xs font-bold tracking-wider rounded-full ${badgeStyles[b.variant] || badgeStyles.new}`}
              >
                {b.label}
              </span>
            ))}
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
            {pattern ? 'Patterns' : 'Dolls'}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold mt-2 text-dark">{product.name}</h1>

          <div className="flex items-center gap-2 mt-4 glass inline-flex px-4 py-2 rounded-full">
            {pattern ? <Download size={16} className="text-primary" /> : <Package size={16} className="text-primary" />}
            <span className="text-sm font-semibold">{getProductTypeLabel(product)}</span>
          </div>

          <div className="flex items-baseline gap-3 mt-6">
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.old_price && discount > 0 && (
              <span className="text-xl text-muted line-through">{formatPrice(product.old_price)}</span>
            )}
          </div>

          <p
            className={`mt-3 text-sm font-semibold ${
              stock.key === 'pattern'
                ? 'text-primary'
                : stock.key === 'out'
                  ? 'text-red-500'
                  : stock.key === 'low'
                    ? 'text-amber-600'
                    : 'text-emerald-700'
            }`}
          >
            {stock.label}
          </p>

          {pattern && (
            <p className="mt-4 text-sm text-muted bg-accent/50 rounded-xl p-4">
              After payment via WhatsApp, we send your PDF pattern file. No shipping required.
            </p>
          )}

          <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

          {canOrder ? (
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex btn-primary">
              Order via WhatsApp
            </a>
          ) : (
            <button
              disabled
              className="mt-8 px-10 py-4 bg-accent/50 text-muted rounded-full cursor-not-allowed text-xs uppercase tracking-widest"
            >
              Sold Out
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
