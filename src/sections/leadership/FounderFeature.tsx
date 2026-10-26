import React from 'react'
import { Award, Compass, HeartHandshake, ShieldCheck } from 'lucide-react'
import founderImg from '@/assets/founder.webp'
import logoImg from '@/assets/logo.png'
import meenakshiLogo from '@/assets/meenakshi_group.png'
import { Container } from '@/components/shared/Container'
import { FOUNDER_DATA } from '@/data/leadership'
import { COLLEGE_INFO } from '@/data/college'

export const FounderFeature: React.FC = () => {
  return (
    <section
      id="founder-feature"
      className="py-16 md:py-24 bg-[var(--color-ivory)] border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Asymmetric Architectural Founder Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Offset Gold Architectural Shadow Border */}
              <div
                className="absolute -top-3 -left-3 w-full h-full border border-[var(--color-gold)]/40 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Portrait Card */}
              <div className="relative bg-white border border-[var(--color-border)] p-4 sm:p-5 shadow-xs">
                <div className="relative h-96 sm:h-[420px] w-full overflow-hidden bg-stone-100 border border-[var(--color-border)]">
                  <img
                    src={founderImg}
                    alt={`${FOUNDER_DATA.name}, ${FOUNDER_DATA.role}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top filter contrast-[1.02] hover:scale-102 transition-transform duration-700 ease-out"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-transparent to-transparent"
                    aria-hidden="true"
                  />

                  {/* On-Image Typography Plate */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)] block mb-1">
                      {FOUNDER_DATA.title}
                    </span>
                    <h3 className="font-serif text-2xl font-bold leading-tight">
                      {FOUNDER_DATA.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200 mt-1">
                      {FOUNDER_DATA.designation}
                    </p>
                  </div>
                </div>

                {/* Institutional Endorsement Bar */}
                <div className="mt-4 p-3.5 bg-[var(--color-paper)] border border-[var(--color-border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={logoImg} alt="ANRCAS Seal" className="h-9 w-9 object-contain" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--color-ink)]">{COLLEGE_INFO.shortName}</h4>
                      <p className="text-xs text-[var(--color-muted)]">{FOUNDER_DATA.trustAffiliation}</p>
                    </div>
                  </div>
                  <img
                    src={meenakshiLogo}
                    alt="Meenakshi Group"
                    className="h-6 w-auto object-contain opacity-80"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Purpose & Institutional Storytelling */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
              <span>Founding Purpose</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] leading-[1.15]">
              Empowering Rural Youth Through University Education
            </h2>

            <div className="space-y-4 text-base text-[var(--color-charcoal)] leading-relaxed">
              <p>
                A.N. Radhakrishnan College of Arts &amp; Science honors the vision of its founder, <strong>{FOUNDER_DATA.name}</strong>, who recognized that the sustainable progress of Vadamavandal and surrounding taluks in North Tamil Nadu depended upon bringing higher educational institutions directly to rural families.
              </p>
              <p className="text-[var(--color-muted)]">
                Believing that university education is the foremost catalyst for personal dignity and generational advancement, the founding goal was to establish a collegiate institution where young men and women—many the first in their families to pursue higher education—could obtain recognized university degrees close to home.
              </p>
              <p className="text-[var(--color-muted)]">
                Today, that founding commitment endures in every dimension of the college: in accessible fee structures, organized rural bus transit serving distant villages, dedicated faculty mentorship, and active social responsibility initiatives.
              </p>
            </div>

            {/* Verified Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-[var(--color-border)] rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <Compass className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Accessible Opportunity</h4>
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Bridging rural and suburban students with accredited university degree pathways.
                </p>
              </div>

              <div className="p-4 bg-white border border-[var(--color-border)] rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Ethical Discipline</h4>
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Cultivating moral character, social empathy, and self-reliance through holistic education.
                </p>
              </div>

              <div className="p-4 bg-white border border-[var(--color-border)] rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <HeartHandshake className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Community Welfare</h4>
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Active civic engagement through National Service Scheme (NSS) rural outreach camps.
                </p>
              </div>

              <div className="p-4 bg-white border border-[var(--color-border)] rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-ink)]">
                  <Award className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Academic Rigour</h4>
                </div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Rigorous curricula structured under Thiruvalluvar University, Vellore.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
