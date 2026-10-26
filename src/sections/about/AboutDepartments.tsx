import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { DEPARTMENTS } from '@/data/departments'

export const AboutDepartments: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="about-departments" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <EditorialLabel className="text-[var(--color-primary)] font-semibold tracking-wider uppercase text-xs">
              Academic Framework &amp; Faculties
            </EditorialLabel>
            <H2 className="mt-2 collegiate-section-title font-bold text-slate-900 tracking-tight">
              Academic Departments &amp; Programmes
            </H2>
            <TextLead className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              ANRCAS comprises six dedicated academic departments delivering curriculum instruction, practical laboratories, and university examination preparation under Thiruvalluvar University affiliation.
            </TextLead>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/departments">
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                All Departments
              </Button>
            </Link>
            <Link to="/programmes">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Degree Programmes
              </Button>
            </Link>
          </div>
        </div>

        {/* 6 Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-primary)]/40 hover:shadow-sm transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[var(--color-primary)] text-white">
                    {dept.code}
                  </span>
                  <span className="collegiate-metadata text-slate-500 font-medium">
                    {dept.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--color-primary)] font-serif mb-2.5 group-hover:text-[var(--color-secondary)] transition-colors">
                  {dept.name}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {dept.overview}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <div className="mb-3">
                  <span className="collegiate-metadata text-slate-500 font-semibold block uppercase mb-1">
                    Degrees / Offerings:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dept.programmesOffered.map((prog, i) => (
                      <span
                        key={i}
                        className="collegiate-metadata inline-block bg-white px-2.5 py-0.5 rounded border border-slate-200 text-slate-700 font-medium"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/programmes"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors mt-2"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>View curriculum details</span>
                  <ArrowRight className="h-3 w-3 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Pathway Guidance Strip */}
        <div className="mt-10 p-5 rounded-[var(--radius-xl)] bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-full bg-[var(--color-primary)] text-white shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                CBCS Curriculum Structure
              </h4>
              <p className="text-xs text-slate-600">
                All 6 degree programmes follow the Choice Based Credit System set by Thiruvalluvar University, Vellore.
              </p>
            </div>
          </div>

          <Link to="/programmes" className="shrink-0">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Explore All 6 Degree Programmes
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
