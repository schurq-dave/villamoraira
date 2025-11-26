"use client"

import { VillaCard } from "@/components/cards/VillaCard"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { FeaturedVillasCarousel } from "./FeaturedVillasCarousel"
import { localizeUrl, type Locale, i18nConfig } from "@/lib/i18n"

interface FeaturedVilla {
  id: string
  slug: string
  name: string
  location: { address: string; city: string }
  images: { main: string }
  pricing: { perWeek: number; currency: string }
  capacity: { guests: number; bedrooms: number; bathrooms: number }
  rating: { average: number }
  amenities: string[]
  featured: boolean
  description?: string
  href?: string
}

interface FeaturedVillasSectionProps {
  title: string
  description: string
  villas: FeaturedVilla[]
  viewAllLink?: string
  viewAllText?: string
  uiText?: any
  locale?: Locale
}

export function FeaturedVillasSection({
  title,
  description,
  villas,
  viewAllLink = "/villas",
  viewAllText = "View All Villas",
  uiText,
  locale = i18nConfig.defaultLocale as Locale,
}: FeaturedVillasSectionProps) {
  const villaCards = villas.map((villa) => (
    <VillaCard
      key={villa.id}
      slug={villa.slug}
      name={villa.name}
      location={villa.location}
      images={villa.images}
      pricing={villa.pricing}
      capacity={villa.capacity}
      rating={villa.rating}
      amenities={villa.amenities}
      featured={villa.featured}
      description={villa.description}
      uiText={uiText}
      href={villa.href || localizeUrl(`/villas/${villa.slug}`, locale)}
    />
  ))

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-12 mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{title}</h2>
          </div>
          <div className="flex items-end">
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="lg:hidden">
          <FeaturedVillasCarousel>{villaCards}</FeaturedVillasCarousel>
        </div>

        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8">{villaCards}</div>

        {viewAllLink && (
          <div className="mt-16">
            <Link
              href={viewAllLink}
              className="inline-flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
            >
              <span className="text-lg font-light">{viewAllText}</span>
              <div className="w-12 h-12 rounded-full border border-foreground group-hover:border-primary flex items-center justify-center transition-colors">
                <ArrowRight className="h-5 w-5" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
