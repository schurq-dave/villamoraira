"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Images } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface ImageGalleryProps {
  mainImage: string
  gallery: string[]
  villaName: string
  viewAllText: string
}

export function ImageGallery({ mainImage, gallery, villaName, viewAllText }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Combine main image with gallery for the lightbox
  const allImages = [mainImage, ...gallery].filter(Boolean)
  const displayGallery = gallery.slice(0, 3) // Show up to 3 gallery images in grid
  const remainingCount = Math.max(0, allImages.length - 4) // Count images not shown in grid

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }, [allImages.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }, [allImages.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, goToPrevious, goToNext])

  const openLightbox = (index: number = 0) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-96 lg:h-[500px]">
        {/* Main image */}
        <button
          onClick={() => openLightbox(0)}
          className="lg:col-span-2 relative rounded-lg overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Image
            src={mainImage || "/placeholder.svg"}
            alt={`${villaName} - Main view`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={85}
          />
        </button>

        {/* Gallery images - column 1 */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => openLightbox(idx + 1)}
              className="relative rounded-lg overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Image
                src={displayGallery[idx] || "/placeholder.svg"}
                alt={`${villaName} - View ${idx + 2}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={80}
              />
            </button>
          ))}
        </div>

        {/* Gallery images - column 2 */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <button
            onClick={() => openLightbox(3)}
            className="relative rounded-lg overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Image
              src={displayGallery[2] || "/placeholder.svg"}
              alt={`${villaName} - View 4`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={80}
            />
          </button>

          {/* View all photos button with image background */}
          <button
            onClick={() => openLightbox(0)}
            className="relative rounded-lg overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {/* Background image (use 4th gallery image or fallback to 3rd) */}
            <Image
              src={gallery[3] || gallery[2] || gallery[1] || mainImage || "/placeholder.svg"}
              alt={`${villaName} - More photos`}
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 50vw, 25vw"
              quality={80}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 transition-opacity duration-300 group-hover:from-black/80 group-hover:via-black/50" />
            {/* Button content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <Images className="h-6 w-6 mb-2 opacity-90" />
              <span className="text-sm font-medium tracking-wide">
                {viewAllText}
              </span>
              {remainingCount > 0 && (
                <span className="text-xs opacity-75 mt-1">
                  +{remainingCount} foto&apos;s
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-none">
          <VisuallyHidden>
            <DialogTitle>{villaName} - Foto&apos;s</DialogTitle>
          </VisuallyHidden>
          
          {/* Close button */}
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Sluiten</span>
            </Button>
          </DialogClose>

          {/* Navigation buttons */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Vorige foto</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Volgende foto</span>
              </Button>
            </>
          )}

          {/* Current image */}
          <div className="relative w-full h-[85vh]">
            <Image
              src={allImages[currentIndex] || "/placeholder.svg"}
              alt={`${villaName} - Foto ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
              sizes="95vw"
              quality={90}
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
            {currentIndex + 1} / {allImages.length}
          </div>

          {/* Thumbnail strip */}
          {allImages.length > 1 && (
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto p-2 bg-black/40 rounded-lg">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all ${
                    idx === currentIndex
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black/50"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                    quality={50}
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

