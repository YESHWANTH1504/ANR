import React from 'react'
import { Link } from 'react-router-dom'
import { BackToTop } from './BackToTop'
import { COLLEGE_INFO } from '@/data/college'

const CURRENT_YEAR = new Date().getFullYear()

export const FooterBottomBar: React.FC = () => {
  return (
    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
      <div className="space-y-1 text-center sm:text-left">
        <p>
          &copy; {CURRENT_YEAR} {COLLEGE_INFO.name}. All rights reserved.
        </p>
        <p className="text-xs text-stone-500 font-light">
          Empowering rural and suburban youth through value-grounded collegiate education.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <nav aria-label="Legal and institutional shortcuts" className="flex items-center gap-4 text-xs">
          <Link to="/about" className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]">
            About
          </Link>
          <span className="text-white/20 select-none" aria-hidden="true">•</span>
          <Link to="/contact" className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]">
            Contact
          </Link>
          <span className="text-white/20 select-none" aria-hidden="true">•</span>
          <Link to="/admissions" className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]">
            Admissions
          </Link>
        </nav>

        <div className="border-l border-white/15 pl-4 hidden sm:block">
          <BackToTop />
        </div>
      </div>

      {/* Mobile Back To Top Button */}
      <div className="sm:hidden pt-2">
        <BackToTop />
      </div>
    </div>
  )
}
