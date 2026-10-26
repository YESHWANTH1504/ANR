import React from 'react'
import { CheckCircle2, Compass, Target } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'

export const VisionMission: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="vision-mission" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
          <div className="collegiate-eyebrow text-[#0C4DA2]">
            Guiding Philosophy
          </div>
          <h2 className="collegiate-section-title font-bold text-slate-900 leading-[1.15]">
            Institutional Vision &amp; Mission
          </h2>
          <div className="collegiate-gold-divider mx-auto" />
          <p className="collegiate-body text-slate-600 text-base sm:text-lg">
            The core principles that steer the academic objectives, student welfare policies, and educational development at ANRCAS.
          </p>
        </div>

        {/* 2-Panel Composition: Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Panel 1: Vision */}
          <div className="rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xs border-t-4 border-t-[#0C4DA2]">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="p-2.5 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]">
                  <Compass className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary-dark)]">
                  Long-Term Purpose
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                Our Institutional Vision
              </h3>

              <p className="text-slate-700 leading-relaxed text-base sm:text-[17px] mb-6">
                To serve as a trusted center of collegiate learning that makes university education genuinely accessible to rural and regional youth, nurturing disciplined intellect, ethical character, and the practical capabilities necessary for productive participation in modern society.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                  <span>Democratizing collegiate access across Thiruvannamalai District.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                  <span>Fostering generational social mobility for first-generation graduates.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Mission */}
          <div className="rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between shadow-xs border-t-4 border-t-[var(--color-accent)]">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="p-2.5 rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-dark)]">
                  <Target className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-dark)]">
                  Action &amp; Commitments
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-4">
                Our Institutional Mission
              </h3>

              <ul className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-dark)] shrink-0 mt-2" />
                  <span><strong>Academic Rigour:</strong> Deliver structured, university-aligned instruction across arts, science, commerce, and management disciplines.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-dark)] shrink-0 mt-2" />
                  <span><strong>Enabling Infrastructure:</strong> Provide essential learning resources, including computer laboratories, library collections, and reliable college bus transport.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-dark)] shrink-0 mt-2" />
                  <span><strong>Civic Consciousness:</strong> Instill civic responsibility and empathy through active community initiatives under the National Service Scheme (NSS).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-dark)] shrink-0 mt-2" />
                  <span><strong>Student Mentorship:</strong> Guide learners toward career readiness, postgraduate aspirations, and ethical self-reliance.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
