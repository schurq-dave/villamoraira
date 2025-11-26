import 'server-only'
import { client } from './client'
import type { QueryParams } from 'next-sanity'
import { groq } from 'next-sanity'
import type { Locale } from '@/lib/i18n/config'
import * as queries from './queries'

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}): Promise<T | null> {
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate, tags },
    })
  } catch (error) {
    console.error('Sanity fetch error:', error)
    return null
  }
}

// =============================================================================
// CONTENT FETCHERS
// =============================================================================

export async function getSiteSettings(language: Locale) {
  return sanityFetch({
    query: queries.SITE_SETTINGS_QUERY,
    params: { language },
    tags: ['siteSettings'],
  })
}

export async function getNavigation(language: Locale) {
  return sanityFetch({
    query: queries.NAVIGATION_QUERY,
    params: { language },
    tags: ['navigation'],
  })
}

export async function getFooter(language: Locale) {
  return sanityFetch({
    query: queries.FOOTER_QUERY,
    params: { language },
    tags: ['footer'],
  })
}

export async function getHomePage(language: Locale) {
  return sanityFetch({
    query: queries.HOME_PAGE_QUERY,
    params: { language },
    tags: ['homePage'],
  })
}

export async function getAboutPage(language: Locale) {
  return sanityFetch({
    query: queries.ABOUT_PAGE_QUERY,
    params: { language },
    tags: ['aboutPage'],
  })
}

export async function getContactPage(language: Locale) {
  return sanityFetch({
    query: queries.CONTACT_PAGE_QUERY,
    params: { language },
    tags: ['contactPage'],
  })
}

export async function getVillasPage(language: Locale) {
  return sanityFetch({
    query: queries.VILLAS_PAGE_QUERY,
    params: { language },
    tags: ['villasPage'],
  })
}

export async function getMorairaPage(language: Locale) {
  return sanityFetch({
    query: queries.MORAIRA_PAGE_QUERY,
    params: { language },
    tags: ['morairaPage'],
  })
}

export async function getAllVillas(language: Locale) {
  return sanityFetch({
    query: queries.ALL_VILLAS_QUERY,
    params: { language },
    tags: ['villa'],
  })
}

export async function getFeaturedVillas(language: Locale) {
  return sanityFetch({
    query: queries.FEATURED_VILLAS_QUERY,
    params: { language },
    tags: ['villa'],
  })
}

export async function getVillaBySlug(slug: string, language: Locale) {
  return sanityFetch({
    query: queries.VILLA_BY_SLUG_QUERY,
    params: { slug, language },
    tags: ['villa', `villa:${slug}`],
  })
}

export async function getAllReviews() {
  return sanityFetch({
    query: queries.ALL_REVIEWS_QUERY,
    params: {},
    tags: ['review'],
  })
}

export async function getVillaReviews(villaId: string) {
  return sanityFetch({
    query: queries.VILLA_REVIEWS_QUERY,
    params: { villaId },
    tags: ['review', `villa:${villaId}`],
  })
}

// =============================================================================
// TRANSLATION HELPERS
// =============================================================================

// Route prefixes for different document types per language
const routePrefixes: Record<string, Record<Locale, string>> = {
  villa: { nl: '/villas', en: '/villas' },
  homePage: { nl: '', en: '' },
  aboutPage: { nl: '/over-ons', en: '/about-us' },
  contactPage: { nl: '/contact', en: '/contact' },
  villasPage: { nl: '/villas', en: '/villas' },
  morairaPage: { nl: '/moraira', en: '/moraira' },
  blogPost: { nl: '/blog', en: '/blog' },
  article: { nl: '/artikelen', en: '/articles' },
}

/**
 * Get alternate language URLs for a document using translation.metadata
 */
export async function getAlternateUrls(documentId: string): Promise<Record<Locale, string> | null> {
  const query = groq`
    *[_type == "translation.metadata" && references($documentId)][0]{
      "alternates": translations[]{
        "language": _key,
        "slug": value->slug.current,
        "type": value->_type
      }
    }.alternates
  `

  const alternates = await client.fetch<Array<{
    language: string
    slug: string | null
    type: string
  }>>(query, { documentId })

  if (!alternates || alternates.length === 0) {
    return null
  }

  const urls: Record<string, string> = {}

  for (const alt of alternates) {
    const lang = alt.language as Locale
    const prefix = routePrefixes[alt.type]?.[lang] || ''
    const slug = alt.slug || ''

    // Build the URL based on document type
    if (alt.type === 'villa' || alt.type === 'blogPost' || alt.type === 'article') {
      // Detail pages need prefix + slug
      if (lang === 'nl') {
        urls[lang] = `${prefix}/${slug}`
      } else {
        urls[lang] = `/${lang}${prefix}/${slug}`
      }
    } else {
      // Static pages - use prefix as the full path
      if (lang === 'nl') {
        urls[lang] = prefix || '/'
      } else {
        urls[lang] = `/${lang}${prefix}` || `/${lang}`
      }
    }
  }

  return urls as Record<Locale, string>
}

/**
 * Get alternate URLs for a static page type (home, about, contact, etc.)
 */
export async function getStaticPageAlternateUrls(
  pageType: string,
  currentLanguage: Locale
): Promise<Record<Locale, string>> {
  try {
    // Find the current language document using direct query with interpolated type
    const query = `*[_type == "${pageType}" && language == "${currentLanguage}"][0]._id`
    const docId = await client.fetch<string>(query)

    if (docId) {
      const alternates = await getAlternateUrls(docId)
      if (alternates) return alternates
    }
  } catch (error) {
    console.error('Error fetching alternate URLs:', error)
  }

  // Fallback to static prefixes
  const prefix = routePrefixes[pageType]
  if (prefix) {
    return {
      nl: prefix.nl || '/',
      en: `/en${prefix.en}` || '/en',
    }
  }

  return { nl: '/', en: '/en' }
}

/**
 * Get alternate URLs for a villa detail page
 */
export async function getVillaAlternateUrls(
  slug: string,
  currentLanguage: Locale
): Promise<Record<Locale, string>> {
  try {
    const query = `*[_type == "villa" && slug.current == "${slug}" && language == "${currentLanguage}"][0]._id`
    const docId = await client.fetch<string>(query)

    if (docId) {
      const alternates = await getAlternateUrls(docId)
      if (alternates) return alternates
    }
  } catch (error) {
    console.error('Error fetching villa alternate URLs:', error)
  }

  // Fallback
  return {
    nl: `/villas/${slug}`,
    en: `/en/villas/${slug}`,
  }
}

