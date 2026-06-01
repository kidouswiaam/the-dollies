export const BRAND_NAME = 'The Dollies Crochet Studio'

export const DEFAULT_TAGLINE =
  'Handmade creations only—tired hands, endless crochet love'

export const DEFAULT_SOCIAL = {
  instagram: 'https://www.instagram.com/the.dollies23?igsh=b2lqaDdlMHVjeGFh',
  facebook: 'https://www.facebook.com/profile.php?id=100063708463987',
}

export function getSocialLinks(settings) {
  return {
    ...DEFAULT_SOCIAL,
    ...(settings?.social_links || {}),
  }
}
