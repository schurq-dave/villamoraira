import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './sanity/schemas'
import { structure, defaultDocumentNode } from './sanity/structure'

// Supported languages for the project
export const supportedLanguages = [
  { id: 'nl', title: 'Nederlands', isDefault: true },
  { id: 'en', title: 'English' },
]

// Language-specific slug prefixes
export const languageSlugPrefixes: Record<string, Record<string, string>> = {
  blogPost: {
    nl: 'blog',
    en: 'blog',
  },
  article: {
    nl: 'artikelen',
    en: 'articles',
  },
  villa: {
    nl: 'villas',
    en: 'villas',
  },
  homePage: {
    nl: '',
    en: '',
  },
  aboutPage: {
    nl: 'over-ons',
    en: 'about-us',
  },
  contactPage: {
    nl: 'contact',
    en: 'contact',
  },
  villasPage: {
    nl: 'villas',
    en: 'villas',
  },
  morairaPage: {
    nl: 'moraira',
    en: 'moraira',
  },
}

export const baseLanguage = supportedLanguages.find((l) => l.isDefault)!

// All document types that support translation
const translatableTypes = [
  'villa',
  'blogPost',
  'article',
  'homePage',
  'aboutPage',
  'contactPage',
  'villasPage',
  'morairaPage',
  'siteSettings',
  'navigation',
  'footer',
]

// Hardcoded for Sanity Studio deployment (env vars not available at runtime)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'd3soxd2y'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'villa-moraira',
  title: 'Villa Moraira CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({ 
      structure,
      defaultDocumentNode,
    }),
    visionTool(),
    media(),
    // Document-level internationalization - creates translation links in document actions
    documentInternationalization({
      supportedLanguages: supportedLanguages.map((l) => ({
        id: l.id,
        title: l.title,
      })),
      schemaTypes: translatableTypes,
      // Weak references allow documents to be deleted independently
      weakReferences: true,
      // Language field configuration
      languageField: 'language',
      // Bulk publish translations together
      bulkPublish: true,
    }),
  ],
  schema: { 
    types: schemaTypes,
    // Filter out the language-specific templates from the "Create new" menu
    templates: (prev) => {
      // Keep only the base templates, not the language-specific ones
      return prev.filter((template) => {
        // Filter out templates that end with language suffixes
        const isLanguageTemplate = supportedLanguages.some(
          (lang) => template.id.endsWith(`-${lang.id}`)
        )
        return !isLanguageTemplate
      })
    },
  },
})
