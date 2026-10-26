import React from 'react'
import { BookOpen, CheckCircle2 } from 'lucide-react'
import type { Programme } from '@/data/programmes'
import { H2, TextBody } from '@/components/ui/Typography'

export interface ProgrammeOverviewProps {
  programme: Programme
}

export const ProgrammeOverview: React.FC<ProgrammeOverviewProps> = ({ programme }) => {
  return (
    <div className="space-y-8">
      {/* Primary Academic Description */}
      <section aria-labelledby="academic-overview-heading" className="space-y-4">
        <H2 id="academic-overview-heading" className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] tracking-tight">
          Curriculum &amp; Academic Scope
        </H2>

        <TextBody className="text-slate-700 leading-relaxed text-sm sm:text-base">
          {programme.overview || programme.description}
        </TextBody>

        <TextBody className="text-slate-700 leading-relaxed text-sm sm:text-base">
          Instruction within {programme.name} is conducted by qualified faculty members in accordance with the prescribed syllabus of Thiruvalluvar University, Vellore. Courses integrate theoretical lecture modules with continuous internal assessments, practical laboratory work where applicable, and university end-semester examinations.
        </TextBody>
      </section>

      {/* Conditional Highlights Section: Render only if present in data */}
      {programme.highlights && programme.highlights.length > 0 && (
        <section aria-labelledby="programme-highlights-heading" className="space-y-4 pt-4 border-t border-slate-100">
          <H2 id="programme-highlights-heading" className="text-lg sm:text-xl font-bold text-[var(--color-primary)] tracking-tight flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[var(--color-secondary-dark)]" />
            <span>Programme Highlights</span>
          </H2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {programme.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--color-surface-subtle)] border border-slate-200/80 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
