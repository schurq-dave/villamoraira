"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import type { Review } from "@/lib/types/Review"
import { ReviewCard } from "@/components/cards/ReviewCard"

interface ReviewsDesktopProps {
  reviews: Review[]
}

export function ReviewsDesktop({ reviews }: ReviewsDesktopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 2 >= reviews.length ? 0 : prev + 2))
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 2 < 0 ? Math.max(0, reviews.length - 2) : prev - 2))
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {reviews.slice(currentIndex, currentIndex + 2).map((review) => (
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
        ))}
      </div>

      <button
        onClick={prevReview}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Previous reviews"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextReview}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Next reviews"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {[0, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? "w-8 bg-primary" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to reviews ${index + 1}-${index + 2}`}
          />
        ))}
      </div>
    </div>
  )
}
