import React from 'react'

export interface NewsFiltersProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  counts?: Record<string, number>
}

export const NewsFilters: React.FC<NewsFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  return (
    <div
      role="region"
      aria-label="Filter news and events by category"
      className="flex flex-wrap items-center gap-2 sm:gap-2.5 pb-2"
    >
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline">
        Filter by:
      </span>

      {categories.map((category) => {
        const isSelected = selectedCategory === category
        const count = counts?.[category]

        return (
          <button
            key={category}
            type="button"
            role="button"
            aria-pressed={isSelected}
            onClick={() => onSelectCategory(category)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)] ${
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
