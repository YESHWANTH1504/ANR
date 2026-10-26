import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Building2, Bus, Laptop } from 'lucide-react'
import libImg from '@/assets/library_students.webp'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'

export const FacilitiesHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-paper)] border-b border-[var(--color-border)] overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Facilities' },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                <span className="h-px w-6 bg-[var(--color-gold)]" />
                <span>Collegiate Infrastructure &amp; Assets</span>
              </div>

              {/* Exactly One Primary H1 for Facilities Page */}
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[var(--color-ink)] leading-[1.12] tracking-tight">
                Purpose-Engineered Spaces for Scholarship &amp; Practical Learning.
              </h1>

              <p className="mt-4 text-[var(--color-muted)] text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                A comprehensive overview of collegiate facilities available at ANRCAS, supporting classroom teaching, practical scientific inquiry, quiet academic research, safe student commuting, and physical fitness.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/campus-life"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] hover:bg-[var(--color-charcoal)] text-white font-medium px-6 py-3.5 text-sm transition-all hover:-translate-y-0.5"
                >
                  <Building2 className="h-4 w-4" />
                  <span>Explore Campus Life</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/admissions"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-transparent hover:bg-[var(--color-ivory)] text-[var(--color-ink)] font-medium px-6 py-3.5 text-sm border border-[var(--color-border)] transition-colors"
                >
                  <span>Admissions Inquiries</span>
                </Link>
              </div>

              {/* Verified Attributes Strip */}
              <div className="pt-6 mt-6 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--color-charcoal)]">
                <div className="flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <span className="font-medium">Modern Computing Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <span className="font-medium">Central Reading Center</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bus className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <span className="font-medium">Dedicated College Bus Transit</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Facility Photography Frame */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={150}>
              <div className="relative mx-auto max-w-md">
                <div className="relative h-80 sm:h-96 w-full border border-[var(--color-border)] overflow-hidden bg-stone-100 shadow-sm">
                  <img
                    src={libImg}
                    alt="ANRCAS Central Reading & Reference Facility"
                    className="h-full w-full object-cover object-center filter brightness-95 contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-light)] block mb-1">
                      Central Academic Library
                    </span>
                    <span className="font-serif text-lg leading-snug block">
                      Textbook holdings, university syllabus references &amp; collaborative learning space
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
