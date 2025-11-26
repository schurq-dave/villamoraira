"use client"
import type { Review } from "@/lib/types/Review"
import { ReviewCard } from "@/components/cards/ReviewCard"
import { ReviewsCarousel } from "./ReviewsCarousel"
import { ReviewsDesktop } from "./ReviewsDesktop"
import { useState, useEffect } from "react"
import type { UIText } from "@/lib/types/UIText"

interface ReviewsProps {
  reviews: Review[]
  averageRating?: number
  totalReviews?: number
  uiText: UIText
}

export function Reviews({ reviews, averageRating = 4.9, totalReviews = 127, uiText }: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 2 >= reviews.length ? 0 : prev + 2))
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? Math.max(0, reviews.length - 2) : prev - 2))
  }

  const reviewCards = reviews.map((review) => (
    <ReviewCard
      key={String(review.id)}
      id={String(review.id)}
      name={review.name}
      location={review.location}
      date={review.date}
      rating={review.rating}
      text={review.text}
      image={review.image}
    />
  ))

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_4fr] gap-12 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">{uiText.reviews.heading}</h2>
            <p className="text-lg text-muted-foreground">{uiText.reviews.description}</p>
          </div>
        </div>

        <div className="md:hidden">
          <ReviewsCarousel>{reviewCards}</ReviewsCarousel>
        </div>

        <div className="hidden md:block">
          <ReviewsDesktop reviews={reviews} />
        </div>
      </div>
    </section>
  )
}
