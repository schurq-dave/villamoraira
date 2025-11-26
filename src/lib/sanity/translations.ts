import { client } from './client'
import { groq } from 'next-sanity'
import type { Locale } from '@/lib/i18n/config'

// Type for the route prefixes (e.g., '/villas', '/blog', etc.)
const routePrefixes: Record<string, Record<Locale, string>> = {
  villa: {
    nl: '/villas',
    en: '/villas',
  },
  homePage: {
    nl: '',
    en: '',
  },
  aboutPage: {
    nl: '/over-ons',
    en: '/about-us',
  },
  contactPage: {
    nl: '/contact',
    en: '/contact',
  },
  villasPage: {
    nl: '/villas',
    en: '/villas',
  },
  morairaPage: {
    nl: '/moraira',
    en: '/moraira',
  },
  blogPost: {
    nl: '/blog',
    en: '/blog',
  },
  article: {
    nl: '/artikelen',
    en: '/articles',
  },
}

interface TranslationInfo {
  language: Locale
  slug: string | null
  type: string
}

/**
 * Get all alternate language URLs for a document
 * Returns an object with language codes as keys and URLs as values
 */
export async function getAlternateUrls(
  documentId: string
): Promise<Record<Locale, string> | null> {
  const query = groq`
    *[_type == "translation.metadata" && references($documentId)][0]{
      "alternates": translations[]{
        "language": _key,
        "slug": value->slug.current,
        "type": value->_type
      }
    }.alternates
  `

  const alternates = await client.fetch<TranslationInfo[]>(query, { documentId })

  if (!alternates || alternates.length === 0) {
    return null
  }

  const urls: Record<string, string> = {}

  for (const alt of alternates) {
    const lang = alt.language as Locale
    const prefix = routePrefixes[alt.type]?.[lang] || ''
    const slug = alt.slug || ''
    
    // Build the URL
    if (lang === 'nl') {
      // Dutch (default locale) - no language prefix
      urls[lang] = prefix + (slug ? `/${slug}` : '') || '/'
    } else {
      // Other languages - add language prefix
      urls[lang] = `/${lang}${prefix}${slug ? `/${slug}` : ''}`
    }
  }

  return urls as Record<Locale, string>
}

/**
 * Get the URL for a specific language given a document ID
 */
export async function getLanguageUrl(
  documentId: string,
  targetLanguage: Locale
): Promise<string | null> {
  const query = groq`
    *[_type == "translation.metadata" && references($documentId)][0]{
      "targetDoc": translations[_key == $targetLanguage][0].value->{
        "slug": slug.current,
        "_type": _type,
        language
      }
    }.targetDoc
  `

  const result = await client.fetch<{
    slug: string | null
    _type: string
    language: string
  } | null>(query, { documentId, targetLanguage })

  if (!result) {
    return null
  }

  const prefix = routePrefixes[result._type]?.[targetLanguage] || ''
  const slug = result.slug || ''

  if (targetLanguage === 'nl') {
    return prefix + (slug ? `/${slug}` : '') || '/'
  } else {
    return `/${targetLanguage}${prefix}${slug ? `/${slug}` : ''}`
  }
}

/**
 * Find the translated page by current path
 * This function looks up the translation.metadata to find the alternate language version
 */
export async function getTranslatedPath(
  currentPath: string,
  currentLanguage: Locale,
  targetLanguage: Locale
): Promise<string> {
  // Strip locale prefix from path if present
  let cleanPath = currentPath
  if (currentPath.startsWith(`/${currentLanguage}/`)) {
    cleanPath = currentPath.slice(currentLanguage.length + 1)
  } else if (currentPath === `/${currentLanguage}`) {
    cleanPath = '/'
  }

  // Handle root path
  if (cleanPath === '/' || cleanPath === '') {
    return targetLanguage === 'nl' ? '/' : `/${targetLanguage}`
  }

  // Determine the document type and slug from the path
  const pathParts = cleanPath.split('/').filter(Boolean)
  
  // Map path prefixes to document types
  const pathToType: Record<string, string> = {
    'villas': 'villa', // Could be villasPage or villa detail
    'over-ons': 'aboutPage',
    'about-us': 'aboutPage',
    'moraira': 'morairaPage',
    'contact': 'contactPage',
    'blog': 'blogPost',
    'artikelen': 'article',
    'articles': 'article',
  }

  // Handle static pages (single segment paths)
  if (pathParts.length === 1) {
    const docType = pathToType[pathParts[0]]
    if (docType && !['villa', 'blogPost', 'article'].includes(docType)) {
      // This is a page document, find its translation
      const query = `*[_type == "${docType}" && language == "${currentLanguage}"][0]._id`
      const docId = await client.fetch<string>(query)
      
      if (docId) {
        const url = await getLanguageUrl(docId, targetLanguage)
        if (url) return url
      }
    }
    
    // Check if it's the villas listing page
    if (pathParts[0] === 'villas') {
      const query = `*[_type == "villasPage" && language == "${currentLanguage}"][0]._id`
      const docId = await client.fetch<string>(query)
      
      if (docId) {
        const url = await getLanguageUrl(docId, targetLanguage)
        if (url) return url
      }
    }
  }

  // Handle detail pages (two segment paths like /villas/slug)
  if (pathParts.length === 2) {
    const [prefix, slug] = pathParts
    let docType = ''
    
    if (prefix === 'villas') docType = 'villa'
    else if (prefix === 'blog') docType = 'blogPost'
    else if (prefix === 'artikelen' || prefix === 'articles') docType = 'article'

    if (docType) {
      // Find the document by slug and current language
      const query = `*[_type == "${docType}" && slug.current == "${slug}" && language == "${currentLanguage}"][0]._id`
      const docId = await client.fetch<string>(query)
      
      if (docId) {
        const url = await getLanguageUrl(docId, targetLanguage)
        if (url) return url
      }
    }
  }

  // Fallback: return the home page for the target language
  return targetLanguage === 'nl' ? '/' : `/${targetLanguage}`
}

