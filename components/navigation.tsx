'use client'

import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const t = useTranslations()
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname.endsWith('/en') || pathname.endsWith('/de')

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            href={isHomePage ? "#" : "/"}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="font-serif text-xl font-semibold text-accent hover:text-accent/80 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
            aria-label={`${t('personalInfo.name')} - Home`}
          >
            {t('personalInfo.name')}
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="list">
            {t.raw('navigation.items').map((item: { label: string; href: string }) => (
              <a
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                role="listitem"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-label="Mobile navigation menu">
              <SheetHeader>
                <SheetTitle>{t('navigation.sheetTitle')}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-6 mt-12" aria-label="Mobile navigation links">
                {t.raw('navigation.items').map((item: { label: string; href: string }) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="text-center text-lg font-medium text-muted-foreground hover:text-foreground transition-colors w-full py-3 px-6 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}


