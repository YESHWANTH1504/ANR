import React from 'react'
import { BookOpen, Layers, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const DepartmentsHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-paper)] border-b border-[var(--color-border)] overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Academics', href: '/academics' },
            { label: 'Departments' },
          ]}
          className="mb-8"
        />

        <div className="max-w-3xl space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              <span className="h-px w-6 bg-[var(--color-gold)]" />
              <span>Collegiate Directory • 6 Disciplines</span>
            </div>

            {/* Single Primary H1 for Departments Page */}
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--color-ink)] leading-[1.12] tracking-tight">
              Academic Departments Overseeing Collegiate Instruction.
            </h1>

            <p className="mt-4 text-[var(--color-muted)] text-base sm:text-lg lg:text-xl leading-relaxed font-light">
              Our academic departments organize collegiate instruction, computer laboratories, and student mentorship across Science, Commerce, Management, and Languages under <strong className="font-semibold text-[var(--color-ink)]">{COLLEGE_INFO.affiliation}</strong>.
            </p>

            {/* Verified Department Attributes */}
            <div className="pt-6 mt-6 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--color-charcoal)]">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Dedicated Subject Faculties</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">UG &amp; PG Degree Syllabi</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">University Examination Standards</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
