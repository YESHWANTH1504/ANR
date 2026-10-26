import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Building2, MapPin, ShieldCheck, Users } from 'lucide-react'
import campusImg from '@/assets/campus_main.webp'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const CampusLifeHero: React.FC = () => {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-between overflow-hidden bg-[var(--color-ink)] text-white border-b border-[var(--color-border)]">
      {/* Full-width authentic campus image */}
      <div className="absolute inset-0 z-0">
        <img
          src={campusImg}
          alt="A.N. Radhakrishnan College Campus Grounds"
          className="h-full w-full object-cover object-center filter brightness-[0.70] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/70 to-[var(--color-ink)]/40" />
      </div>

      {/* Semantic Breadcrumbs */}
      <div className="relative z-10 pt-6">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Campus Life' },
            ]}
            className="text-stone-300"
          />
        </Container>
      </div>

      {/* Hero Headline & Content */}
      <div className="relative z-10 my-auto py-12 lg:py-16">
        <Container size="wide">
          <div className="max-w-3xl space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold-light)]">
                <span className="h-px w-6 bg-[var(--color-gold)]" />
                <span>Collegiate Environment &amp; Student Experience</span>
              </div>

              {/* Primary H1 for Campus Life Page */}
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.12] tracking-tight">
                Vibrant Campus Community, Athleticism &amp; Civic Purpose.
              </h1>

              <p className="mt-4 text-stone-200 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                Discover the learning spaces, collegiate facilities, and student community that shape daily life at <strong className="font-semibold text-white">{COLLEGE_INFO.name}</strong>. Rooted in Vadamavandal, our campus blends university academic rigor with civic responsibility and active outdoor recreation.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-white text-[var(--color-ink)] hover:bg-stone-100 font-semibold px-7 py-3.5 text-sm transition-all hover:-translate-y-0.5"
                >
                  <Building2 className="h-4 w-4 text-[var(--color-ink)]" />
                  <span>Explore Facilities</span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-ink)]" />
                </Link>

                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-transparent hover:bg-white/10 text-white font-medium px-6 py-3.5 text-sm border border-white/30 backdrop-blur-xs transition-all hover:border-white hover:-translate-y-0.5"
                >
                  <span>Photographic Archive</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Verified Highlights Strip */}
      <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-md py-4">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2.5">
              <Users className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
              <span>Co-educational Collegiate Community</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
              <span>NSS Civic &amp; Rural Engagement</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
              <span>Vadamavandal Road, Cheyyar</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
