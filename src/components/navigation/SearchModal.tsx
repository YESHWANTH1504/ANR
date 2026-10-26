import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Search, X, BookOpen, GraduationCap, ArrowRight } from 'lucide-react'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const QUICK_SEARCH_ITEMS = [
  { title: 'B.Sc Computer Science', category: 'Programmes', href: '/programmes/computer-science' },
  { title: 'Bachelor of Commerce (B.Com General)', category: 'Programmes', href: '/programmes/bcom' },
  { title: 'B.Com Corporate Secretaryship', category: 'Programmes', href: '/programmes/corporate-secretaryship' },
  { title: 'Bachelor of Business Administration (BBA)', category: 'Programmes', href: '/programmes/bba' },
  { title: 'B.Sc Mathematics', category: 'Programmes', href: '/programmes/mathematics' },
  { title: 'College Bus Transit Routes', category: 'Facilities', href: '/facilities' },
  { title: 'Admissions 2026–2027 Procedure', category: 'Admissions', href: '/admissions' },
  { title: 'Founder Thiru A.N. Radhakrishnan', category: 'About', href: '/leadership' },
  { title: 'Central Computing Laboratory', category: 'Facilities', href: '/facilities' },
  { title: 'Academic Regulations & Syllabi', category: 'Academics', href: '/academics' },
]

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
      requestAnimationFrame(() => inputRef.current?.focus())

      return () => {
        document.body.style.overflow = originalOverflow
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const filtered = query.trim()
    ? QUICK_SEARCH_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : QUICK_SEARCH_ITEMS

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Campus Search Dialog"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-slate-200 px-4 py-3 sm:py-4 bg-slate-50">
          <Search className="h-5 w-5 text-[#0C4DA2] mr-3 shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search degrees, admissions, faculties, facilities..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base sm:text-lg focus:outline-none"
            aria-label="Search campus query"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0C4DA2]"
            aria-label="Close search dialog"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Results / Suggestions Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 mb-2">
            {query ? `Results for "${query}"` : 'Quick Campus Destinations'}
          </div>

          {filtered.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No matching pages or programmes found. Try searching for &ldquo;Computer Science&rdquo; or &ldquo;Admissions&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <Link
                key={idx}
                to={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-md hover:bg-blue-50/70 border border-transparent hover:border-blue-100 transition-all group focus-visible:outline-2 focus-visible:outline-[#0C4DA2]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-slate-100 text-[#0C4DA2] group-hover:bg-[#0C4DA2] group-hover:text-white transition-colors">
                    {item.category === 'Programmes' ? (
                      <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <BookOpen className="h-4 w-4" aria-hidden="true" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-[#0C4DA2]">
                      {item.title}
                    </h4>
                    <span className="text-xs text-slate-500">{item.category}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-[#0C4DA2] group-hover:translate-x-1 transition-all" aria-hidden="true" />
              </Link>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 flex items-center justify-between text-xs sm:text-sm text-slate-500">
          <span>ANRCAS Institutional Directory Quick Finder</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 font-mono text-xs">ESC</kbd> to close</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
