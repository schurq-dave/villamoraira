import type { Metadata } from 'next'
import { i18nConfig, isValidLocale, type Locale } from '@/lib/i18n'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return i18nConfig.locales.map((lang) => ({ lang }))
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

  return <>{children}</>
}

