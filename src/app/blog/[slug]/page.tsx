import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/jsonld"
import { navigationData } from "@/lib/data/navigation"
import { footerData } from "@/lib/data/footer"
import { CategoryBadge } from "@/components/blog/CategoryBadge"
import { RelatedPosts } from "@/components/blog/RelatedPosts"
import { uiText } from "@/lib/data/site-config"
import { getBlogPostBySlug, getRelatedPosts } from "@/lib/data/blog/posts"

export async function generateMetadata(params: { params: { slug: string } }) {
  const { slug } = params.params
  const blogPost = getBlogPostBySlug(slug)

  if (!blogPost) {
    return generatePageMetadata({
      title: uiText.blog.notFoundHeading,
      description: uiText.blog.notFoundDescription,
      path: "/blog",
    })
  }

  return generatePageMetadata({
    title: `${blogPost.title} | Moraira Travel Blog`,
    description: blogPost.excerpt,
    keywords: blogPost.seo.keywords,
    path: `/blog/${blogPost.slug}`,
    ogImage: blogPost.image,
  })
}

export default function BlogPostPage(params: { params: { slug: string } }) {
  const { slug } = params.params
  const blogPost = getBlogPostBySlug(slug)
  const relatedPosts = getRelatedPosts(slug, 3)

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation
          items={navigationData.mainNav}
          languages={navigationData.languages}
          siteName={navigationData.siteName}
          uiText={uiText}
        />
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-light mb-4">{uiText.blog.notFoundHeading}</h1>
          <Link href="/blog">
            <Button>{uiText.blog.backToBlog}</Button>
          </Link>
        </div>
        <Footer config={footerData} uiText={uiText} />
      </div>
    )
  }

  const articleSchema = generateArticleSchema(blogPost)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: uiText.common.home, url: "https://villamoraira.com" },
    { name: uiText.blog.breadcrumbBlog, url: "https://villamoraira.com/blog" },
    { name: blogPost.title, url: `https://villamoraira.com/blog/${blogPost.slug}` },
  ])

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation
        items={navigationData.mainNav}
        languages={navigationData.languages}
        siteName={navigationData.siteName}
        uiText={uiText}
      />

      {/* Breadcrumb - Use UI text for labels */}
      <section className="sr-only">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">{uiText.common.home}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">{uiText.blog.breadcrumbBlog}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{blogPost.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Back Button */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {uiText.blog.backToBlog}
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <article className="pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-6">
            <CategoryBadge category={blogPost.category} />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">{blogPost.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span className="text-sm">{blogPost.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">{blogPost.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{blogPost.readTime}</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4 mr-2" />
              {uiText.blog.shareButton}
            </Button>
          </div>

          {/* Featured Image */}
          <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12">
            <Image
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div
            className="blog-article-content prose prose-lg max-w-none
            prose-headings:font-light prose-headings:text-foreground prose-headings:text-balance
            prose-h2:text-3xl prose-h2:md:text-4xl
            prose-h3:text-2xl prose-h3:md:text-3xl
            prose-p:text-foreground/80 prose-p:text-lg prose-p:leading-relaxed prose-p:text-pretty
            prose-ul:text-foreground/80 prose-ul:text-lg prose-ul:space-y-3
            prose-li:leading-relaxed
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:transition-colors"
            dangerouslySetInnerHTML={{ __html: blogPost.content || "" }}
          />
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} uiText={uiText} />

      <Footer config={footerData} uiText={uiText} />
    </div>
  )
}
