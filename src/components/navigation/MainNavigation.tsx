import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, GraduationCap } from 'lucide-react'
import logoImg from '@/assets/logo.png'
import { Container } from '@/components/shared/Container'
import { DesktopNavigation } from './DesktopNavigation'
import { SearchModal } from './SearchModal'
import { COLLEGE_INFO } from '@/data/college'
import { cn } from '@/lib/utils'

export interface MainNavigationProps {
  isCompact?: boolean
  onOpenMobileMenu: () => void
  isMobileMenuOpen: boolean
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
  isCompact = false,
  onOpenMobileMenu,
  isMobileMenuOpen,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <>
      <div className="w-full bg-white border-b border-slate-200/90">
        <Container size="wide">
          {/* ==============================================================
              LEVEL 3: Primary Navigation Row (Desktop, Invariant Height h-14)
              Smooth horizontal fade-in for compact branding on scroll
              ============================================================== */}
          <div className="hidden nav:flex items-center justify-between gap-4 h-14">
            {/* Scrolled Compact Brand (Smoothly visible when sticky/scrolled) */}
            <div
              className={cn(
                'flex items-center transition-all duration-300 overflow-hidden',
                isCompact
                  ? 'opacity-100 max-w-[220px] pointer-events-auto'
                  : 'opacity-0 max-w-0 pointer-events-none'
              )}
            >
              <Link
                to="/"
                className="flex items-center gap-2.5 shrink-0 focus-visible:outline-2 focus-visible:outline-[#082046] rounded p-0.5"
                aria-label="ANRCAS Home"
              >
                <img
                  src={logoImg}
                  alt="ANRCAS Seal"
                  className="h-9 w-9 xl:h-10 xl:w-10 object-contain drop-shadow-xs"
                />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm xl:text-base leading-tight text-[#082046] whitespace-nowrap">
                    A.N. Radhakrishnan
                  </span>
                  <span className="text-[10px] xl:text-[11px] font-extrabold uppercase tracking-wider text-slate-800 leading-tight whitespace-nowrap">
                    College of Arts &amp; Science
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <DesktopNavigation className="flex-1 justify-start" />

            {/* Right Action Suite: Search & Sticky CTA */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Fullscreen Search Dialog Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search programmes, admissions, and campus facilities"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-slate-600 hover:text-[#082046] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#082046]"
                title="Search degrees, facilities, admissions"
              >
                <Search className="h-4.5 w-4.5" />
                <span className="text-xs font-semibold text-slate-600 hidden xl:inline">Search</span>
              </button>

              {/* Compact Admissions CTA in Scrolled Sticky Header */}
              <div
                className={cn(
                  'transition-all duration-300 overflow-hidden',
                  isCompact
                    ? 'opacity-100 max-w-[140px] pointer-events-auto'
                    : 'opacity-0 max-w-0 pointer-events-none'
                )}
              >
                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[var(--radius-sm)] bg-[#E4B316] hover:bg-[#D4A30B] active:bg-[#C29309] text-[#082046] font-bold text-xs uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#082046] whitespace-nowrap"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-[#082046]" aria-hidden="true" />
                  <span>Apply Now</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ==============================================================
              MOBILE & TABLET HEADER ROW (< 1120px)
              Touch targets >= 44px, compact readable institutional title,
              quick Admissions CTA and accessible hamburger toggle.
              ============================================================== */}
          <div className="nav:hidden flex items-center justify-between gap-3 py-2 sm:py-2.5">
            {/* Mobile Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus-visible:outline-2 focus-visible:outline-[#082046] rounded"
              aria-label="A.N. Radhakrishnan College of Arts and Science Home"
            >
              <img
                src={logoImg}
                alt="ANRCAS Official Seal"
                className="h-10 w-10 sm:h-11 sm:w-11 object-contain drop-shadow-xs"
              />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-[15px] sm:text-base leading-tight text-[#082046]">
                  A.N. Radhakrishnan
                </span>
                <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800 leading-tight">
                  College of Arts &amp; Science
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {COLLEGE_INFO.address.locality}, TN
                </span>
              </div>
            </Link>

            {/* Mobile Action Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search dialog"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-[#082046] hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#082046]"
              >
                <Search className="h-5 w-5" aria-hidden="true" />
              </button>

              {/* Mobile Admissions CTA */}
              <Link
                to="/admissions"
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3 py-2 rounded-[var(--radius-sm)] bg-[#E4B316] hover:bg-[#D4A30B] active:bg-[#C29309] text-[#082046] font-bold text-xs uppercase tracking-wider transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#082046]"
                aria-label="Apply for Admissions 2026"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                <span className="hidden xs:inline">Admissions</span>
                <span className="xs:hidden">Apply</span>
              </Link>

              {/* Mobile Navigation Drawer Toggle */}
              <button
                type="button"
                id="mobile-menu-toggle"
                onClick={onOpenMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-menu"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#082046]"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Fullscreen Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  )
}

