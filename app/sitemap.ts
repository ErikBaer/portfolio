import { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/lib/case-studies'
import { env } from '@/lib/env'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = env.NEXT_PUBLIC_SITE_URL
  const baseUrl = siteUrl.replace(/\/$/, '') // Remove trailing slash

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ]

  // Case Studies
  const caseStudies = getAllCaseStudies()
  caseStudies.forEach((study) => {
    routes.push({
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  })

  return routes
}

