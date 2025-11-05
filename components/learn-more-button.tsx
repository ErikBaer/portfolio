'use client'

import { Button } from "@/components/ui/button"
import { useI18nSafe } from "@/lib/use-i18n-safe"

/**
 * "Learn More" Button mit i18n
 * Der I18nProvider stellt sicher, dass vor dem Mount EN verwendet wird (SSR Default)
 */
export function LearnMoreButton() {
  const { t } = useI18nSafe()

  return (
    <Button
      variant="outline"
      size="lg"
      className="px-6 py-3 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent min-w-[140px]"
      asChild
    >
      <a href="#skills" className="flex items-center justify-center">
        {t('learnMore')}
      </a>
    </Button>
  )
}

