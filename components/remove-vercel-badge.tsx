'use client'

import { useEffect } from 'react'

/**
 * Removes Vercel Analytics/Speed Insights badge widget
 * 
 * This component runs on the client side and actively removes any Vercel badges
 * that might be injected by Vercel's platform or external scripts.
 * 
 * Runs multiple cleanup attempts to catch badges that might be added dynamically.
 */
export function RemoveVercelBadge() {
  useEffect(() => {
    // Function to remove Vercel badges
    const removeBadges = () => {
      // Remove by data attributes
      const dataSelectors = [
        '[data-va]',
        '[data-va-iframe]',
        '[data-va-widget]',
        '[data-vercel-analytics]',
        '[data-speed-insights]',
        '[data-speed-insights-widget]',
        '[data-vercel-speed-insights]',
      ]

      // Remove by class names
      const classSelectors = [
        '.va-iframe',
        '.va-widget',
        '.speed-insights-widget',
        '.vercel-analytics',
        '.vercel-speed-insights',
      ]

      // Remove by ID
      const idSelectors = [
        '#vercel-analytics',
        '#vercel-speed-insights',
      ]

      // Remove by iframe src
      const iframes = document.querySelectorAll('iframe')
      iframes.forEach((iframe) => {
        const src = iframe.getAttribute('src') || ''
        if (
          src.includes('vercel-scripts.com') ||
          src.includes('va.vercel') ||
          src.includes('vercel.com/analytics') ||
          src.includes('vercel.com/speed-insights')
        ) {
          iframe.remove()
        }
      })

      // Remove by attribute selectors
      dataSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => el.remove())
      })

      // Remove by class selectors
      classSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => el.remove())
      })

      // Remove by ID selectors
      idSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => el.remove())
      })

      // Remove any element with "vercel" or "next.js" text that's positioned bottom-left
      const allElements = document.querySelectorAll('*')
      allElements.forEach((el) => {
        const text = (el.textContent || '').toLowerCase()
        const href = el.href || ''
        const className = el.className?.toString() || ''
        const id = el.id || ''
        
        // Check if it contains Vercel/Next.js text or href
        if (
          text.includes('vercel') || 
          text.includes('next.js') || 
          text.includes('nextjs') ||
          href.includes('vercel') ||
          href.includes('nextjs.org')
        ) {
          const style = window.getComputedStyle(el)
          const rect = el.getBoundingClientRect()
          const isBottomLeft = 
            (style.position === 'fixed' || style.position === 'absolute') &&
            rect.bottom < window.innerHeight &&
            rect.bottom > window.innerHeight - 100 &&
            rect.left < 200
          
          if (isBottomLeft) {
            el.remove()
          }
        }
      })
    }

    // Run immediately
    removeBadges()

    // Run after a short delay (in case badges are added asynchronously)
    const timeout1 = setTimeout(removeBadges, 100)
    const timeout2 = setTimeout(removeBadges, 500)
    const timeout3 = setTimeout(removeBadges, 1000)

    // Use MutationObserver to catch dynamically added badges
    const observer = new MutationObserver(() => {
      removeBadges()
    })

    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'data-va', 'data-speed-insights'],
    })

    // Cleanup
    return () => {
      clearTimeout(timeout1)
      clearTimeout(timeout2)
      clearTimeout(timeout3)
      observer.disconnect()
    }
  }, [])

  return null // This component doesn't render anything
}

