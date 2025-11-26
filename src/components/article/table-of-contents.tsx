"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { List } from "lucide-react"
import type { ArticleSection } from "@/lib/types/Article"
import type { UIText } from "@/lib/types/UIText"

interface TableOfContentsProps {
  sections: ArticleSection[]
  uiText: UIText
}

export function TableOfContents({ sections, uiText }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <List className="w-5 h-5" />
          {uiText.article.tocTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <nav>
          <ol className="space-y-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`text-sm leading-relaxed block py-2 pl-3 border-l-2 transition-all ${
                    activeSection === section.id
                      ? "border-primary text-primary font-medium"
                      : "border-transparent text-muted-foreground hover:text-primary hover:border-muted"
                  }`}
                >
                  {index + 1}. {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </CardContent>
    </Card>
  )
}
