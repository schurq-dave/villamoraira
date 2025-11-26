import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  perspective: 'published',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Revalidation tags for cache management
export const REVALIDATE_TAGS = {
  siteSettings: 'site-settings',
  navigation: 'navigation',
  contactInfo: 'contact-info',
  homePage: 'home-page',
  villasPage: 'villas-page',
  villa: 'villa',
  blogPost: 'blog-post',
  article: 'article',
  aboutPage: 'about-page',
  contactPage: 'contact-page',
  morairaPage: 'moraira-page',
} as const

// Supported languages (should match sanity.config.ts)
export const SUPPORTED_LANGUAGES = [
  { id: 'nl', title: 'Nederlands', isDefault: true },
  { id: 'en', title: 'English' },
] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]['id']
export const DEFAULT_LANGUAGE: SupportedLanguage = 'nl'

