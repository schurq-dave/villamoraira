import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Home, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateWebPageSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/jsonld"
import { SITE_URL } from "@/lib/seo/constants"
import { CTASection } from "@/components/sections/CTASection"
import { sanityFetch, getStaticPageAlternateUrls } from "@/lib/sanity/fetch"
import { ABOUT_PAGE_QUERY, SITE_SETTINGS_QUERY, NAVIGATION_QUERY, FOOTER_QUERY } from "@/lib/sanity/queries"
import { getUiText, type Locale, normalizeLink, languages } from "@/lib/i18n"
import { notFound } from "next/navigation"

interface AboutPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: AboutPageProps) {
  const { lang } = await params
  const locale = lang as Locale
  
  const aboutPage = await sanityFetch<any>({
    query: ABOUT_PAGE_QUERY,
    params: { language: locale },
    tags: ["aboutPage"],
  })

  return generatePageMetadata({
    title: aboutPage?.seo?.metaTitle || "About Us | Villa Moraira",
    description: aboutPage?.seo?.metaDescription || "",
    keywords: aboutPage?.seo?.keywords || [],
    path: `/${lang}/about-us`,
  })
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  const [aboutPage, settings, navigation, footer, alternateUrls] = await Promise.all([
    sanityFetch<any>({
      query: ABOUT_PAGE_QUERY,
      params: { language: locale },
      tags: ["aboutPage"],
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
    getStaticPageAlternateUrls("aboutPage", locale),
  ])

  if (!aboutPage) {
    notFound()
  }

  const { hero, story, values, testimonials, cta } = aboutPage

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

  const siteUrl = (settings?.siteUrl || SITE_URL).replace(/\/+$/, "")

  const webPageSchema = generateWebPageSchema(
    aboutPage?.seo?.metaTitle || "About Us - Villa Moraira",
    aboutPage?.seo?.metaDescription || "",
    `${siteUrl}/${lang}/about-us`
  )

  const organizationSchema = generateOrganizationSchema({
    siteUrl,
    siteName: settings?.siteName,
    logoUrl: settings?.logoUrl,
    contact: settings?.contact,
    social: settings?.social,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${lang}` },
    { name: "About Us", url: `/${lang}/about-us` },
  ], siteUrl)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary text-secondary-foreground py-1.5 px-3">{hero?.badge || "ABOUT US"}</Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">{hero?.title || ""}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">{hero?.description || ""}</p>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image src={hero?.imageUrl || "/placeholder.svg"} alt={hero?.imageAlt || ""} fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image src={story?.imageUrl || "/placeholder.svg"} alt={story?.imageAlt || ""} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{story?.title || ""}</h2>
              {story?.paragraphs?.map((paragraph: string, index: number) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
              <Link
                href={normalizeLink(story?.ctaLink || "/contact", locale)}
                className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
              >
                <span className="text-lg font-light">{story?.ctaText || ""}</span>
                <div className="w-12 h-12 rounded-full border border-foreground group-hover:border-primary flex items-center justify-center transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-6">{values?.title || ""}</h2>
            </div>
            <div>
              <p className="text-lg text-muted-foreground">{values?.description || ""}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values?.items?.map((value: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {value.icon === "heart" && <Heart className="h-8 w-8 text-primary" />}
                    {value.icon === "home" && <Home className="h-8 w-8 text-primary" />}
                    {value.icon === "users" && <Users className="h-8 w-8 text-primary" />}
                    {value.icon === "star" && <Star className="h-8 w-8 text-primary" />}
                  </div>
                  <CardTitle className="text-xl font-light">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6">{testimonials?.title || ""}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{testimonials?.description || ""}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.items?.map((testimonial: any, index: number) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.date}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <CTASection 
        title={cta?.title || ""} 
        description={cta?.description || ""} 
        buttons={cta?.buttons?.map((btn: any) => ({
          ...btn,
          href: normalizeLink(btn.href || "/", locale),
        })) || []} 
      />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}
