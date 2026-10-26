import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { PROGRAMMES } from '@/data/programmes'

export const StudyLevels: React.FC = () => {
  const ugProgrammes = PROGRAMMES.filter((p) => p.level === 'UG')
  const pgProgrammes = PROGRAMMES.filter((p) => p.level === 'PG')

  return (
    <Section variant="subtle" padding="lg" id="study-levels" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)]">
            Degree Offerings
          </EditorialLabel>
          <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Undergraduate &amp; Postgraduate Study
          </H2>
          <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
            Select an academic level to review degree options affiliated with Thiruvalluvar University, Vellore.
          </TextLead>
        </div>

        {/* Panel 1: Undergraduate Study */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white">
                <GraduationCap className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary)]">
                  Undergraduate Study (UG)
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  3-Year Bachelor Degree Programmes &bull; 5 Disciplines
                </span>
              </div>
            </div>

            <Badge variant="secondary" size="md">
              Full-Time Bachelor Degrees
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ugProgrammes.map((prog) => (
              <div
                key={prog.id}
                className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-secondary)] shadow-2xs transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" size="sm">
                      {prog.degree}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="h-3 w-3" />
                      {prog.durationYears} Years
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary-dark)] transition-colors mb-1.5 leading-snug">
                    <Link
                      to={`/programmes/${prog.slug}`}
                      className="focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)] rounded-xs"
                    >
                      {prog.name}
                    </Link>
                  </h4>

                  <span className="text-xs font-semibold text-slate-500 block mb-3">
                    {prog.departmentName}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    CBCS Framework
                  </span>
                  <Link
                    to={`/programmes/${prog.slug}`}
                    aria-label={`Explore curriculum for ${prog.name}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-secondary-dark)] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore Programme</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Postgraduate Study */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-[var(--radius-md)] bg-[var(--color-accent-dark)] text-white">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary)]">
                  Postgraduate Study (PG)
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  2-Year Master Degree Programme &bull; Advanced Analytical Studies
                </span>
              </div>
            </div>

            <Badge variant="accent" size="md">
              Full-Time Master Degree
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pgProgrammes.map((prog) => (
              <div
                key={prog.id}
                className="p-5 sm:p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-accent)] shadow-2xs transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="accent" size="sm">
                      {prog.degree}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="h-3 w-3" />
                      {prog.durationYears} Years
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-accent-dark)] transition-colors mb-1.5 leading-snug">
                    <Link
                      to={`/programmes/${prog.slug}`}
                      className="focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)] rounded-xs"
                    >
                      {prog.name}
                    </Link>
                  </h4>

                  <span className="text-xs font-semibold text-slate-500 block mb-3">
                    {prog.departmentName}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    University Degree Conferred
                  </span>
                  <Link
                    to={`/programmes/${prog.slug}`}
                    aria-label={`Explore curriculum for ${prog.name}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-accent-dark)] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Explore Programme</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
