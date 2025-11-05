'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/components/i18n-provider"

/**
 * "Learn More" Button mit i18n
 */
export function LearnMoreButton() {
  const { t } = useI18n()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Während des ersten Renders (vor Mount): Immer "Mehr erfahren" (DE)
  const buttonText = mounted ? t('learnMore') : 'Mehr erfahren'

  return (
    <Button
      variant="outline"
      size="lg"
      className="px-6 py-3 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent min-w-[140px]"
      asChild
    >
      <a href="#skills" className="flex items-center justify-center">
        {buttonText}
      </a>
    </Button>
  )
}

