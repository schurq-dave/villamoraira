import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AmenitiesList } from "@/components/lists/AmenitiesList"
import { ChecklistGrid } from "@/components/lists/ChecklistGrid"
import { ImageGallery } from "@/components/villa/ImageGallery"
import { Star, Users, Bed, Bath, MapPin, ArrowLeft, Share, Heart } from "lucide-react"
import Link from "next/link"
import { BookingCalendarClient } from "./BookingCalendarClient"
import type { UIText } from "@/lib/types/UIText"

interface VillaDetailTemplateProps {
  villa: {
    name: string
    slug: string
    location: string
    badge: string
    badgeVariant?: "default" | "secondary"
    rating: number
    reviewCount: number
    pricePerWeek: number
    pricePerNight: number
    guests: number
    bedrooms: number
    bathrooms: number
    description: string[]
    amenities: string[]
    houseRules: {
      checkIn: string
      checkOut: string
      smoking: boolean
      pets: boolean
    }
    images: {
      main: string
      gallery: string[]
    }
    reviews: Array<{
      author: string
      date: string
      rating: number
      content: string
    }>
    booking: {
      villaId: string
      pricePerNight: number
      pricePerWeek: number
      cleaningFee: number
      serviceFee: number
      rating: number
      maxGuests: number
      unavailableDates: string[]
      icalUrl?: string
    }
  }
  uiText: UIText
}

export function VillaDetailTemplate({ villa, uiText }: VillaDetailTemplateProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="sr-only bg-muted py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              {uiText.villa.breadcrumbHome}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/villas" className="text-muted-foreground hover:text-primary">
              {uiText.villa.breadcrumbVillas}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{villa.name}</span>
          </div>
        </div>
      </div>

      {/* Villa Header */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/villas">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {uiText.villa.backToVillas}
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={villa.badgeVariant === "secondary" ? "bg-secondary text-secondary-foreground" : ""}>
                  {villa.badge}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold">{villa.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({villa.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-light mb-2">{villa.name}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{villa.location}</span>
              </div>
            </div>
            <div className="text-right mt-4 lg:mt-0">
              <div className="text-3xl font-bold text-primary">
                {uiText.pricing.currency}
                {villa.pricePerWeek.toLocaleString()}
              </div>
              <div className="text-muted-foreground">{uiText.pricing.perWeek}</div>
              <div className="text-sm text-muted-foreground">
                {uiText.pricing.currency}
                {villa.pricePerNight} {uiText.pricing.perNight}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Images */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <ImageGallery
            mainImage={villa.images.main}
            gallery={villa.images.gallery}
            villaName={villa.name}
            viewAllText={uiText.villa.viewAllPhotos}
          />
        </div>
      </section>

      {/* Villa Details */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <div className="flex items-center gap-8">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {villa.guests} {uiText.villa.guests}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {villa.bedrooms} {uiText.villa.bedrooms}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {villa.bathrooms} {uiText.villa.bathrooms}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.aboutHeading}</h2>
                {villa.description.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.amenitiesHeading}</h2>
                <AmenitiesList amenities={villa.amenities} columns={2} />
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.houseRulesHeading}</h2>
                <ChecklistGrid
                  items={[
                    { label: `${uiText.villa.checkIn}: ${villa.houseRules.checkIn}`, checked: true },
                    { label: `${uiText.villa.checkOut}: ${villa.houseRules.checkOut}`, checked: true },
                    { label: uiText.villa.noSmoking, checked: !villa.houseRules.smoking },
                    { label: uiText.villa.noPets, checked: !villa.houseRules.pets },
                  ]}
                  columns={1}
                />
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.reviewsHeading}</h2>
                <div className="space-y-4">
                  {villa.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.author}</CardTitle>
                            <CardDescription>{review.date}</CardDescription>
                          </div>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <BookingCalendarClient {...villa.booking} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
