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
import { sanityFetch, getStaticPageAlternateUrls } from "@/lib/sanity/fetch"
import {
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  FOOTER_QUERY,
  HOME_PAGE_QUERY,
  FEATURED_VILLAS_QUERY,
  ALL_REVIEWS_QUERY,
} from "@/lib/sanity/queries"
import { getUiText, languages } from "@/lib/i18n"

const LOCALE = "nl"

export async function generateMetadata() {
  const settings = await sanityFetch<any>({
    query: SITE_SETTINGS_QUERY,
    params: { language: LOCALE },
    tags: ["siteSettings"],
  })

  return generatePageMetadata({
    title: settings?.defaultSeo?.metaTitle || "Villa Moraira",
    description: settings?.defaultSeo?.metaDescription || "",
    path: "/",
    keywords: settings?.defaultSeo?.keywords || [],
    ogImage: settings?.defaultSeo?.ogImageUrl,
  })
}

export default async function HomePage() {
  const uiText = getUiText(LOCALE)

  // Fetch all data from Sanity in parallel
  const [settings, navigation, footer, homePage, villas, reviews, alternateUrls] = await Promise.all([
    sanityFetch<any>({
      query: SITE_SETTINGS_QUERY,
      params: { language: LOCALE },
      tags: ["siteSettings"],
    }),
    sanityFetch<any>({
      query: NAVIGATION_QUERY,
      params: { language: LOCALE },
      tags: ["navigation"],
    }),
    sanityFetch<any>({
      query: FOOTER_QUERY,
      params: { language: LOCALE },
      tags: ["footer"],
    }),
    sanityFetch<any>({
      query: HOME_PAGE_QUERY,
      params: { language: LOCALE },
      tags: ["homePage"],
    }),
    sanityFetch<any[]>({
      query: FEATURED_VILLAS_QUERY,
      params: { language: LOCALE },
      tags: ["villa"],
    }),
    sanityFetch<any[]>({
      query: ALL_REVIEWS_QUERY,
      tags: ["review"],
    }),
    getStaticPageAlternateUrls("homePage", LOCALE),
  ])

  // Transform navigation data
  const navigationItems = navigation?.mainNav?.map((item: any) => ({
    name: item.label,
    href: item.href,
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
    quickLinks: footer?.columns?.[0]?.links || [],
    services: footer?.columns?.[1]?.links?.map((l: any) => l.label) || [],
    contact: settings?.contact || {},
    copyright: footer?.bottomBar?.copyright || "",
    legalLinks: footer?.bottomBar?.links || [],
  }

  // Transform villas for the component
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

  const siteUrl = settings?.siteUrl || SITE_URL

  const organizationSchema = generateOrganizationSchema({
    siteUrl,
    siteName: settings?.siteName,
    logoUrl: settings?.logoUrl,
    contact: settings?.contact,
    social: settings?.social,
  })
  const webPageSchema = generateWebPageSchema(
    settings?.defaultSeo?.metaTitle || "Villa Moraira",
    settings?.defaultSeo?.metaDescription || "",
    siteUrl
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
        currentLocale={LOCALE}
        alternateUrls={alternateUrls}
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
            href={homePage?.hero?.ctaLink || "/villas"}
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
        viewAllLink={homePage?.featuredVillas?.viewAllLink || "/villas"}
        viewAllText={homePage?.featuredVillas?.viewAllText || ""}
        uiText={uiText}
        locale={LOCALE}
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
        ctaLink={homePage?.morairaSection?.ctaLink || "/moraira"}
        image={homePage?.morairaSection?.imageUrl || "/beautiful-moraira-coastline.jpg"}
        imageAlt={homePage?.morairaSection?.imageAlt || ""}
        imagePosition="right"
      />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

