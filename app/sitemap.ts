import { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/lib/case-studies'
import { env } from '@/lib/env'
import { locales } from '@/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL
  const baseUrl = siteUrl.replace(/\/$/, '') // Remove trailing slash

  const routes: MetadataRoute.Sitemap = []

  // Homepage for each locale
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    })

    // Case Studies for each locale
    const caseStudies = getAllCaseStudies()
    caseStudies.forEach((study) => {
      routes.push({
        url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [`${baseUrl}/${l}/case-studies/${study.slug}`])
          ),
        },
      })
    })
  })

  return routes
}

