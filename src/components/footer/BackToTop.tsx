import React from 'react'
import { ArrowUp } from 'lucide-react'

export const BackToTop: React.FC = () => {
  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Scroll back to top of page"
      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/15 hover:border-[var(--color-gold)] text-xs font-semibold tracking-wider uppercase transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
    >
      <ArrowUp className="h-3.5 w-3.5 text-[var(--color-gold)] group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
      <span>Back to Top</span>
    </button>
  )
}
