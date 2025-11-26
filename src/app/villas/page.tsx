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
import { getUiText, languages } from "@/lib/i18n"

const LOCALE = "nl"

export async function generateMetadata() {
  const villasPage = await sanityFetch<any>({
    query: VILLAS_PAGE_QUERY,
    params: { language: LOCALE },
    tags: ["villasPage"],
  })

  return generatePageMetadata({
    title: villasPage?.seo?.metaTitle || "Onze Villa's",
    description: villasPage?.seo?.metaDescription || "",
    keywords: villasPage?.seo?.keywords || [],
    path: "/villas",
  })
}

export default async function VillasPage() {
  const uiText = getUiText(LOCALE)

  // Fetch all data in parallel
  const [settings, navigation, footer, villasPage, villas] = await Promise.all([
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
      query: VILLAS_PAGE_QUERY,
      params: { language: LOCALE },
      tags: ["villasPage"],
    }),
    sanityFetch<any[]>({
      query: ALL_VILLAS_QUERY,
      params: { language: LOCALE },
      tags: ["villa"],
    }),
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

  const organizationSchema = generateOrganizationSchema()

  const itemListSchema = generateItemListSchema(
    (villas || []).map((villa) => ({
      name: villa.name,
      url: `/villas/${villa.slug}`,
      image: villa.mainImageUrl || "/luxury-villa.png",
      description: villa.shortDescription || "",
    })),
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Villas", url: "/villas" },
  ])

  const ctaButtons = [
    {
      label: villasPage?.cta?.primaryButtonText || "Neem Contact Op",
      href: villasPage?.cta?.primaryButtonLink || "/contact",
      variant: "primary" as const,
    },
    {
      label: villasPage?.cta?.secondaryButtonText || "Ontdek Moraira",
      href: villasPage?.cta?.secondaryButtonLink || "/moraira",
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
        currentLocale={LOCALE}
      />

      <HeroSection
        title={villasPage?.hero?.title || "Onze Luxe Villa's"}
        description={villasPage?.hero?.description || ""}
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-light mb-2">
                {villasPage?.listings?.title || "Beschikbare Villa's"}
              </h2>
              <p className="text-muted-foreground">
                {(villas?.length || 0)} luxe woningen beschikbaar
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
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={villasPage?.cta?.title || "Klaar om Uw Droomvilla te Boeken?"}
        description={villasPage?.cta?.description || ""}
        buttons={ctaButtons}
      />

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}

