export interface SEOData {
  metaTitle: string
  metaDescription: string
  keywords?: string[]
  ogImage?: string
  slug?: string
}

// Alias for backwards compatibility
export type SEO = SEOData

