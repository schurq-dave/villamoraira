import type { Metadata } from 'next'
import { i18nConfig, isValidLocale, type Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  // This project serves the default locale (nl) at the root routes (e.g. /, /villas, ...)
  // and only uses the [lang] segment for non-default locales (currently /en/*).
  return i18nConfig.locales
    .filter((lang) => lang !== i18nConfig.defaultLocale)
    .map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  
  return {
    alternates: {
      languages: {
        'nl': '/',
        'en': '/en',
      },
    },
  }
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  // Validate the locale
  if (!isValidLocale(lang)) {
    notFound()
  }

  // Default locale should never be served via /nl/*
  if (lang === i18nConfig.defaultLocale) {
    notFound()
  }

  return <>{children}</>
}

