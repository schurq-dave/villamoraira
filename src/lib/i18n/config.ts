// Supported languages configuration
export const i18nConfig = {
  defaultLocale: 'nl',
  locales: ['nl', 'en'] as const,
}

export type Locale = (typeof i18nConfig.locales)[number]

// Language metadata
export const languages: Record<Locale, { name: string; flag: string }> = {
  nl: { name: 'Nederlands', flag: '🇳🇱' },
  en: { name: 'English', flag: '🇬🇧' },
}

// Check if a locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

// Get the opposite locale (for language switcher)
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'nl' ? 'en' : 'nl'
}

