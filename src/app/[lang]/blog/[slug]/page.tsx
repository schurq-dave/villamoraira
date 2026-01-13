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
import { notFound } from "next/navigation"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/jsonld"
import { sanityFetch } from "@/lib/sanity/fetch"
import {
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  FOOTER_QUERY,
} from "@/lib/sanity/queries"
import { getUiText, normalizeLink, languages, type Locale, i18nConfig } from "@/lib/i18n"
import PortableTextRenderer from "@/components/portable-text-renderer"

interface BlogPostPageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string; language: string }>>({
    query: BLOG_POST_SLUGS_QUERY,
    tags: ["blogPost"],
  })

  // Only return non-default locale slugs for this route
  return (slugs || [])
    .filter((item) => item.language !== i18nConfig.defaultLocale)
    .map((item) => ({ lang: item.language, slug: item.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const locale = lang as Locale

  const blogPost = await sanityFetch<any>({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { language: locale, slug },
    tags: ["blogPost"],
  })

  if (!blogPost) {
    return generatePageMetadata({
      title: "Article not found | Villa Moraira",
      description: "The requested article could not be found.",
      path: `/${locale}/blog`,
    })
  }

  return generatePageMetadata({
    title: blogPost.seo?.metaTitle || `${blogPost.title} | Villa Moraira Blog`,
    description: blogPost.seo?.metaDescription || blogPost.excerpt || "",
    keywords: blogPost.seo?.keywords || [],
    path: `/${locale}/blog/${blogPost.slug}`,
    ogImage: blogPost.seo?.ogImageUrl || blogPost.mainImageUrl,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  const [blogPost, settings, navigation, footer] = await Promise.all([
    sanityFetch<any>({
      query: BLOG_POST_BY_SLUG_QUERY,
      params: { language: locale, slug },
      tags: ["blogPost"],
    }),
    sanityFetch<any>({
      query: SITE_SETTINGS_QUERY,
      params: { language: locale },
      tags: ["siteSettings"],
    }),
    sanityFetch<any>({
      query: NAVIGATION_QUERY,
      params: { language: locale },
      tags: ["navigation"],
    }),
    sanityFetch<any>({
      query: FOOTER_QUERY,
      params: { language: locale },
      tags: ["footer"],
    }),
  ])

  if (!blogPost) {
    notFound()
  }

  // Transform navigation data
  const navigationItems =
    navigation?.mainNav?.map((item: any) => ({
      name: item.label,
      href: normalizeLink(item.href, locale),
    })) || []

  const languageOptions = Object.entries(languages).map(([code, { name, flag }]) => ({
    code,
    name,
    flag,
  }))

  // Transform footer data
  const footerConfig = {
    companyName: settings?.siteName || "Villa Moraira",
    companyDescription: footer?.tagline || "",
    social: settings?.social || {},
    quickLinks:
      footer?.columns?.[0]?.links?.map((l: any) => ({
        ...l,
        href: normalizeLink(l.href || "/", locale),
      })) || [],
    services: footer?.columns?.[1]?.links?.map((l: any) => l.label) || [],
    contact: settings?.contact || {},
    copyright: footer?.bottomBar?.copyright || "",
    legalLinks:
      footer?.bottomBar?.links?.map((l: any) => ({
        ...l,
        href: normalizeLink(l.href || "/", locale),
      })) || [],
  }

  const siteUrl = settings?.siteUrl || "https://villamorairahuren.nl"
  const blogPath = locale === "nl" ? "/blog" : `/${locale}/blog`

  const articleSchema = generateArticleSchema({
    title: blogPost.title,
    slug: blogPost.slug,
    excerpt: blogPost.excerpt || "",
    image: blogPost.mainImageUrl || "/placeholder.svg",
    author: blogPost.author?.name || "Villa Moraira",
    date: blogPost.publishedAt || new Date().toISOString(),
    readTime: "5 min",
    category: blogPost.categories?.[0]?.title || "Blog",
    content: "",
    featured: false,
    seo: {
      metaTitle: blogPost.seo?.metaTitle || blogPost.title,
      metaDescription: blogPost.seo?.metaDescription || blogPost.excerpt || "",
      slug: blogPost.slug,
      keywords: blogPost.seo?.keywords || [],
      ogImageUrl: blogPost.seo?.ogImageUrl || blogPost.mainImageUrl,
    },
  }, siteUrl)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: uiText.common.home, url: siteUrl },
    { name: "Blog", url: `${siteUrl}${blogPath}` },
    { name: blogPost.title, url: `${siteUrl}${blogPath}/${blogPost.slug}` },
  ])

  const formattedDate = blogPost.publishedAt
    ? new Date(blogPost.publishedAt).toLocaleDateString(
        locale === "nl" ? "nl-NL" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : ""

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation
        items={navigationItems}
        languages={languageOptions}
        siteName={settings?.siteName || "Villa Moraira"}
        uiText={uiText}
        currentLocale={locale}
        alternateUrls={{ nl: `/blog/${slug}`, en: `/en/blog/${slug}` }}
      />

      {/* Breadcrumb - Screen reader only */}
      <section className="sr-only">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={normalizeLink("/", locale)}>{uiText.common.home}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={normalizeLink("/blog", locale)}>Blog</BreadcrumbLink>
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
          <Link href={normalizeLink("/blog", locale)}>
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
          {blogPost.categories?.[0] && (
            <div className="mb-6">
              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                {blogPost.categories[0].title}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">{blogPost.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8 text-muted-foreground">
            {blogPost.author?.name && (
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="text-sm">{blogPost.author.name}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm">{locale === "nl" ? "5 min leestijd" : "5 min read"}</span>
            </div>
            <Button variant="ghost" size="sm" className="ml-auto">
              <Share2 className="h-4 w-4 mr-2" />
              {locale === "nl" ? "Delen" : "Share"}
            </Button>
          </div>

          {/* Featured Image */}
          {blogPost.mainImageUrl && (
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-12">
              <Image
                src={blogPost.mainImageUrl}
                alt={blogPost.mainImageAlt || blogPost.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

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
          >
            <PortableTextRenderer value={blogPost.body || []} />
          </div>
        </div>
      </article>

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

