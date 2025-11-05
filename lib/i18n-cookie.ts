'use client'

/**
 * Cookie-Handler für Sprache
 * Speichert die Sprache im Cookie und liest sie aus
 */

export type Locale = 'de' | 'en'

const COOKIE_NAME = 'NEXT_LOCALE'
const DEFAULT_LOCALE: Locale = 'en'

/**
 * Setzt die Sprache im Cookie
 */
export function setLocaleCookie(locale: Locale): void {
  if (typeof document === 'undefined') return
  
  // Cookie für 1 Jahr speichern
  const maxAge = 365 * 24 * 60 * 60 // 1 Jahr in Sekunden
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${maxAge}; SameSite=Lax`
}

/**
 * Liest die Sprache aus dem Cookie
 */
export function getLocaleCookie(): Locale {
  if (typeof document === 'undefined') return DEFAULT_LOCALE
  
  const cookies = document.cookie.split(';')
  const localeCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${COOKIE_NAME}=`)
  )
  
  if (localeCookie) {
    const locale = localeCookie.split('=')[1].trim() as Locale
    if (locale === 'de' || locale === 'en') {
      return locale
    }
  }
  
  return DEFAULT_LOCALE
}

