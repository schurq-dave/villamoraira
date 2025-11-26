import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getArticleBySlug } from "@/lib/data/articles"
import { generateArticleSchema, generateArticleFAQSchema } from "@/lib/seo/article-jsonld"
import { generateBreadcrumbSchema } from "@/lib/seo/jsonld"
import { ArticleHero } from "@/components/article/article-hero"
import { TLDRBlock } from "@/components/article/tldr-block"
import { TableOfContents } from "@/components/article/table-of-contents"
import { FloatingTOCButton } from "@/components/article/floating-toc-button"
import { ArticleContent } from "@/components/article/article-content"
import { AuthorCard } from "@/components/article/author-card"
import { RelatedArticles } from "@/components/article/related-articles"
import { ArticleFAQ } from "@/components/article/article-faq"
import { Breadcrumb } from "@/components/Breadcrumb"
import { uiText } from "@/lib/data/site-config"

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    return {
      title: "Artikel niet gevonden",
    }
  }

  return {
    title: article.seo.metaTitle,
    description: article.seo.metaDescription,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.metaTitle,
      description: article.seo.metaDescription,
      images: article.seo.ogImageUrl ? [article.seo.ogImageUrl] : [article.image],
      type: "article",
      publishedTime: article.publishDate,
      modifiedTime: article.lastUpdated,
      authors: article.author ? [article.author.name] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const breadcrumbItems = [
    { name: uiText.common.home, url: "/" },
    { name: uiText.article.breadcrumbArticles, url: "/artikelen" },
    { name: article.title, url: `/artikelen/${article.slug}` },
  ]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema(article)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      {article.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateArticleFAQSchema(article.faqs)),
          }}
        />
      )}

      <ArticleHero
        title={article.title}
        subtitle={article.subtitle}
        category={article.category}
        publishDate={article.publishDate}
        readTime={article.readTime}
        image={article.image}
        imageAlt={article.imageAlt}
        uiText={uiText}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid lg:grid-cols-[1fr_300px] gap-12 mt-8">
          {/* Main Content */}
          <div>
            {/* TL;DR Block */}
            <TLDRBlock title={article.tldr.title} points={article.tldr.points} />

            {/* Author Card */}
            {article.author && (
              <div className="mt-8">
                <AuthorCard author={article.author} lastUpdated={article.lastUpdated} uiText={uiText} />
              </div>
            )}

            {/* Article Content */}
            <div className="mt-12">
              <ArticleContent sections={article.content} />
            </div>

            {/* FAQ Section */}
            {article.faqs.length > 0 && <ArticleFAQ faqs={article.faqs} uiText={uiText} />}

            {/* Related Articles */}
            {article.relatedArticles.length > 0 && (
              <RelatedArticles articles={article.relatedArticles} uiText={uiText} />
            )}
          </div>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents sections={article.content} uiText={uiText} />
            </div>
          </aside>
        </div>
      </div>

      {/* Floating TOC Button */}
      <FloatingTOCButton sections={article.content} uiText={uiText} />
    </>
  )
}
