import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  formatPrice,
  getStockStatus,
  getEffectivePromotion,
  getProductBadges,
  canOrderProduct,
  isPatternProduct,
} from '../../lib/utils'
import { buildWhatsAppOrderLink } from '../../lib/whatsapp'
import { useStore } from '../../contexts/StoreContext'

const badgeStyles = {
  new: 'bg-accent text-dark font-semibold',
  sale: 'bg-primary text-white',
  pattern: 'bg-dark text-white',
}

export default function ProductCard({ product, index = 0 }) {
  const { settings, activePromotions } = useStore()
  const discount = getEffectivePromotion(product, activePromotions)
  const badges = getProductBadges(product, activePromotions)
  const stock = getStockStatus(product)
  const image = product.image_urls?.[0]
  const canOrder = canOrderProduct(product)
  const waLink = settings?.whatsapp_number
    ? buildWhatsAppOrderLink(settings.whatsapp_number, { ...product, promotion: discount })
    : '#'
  const typeLabel = isPatternProduct(product) ? 'Patterns' : 'Dolls'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 100 }}
      className="glass-card group flex flex-col h-full"
    >
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-accent">
        {image ? (
          <img
            src={image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-dark/40 text-sm">🧶</div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <span
              key={b.label}
              className={`px-2.5 py-1 text-[10px] tracking-wider rounded-full ${badgeStyles[b.variant]}`}
            >
              {b.label}
            </span>
          ))}
        </div>
        <span
          className={`absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-cream/95 ${
            stock.key === 'pattern'
              ? 'text-primary'
              : stock.key === 'in'
                ? 'text-emerald-800'
                : stock.key === 'low'
                  ? 'text-amber-800'
                  : 'text-red-700'
          }`}
        >
          {stock.label}
        </span>
      </Link>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">{typeLabel}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg sm:text-xl font-semibold mt-1 text-dark hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted line-clamp-2 mt-1.5 flex-1">{product.description}</p>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-bold text-dark">{formatPrice(product.price)}</span>
          {product.old_price && discount > 0 && (
            <span className="text-sm text-dark/40 line-through">{formatPrice(product.old_price)}</span>
          )}
        </div>
        {canOrder ? (
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="mt-4 w-full text-center btn-primary text-sm !py-3">
            Order via WhatsApp
          </a>
        ) : (
          <button
            disabled
            className="mt-4 w-full text-sm font-semibold py-3 bg-accent text-muted rounded-full cursor-not-allowed"
          >
            Sold Out
          </button>
        )}
      </div>
    </motion.article>
  )
}
