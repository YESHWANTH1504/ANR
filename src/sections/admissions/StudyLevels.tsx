import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { PROGRAMMES } from '@/data/programmes'

export const StudyLevels: React.FC = () => {
  const ugProgrammes = PROGRAMMES.filter((p) => p.level === 'UG')
  const pgProgrammes = PROGRAMMES.filter((p) => p.level === 'PG')

  return (
    <Section variant="card" padding="lg" id="study-levels" className="border-b border-[var(--color-border)] bg-white">
      <Container size="wide">
        <div className="max-w-2xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Academic Scope
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Undergraduate &amp; Postgraduate Paths
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            ANRCAS offers disciplined collegiate education across two defined levels of university study, grounded in the Choice Based Credit System (CBCS).
          </TextLead>
        </div>

        {/* 2-Column Level Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Undergraduate Card */}
          <div className="flex flex-col justify-between p-7 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 hover:bg-white hover:border-[var(--color-secondary)] transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs text-[var(--color-secondary-dark)]">
                  <GraduationCap className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary-dark)] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  {ugProgrammes.length} Programmes Available
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                  Undergraduate Study (UG)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  3-Year Degree Curricula (6 Semesters)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Foundational and career-oriented collegiate degrees combining core theoretical principles with laboratory exercises, semester assignments, and continuous evaluations.
              </p>

              {/* Verified Programmes List */}
              <div className="pt-2 border-t border-slate-200/60 space-y-2 text-xs sm:text-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Available UG Degrees:
                </span>
                <ul className="space-y-1.5">
                  {ugProgrammes.map((p) => (
                    <li key={p.id} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>{p.name} ({p.degree})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/60">
              <Link to="/programmes">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore Undergraduate Programmes
                </Button>
              </Link>
            </div>
          </div>

          {/* Postgraduate Card */}
          <div className="flex flex-col justify-between p-7 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 hover:bg-white hover:border-[var(--color-secondary)] transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs text-[var(--color-accent-dark)]">
                  <BookOpen className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-dark)] bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  {pgProgrammes.length} Programme Available
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]">
                  Postgraduate Study (PG)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  2-Year Advanced Degree (4 Semesters)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Advanced academic inquiry designed to build specialized subject expertise, research methodologies, and quantitative competence for professional and academic careers.
              </p>

              {/* Verified Programmes List */}
              <div className="pt-2 border-t border-slate-200/60 space-y-2 text-xs sm:text-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Available PG Degree:
                </span>
                <ul className="space-y-1.5">
                  {pgProgrammes.map((p) => (
                    <li key={p.id} className="flex items-center gap-2 text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                      <span>{p.name} ({p.degree})</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/60">
              <Link to="/programmes">
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore Postgraduate Programme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
