import React from 'react'
import { Award, Clock, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import type { Programme } from '@/data/programmes'
import { COLLEGE_INFO } from '@/data/college'

export interface ProgrammeDetailHeroProps {
  programme: Programme
}

export const ProgrammeDetailHero: React.FC<ProgrammeDetailHeroProps> = ({ programme }) => {
  const isPg = programme.level === 'PG'

  return (
    <section className="relative bg-[var(--color-paper)] border-b border-[var(--color-border)] overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Programmes', href: '/programmes' },
            { label: programme.name },
          ]}
          className="mb-8"
        />

        <div className="max-w-4xl space-y-6">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                <span className="h-px w-6 bg-[var(--color-gold)]" />
                <span>{isPg ? 'Postgraduate Degree Curriculum' : 'Undergraduate Degree Curriculum'}</span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-[var(--color-sand)]/60 text-[var(--color-ink)] border border-[var(--color-border)]">
                {programme.level}
              </span>
            </div>

            {/* Exactly One Primary H1 for Programme Detail Page */}
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--color-ink)] leading-[1.10] tracking-tight">
              {programme.degree} {programme.name}
            </h1>

            <p className="mt-4 text-[var(--color-muted)] text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-3xl">
              {programme.description}
            </p>

            {/* Verified Academic Attributes Strip */}
            <div className="pt-8 mt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--color-charcoal)]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">{programme.durationYears} {programme.durationYears === 1 ? 'Year' : 'Years'} Full-Time</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">{programme.departmentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">{COLLEGE_INFO.affiliation}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
