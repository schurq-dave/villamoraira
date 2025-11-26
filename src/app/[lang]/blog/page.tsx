import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo/jsonld"
import { sanityFetch } from "@/lib/sanity/fetch"
import { ALL_BLOG_POSTS_QUERY, SITE_SETTINGS_QUERY, NAVIGATION_QUERY, FOOTER_QUERY } from "@/lib/sanity/queries"
import { getUiText, type Locale, normalizeLink, languages } from "@/lib/i18n"

interface BlogPageProps {
  params: Promise<{ lang: Locale }>
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { lang } = await params
  const title = lang === "nl" ? "Blog | Villa Moraira" : "Blog | Villa Moraira"
  const description = lang === "nl" 
    ? "Lees onze laatste artikelen over Moraira, vakantietips en villa leven."
    : "Read our latest articles about Moraira, vacation tips, and villa living."

  return generatePageMetadata({
    title,
    description,
    path: lang === "nl" ? "/blog" : `/${lang}/blog`,
  })
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params
  const locale = lang
  const uiText = getUiText(locale)

  const [blogPosts, settings, navigation, footer] = await Promise.all([
    sanityFetch<any[]>({
      query: ALL_BLOG_POSTS_QUERY,
      params: { language: locale },
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

  // Transform navigation data
  const navigationItems = navigation?.mainNav?.map((item: any) => ({
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
    quickLinks: footer?.columns?.[0]?.links?.map((l: any) => ({
      ...l,
      href: normalizeLink(l.href || "/", locale),
    })) || [],
    services: footer?.columns?.[1]?.links?.map((l: any) => l.label) || [],
    contact: settings?.contact || {},
    copyright: footer?.bottomBar?.copyright || "",
    legalLinks: footer?.bottomBar?.links?.map((l: any) => ({
      ...l,
      href: normalizeLink(l.href || "/", locale),
    })) || [],
  }

  const webPageSchema = generateWebPageSchema(
    "Blog",
    locale === "nl" 
      ? "Lees onze laatste artikelen over Moraira"
      : "Read our latest articles about Moraira",
    `https://villamoraira.com${locale === "nl" ? "/blog" : `/${locale}/blog`}`
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: uiText.common.home, url: "https://villamoraira.com" },
    { name: "Blog", url: `https://villamoraira.com${locale === "nl" ? "/blog" : `/${locale}/blog`}` },
  ])

  // Alternate URLs for blog (static since it's not a translated document)
  const alternateUrls = {
    nl: "/blog",
    en: "/en/blog",
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation
        items={navigationItems}
        languages={languageOptions}
        siteName={settings?.siteName || "Villa Moraira"}
        uiText={uiText}
        currentLocale={locale}
        alternateUrls={alternateUrls}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-secondary text-secondary-foreground py-1.5 px-3">
              BLOG
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">
              {locale === "nl" ? "Laatste Artikelen" : "Latest Articles"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {locale === "nl" 
                ? "Blijf op de hoogte van onze laatste reisgidsen en villa tips"
                : "Stay updated with our latest travel guides and villa tips"
              }
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {(!blogPosts || blogPosts.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {locale === "nl" 
                  ? "Er zijn nog geen blog posts beschikbaar."
                  : "No blog posts available yet."
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post: any) => (
                <Link 
                  key={post._id} 
                  href={normalizeLink(`/blog/${post.slug}`, locale)}
                  className="block group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={post.mainImageUrl || "/placeholder.svg"}
                        alt={post.mainImageAlt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(
                          locale === "nl" ? "nl-NL" : "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        ) : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}
