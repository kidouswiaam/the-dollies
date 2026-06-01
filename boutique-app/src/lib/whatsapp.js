import { isPatternProduct } from './productTypes'

export function buildWhatsAppOrderLink(phone, product, quantity = 1) {
  const promoLine =
    product.promotion && product.promotion > 0
      ? `${product.promotion}% off`
      : 'None'

  const typeLabel = isPatternProduct(product)
    ? 'Pattern (Digital PDF)'
    : 'Doll (Physical)'

  const message = [
    'Hello,',
    '',
    'I would like to order from The Dollies Crochet Studio:',
    '',
    `Product: ${product.name}`,
    `Price: $${Number(product.price).toFixed(2)}`,
    `Type: ${typeLabel}`,
    `Promotion: ${promoLine}`,
    `Quantity: ${quantity}`,
    '',
    isPatternProduct(product)
      ? 'Please send the PDF download link after payment. Thank you!'
      : 'Please confirm availability and shipping. Thank you!',
    '',
    'Thank you.',
  ].join('\n')

  const cleanPhone = String(phone || '').replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export function buildWhatsAppGeneralLink(phone, boutiqueName = 'The Dollies Crochet Studio') {
  const message = `Hello,\n\nI have a question about ${boutiqueName}.\n\nThank you.`
  const cleanPhone = String(phone || '').replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
