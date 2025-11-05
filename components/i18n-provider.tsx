'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getLocaleCookie, setLocaleCookie, type Locale } from '@/lib/i18n-cookie'
import { translations } from '@/lib/translations'

type I18nContextType = {
  locale: Locale
  t: (key: keyof typeof translations.de) => string
  changeLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

/**
 * i18n Provider - teilt den locale State zwischen allen Komponenten
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  // Initial immer 'de' (stimmt mit SSR überein)
  const [locale, setLocale] = useState<Locale>('de')
  const [mounted, setMounted] = useState(false)

  // Nach dem Mount: Cookie lesen und ggf. locale setzen
  useEffect(() => {
    setMounted(true)
    const cookieLocale = getLocaleCookie()
    setLocale(cookieLocale)
  }, [])

  /**
   * Übersetzung für einen Key
   */
  const t = (key: keyof typeof translations.de): string => {
    // Vor dem Mount: Immer 'de' (verhindert Hydration-Mismatch)
    const currentLocale = mounted ? locale : 'de'
    return translations[currentLocale][key]
  }

  /**
   * Sprache ändern und im Cookie speichern
   */
  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    setLocaleCookie(newLocale)
  }

  return (
    <I18nContext.Provider
      value={{
        locale: mounted ? locale : 'de',
        t,
        changeLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Hook um auf den i18n Context zuzugreifen
 */
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

