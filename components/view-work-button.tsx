'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useI18nSafe } from "@/lib/use-i18n-safe"

/**
 * "View Work" Button mit i18n
 * MVP: Nur dieser eine Button ist übersetzt
 * 
 * Wichtig: Während des ersten Renders immer "Meine Arbeit" (DE) zeigen,
 * um Hydration-Mismatch zu vermeiden. Erst nach Mount die Cookie-Sprache verwenden.
 */
export function ViewWorkButton() {
  const { t } = useI18nSafe()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Während des ersten Renders (vor Mount): Immer "Meine Arbeit" (DE)
  // Das entspricht dem Server-Render
  const buttonText = mounted ? t('viewWork') : 'Meine Arbeit'

  return (
    <Button
      size="lg"
      className="group bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground px-6 py-3 transition-all duration-300 hover:shadow-lg min-w-[140px]"
      asChild
    >
      <a href="#projects" className="flex items-center justify-center gap-2">
        {buttonText}
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </a>
    </Button>
  )
}

