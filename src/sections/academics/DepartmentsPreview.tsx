import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { DEPARTMENTS } from '@/data/departments'

export const DepartmentsPreview: React.FC = () => {
  return (
    <section id="departments-preview" className="py-20 lg:py-28 bg-[var(--color-ivory)] border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Editorial Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--color-border)] pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                <span className="h-px w-6 bg-[var(--color-gold)]" />
                <span>Academic Organization</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] tracking-tight leading-[1.12]">
                Explore the Disciplines that Shape Your Future.
              </h2>
              <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
                Structured across 6 collegiate departments overseeing curricula, faculty instruction, and laboratory mentorship.
              </p>
            </div>

            <Link
              to="/departments"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)] transition-colors self-start md:self-end group"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        {/* Premium Academic Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept, idx) => {
            const num = String(idx + 1).padStart(2, '0')

            return (
              <Reveal key={dept.id} delay={idx * 60}>
                <div className="h-full bg-white border border-[var(--color-border)] hover:border-[var(--color-ink)] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group">
                  <div>
                    {/* Number & Category */}
                    <div className="flex items-center justify-between border-b border-[var(--color-border)]/60 pb-3 mb-4">
                      <span className="font-serif text-2xl font-light text-[var(--color-gold)]">
                        {num}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                        Code: {dept.code}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors mb-2 leading-snug">
                      <Link to="/departments">
                        {dept.name}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-4 line-clamp-3">
                      {dept.overview}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs">
                    <span className="text-[var(--color-charcoal)] font-medium">
                      {dept.programmesOffered.length} {dept.programmesOffered.length === 1 ? 'Degree' : 'Degrees'} Offered
                    </span>

                    <Link
                      to="/departments"
                      className="font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Department Details</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
