import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Layers } from 'lucide-react'
import type { Programme } from '@/data/programmes'
import { DEPARTMENTS } from '@/data/departments'

export interface RelatedDepartmentProps {
  programme: Programme
}

export const RelatedDepartment: React.FC<RelatedDepartmentProps> = ({ programme }) => {
  const department = DEPARTMENTS.find((d) => d.id === programme.departmentId)

  return (
    <section
      aria-labelledby="related-department-heading"
      className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/60 p-6 sm:p-7 space-y-4"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-secondary-dark)]">
        <Layers className="h-4 w-4" aria-hidden="true" />
        <span>Academic Department</span>
      </div>

      <h3
        id="related-department-heading"
        className="text-lg sm:text-xl font-bold text-[var(--color-primary)]"
      >
        {programme.departmentName}
      </h3>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
        {department
          ? department.overview
          : `The ${programme.departmentName} administers instruction, internal evaluations, and subject mentorship for this degree programme.`}
      </p>

      <div className="pt-2">
        <Link
          to="/departments"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)] rounded-xs transition-colors"
        >
          <span>Explore Academic Departments Directory</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
