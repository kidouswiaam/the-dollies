/** Fixed storefront categories — do not add more */
export const PRODUCT_TYPE = {
  DOLL: 'doll',
  PATTERN: 'pattern',
}

export const STORE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: PRODUCT_TYPE.DOLL, label: 'Dolls' },
  { id: PRODUCT_TYPE.PATTERN, label: 'Patterns' },
]

/** Maps legacy DB values to doll | pattern */
export function normalizeProductType(type) {
  if (type === PRODUCT_TYPE.PATTERN || type === 'digital') return PRODUCT_TYPE.PATTERN
  return PRODUCT_TYPE.DOLL
}

export function isDollProduct(product) {
  return normalizeProductType(product?.product_type) === PRODUCT_TYPE.DOLL
}

export function isPatternProduct(product) {
  return normalizeProductType(product?.product_type) === PRODUCT_TYPE.PATTERN
}

export function matchesStoreFilter(product, filterId) {
  if (!filterId || filterId === 'all') return true
  const type = normalizeProductType(product?.product_type)
  return type === filterId
}

export function getProductTypeLabel(product) {
  return isPatternProduct(product) ? 'PDF Pattern' : 'Handmade Crochet Doll'
}
