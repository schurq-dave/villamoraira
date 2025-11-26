"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowRight } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { NavigationItem, Language } from "@/lib/types/Navigation"
import type { UIText } from "@/lib/types/UIText"
import { getLanguageSwitchUrl, type Locale, i18nConfig } from "@/lib/i18n"

interface NavigationProps {
  items: NavigationItem[]
  languages: Language[]
  siteName: string
  uiText: UIText
  currentLocale?: Locale
  /** Optional: pre-computed alternate language URLs from the server */
  alternateUrls?: Record<Locale, string> | null
}

export function Navigation({ items, languages, siteName, uiText, currentLocale, alternateUrls }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Prevent hydration mismatch by only rendering dropdowns after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine current locale from prop or pathname
  const locale = currentLocale || (pathname.startsWith('/en') ? 'en' : 'nl') as Locale

  // Get the URL for a specific language
  // Use pre-computed alternateUrls if available, otherwise fall back to static translation
  const getUrlForLanguage = (langCode: string): string => {
    if (alternateUrls && alternateUrls[langCode as Locale]) {
      return alternateUrls[langCode as Locale]
    }
    return getLanguageSwitchUrl(pathname, langCode as Locale)
  }

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const regularItems = items.filter((item) => item.name.toLowerCase() !== "contact")
  const contactItem = items.find((item) => item.name.toLowerCase() === "contact")

  // Get current language info
  const currentLang = languages.find((l) => l.code === locale)

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-0" aria-label="Main navigation">
        <div className="flex lg:flex-1">
          <Link href={locale === i18nConfig.defaultLocale ? "/" : `/${locale}`} className="-m-1.5 p-1.5" aria-label="Villa Moraira home">
            <Image
              src="/images/villa-moraira-logo.svg"
              alt="Villa Moraira"
              width={180}
              height={60}
              priority
              className="w-auto h-12 lg:h-16"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={handleMobileMenuToggle}
            aria-label={mobileMenuOpen ? uiText.navigation.menuClose : uiText.navigation.menuOpen}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{mobileMenuOpen ? uiText.navigation.menuClose : uiText.navigation.menuOpen}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {regularItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-light leading-6 text-foreground hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
              aria-label={`Navigate to ${item.name}`}
            >
              {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          {contactItem && (
            <Link href={contactItem.href} aria-label="Contact us">
              <Button size="lg" variant="primary">
                {contactItem.name.charAt(0).toUpperCase() + contactItem.name.slice(1).toLowerCase()}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          )}
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded px-2 py-1"
                  aria-label="Select language"
                >
                  {locale.toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" aria-label="Language options">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code} asChild>
                    <Link
                      href={getUrlForLanguage(lang.code)}
                      aria-label={`Switch to ${lang.name}`}
                      className="flex items-center cursor-pointer"
                    >
                      <span className="mr-2" aria-hidden="true">
                        {lang.flag}
                      </span>
                      {lang.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <span className="text-xs font-light text-muted-foreground px-2 py-1">
              {locale.toUpperCase()}
            </span>
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed top-0 right-0 z-50 h-screen w-64 bg-card shadow-2xl transform transition-transform duration-300 ease-in-out"
            style={{ backgroundColor: "#ffffff" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <Image
                  src="/images/villa-moraira-logo.svg"
                  alt="Villa Moraira"
                  width={120}
                  height={40}
                  className="w-auto h-10"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={uiText.navigation.menuClose}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </Button>
              </div>
              <nav className="flex-1 px-6 py-4 bg-white" aria-label="Mobile navigation">
                <div className="space-y-4">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-lg font-light text-foreground hover:text-primary transition-colors py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded"
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label={`Navigate to ${item.name}`}
                    >
                      {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <span className="text-xs font-light text-muted-foreground mb-3 block">
                    Language
                  </span>
                  <div className="flex gap-4" role="group" aria-label="Language selection">
                    {languages.map((lang) => (
                      <Link
                        key={lang.code}
                        href={getUrlForLanguage(lang.code)}
                        className={`text-sm hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary rounded px-2 py-1 ${
                          lang.code === locale ? 'text-primary font-medium' : ''
                        }`}
                        aria-label={`Switch to ${lang.name}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span aria-hidden="true">{lang.flag}</span> {lang.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
