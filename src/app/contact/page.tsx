import { generatePageMetadata } from "@/lib/seo/metadata"
import {
  generateOrganizationSchema,
  generateWebPageSchema,
  generateFAQPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo/jsonld"
import { SITE_URL } from "@/lib/seo/constants"
import ContactClientPage from "./contact-client"
import { sanityFetch, getStaticPageAlternateUrls } from "@/lib/sanity/fetch"
import { CONTACT_PAGE_QUERY, SITE_SETTINGS_QUERY, NAVIGATION_QUERY, FOOTER_QUERY } from "@/lib/sanity/queries"
import { getUiText, type Locale, normalizeLink, languages } from "@/lib/i18n"

const LOCALE: Locale = "nl"

export async function generateMetadata() {
  const contactPage = await sanityFetch<any>({
    query: CONTACT_PAGE_QUERY,
    params: { language: LOCALE },
    tags: ["contactPage"],
  })

  return generatePageMetadata({
    title: contactPage?.seo?.metaTitle || "Contact | Villa Moraira",
    description: contactPage?.seo?.metaDescription || "",
    keywords: contactPage?.seo?.keywords || [],
    path: "/contact",
  })
}

export default async function ContactPage() {
  const uiText = getUiText(LOCALE)

  const [contactPage, settings, navigation, footer, alternateUrls] = await Promise.all([
    sanityFetch<any>({
      query: CONTACT_PAGE_QUERY,
      params: { language: LOCALE },
      tags: ["contactPage"],
    }),
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
    getStaticPageAlternateUrls("contactPage", LOCALE),
  ])

  // Transform navigation data
  const navigationItems = navigation?.mainNav?.map((item: any) => ({
    name: item.label,
    href: normalizeLink(item.href, LOCALE),
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
      href: normalizeLink(l.href || "/", LOCALE),
    })) || [],
    services: footer?.columns?.[1]?.links?.map((l: any) => l.label) || [],
    contact: settings?.contact || {},
    copyright: footer?.bottomBar?.copyright || "",
    legalLinks: footer?.bottomBar?.links?.map((l: any) => ({
      ...l,
      href: normalizeLink(l.href || "/", LOCALE),
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
      phoneLabel: contactPage?.contactInfo?.phoneLabel || "Telefoon",
      emailLabel: contactPage?.contactInfo?.emailLabel || "E-mail",
      locationLabel: contactPage?.contactInfo?.locationLabel || "Locatie",
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
    `${SITE_URL}/contact`,
  )

  const faqSchema = generateFAQPageSchema(pageData.faq)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
  ])

  return (
    <ContactClientPage
      pageData={pageData}
      navigationItems={navigationItems}
      languageOptions={languageOptions}
      footerConfig={footerConfig}
      siteConfig={siteConfig}
      siteName={settings?.siteName || "Villa Moraira"}
      uiText={uiText}
      locale={LOCALE}
      alternateUrls={alternateUrls}
      organizationSchema={organizationSchema}
      webPageSchema={webPageSchema}
      faqSchema={faqSchema}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}
