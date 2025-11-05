'use client'

import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import { getLocaleCookie, setLocaleCookie, type Locale } from '@/lib/i18n-cookie'
import { getConstants } from '@/lib/constants'

// Type für die Constants-Struktur (basierend auf constants.de/en)
type ConstantsType = ReturnType<typeof getConstants>

type I18nContextType = {
  locale: Locale
  t: (key: keyof ConstantsType['UI']) => string
  changeLocale: (locale: Locale) => void
  constants: ConstantsType
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

/**
 * i18n Provider - teilt den locale State zwischen allen Komponenten
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  // Initial immer 'en' (stimmt mit SSR Default überein, um Hydration-Mismatch zu vermeiden)
  const [locale, setLocale] = useState<Locale>('en')

  // Nach dem Mount: Cookie lesen und ggf. locale setzen
  useEffect(() => {
    const cookieLocale = getLocaleCookie()
    setLocale(cookieLocale)
  }, [])

  // Constants basierend auf aktueller Locale (memoized für Performance)
  // locale ist bereits initial 'en', daher kein mounted Check nötig
  const constants = useMemo(() => {
    return getConstants(locale)
  }, [locale])

  /**
   * Übersetzung für einen UI-Key
   */
  const t = (key: keyof ConstantsType['UI']): string => {
    return constants.UI[key]
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
        locale, // locale ist bereits initial 'en'
        t,
        changeLocale,
        constants,
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

