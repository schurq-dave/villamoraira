import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Sun, Users, Waves, Mountain, Camera, Plane, Car } from "lucide-react"
import Image from "next/image"
import { generatePageMetadata } from "@/lib/seo/metadata"
import { generatePlaceSchema, generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/seo/jsonld"
import { HeroSection } from "@/components/sections/HeroSection"
import { CTASection } from "@/components/sections/CTASection"
import { AttractionCard } from "@/components/moraira/AttractionCard"
import { ActivitySection } from "@/components/moraira/ActivitySection"
import { TransportationInfo } from "@/components/moraira/TransportationInfo"
import { DiningCard } from "@/components/moraira/DiningCard"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import PortableTextRenderer from "@/components/portable-text-renderer"
import { sanityFetch, getStaticPageAlternateUrls } from "@/lib/sanity/fetch"
import { MORAIRA_PAGE_QUERY, SITE_SETTINGS_QUERY, NAVIGATION_QUERY, FOOTER_QUERY } from "@/lib/sanity/queries"
import { getUiText, type Locale, normalizeLink, languages } from "@/lib/i18n"
import { notFound } from "next/navigation"
import { SITE_URL } from "@/lib/seo/constants"

interface MorairaPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: MorairaPageProps) {
  const { lang } = await params
  const locale = lang as Locale

  const morairaPage = await sanityFetch<any>({
    query: MORAIRA_PAGE_QUERY,
    params: { language: locale },
    tags: ["morairaPage"],
  })

  return generatePageMetadata({
    title: morairaPage?.seo?.metaTitle || "Moraira | Villa Moraira",
    description: morairaPage?.seo?.metaDescription || "",
    keywords: morairaPage?.seo?.keywords || [],
    path: `/${lang}/moraira`,
    ogImage: morairaPage?.hero?.imageUrl,
  })
}

export default async function MorairaPage({ params }: MorairaPageProps) {
  const { lang } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  const [morairaPage, settings, navigation, footer, alternateUrls] = await Promise.all([
    sanityFetch<any>({
      query: MORAIRA_PAGE_QUERY,
      params: { language: locale },
      tags: ["morairaPage"],
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
    getStaticPageAlternateUrls("morairaPage", locale),
  ])

  if (!morairaPage) {
    notFound()
  }

  const { hero, introduction, attractions, activities, dining, transportation, cta } = morairaPage

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

  const placeSchema = generatePlaceSchema({
    name: "Moraira",
    description: hero?.description || "",
    address: {
      streetAddress: "",
      addressLocality: "Moraira",
      addressRegion: "Alicante",
      postalCode: "03724",
      addressCountry: "ES",
    },
    image: hero?.imageUrl,
  }, siteUrl)

  const organizationSchema = generateOrganizationSchema({
    siteUrl,
    siteName: settings?.siteName,
    logoUrl: settings?.logoUrl,
    contact: settings?.contact,
    social: settings?.social,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${lang}` },
    { name: "Moraira", url: `/${lang}/moraira` },
  ], siteUrl)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
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
      <HeroSection
        variant="split"
        title={hero?.title || ""}
        description={
          Array.isArray(hero?.description) ? (
            <PortableTextRenderer value={hero.description} />
          ) : (
            hero?.description || ""
          )
        }
        image={hero?.imageUrl || "/placeholder.svg"}
        imageAlt={hero?.imageAlt || ""}
      />

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{introduction?.title || ""}</h2>
              {Array.isArray(introduction?.paragraphs) &&
              introduction.paragraphs.length > 0 &&
              typeof introduction.paragraphs[0] === "string" ? (
                introduction.paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))
              ) : (
                <div className="text-muted-foreground leading-relaxed">
                  <PortableTextRenderer value={introduction?.paragraphs || []} />
                </div>
              )}
              <div className="flex items-center gap-4">
                {introduction?.stats?.map((stat: any, index: number) => (
                  <div key={index} className="flex items-center">
                    {stat.icon === "sun" && <Sun className="h-5 w-5 mr-2 text-secondary" />}
                    {stat.icon === "users" && <Users className="h-5 w-5 mr-2 text-secondary" />}
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={introduction?.imageUrl || "/placeholder.svg"}
                alt={introduction?.imageAlt || ""}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Attractions */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{attractions?.title || ""}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{attractions?.description || ""}</p>
          </div>
            <div className="lg:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {attractions?.items?.map((attraction: any, index: number) => (
                  <CarouselItem key={index} className="pl-4 basis-[85%]">
                    <AttractionCard
                      title={attraction.title}
                      description={attraction.description}
                      image={attraction.imageUrl}
                      imageAlt={attraction.imageAlt}
                      distance={attraction.distance}
                      badge={attraction.badge}
                      icon={attraction.icon === "waves" ? Waves : attraction.icon === "mountain" ? Mountain : Camera}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="static translate-x-0 translate-y-0" />
                <CarouselNext className="static translate-x-0 translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions?.items?.map((attraction: any, index: number) => (
              <AttractionCard
                key={index}
                title={attraction.title}
                description={attraction.description}
                image={attraction.imageUrl}
                imageAlt={attraction.imageAlt}
                distance={attraction.distance}
                badge={attraction.badge}
                icon={attraction.icon === "waves" ? Waves : attraction.icon === "mountain" ? Mountain : Camera}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{activities?.title || ""}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{activities?.description || ""}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ActivitySection title={activities?.water?.title || ""} icon={Waves} activities={activities?.water?.items || []} />
            <ActivitySection title={activities?.land?.title || ""} icon={Mountain} activities={activities?.land?.items || []} />
          </div>
        </div>
      </section>

      {/* Dining */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{dining?.title || ""}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{dining?.description || ""}</p>
          </div>
          <div className="lg:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {dining?.options?.map((option: any, index: number) => (
                  <CarouselItem key={index} className="pl-4 basis-[85%]">
                    <DiningCard {...option} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious className="static translate-x-0 translate-y-0" />
                <CarouselNext className="static translate-x-0 translate-y-0" />
              </div>
            </Carousel>
          </div>

          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dining?.options?.map((option: any, index: number) => (
              <DiningCard key={index} {...option} />
            ))}
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{transportation?.title || ""}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{transportation?.description || ""}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <TransportationInfo
              title={transportation?.flight?.title || ""}
              icon={Plane}
              options={transportation?.flight?.options || []}
            />
            <TransportationInfo title={transportation?.car?.title || ""} icon={Car} options={transportation?.car?.options || []} />
          </div>
        </div>
      </section>

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
