import React from 'react'
import { Search, X } from 'lucide-react'

export type LevelFilter = 'ALL' | 'UG' | 'PG'

export interface ProgrammeFiltersProps {
  activeLevel: LevelFilter
  onLevelChange: (level: LevelFilter) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  totalCount: number
  filteredCount: number
  ugCount: number
  pgCount: number
}

export const ProgrammeFilters: React.FC<ProgrammeFiltersProps> = ({
  activeLevel,
  onLevelChange,
  searchQuery,
  onSearchChange,
  totalCount,
  filteredCount,
  ugCount,
  pgCount,
}) => {
  const isFiltered = activeLevel !== 'ALL' || searchQuery.trim().length > 0

  const handleReset = () => {
    onLevelChange('ALL')
    onSearchChange('')
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Academic Level Filter Buttons */}
        <div
          role="group"
          aria-label="Filter programmes by academic level"
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200"
        >
          <button
            type="button"
            aria-pressed={activeLevel === 'ALL'}
            onClick={() => onLevelChange('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
              activeLevel === 'ALL'
                ? 'bg-white text-[var(--color-primary)] shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-[var(--color-primary)]'
            }`}
          >
            All Programmes ({totalCount})
          </button>

          <button
            type="button"
            aria-pressed={activeLevel === 'UG'}
            onClick={() => onLevelChange('UG')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
              activeLevel === 'UG'
                ? 'bg-white text-[var(--color-secondary-dark)] shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-[var(--color-primary)]'
            }`}
          >
            Undergraduate ({ugCount})
          </button>

          <button
            type="button"
            aria-pressed={activeLevel === 'PG'}
            onClick={() => onLevelChange('PG')}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 ${
              activeLevel === 'PG'
                ? 'bg-white text-[var(--color-accent-dark)] shadow-xs font-bold border border-slate-200/80'
                : 'text-slate-600 hover:text-[var(--color-primary)]'
            }`}
          >
            Postgraduate ({pgCount})
          </button>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <label htmlFor="programme-search-input" className="sr-only">
            Search programmes by name or discipline
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="programme-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search programmes..."
              className="w-full pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[var(--color-secondary)] focus:ring-1 focus:ring-[var(--color-secondary)] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search input"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Status & Reset Strip */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Showing <strong>{filteredCount}</strong> of <strong>{totalCount}</strong> degree programmes
        </span>

        {isFiltered && (
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[var(--color-secondary-dark)] hover:underline flex items-center gap-1"
          >
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  )
}
