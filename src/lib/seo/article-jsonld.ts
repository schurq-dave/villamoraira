import { SITE_URL } from "./constants"
import type { Article } from "@/lib/types/Article"

export function generateArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${SITE_URL}${article.image}`,
    datePublished: article.publishDate,
    dateModified: article.lastUpdated,
    ...(article.author && {
      author: {
        "@type": "Person",
        name: article.author.name,
        ...(article.author.bio && { description: article.author.bio }),
      },
    }),
    publisher: {
      "@type": "Organization",
      name: "Villa Moraira",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/villa-moraira-logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/artikelen/${article.slug}`,
    },
  }
}

export function generateArticleFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
