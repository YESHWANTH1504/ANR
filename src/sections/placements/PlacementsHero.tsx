import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Briefcase, GraduationCap, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const PlacementsHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-paper)] border-b border-[var(--color-border)] overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Placements' },
          ]}
          className="mb-8"
        />

        <div className="max-w-4xl space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              <span className="h-px w-6 bg-[var(--color-gold)]" />
              <span>Career Readiness &amp; Professional Guidance</span>
            </div>

            {/* Typography-Driven Primary H1 for Placements Page */}
            <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--color-ink)] leading-[1.10] tracking-tight">
              Preparing Students for Professional Distinction &amp; Real-World Capability.
            </h1>

            <p className="mt-4 text-[var(--color-muted)] text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-3xl">
              At <strong className="font-semibold text-[var(--color-ink)]">{COLLEGE_INFO.name}</strong>, career development begins with foundational academic discipline, practical laboratory competence, and faculty mentorship designed to prepare undergraduate and postgraduate students for professional opportunities.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/programmes"
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] hover:bg-[var(--color-charcoal)] text-white font-medium px-7 py-3.5 text-sm transition-all hover:-translate-y-0.5"
              >
                <BookOpen className="h-4 w-4" />
                <span>Explore Degree Programmes</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/facilities"
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-transparent hover:bg-[var(--color-ivory)] text-[var(--color-ink)] font-medium px-6 py-3.5 text-sm border border-[var(--color-border)] transition-colors"
              >
                <span>Practical Computing Facilities</span>
              </Link>
            </div>

            {/* Verified Institutional Highlights Strip */}
            <div className="pt-8 mt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--color-charcoal)]">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Career Guidance &amp; Soft Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Recognized University Degrees</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Thiruvalluvar Affiliation</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
