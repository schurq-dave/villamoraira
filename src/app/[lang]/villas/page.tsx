import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generateItemListSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/jsonld"
import { VillaCard } from "@/components/cards/VillaCard"
import { HeroSection } from "@/components/sections/HeroSection"
import { CTASection } from "@/components/sections/CTASection"
import { sanityFetch } from "@/lib/sanity/fetch"
import {
  SITE_SETTINGS_QUERY,
  NAVIGATION_QUERY,
  FOOTER_QUERY,
  VILLAS_PAGE_QUERY,
  ALL_VILLAS_QUERY,
} from "@/lib/sanity/queries"
import { type Locale, languages, getUiText, localizeUrl, normalizeLink } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo/constants"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale

  const villasPage = await sanityFetch<any>({
    query: VILLAS_PAGE_QUERY,
    params: { language: locale },
    tags: ["villasPage"],
  })

  return generatePageMetadata({
    title: villasPage?.seo?.metaTitle || "Our Villas",
    description: villasPage?.seo?.metaDescription || "",
    keywords: villasPage?.seo?.keywords || [],
    path: localizeUrl("/villas", locale),
  })
}

export default async function VillasPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  // Fetch all data in parallel
  const [settings, navigation, footer, villasPage, villas] = await Promise.all([
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
      query: VILLAS_PAGE_QUERY,
      params: { language: locale },
      tags: ["villasPage"],
    }),
    sanityFetch<any[]>({
      query: ALL_VILLAS_QUERY,
      params: { language: locale },
      tags: ["villa"],
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

  const siteUrl = (settings?.siteUrl || SITE_URL).replace(/\/+$/, "")

  const organizationSchema = generateOrganizationSchema({
    siteUrl,
    siteName: settings?.siteName,
    logoUrl: settings?.logoUrl,
    contact: settings?.contact,
    social: settings?.social,
  })

  const itemListSchema = generateItemListSchema(
    (villas || []).map((villa) => ({
      name: villa.name,
      url: localizeUrl(`/villas/${villa.slug}`, locale),
      image: villa.mainImageUrl || "/luxury-villa.png",
      description: villa.shortDescription || "",
    })),
    siteUrl,
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: localizeUrl("/", locale) },
    { name: locale === "nl" ? "Villas" : "Villas", url: localizeUrl("/villas", locale) },
  ], siteUrl)

  const ctaButtons = [
    {
      label: villasPage?.cta?.primaryButtonText || (locale === "nl" ? "Neem Contact Op" : "Get in Touch"),
      href: normalizeLink(villasPage?.cta?.primaryButtonLink || "/contact", locale),
      variant: "primary" as const,
    },
    {
      label: villasPage?.cta?.secondaryButtonText || (locale === "nl" ? "Ontdek Moraira" : "Discover Moraira"),
      href: normalizeLink(villasPage?.cta?.secondaryButtonLink || "/moraira", locale),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation
        items={navigationItems}
        languages={languageOptions}
        siteName={settings?.siteName || "Villa Moraira"}
        uiText={uiText}
        currentLocale={locale}
      />

      <HeroSection
        title={villasPage?.hero?.title || (locale === "nl" ? "Onze Luxe Villa's" : "Our Luxury Villas")}
        description={villasPage?.hero?.description || ""}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-light mb-2">
                {villasPage?.listings?.title || (locale === "nl" ? "Beschikbare Villa's" : "Available Villas")}
              </h2>
              <p className="text-muted-foreground">
                {(villas?.length || 0)} {locale === "nl" ? "luxe woningen beschikbaar" : "luxury properties available"}
              </p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              {villasPage?.listings?.filterButtonText || "Filter"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(villas || []).map((villa) => (
              <VillaCard
                key={villa._id}
                slug={villa.slug}
                name={villa.name}
                location={villa.location || { address: "", city: "Moraira" }}
                images={{ main: villa.mainImageUrl || "/luxury-villa.png" }}
                pricing={villa.pricing || { perWeek: 0, currency: "EUR" }}
                capacity={villa.capacity || { guests: 0, bedrooms: 0, bathrooms: 0 }}
                rating={villa.rating || { average: 0 }}
                amenities={villa.amenities?.map((a: any) => a.name) || []}
                featured={villa.featured || false}
                description={villa.shortDescription || ""}
                uiText={uiText}
                href={localizeUrl(`/villas/${villa.slug}`, locale)}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={villasPage?.cta?.title || (locale === "nl" ? "Klaar om Uw Droomvilla te Boeken?" : "Ready to Book Your Dream Villa?")}
        description={villasPage?.cta?.description || ""}
        buttons={ctaButtons}
      />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

