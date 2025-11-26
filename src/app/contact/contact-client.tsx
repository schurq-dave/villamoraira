"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/forms/ContactForm"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin } from "lucide-react"
import { Breadcrumb } from "@/components/Breadcrumb"
import type { Locale } from "@/lib/i18n"

interface ContactClientPageProps {
  pageData: {
    hero: {
      badge: string
      title: string
      description: string
    }
    contactInfo: {
      phoneLabel: string
      emailLabel: string
      locationLabel: string
    }
    mapSection: {
      title: string
      description: string
      placeholder: {
        title: string
        description: string
      }
    }
    faq: any[]
    seo: {
      metaTitle: string
      metaDescription: string
    }
  }
  navigationItems: { name: string; href: string }[]
  languageOptions: { code: string; name: string; flag: string }[]
  footerConfig: any
  siteConfig: {
    siteName: string
    contact: {
      phone: string
      email: string
      address: string
    }
  }
  siteName: string
  uiText: any
  locale: Locale
  alternateUrls: Record<Locale, string> | null
  organizationSchema: object
  webPageSchema: object
  faqSchema: object
  breadcrumbSchema: object
}

export default function ContactClientPage({
  pageData,
  navigationItems,
  languageOptions,
  footerConfig,
  siteConfig,
  siteName,
  uiText,
  locale,
  alternateUrls,
  organizationSchema,
  webPageSchema,
  faqSchema,
  breadcrumbSchema,
}: ContactClientPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Navigation
        items={navigationItems}
        languages={languageOptions}
        siteName={siteName}
        uiText={uiText}
        currentLocale={locale}
        alternateUrls={alternateUrls}
      />

      <Breadcrumb items={[{ name: "Home", url: "/" }, { name: "Contact" }]} />

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left Column - Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <Badge className="px-3 py-1.5 bg-secondary text-secondary-foreground">{pageData.hero.badge}</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light">{pageData.hero.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{pageData.hero.description}</p>
                <div className="w-24 h-px bg-border" />
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{pageData.contactInfo.phoneLabel}</p>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-lg font-light hover:text-primary transition-colors"
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{pageData.contactInfo.emailLabel}</p>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-lg font-light hover:text-primary transition-colors"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{pageData.contactInfo.locationLabel}</p>
                    <p className="text-lg font-light">{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="relative">
              {/* Vertical divider line on desktop */}
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-border -ml-12" />

              <ContactForm uiText={uiText} />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light mb-6">{pageData.mapSection.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{pageData.mapSection.description}</p>
          </div>

          <Card className="overflow-hidden shadow-lg">
            <div className="relative h-96 bg-muted-foreground/10 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-light mb-2">{pageData.mapSection.placeholder.title}</h3>
                <p className="text-muted-foreground">{pageData.mapSection.placeholder.description}</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}
