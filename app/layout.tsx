import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { METADATA as METADATA_CONFIG, PERSONAL_INFO, CONTACT_INFO } from "@/lib/constants"
import { StructuredData } from "@/components/structured-data"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erikbaer.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: METADATA_CONFIG.title,
    template: '%s | Erik Baer',
  },
  description: METADATA_CONFIG.description,
  keywords: [
    'Platform Engineering',
    'Tech Lead',
    'Cloud Architecture',
    'DevOps',
    'Kubernetes',
    'Azure',
    'AWS',
    'Enterprise Solutions',
    'Developer Experience',
    'Infrastructure as Code',
    'CI/CD',
    'Software Engineering',
  ],
  authors: [{ name: PERSONAL_INFO.name }],
  creator: PERSONAL_INFO.name,
  generator: METADATA_CONFIG.generator,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: `${PERSONAL_INFO.name} - Portfolio`,
    title: METADATA_CONFIG.title,
    description: METADATA_CONFIG.description,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: METADATA_CONFIG.title,
    description: METADATA_CONFIG.description,
    images: ['/og-image.jpg'],
    creator: CONTACT_INFO.linkedin ? `@${CONTACT_INFO.linkedin.split('/').pop()}` : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} antialiased`}>
        <StructuredData />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
