import { i18nConfig, type Locale } from './config'

/**
 * Slug translations between Dutch (nl) and English (en)
 * Format: { dutch_slug: english_slug }
 */
const slugTranslations: Record<string, string> = {
  'over-ons': 'about-us',
  'artikelen': 'articles',
  // Add more as needed
}

// Create reverse mapping
const slugTranslationsReverse: Record<string, string> = Object.fromEntries(
  Object.entries(slugTranslations).map(([nl, en]) => [en, nl])
)

/**
 * Translate a slug from one language to another
 */
function translateSlug(slug: string, fromLocale: Locale, toLocale: Locale): string {
  if (fromLocale === toLocale) return slug
  
  if (fromLocale === 'nl' && toLocale === 'en') {
    return slugTranslations[slug] || slug
  }
  
  if (fromLocale === 'en' && toLocale === 'nl') {
    return slugTranslationsReverse[slug] || slug
  }
  
  return slug
}

/**
 * Translate a full path from one language to another
 */
function translatePath(path: string, fromLocale: Locale, toLocale: Locale): string {
  if (fromLocale === toLocale) return path
  
  // Split path into segments and translate each segment
  const segments = path.split('/').filter(Boolean)
  const translatedSegments = segments.map(segment => translateSlug(segment, fromLocale, toLocale))
  
  return '/' + translatedSegments.join('/')
}

/**
 * Creates a localized URL path
 * - For default locale (nl): returns path as-is (e.g., "/villas")
 * - For other locales: prepends locale (e.g., "/en/villas")
 */
export function localizeUrl(path: string, locale: Locale): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // For default locale, don't add prefix
  if (locale === i18nConfig.defaultLocale) {
    return normalizedPath
  }
  
  // For other locales, add prefix
  return `/${locale}${normalizedPath}`
}

/**
 * Removes locale prefix from a URL path
 * Returns the clean path without locale prefix
 */
export function delocalizeUrl(path: string): { path: string; locale: Locale } {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  
  // Check if path starts with a locale prefix
  for (const locale of i18nConfig.locales) {
    if (locale !== i18nConfig.defaultLocale) {
      const prefix = `/${locale}/`
      const exactMatch = `/${locale}`
      
      if (normalizedPath.startsWith(prefix)) {
        return {
          path: normalizedPath.slice(prefix.length - 1), // Keep the leading /
          locale,
        }
      }
      
      if (normalizedPath === exactMatch) {
        return {
          path: '/',
          locale,
        }
      }
    }
  }
  
  // No locale prefix found, use default locale
  return {
    path: normalizedPath,
    locale: i18nConfig.defaultLocale as Locale,
  }
}

/**
 * Transforms all hrefs in navigation/footer data to include locale prefix
 * Also strips any existing locale prefix first (for content stored with /en/ prefix)
 */
export function localizeLinks<T extends { href: string }>(
  links: T[],
  locale: Locale
): T[] {
  return links.map((link) => {
    // First strip any existing locale prefix, then re-localize
    const { path } = delocalizeUrl(link.href)
    return {
      ...link,
      href: localizeUrl(path, locale),
    }
  })
}

/**
 * Normalizes a link from Sanity by stripping any locale prefix and re-localizing
 */
export function normalizeLink(href: string, locale: Locale): string {
  const { path } = delocalizeUrl(href)
  return localizeUrl(path, locale)
}

/**
 * Get the URL for switching to another language
 * This also translates slugs (e.g., /over-ons -> /en/about-us)
 */
export function getLanguageSwitchUrl(
  currentPath: string,
  targetLocale: Locale
): string {
  const { path, locale: currentLocale } = delocalizeUrl(currentPath)
  
  // Translate the path slugs to the target language
  const translatedPath = translatePath(path, currentLocale, targetLocale)
  
  return localizeUrl(translatedPath, targetLocale)
}

