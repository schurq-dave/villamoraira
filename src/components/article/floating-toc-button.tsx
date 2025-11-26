"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { List } from "lucide-react"
import type { ArticleSection } from "@/lib/types/Article"
import type { UIText } from "@/lib/types/UIText"

interface FloatingTOCButtonProps {
  sections: ArticleSection[]
  uiText: UIText
}

export function FloatingTOCButton({ sections, uiText }: FloatingTOCButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 600px (past hero and TL;DR)
      setIsVisible(window.scrollY > 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = (sectionId: string) => {
    setIsOpen(false)
    // Small delay to allow sheet to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="shadow-lg">
            <List className="w-5 h-5 mr-2" />
            {uiText.floatingTOC.buttonText}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>{uiText.floatingTOC.sheetTitle}</SheetTitle>
          </SheetHeader>
          <nav className="mt-6">
            <ol className="space-y-3 px-5">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleLinkClick(section.id)}
                    className="text-left text-foreground/70 hover:text-primary transition-colors leading-relaxed block py-2 w-full"
                  >
                    {index + 1}. {section.heading}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
