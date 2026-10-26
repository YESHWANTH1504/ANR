import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const AdmissionsHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-ink)] text-white border-b border-white/10 overflow-hidden">
      {/* Decorative Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-20" aria-hidden="true" />

      <Container size="wide" className="pt-6 pb-20 lg:pb-28 relative z-10">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Admissions' },
          ]}
          className="mb-10 text-stone-400"
        />

        <div className="max-w-4xl space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3.5 py-1 text-xs font-semibold text-[var(--color-gold-light)] mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-ping" />
              <span>Admissions Open 2025–2026 • Undergraduate &amp; Postgraduate</span>
            </div>

            {/* Single Primary H1 for the Admissions Page */}
            <h1 className="mt-3 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight">
              A Thoughtful Academic Beginning at ANRCAS.
            </h1>

            <p className="mt-5 text-stone-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-3xl">
              Welcome to the admissions portal of <strong className="font-semibold text-white">{COLLEGE_INFO.name}</strong>. Explore available degree programmes, review curriculum structures under <strong className="font-semibold text-white">{COLLEGE_INFO.affiliation}</strong>, and connect with the admissions counseling desk for enrollment procedures.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/programmes"
                className="inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] hover:bg-stone-100 font-semibold px-7 py-3.5 text-sm sm:text-base shadow-lg transition-all hover:-translate-y-0.5"
              >
                <BookOpen className="h-4 w-4 text-[var(--color-ink)]" />
                <span>Explore Degree Programmes</span>
                <ArrowRight className="h-4 w-4 text-[var(--color-ink)]" />
              </Link>

              <a
                href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-sm)] bg-transparent text-white hover:bg-white/10 font-medium px-6 py-3.5 text-sm sm:text-base border border-white/30 backdrop-blur-xs transition-all hover:border-white hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 text-[var(--color-gold-light)]" />
                <span>Call Admissions Desk</span>
              </a>
            </div>

            {/* Verified Institutional Highlights Strip */}
            <div className="pt-8 mt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-stone-200">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
                <span>UG &amp; PG Degree Offerings</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
                <span>UGC / CBCS Framework</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
                <span>Dedicated College Bus Transit</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
