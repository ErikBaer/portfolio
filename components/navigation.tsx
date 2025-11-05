'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { PERSONAL_INFO, NAVIGATION } from '@/lib/constants'
import { useI18nSafe } from '@/lib/use-i18n-safe'

export function Navigation() {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const { locale, changeLocale, t } = useI18nSafe()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Während des ersten Renders immer 'de' verwenden (wie beim SSR)
  const displayLocale = mounted ? locale : 'de'

  const handleLocaleChange = (newLocale: 'de' | 'en') => {
    changeLocale(newLocale)
    setMobileMenuOpen(false)
  }

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false)
  }

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
            aria-label={`${PERSONAL_INFO.name} - Home`}
          >
            {PERSONAL_INFO.name}
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8" role="list">
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              role="listitem"
            >
              {t('navAbout')}
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              role="listitem"
            >
              {t('navProjects')}
            </a>
            <a
              href="#skills"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              role="listitem"
            >
              {t('navSkills')}
            </a>
            <a
              href="#interests"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              role="listitem"
            >
              {t('navInterests')}
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
              role="listitem"
            >
              {t('navContact')}
            </a>
            
            {/* Visual Separator */}
            <div className="h-5 w-px bg-border" aria-hidden="true" />
            
            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 border rounded-md p-0.5">
              <Button
                variant={displayLocale === 'de' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLocale('de')}
                className="h-6 px-2 text-xs min-w-[2rem]"
                aria-label="Deutsch auswählen"
              >
                DE
              </Button>
              <Button
                variant={displayLocale === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => changeLocale('en')}
                className="h-6 px-2 text-xs min-w-[2rem]"
                aria-label="English select"
              >
                EN
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
                <Menu className="h-6 w-6" aria-hidden="true" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-label="Mobile navigation menu">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col items-center gap-6 mt-12" aria-label="Mobile navigation links">
                <a
                  href="#about"
                  onClick={handleNavLinkClick}
                  className="text-center text-lg font-medium text-muted-foreground hover:text-foreground transition-colors w-full py-3 px-6 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t('navAbout')}
                </a>
                <a
                  href="#projects"
                  onClick={handleNavLinkClick}
                  className="text-center text-lg font-medium text-muted-foreground hover:text-foreground transition-colors w-full py-3 px-6 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t('navProjects')}
                </a>
                <a
                  href="#skills"
                  onClick={handleNavLinkClick}
                  className="text-center text-lg font-medium text-muted-foreground hover:text-foreground transition-colors w-full py-3 px-6 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t('navSkills')}
                </a>
                <a
                  href="#interests"
                  onClick={handleNavLinkClick}
                  className="text-center text-lg font-medium text-muted-foreground hover:text-foreground transition-colors w-full py-3 px-6 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t('navInterests')}
                </a>
                <a
                  href="#contact"
                  onClick={handleNavLinkClick}
                  className="text-center text-lg font-medium text-muted-foreground hover:text-foreground transition-colors w-full py-3 px-6 rounded-lg hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  {t('navContact')}
                </a>
                
                {/* Visual Separator */}
                <div className="w-full h-px bg-border my-4" aria-hidden="true" />
                
                {/* Mobile Language Switcher */}
                <div className="flex items-center justify-center gap-1 border rounded-md p-1 w-full">
                  <Button
                    variant={displayLocale === 'de' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLocaleChange('de')}
                    className="px-4 flex-1"
                    aria-label="Deutsch auswählen"
                  >
                    DE
                  </Button>
                  <Button
                    variant={displayLocale === 'en' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleLocaleChange('en')}
                    className="px-4 flex-1"
                    aria-label="English select"
                  >
                    EN
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}


