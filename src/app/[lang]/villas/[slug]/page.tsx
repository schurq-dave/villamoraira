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
import { type Locale, languages, getUiText, localizeUrl, normalizeLink, i18nConfig } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo/constants"

// Generate static params for all villas in all languages
export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = []

  for (const locale of i18nConfig.locales) {
    const villas = await sanityFetch<any[]>({
      query: ALL_VILLAS_QUERY,
      params: { language: locale },
    })

    for (const villa of villas || []) {
      params.push({ lang: locale, slug: villa.slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = lang as Locale

  const villa = await sanityFetch<any>({
    query: VILLA_BY_SLUG_QUERY,
    params: { language: locale, slug },
    tags: ["villa"],
  })

  if (!villa) {
    return {
      title: locale === "nl" ? "Villa niet gevonden" : "Villa not found",
    }
  }

  return generatePageMetadata({
    title: villa.seo?.metaTitle || villa.name,
    description: villa.seo?.metaDescription || villa.shortDescription,
    keywords: villa.seo?.keywords || [],
    path: localizeUrl(`/villas/${slug}`, locale),
    ogImage: villa.seo?.ogImageUrl || villa.mainImageUrl,
  })
}

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  // Fetch all data in parallel
  const [settings, navigation, footer, villa] = await Promise.all([
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
      query: VILLA_BY_SLUG_QUERY,
      params: { language: locale, slug },
      tags: ["villa"],
    }),
  ])

  if (!villa) {
    notFound()
  }

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
    // On detail pages we render the full portable-text description.
    description: villa.fullDescription || [],
    highlights: villa.highlights || [],
    houseRules: {
      checkIn: villa.houseRules?.[0] || (locale === "nl" ? "Na 16:00 uur" : "After 4:00 PM"),
      checkOut: villa.houseRules?.[1] || (locale === "nl" ? "Voor 10:00 uur" : "Before 10:00 AM"),
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

  const siteUrl = (settings?.siteUrl || SITE_URL).replace(/\/+$/, "")

  const organizationSchema = generateOrganizationSchema({
    siteUrl,
    siteName: settings?.siteName,
    logoUrl: settings?.logoUrl,
    contact: settings?.contact,
    social: settings?.social,
  })

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
        currentLocale={locale}
      />

      <VillaDetailTemplate villa={villaData} uiText={uiText} />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

