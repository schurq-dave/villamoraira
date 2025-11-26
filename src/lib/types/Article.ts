export interface ArticleAuthor {
  name: string
  avatar?: string
  bio?: string
}

export interface ArticleTLDR {
  title: string
  points: string[]
}

export interface ArticleSection {
  id: string
  heading: string
  content: string
}

export interface RelatedArticle {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  readTime: string
}

export interface ArticleFAQ {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  subtitle?: string
  excerpt: string
  category: string
  publishDate: string
  lastUpdated: string
  readTime: string
  image: string
  imageAlt: string
  author?: ArticleAuthor
  tldr: ArticleTLDR
  content: ArticleSection[]
  relatedArticles: RelatedArticle[]
  faqs: ArticleFAQ[]
  seo: {
    metaTitle: string
    metaDescription: string
    slug: string
    keywords?: string[]
    ogImageUrl?: string
  }
}
