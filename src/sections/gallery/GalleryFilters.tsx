import React from 'react'

export interface GalleryFiltersProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  counts?: Record<string, number>
}

export const GalleryFilters: React.FC<GalleryFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div
      role="region"
      aria-label="Filter gallery photographs by category"
      className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-2"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
        Category:
      </span>

      {categories.map((category) => {
        const isSelected = selectedCategory === category
        const count = counts?.[category]

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectCategory(category)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 sm:py-1.5 min-h-[44px] sm:min-h-[36px] rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] cursor-pointer ${
              isSelected
                ? 'bg-[var(--color-primary)] text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100/80 hover:text-slate-900'
            }`}
          >
            <span>{category}</span>
            {count !== undefined && (
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
