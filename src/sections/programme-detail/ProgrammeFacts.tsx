import React from 'react'
import { Award, BookOpen, Calendar, Clock, GraduationCap, Layers } from 'lucide-react'
import type { Programme } from '@/data/programmes'
import { COLLEGE_INFO } from '@/data/college'

export interface ProgrammeFactsProps {
  programme: Programme
}

export const ProgrammeFacts: React.FC<ProgrammeFactsProps> = ({ programme }) => {
  const semesterCount = programme.durationYears * 2

  const facts = [
    {
      icon: <GraduationCap className="h-4 w-4 text-[var(--color-secondary-dark)]" />,
      label: 'Programme Level',
      value: programme.level === 'PG' ? 'Postgraduate (PG)' : 'Undergraduate (UG)',
    },
    {
      icon: <Award className="h-4 w-4 text-[var(--color-accent-dark)]" />,
      label: 'Conferred Degree',
      value: programme.degree,
    },
    {
      icon: <Layers className="h-4 w-4 text-[var(--color-secondary-dark)]" />,
      label: 'Academic Department',
      value: programme.departmentName,
    },
    {
      icon: <Clock className="h-4 w-4 text-emerald-700" />,
      label: 'Programme Duration',
      value: `${programme.durationYears} Years (${semesterCount} Semesters)`,
    },
    {
      icon: <BookOpen className="h-4 w-4 text-[var(--color-secondary-dark)]" />,
      label: 'Curriculum Framework',
      value: 'Choice Based Credit System (CBCS)',
    },
    {
      icon: <Calendar className="h-4 w-4 text-[var(--color-primary-light)]" />,
      label: 'University Affiliation',
      value: COLLEGE_INFO.affiliation,
    },
  ]

  return (
    <aside
      aria-label="Programme Quick Facts"
      className="bg-white rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 sm:p-7 shadow-[var(--shadow-card)] space-y-5"
    >
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
          Programme Specifications
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Verified academic credentials under university statute
        </p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {facts.map((fact, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-[var(--color-surface-subtle)] border border-slate-100 shrink-0 mt-0.5">
              {fact.icon}
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {fact.label}
              </dt>
              <dd className="text-xs sm:text-sm font-semibold text-[var(--color-primary)] mt-0.5 leading-snug">
                {fact.value}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </aside>
  )
}
