'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18nSafe } from "@/lib/use-i18n-safe"

/**
 * "View Work" Button mit i18n
 * Der I18nProvider stellt sicher, dass vor dem Mount EN verwendet wird (SSR Default)
 */
export function ViewWorkButton() {
  const { t } = useI18nSafe()

  return (
    <Button
      size="lg"
      className="group bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground px-6 py-3 transition-all duration-300 hover:shadow-lg min-w-[140px]"
      asChild
    >
      <a href="#projects" className="flex items-center justify-center gap-2">
        {t('viewWork')}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </a>
    </Button>
  )
}

