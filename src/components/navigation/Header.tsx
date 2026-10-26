import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { UtilityBar } from './UtilityBar'
import { MainNavigation } from './MainNavigation'
import { MobileNavigation } from './MobileNavigation'
import { Container } from '@/components/shared/Container'
import logoImg from '@/assets/logo.png'
import meenakshiLogo from '@/assets/meenakshi_group.png'
import { COLLEGE_INFO } from '@/data/college'
import { cn } from '@/lib/utils'

export interface HeaderProps {
  className?: string
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          // Stable hysteresis threshold:
          // Activate compact sticky brand when scrolled past the top identity header (110px).
          // Deactivate only when scrolled back near top (< 50px).
          // 60px deadband prevents any threshold jitter or flickering.
          if (scrollY > 110) {
            setIsScrolled(true)
          } else if (scrollY < 50) {
            setIsScrolled(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Check initial position on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={cn('contents', className)}>
      {/* Skip to Main Content Link for Keyboard and Screen Reader Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[var(--color-ink)] focus:text-white focus:border focus:border-[var(--color-gold)] focus:rounded-[var(--radius-sm)] focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-xs font-bold uppercase tracking-wider"
      >
        Skip to main content
      </a>

      {/* Level 1: Institutional Utility Bar (Normal document flow, scrolls naturally) */}
      <UtilityBar />

      {/* Level 2: Institutional Identity Header (Desktop only, normal document flow, scrolls naturally) */}
      <div className="hidden nav:block w-full bg-white border-b border-slate-100">
        <Container size="wide">
          <div className="flex items-center justify-between py-3.5">
            {/* Institutional Seal & Full Title */}
            <Link
              to="/"
              className="flex items-center gap-3.5 xl:gap-4 group shrink-0 focus-visible:outline-2 focus-visible:outline-[#082046] rounded p-1"
              aria-label="A.N. Radhakrishnan College of Arts and Science Home"
            >
              <img
                src={logoImg}
                alt="ANRCAS Official Seal"
                className="h-14 w-14 xl:h-15 xl:w-15 object-contain transition-transform group-hover:scale-105 drop-shadow-xs"
              />

              <div className="flex flex-col">
                <span className="font-serif text-2xl xl:text-[27px] font-bold tracking-tight text-[#082046] group-hover:text-[#0C4DA2] transition-colors leading-tight">
                  A.N. Radhakrishnan
                </span>
                <span className="font-sans text-xs xl:text-[13px] font-extrabold tracking-wider uppercase text-slate-800 leading-tight mt-0.5">
                  College of Arts &amp; Science
                </span>
                <span className="text-[11.5px] xl:text-xs text-slate-500 font-medium mt-0.5">
                  {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.state} • {COLLEGE_INFO.affiliation}
                </span>
              </div>
            </Link>

            {/* Sponsoring Trust Seal & Prominent Admissions Access */}
            <div className="flex items-center gap-4 xl:gap-6">
              {/* Meenakshi Ammal Trust Identity */}
              <div className="flex items-center gap-3 pr-4 xl:pr-6 border-r border-slate-200">
                <div className="text-right">
                  <span className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    A Unit of
                  </span>
                  <span className="block text-xs xl:text-[13px] font-bold text-slate-700 leading-tight mt-0.5">
                    Meenakshi Ammal Trust
                  </span>
                </div>
                <img
                  src={meenakshiLogo}
                  alt="Meenakshi Ammal Trust"
                  className="h-8 xl:h-9 w-auto object-contain opacity-95"
                />
              </div>

              {/* SRMIST-Inspired Prominent Admissions CTA */}
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-sm)] bg-[#E4B316] hover:bg-[#D4A30B] active:bg-[#C29309] text-[#082046] font-extrabold text-xs xl:text-[13px] uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#082046]"
                aria-label="Admissions 2026-2027 Open - Apply Online"
              >
                <GraduationCap className="h-4.5 w-4.5 text-[#082046]" aria-hidden="true" />
                <span>Admissions 2026</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Level 3: Sticky Navigation Bar (Pins cleanly to top-0, invariant height h-14) */}
      <header
        className={cn(
          'w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-shadow duration-200',
          isScrolled ? 'shadow-md' : 'shadow-xs'
        )}
      >
        <MainNavigation
          isCompact={isScrolled}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
        />
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  )
}
