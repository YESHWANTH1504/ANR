import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Mail, Phone, X, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import logoImg from '@/assets/logo.png'
import meenakshiLogo from '@/assets/meenakshi_group.png'
import { MAIN_NAV_ITEMS } from '@/data/navigation'
import { COLLEGE_INFO } from '@/data/college'
import { MobileNavigationItem } from './MobileNavigationItem'
import { cn } from '@/lib/utils'

export interface MobileNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)

  // Focus trap, Escape-to-close, body scroll lock & focus restoration
  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        onClose()
      } else if (e.key === 'Tab' && isOpen && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first || !panelRef.current.contains(document.activeElement)) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last || !panelRef.current.contains(document.activeElement)) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = originalOverflow
        const toggleBtn = document.getElementById('mobile-menu-toggle')
        if (toggleBtn) {
          toggleBtn.focus()
        } else if (previousActiveElement) {
          previousActiveElement.focus()
        }
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const phoneTel = COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')

  return createPortal(
    <div
      id="mobile-navigation-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[100] nav:hidden flex justify-end"
    >
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Full-height slide-out drawer panel */}
      <div
        ref={panelRef}
        className={cn(
          'relative z-10 w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col',
          'animate-in slide-in-from-right duration-250 ease-out'
        )}
      >
        {/* Header inside mobile drawer */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-slate-50 shrink-0">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[#082046] rounded"
            aria-label="ANRCAS Home"
          >
            <img src={logoImg} alt="ANRCAS Official Seal" className="h-11 w-11 object-contain drop-shadow-xs" />
            <div className="leading-tight">
              <span className="block font-serif text-base font-bold text-[#082046]">
                A.N. Radhakrishnan
              </span>
              <span className="block font-sans text-xs font-extrabold tracking-wider uppercase text-slate-800">
                College of Arts &amp; Science
              </span>
              <span className="block text-[11px] text-slate-500 font-medium">
                Vadamavandal, Tamil Nadu
              </span>
            </div>
          </Link>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-slate-600 hover:text-[#082046] rounded hover:bg-slate-200/60 transition-colors focus-visible:outline-2 focus-visible:outline-[#082046]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Primary CTA in mobile nav */}
        <div className="p-3.5 bg-white border-b border-slate-100 shrink-0">
          <Link
            to="/admissions"
            onClick={onClose}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 px-4 py-2.5 rounded-[var(--radius-sm)] bg-[#E4B316] hover:bg-[#D4A30B] active:bg-[#C29309] text-[#082046] font-bold text-sm uppercase tracking-wider transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-[#082046]"
          >
            <GraduationCap className="h-5 w-5 text-[#082046]" aria-hidden="true" />
            <span>Apply for Admissions 2026</span>
          </Link>
        </div>

        {/* Scrollable Nav Item Hierarchy */}
        <nav
          aria-label="Mobile institutional navigation"
          className="flex-1 overflow-y-auto overscroll-contain py-2 divide-y divide-slate-100"
        >
          {MAIN_NAV_ITEMS.map((item, index) => (
            <MobileNavigationItem key={index} item={item} onClose={onClose} />
          ))}
        </nav>

        {/* Footer info strip inside mobile drawer with verified details */}
        <div className="p-4 sm:p-5 bg-[#082046] text-slate-200 border-t border-white/10 space-y-2.5 text-xs sm:text-[13px] shrink-0">
          <div className="flex items-center gap-2.5">
            <Phone className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
            <a
              href={`tel:${phoneTel}`}
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs font-medium"
            >
              {COLLEGE_INFO.contact.primaryPhone}
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
            <a
              href={`mailto:${COLLEGE_INFO.contact.email}`}
              className="hover:text-white transition-colors truncate focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs font-medium"
            >
              {COLLEGE_INFO.contact.email}
            </a>
          </div>

          <div className="flex items-center gap-2.5 text-slate-300">
            <MapPin className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
            <span>Vadamavandal, Tamil Nadu 604410</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11.5px] text-slate-300">
              <Sparkles className="h-3 w-3 text-[#E4B316] shrink-0" aria-hidden="true" />
              <span>{COLLEGE_INFO.affiliation}</span>
            </div>
            <img
              src={meenakshiLogo}
              alt="Meenakshi Ammal Trust"
              className="h-6 w-auto object-contain opacity-80"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

