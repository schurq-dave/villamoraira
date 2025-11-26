export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content?: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  featured: boolean
  seo: {
    metaTitle: string
    metaDescription: string
    slug: string
    keywords?: string[]
    ogImageUrl?: string
  }
}
