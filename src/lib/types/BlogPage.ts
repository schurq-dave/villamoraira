import type { SEO } from "./SEO"

export interface BlogCategory {
  name: string
  slug: string
}

export interface BlogPageData {
  seo: SEO
  hero: {
    badge: string
    title: string
    description: string
  }
  categories: BlogCategory[]
}
