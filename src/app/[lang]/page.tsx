import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Reviews } from "@/components/reviews"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateOrganizationSchema, generateWebPageSchema } from "@/lib/seo/jsonld"
import { SITE_URL } from "@/lib/seo/constants"
import { HeroSection } from "@/components/sections/HeroSection"
import { FeatureCardsSection } from "@/components/sections/FeatureCardsSection"
import { FeaturedVillasSection } from "@/components/sections/FeaturedVillasSection"
import { ContentImageSection } from "@/components/sections/ContentImageSection"
import { sanityFetch } from "@/lib/sanity/fetch"
import {
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  FOOTER_QUERY,
  HOME_PAGE_QUERY,
  FEATURED_VILLAS_QUERY,
  ALL_REVIEWS_QUERY,
} from "@/lib/sanity/queries"
import { type Locale, languages, getUiText, localizeUrl, normalizeLink } from "@/lib/i18n"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale

  const settings = await sanityFetch<any>({
    query: SITE_SETTINGS_QUERY,
    params: { language: locale },
    tags: ["siteSettings"],
  })

  return generatePageMetadata({
    title: settings?.defaultSeo?.metaTitle || "Villa Moraira",
    description: settings?.defaultSeo?.metaDescription || "",
    path: localizeUrl("/", locale),
    keywords: settings?.defaultSeo?.keywords || [],
    ogImage: settings?.defaultSeo?.ogImageUrl,
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  // Fetch all data from Sanity in parallel
  const [settings, navigation, footer, homePage, villas, reviews] = await Promise.all([
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
    sanityFetch<any>({
      query: HOME_PAGE_QUERY,
      params: { language: locale },
      tags: ["homePage"],
    }),
    sanityFetch<any[]>({
      query: FEATURED_VILLAS_QUERY,
      params: { language: locale },
      tags: ["villa"],
    }),
    sanityFetch<any[]>({
      query: ALL_REVIEWS_QUERY,
      tags: ["review"],
    }),
  ])

  // Transform navigation data with localized URLs (normalize first to strip any /en/ prefix)
  const navigationItems = navigation?.mainNav?.map((item: any) => ({
    name: item.label,
    href: normalizeLink(item.href, locale),
  })) || []

  const languageOptions = Object.entries(languages).map(([code, { name, flag }]) => ({
    code,
    name,
    flag,
  }))

  // Transform footer data with localized URLs (normalize first to strip any /en/ prefix)
  const footerConfig = {
    companyName: settings?.siteName || "Villa Moraira",
    companyDescription: footer?.tagline || "",
    social: settings?.social || {},
    quickLinks: (footer?.columns?.[0]?.links || []).map((link: any) => ({
      ...link,
      href: normalizeLink(link.href, locale),
    })),
    services: footer?.columns?.[1]?.links?.map((l: any) => l.label) || [],
    contact: settings?.contact || {},
    copyright: footer?.bottomBar?.copyright || "",
    legalLinks: (footer?.bottomBar?.links || []).map((link: any) => ({
      ...link,
      href: normalizeLink(link.href, locale),
    })),
  }

  // Transform villas for the component with localized URLs
  const featuredVillasList = (villas || []).map((villa: any) => ({
    id: villa._id,
    slug: villa.slug,
    name: villa.name,
    location: villa.location,
    images: {
      main: villa.mainImageUrl || "/luxury-villa.png",
    },
    pricing: villa.pricing,
    capacity: villa.capacity,
    rating: villa.rating,
    amenities: [],
    featured: true,
    description: villa.shortDescription,
    href: localizeUrl(`/villas/${villa.slug}`, locale),
  }))

  // Transform reviews for the component
  const reviewsList = (reviews || []).map((review: any) => ({
    id: review._id,
    name: review.name,
    location: review.location,
    rating: review.rating,
    date: review.date,
    text: review.text,
    image: review.imageUrl,
  }))

  const organizationSchema = generateOrganizationSchema()
  const webPageSchema = generateWebPageSchema(
    settings?.defaultSeo?.metaTitle || "Villa Moraira",
    settings?.defaultSeo?.metaDescription || "",
    SITE_URL
  )

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      <Navigation
        items={navigationItems}
        languages={languageOptions}
        siteName={settings?.siteName || "Villa Moraira"}
        uiText={uiText}
        currentLocale={locale}
      />

      {/* Hero Section */}
      <HeroSection
        variant="split"
        title={homePage?.hero?.title || ""}
        description={homePage?.hero?.description || ""}
        image={homePage?.hero?.imageUrl || "/images/moraira-beach-hero.png"}
        imageAlt={homePage?.hero?.imageAlt || ""}
      >
        <div>
          <Link
            href={normalizeLink(homePage?.hero?.ctaLink || "/villas", locale)}
            className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
          >
            <span className="text-lg font-light">{homePage?.hero?.ctaText || uiText.villa.viewAllVillas}</span>
            <div className="w-12 h-12 rounded-full border border-foreground group-hover:border-primary flex items-center justify-center transition-colors">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </HeroSection>

      {/* Featured Villas Section */}
      <FeaturedVillasSection
        title={homePage?.featuredVillas?.title || ""}
        description={homePage?.featuredVillas?.description || ""}
        villas={featuredVillasList}
        viewAllLink={normalizeLink(homePage?.featuredVillas?.viewAllLink || "/villas", locale)}
        viewAllText={homePage?.featuredVillas?.viewAllText || ""}
        uiText={uiText}
        locale={locale}
      />

      <Reviews reviews={reviewsList} uiText={uiText} />

      {/* Why Choose Villa Moraira Section */}
      <FeatureCardsSection
        title={homePage?.features?.title || ""}
        description={homePage?.features?.description || ""}
        features={homePage?.features?.items || []}
      />

      {/* Discover Moraira Section */}
      <ContentImageSection
        title={homePage?.morairaSection?.title || ""}
        description={homePage?.morairaSection?.description || ""}
        bulletPoints={
          homePage?.morairaSection?.bulletPoints?.map((bp: string) => ({ text: bp })) || []
        }
        ctaText={homePage?.morairaSection?.ctaText || ""}
        ctaLink={normalizeLink(homePage?.morairaSection?.ctaLink || "/moraira", locale)}
        image={homePage?.morairaSection?.imageUrl || "/beautiful-moraira-coastline.jpg"}
        imageAlt={homePage?.morairaSection?.imageAlt || ""}
        imagePosition="right"
      />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

