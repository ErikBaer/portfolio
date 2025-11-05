import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, defaultLocale } from '@/i18n/request'
import type { Metadata } from 'next'
import { env } from '@/lib/env'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const siteUrl = env.NEXT_PUBLIC_SITE_URL

  return {
    title: {
      default: t('metadata.title'),
      template: '%s | Erik Baer',
    },
    description: t('metadata.description'),
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: `${siteUrl}/${locale}`,
      siteName: `${t('personalInfo.name')} - Portfolio`,
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${t('personalInfo.name')} - ${t('personalInfo.title')}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        'en': `${siteUrl}/en`,
        'de': `${siteUrl}/de`,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client side
  // Use getMessages() with locale parameter to ensure correct locale is used
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

