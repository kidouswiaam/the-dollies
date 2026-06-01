export { BRAND_NAME, DEFAULT_TAGLINE } from './brand'
export {
  PRODUCT_TYPE,
  STORE_FILTERS,
  normalizeProductType,
  isDollProduct,
  isPatternProduct,
  matchesStoreFilter,
  getProductTypeLabel,
} from './productTypes'

import { isPatternProduct } from './productTypes'

export function isDigitalProduct(product) {
  return isPatternProduct(product)
}

export function formatPrice(amount, symbol = '$') {
  const n = Number(amount)
  if (Number.isNaN(n)) return `${symbol}0`
  return `${symbol}${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`
}

export function canOrderProduct(product) {
  if (isPatternProduct(product)) return true
  return (product?.stock ?? 0) > 0
}

export function getStockStatus(product) {
  if (isPatternProduct(product)) {
    return { label: 'Instant Download PDF', key: 'pattern' }
  }
  const stock = product?.stock ?? 0
  if (stock <= 0) return { label: 'Sold Out', key: 'out' }
  if (stock <= 5) return { label: 'Low Stock', key: 'low' }
  return { label: 'Made to Order', key: 'in' }
}

export function getProductBadges(product, activePromotions = []) {
  const badges = []
  const discount = getEffectivePromotion(product, activePromotions)

  if (isPatternProduct(product)) {
    badges.push({ label: 'PATTERN', variant: 'pattern' })
  }
  if (discount > 0) {
    badges.push({ label: 'SALE', variant: 'sale' })
  }
  if (product?.is_new) {
    badges.push({ label: 'NEW', variant: 'new' })
  }
  return badges
}

export function getEffectivePromotion(product, activePromotions = []) {
  let discount = Number(product?.promotion) || 0
  for (const promo of activePromotions) {
    if (!promo.is_active) continue
    if (promo.product_ids?.includes(product.id)) {
      discount = Math.max(discount, Number(promo.discount_percent))
    }
  }
  return discount
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export async function compressImage(file, maxWidth = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Compression failed'))),
        'image/jpeg',
        quality
      )
    }
    img.onerror = reject
    img.src = url
  })
}
