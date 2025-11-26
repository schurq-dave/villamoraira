import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { VillaDetailTemplate } from "@/components/templates/VillaDetailTemplate"
import { sanityFetch } from "@/lib/sanity/fetch"
import {
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  FOOTER_QUERY,
  VILLA_BY_SLUG_QUERY,
  ALL_VILLAS_QUERY,
} from "@/lib/sanity/queries"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateOrganizationSchema } from "@/lib/seo/jsonld"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getUiText, languages } from "@/lib/i18n"

const LOCALE = "nl"

// Generate static params for all villas
export async function generateStaticParams() {
  const villas = await sanityFetch<any[]>({
    query: ALL_VILLAS_QUERY,
    params: { language: LOCALE },
  })

  return (villas || []).map((villa) => ({
    slug: villa.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const villa = await sanityFetch<any>({
    query: VILLA_BY_SLUG_QUERY,
    params: { language: LOCALE, slug },
    tags: ["villa"],
  })

  if (!villa) {
    return {
      title: "Villa niet gevonden",
    }
  }

  return generatePageMetadata({
    title: villa.seo?.metaTitle || villa.name,
    description: villa.seo?.metaDescription || villa.shortDescription,
    keywords: villa.seo?.keywords || [],
    path: `/villas/${slug}`,
    ogImage: villa.seo?.ogImageUrl || villa.mainImageUrl,
  })
}

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const uiText = getUiText(LOCALE)

  // Fetch all data in parallel
  const [settings, navigation, footer, villa] = await Promise.all([
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
      query: VILLA_BY_SLUG_QUERY,
      params: { language: LOCALE, slug },
      tags: ["villa"],
    }),
  ])

  if (!villa) {
    notFound()
  }

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

  // Transform villa data for the template
  const villaData = {
    name: villa.name,
    slug: villa.slug,
    location: `${villa.location?.address || ""}, ${villa.location?.city || "Moraira"}`,
    badge: villa.featured ? "FEATURED" : "AVAILABLE",
    badgeVariant: "secondary" as const,
    rating: villa.rating?.average || 0,
    reviewCount: villa.rating?.count || 0,
    pricePerWeek: villa.pricing?.perWeek || 0,
    pricePerNight: villa.pricing?.perNight || 0,
    guests: villa.capacity?.guests || 0,
    bedrooms: villa.capacity?.bedrooms || 0,
    bathrooms: villa.capacity?.bathrooms || 0,
    description: villa.shortDescription ? [villa.shortDescription] : [""],
    amenities: villa.amenities?.map((a: any) => a.name) || [],
    houseRules: {
      checkIn: villa.houseRules?.[0] || "Na 16:00 uur",
      checkOut: villa.houseRules?.[1] || "Voor 10:00 uur",
      smoking: false,
      pets: false,
      parties: false,
    },
    images: {
      main: villa.mainImageUrl || "/luxury-villa.png",
      gallery: villa.images?.map((img: any) => img.url) || [],
    },
    reviews: [],
    booking: {
      villaId: villa.slug,
      pricePerNight: villa.pricing?.perNight || 0,
      pricePerWeek: villa.pricing?.perWeek || 0,
      cleaningFee: villa.pricing?.cleaningFee || 0,
      serviceFee: 0,
      rating: villa.rating?.average || 0,
      maxGuests: villa.capacity?.guests || 0,
      unavailableDates: [],
      icalUrl: "",
    },
  }

  const organizationSchema = generateOrganizationSchema()

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Navigation
        items={navigationItems}
        languages={languageOptions}
        siteName={settings?.siteName || "Villa Moraira"}
        uiText={uiText}
        currentLocale={LOCALE}
      />

      <VillaDetailTemplate villa={villaData} uiText={uiText} />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

