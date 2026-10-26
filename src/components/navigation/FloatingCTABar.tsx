import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export const FloatingCTABar: React.FC = () => {
  return (
    <aside aria-label="Quick Admissions Access" className="fixed right-0 top-[40%] z-40 hidden md:block">
      {/* Desktop Edge-Mounted Admissions Tab linking to verified admissions destination */}
      <Link
        to="/admissions"
        aria-label="Apply for Admissions 2026"
        className="flex items-center gap-2 bg-[#E4B316] hover:bg-[#D4A30B] active:bg-[#C29309] text-[#0D0D0D] font-bold text-xs uppercase tracking-wider py-2.5 px-4 shadow-xl transition-all duration-200 origin-bottom-right rotate-90 translate-y-full border-b border-l border-white/20 rounded-t-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0C4DA2]"
      >
        <GraduationCap className="h-4 w-4 -rotate-90 text-[#0D0D0D]" aria-hidden="true" />
        <span>Admissions 2026</span>
      </Link>
    </aside>
  )
}
