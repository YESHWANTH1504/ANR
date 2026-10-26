import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { PROGRAMMES } from '@/data/programmes'

export const AdmissionsProgrammes: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="programmes-admissions" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <EditorialLabel className="text-[var(--color-primary)]">
              Degree Offerings
            </EditorialLabel>

            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              Choose Your Academic Path
            </H2>

            <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
              Explore undergraduate and postgraduate degrees recognized under Thiruvalluvar University statute, spanning computer science, mathematical sciences, commerce, and management studies.
            </TextLead>
          </div>

          <Link to="/programmes" className="shrink-0 hidden sm:inline-flex">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Programmes
            </Button>
          </Link>
        </div>

        {/* Programme Discovery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMMES.map((prog) => {
            const isPg = prog.level === 'PG'

            return (
              <div
                key={prog.id}
                className="group flex flex-col justify-between p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-xs hover:border-[var(--color-secondary)] hover:shadow-[var(--shadow-card)] transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <Badge variant={isPg ? 'accent' : 'secondary'} size="sm">
                      {isPg ? 'Postgraduate' : 'Undergraduate'}
                    </Badge>

                    <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                      <span>{prog.durationYears} Years Full-Time</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary-dark)] transition-colors leading-snug">
                    {prog.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2 mb-3">
                    <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{prog.departmentName}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {prog.degree}
                  </span>

                  <Link
                    to={`/programmes/${prog.slug}`}
                    aria-label={`View curriculum details for ${prog.name}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-secondary-dark)] group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)] rounded-xs"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile View All Action */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/programmes" className="w-full block">
            <Button variant="outline" size="md" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Programmes
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
