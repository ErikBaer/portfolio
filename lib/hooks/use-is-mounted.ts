'use client'

import { useState, useEffect } from 'react'

/**
 * Custom Hook um zu prüfen, ob die Komponente gemountet ist
 * 
 * Verwendet für: Client-only Rendering, um Hydration-Mismatches zu vermeiden
 * 
 * @returns true wenn Component gemountet ist, false während SSR/initial render
 */
export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

