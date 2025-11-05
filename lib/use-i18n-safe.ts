'use client'

import { useI18n } from '@/components/i18n-provider'
import { translations } from '@/lib/translations'

/**
 * Safe wrapper für useI18n Hook
 * Bietet Fallback wenn I18nProvider nicht verfügbar ist (z.B. während SSG)
 */
export function useI18nSafe() {
  try {
    return useI18n()
  } catch {
    // Fallback wenn Provider nicht verfügbar (z.B. während Static Site Generation)
    return {
      locale: 'de' as const,
      changeLocale: () => {},
      t: (key: keyof typeof translations.de) => translations.de[key],
    }
  }
}

