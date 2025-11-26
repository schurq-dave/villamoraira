import { generatePageMetadata } from "@/lib/seo/metadata"
import {
  generateOrganizationSchema,
  generateWebPageSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/jsonld"
import { SITE_URL } from "@/lib/seo/constants"
import ContactClientPageEN from "./contact-client-en"
import { sanityFetch, getStaticPageAlternateUrls } from "@/lib/sanity/fetch"
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY, NAVIGATION_QUERY, FOOTER_QUERY } from "@/lib/sanity/queries"
import { getUiText, type Locale, normalizeLink, languages } from "@/lib/i18n"

interface ContactPageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: ContactPageProps) {
  const { lang } = await params
  const locale = lang as Locale

  const contactPage = await sanityFetch<any>({
    query: CONTACT_PAGE_QUERY,
    params: { language: locale },
    tags: ["contactPage"],
  })

  return generatePageMetadata({
    title: contactPage?.seo?.metaTitle || "Contact | Villa Moraira",
    description: contactPage?.seo?.metaDescription || "",
    keywords: contactPage?.seo?.keywords || [],
    path: `/${lang}/contact`,
  })
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params
  const locale = lang as Locale
  const uiText = getUiText(locale)

  const [contactPage, settings, navigation, footer, alternateUrls] = await Promise.all([
    sanityFetch<any>({
      query: CONTACT_PAGE_QUERY,
      params: { language: locale },
      tags: ["contactPage"],
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
    getStaticPageAlternateUrls("contactPage", locale),
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

  // Site config for contact details
  const siteConfig = {
    siteName: settings?.siteName || "Villa Moraira",
    contact: {
      phone: settings?.contact?.phone || "+31 6 1234 5678",
      email: settings?.contact?.email || "info@villamorairahuren.nl",
      address: settings?.contact?.address || "Moraira, Alicante, Spain",
    },
  }

  // Transform page data to match client component expectations
  const pageData = {
    hero: {
      badge: contactPage?.hero?.badge || "CONTACT",
      title: contactPage?.hero?.title || "",
      description: contactPage?.hero?.subtitle || "",
    },
    contactInfo: {
      phoneLabel: contactPage?.contactInfo?.phoneLabel || "Phone",
      emailLabel: contactPage?.contactInfo?.emailLabel || "Email",
      locationLabel: contactPage?.contactInfo?.locationLabel || "Location",
    },
    mapSection: {
      title: contactPage?.mapSection?.title || "",
      description: contactPage?.mapSection?.description || "",
      placeholder: {
        title: contactPage?.mapSection?.placeholder?.title || "",
        description: contactPage?.mapSection?.placeholder?.description || "",
      },
    },
    faq: contactPage?.faq || [],
    seo: {
      metaTitle: contactPage?.seo?.metaTitle || "",
      metaDescription: contactPage?.seo?.metaDescription || "",
    },
  }

  const organizationSchema = generateOrganizationSchema()
  const webPageSchema = generateWebPageSchema(
    pageData.seo.metaTitle,
    pageData.seo.metaDescription,
    `${SITE_URL}/${lang}/contact`,
  )

  const faqSchema = generateFAQPageSchema(pageData.faq)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: `/${lang}` },
    { name: "Contact", url: `/${lang}/contact` },
  ])

  return (
    <ContactClientPageEN
      pageData={pageData}
      navigationItems={navigationItems}
      languageOptions={languageOptions}
      footerConfig={footerConfig}
      siteConfig={siteConfig}
      siteName={settings?.siteName || "Villa Moraira"}
      uiText={uiText}
      locale={locale}
      alternateUrls={alternateUrls}
      organizationSchema={organizationSchema}
      webPageSchema={webPageSchema}
      faqSchema={faqSchema}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
