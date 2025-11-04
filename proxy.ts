import { NextRequest, NextResponse } from 'next/server'

// Proxy vorübergehend komplett deaktiviert
// Wird in Schritt 3 aktiviert, wenn app/[locale] Struktur existiert
// 
// TODO: In Schritt 3 ersetzen durch:
// import createMiddleware from 'next-intl/middleware'
// import { locales, defaultLocale } from './i18n'
// 
// export default createMiddleware({
//   locales,
//   defaultLocale,
//   localePrefix: 'as-needed'
// })
//
// export const config = {
//   matcher: ['/', '/(de|en)/:path*']
// }

export default function proxy(request: NextRequest) {
  // Pass-through: Keine Änderungen an der Request
  return NextResponse.next()
}

export const config = {
  // Match nothing - Proxy wird nicht ausgeführt
  // Wird in Schritt 3 aktiviert
  matcher: []
}

