'use client'

import { useI18n } from '@/components/i18n-provider'
import { getConstants, type ConstantsLocale } from '@/lib/constants'
import type { Locale } from '@/lib/i18n-cookie'

/**
 * Safe wrapper für useI18n Hook
 * Bietet Fallback wenn I18nProvider nicht verfügbar ist (z.B. während SSG)
 */
export function useI18nSafe() {
  try {
    return useI18n()
  } catch {
    // Fallback wenn Provider nicht verfügbar (z.B. während Static Site Generation)
    // WICHTIG: Muss mit I18nProvider initial state ('en') übereinstimmen, um Hydration-Mismatch zu vermeiden
    const defaultLocale: Locale = 'en'
    const defaultConstants = getConstants(defaultLocale)
    return {
      locale: defaultLocale,
      changeLocale: () => {},
      t: (key: keyof typeof defaultConstants.UI) => defaultConstants.UI[key],
      constants: defaultConstants,
    }
  }
}

