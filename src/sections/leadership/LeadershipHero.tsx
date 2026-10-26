import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Award, Compass, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { FOUNDER_DATA } from '@/data/leadership'
import { COLLEGE_INFO } from '@/data/college'

export const LeadershipHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-ink)] text-white pt-8 pb-16 md:pt-12 md:pb-24 border-b border-white/10 overflow-hidden">
      {/* Background Architectural Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-30 -z-10"
        aria-hidden="true"
      />

      <Container size="wide">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Leadership' },
          ]}
          className="mb-8 [&_a]:text-slate-400 [&_a:hover]:text-[var(--color-gold-light)] [&_span]:text-white/80 [&_svg]:text-slate-500"
        />

        <div className="max-w-4xl space-y-6">
          {/* Editorial Category Tag */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 border border-[var(--color-gold)]/30 text-xs font-semibold tracking-widest uppercase text-[var(--color-gold-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
            <span>Leadership &amp; Founding Vision</span>
          </div>

          {/* Newsreader Editorial Display Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08] animate-hero-text">
            Leadership &amp; Vision
          </h1>

          {/* Lead Factual Narrative */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-sand)] max-w-2xl font-light leading-relaxed animate-hero-text [animation-delay:150ms]">
            Explore the founding vision, educational philosophy, and governance commitments that steer {COLLEGE_INFO.name} in its service to rural and suburban youth.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3 animate-hero-cta [animation-delay:300ms]">
            <a href="#founder-feature">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowDown className="h-4 w-4" />}
                className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-ink)] font-semibold border-none shadow-md"
              >
                Explore Founding Vision
              </Button>
            </a>

            <Link to="/programmes">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="border-white/25 text-white hover:bg-white/10 hover:border-white/50"
              >
                Degree Programmes
              </Button>
            </Link>
          </div>

          {/* Verified Institutional Leadership Strip */}
          <div className="pt-8 mt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
              <div>
                <span className="block font-semibold text-white">{FOUNDER_DATA.name}</span>
                <span className="text-xs text-slate-400">{FOUNDER_DATA.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Award className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
              <div>
                <span className="block font-semibold text-white">Thiruvalluvar Affiliation</span>
                <span className="text-xs text-slate-400">Statutory University Oversight</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
              <div>
                <span className="block font-semibold text-white">{FOUNDER_DATA.trustAffiliation}</span>
                <span className="text-xs text-slate-400">Philanthropic Educational Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
