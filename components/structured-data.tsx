import { PERSONAL_INFO, CONTACT_INFO } from '@/lib/constants'

export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erikbaer.dev'
  
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.shortDescription,
    url: siteUrl,
    sameAs: [
      CONTACT_INFO.linkedin,
      CONTACT_INFO.github,
    ].filter(Boolean),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${PERSONAL_INFO.name} - Portfolio`,
    url: siteUrl,
    description: PERSONAL_INFO.shortDescription,
    author: {
      '@type': 'Person',
      name: PERSONAL_INFO.name,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        suppressHydrationWarning
      />
    </>
  )
}

