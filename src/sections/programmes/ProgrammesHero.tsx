import React from 'react'
import { BookOpen, GraduationCap, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'
import { PROGRAMMES } from '@/data/programmes'

export const ProgrammesHero: React.FC = () => {
  const ugCount = PROGRAMMES.filter((p) => p.level === 'UG').length
  const pgCount = PROGRAMMES.filter((p) => p.level === 'PG').length

  return (
    <section className="relative bg-[var(--color-paper)] border-b border-[var(--color-border)] overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Academics', href: '/academics' },
            { label: 'Programmes' },
          ]}
          className="mb-8"
        />

        <div className="max-w-4xl space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              <span className="h-px w-6 bg-[var(--color-gold)]" />
              <span>University Degree Catalogue • {PROGRAMMES.length} Degrees</span>
            </div>

            {/* Exactly One Primary H1 for the Programmes Overview */}
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--color-ink)] leading-[1.10] tracking-tight">
              Curricula &amp; Degrees Structured for Academic Distinction.
            </h1>

            <p className="mt-4 text-[var(--color-muted)] text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-3xl">
              A.N. Radhakrishnan College of Arts &amp; Science offers structured undergraduate and postgraduate degree programmes affiliated with <strong className="font-semibold text-[var(--color-ink)]">{COLLEGE_INFO.affiliation}</strong>. Explore curricula spanning Computer Science, Mathematics, Commerce, and Management.
            </p>

            {/* Verified Academic Attributes Strip */}
            <div className="pt-8 mt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--color-charcoal)]">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">{ugCount} Undergraduate Degrees</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">{pgCount} Postgraduate Degree</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Thiruvalluvar Affiliated</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
