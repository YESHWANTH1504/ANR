import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, Layers } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { DEPARTMENTS } from '@/data/departments'
import { PROGRAMMES } from '@/data/programmes'

export const ProgrammeConnections: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="programme-connections" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)]">
            Curricular Alignment
          </EditorialLabel>
          <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Department &amp; Programme Connections
          </H2>
          <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
            Detailed mapping showing degree curricula administered by each academic department under university regulations.
          </TextLead>
        </div>

        {/* Department to Programme Mapping Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {DEPARTMENTS.map((dept) => {
            const affiliatedProgrammes = PROGRAMMES.filter(
              (p) => p.departmentId === dept.id
            )

            return (
              <div
                key={dept.id}
                className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-canvas)] p-6 sm:p-7 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* Department Header */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary-dark)]">
                        {dept.category}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mt-0.5">
                        {dept.name}
                      </h3>
                    </div>
                    <Badge variant="outline" size="sm" className="font-mono shrink-0">
                      {dept.code}
                    </Badge>
                  </div>

                  {/* Connected Programmes */}
                  <div className="mt-5 space-y-4">
                    {affiliatedProgrammes.length > 0 ? (
                      affiliatedProgrammes.map((prog) => (
                        <div
                          key={prog.id}
                          className="bg-white p-4 rounded-[var(--radius-md)] border border-slate-200/90 space-y-2.5 shadow-2xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-sm font-bold text-[var(--color-primary)]">
                              {prog.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={prog.level === 'PG' ? 'accent' : 'secondary'}
                                size="sm"
                              >
                                {prog.level}
                              </Badge>
                              <span className="text-xs text-slate-700 flex items-center gap-1 font-mono">
                                <Clock className="h-3 w-3 text-slate-500" />
                                {prog.durationYears} {prog.durationYears === 1 ? 'Year' : 'Years'}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                            {prog.description}
                          </p>

                          <div className="pt-2 flex justify-end">
                            <Link
                              to={`/programmes/${prog.slug}`}
                              className="text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] inline-flex items-center gap-1 group/link"
                            >
                              <span>Explore Programme</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
                            </Link>
                          </div>
                        </div>
                      ))
                    ) : (
                      /* Foundational Language Departments */
                      <div className="bg-white p-4 rounded-[var(--radius-md)] border border-dashed border-slate-300 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <BookOpen className="h-4 w-4 text-[var(--color-secondary-dark)]" />
                          <span>Foundation Language Curriculum</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Administers core language papers, literary instruction, and professional communication components across all undergraduate degree branches at ANRCAS.
                        </p>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 pt-1">
                          <Layers className="h-3.5 w-3.5 text-slate-500" />
                          <span>Applicable to B.Sc, B.Com, and BBA students</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 text-xs text-slate-700 flex items-center justify-between">
                  <span>University Curricular Code: {dept.code}</span>
                  <span className="font-semibold text-slate-700">Thiruvalluvar University</span>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
