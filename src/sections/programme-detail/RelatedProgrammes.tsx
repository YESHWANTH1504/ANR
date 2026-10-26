import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { type Programme, getRelatedProgrammes } from '@/data/programmes'

export interface RelatedProgrammesProps {
  currentProgramme: Programme
}

export const RelatedProgrammes: React.FC<RelatedProgrammesProps> = ({ currentProgramme }) => {
  const related = getRelatedProgrammes(currentProgramme, 2)

  if (related.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="related-programmes-heading" className="space-y-5 pt-8 border-t border-[var(--color-border)]">
      <div className="flex items-center justify-between">
        <div>
          <h3 id="related-programmes-heading" className="text-lg sm:text-xl font-bold text-[var(--color-primary)]">
            Related Programmes
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore other degree offerings in related departments or study levels
          </p>
        </div>

        <Link
          to="/programmes"
          className="text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] hidden sm:inline-flex items-center gap-1"
        >
          <span>All Programmes</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {related.map((prog) => (
          <div
            key={prog.id}
            className="flex flex-col justify-between p-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white shadow-xs hover:border-[var(--color-secondary)] hover:shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <Badge variant={prog.level === 'PG' ? 'accent' : 'secondary'} size="sm">
                  {prog.level}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  {prog.durationYears} Years
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                {prog.name}
              </h4>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                {prog.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                {prog.departmentName}
              </span>
              <Link
                to={`/programmes/${prog.slug}`}
                aria-label={`View details for ${prog.name}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)] rounded-xs"
              >
                <span>Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
