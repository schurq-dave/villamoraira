"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { ReactNode } from "react"

interface FeaturedVillasCarouselProps {
  children: ReactNode[]
}

export function FeaturedVillasCarousel({ children }: FeaturedVillasCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {children.map((child, index) => (
          <CarouselItem key={index} className="pl-4 basis-[85%]">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-2 mt-8">
        <CarouselPrevious className="static translate-x-0 translate-y-0" />
        <CarouselNext className="static translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  )
}
