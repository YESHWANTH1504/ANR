import React from 'react'
import { BookOpen, CheckCircle2, Laptop } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import labImg from '@/assets/lab_students.webp'
import libraryImg from '@/assets/library_students.webp'
import { FACILITIES } from '@/data/facilities'

export const FacilityFeature: React.FC = () => {
  const lab = FACILITIES.find((f) => f.id === 'fac-computer-lab')
  const lib = FACILITIES.find((f) => f.id === 'fac-library')

  return (
    <Section variant="card" padding="lg" id="featured-facilities" className="border-b border-[var(--color-border)] bg-white">
      <Container size="wide">
        <div className="max-w-2xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Academic Focus
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Key Academic Learning Spaces
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            A closer look at the primary academic environments supporting degree practicals and research at ANRCAS.
          </TextLead>
        </div>

        <div className="space-y-12">
          {/* Feature 1: Modern Computer Laboratory */}
          {lab && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/30">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
                  <Laptop className="h-3.5 w-3.5 text-[var(--color-secondary-dark)]" aria-hidden="true" />
                  <span>Academic Facility</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] tracking-tight">
                  {lab.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lab.description}
                </p>

                {lab.features && lab.features.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Verified Infrastructure Features:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {lab.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-100">
                <img
                  src={labImg}
                  alt="Students and faculty inside the ANRCAS Computer Laboratory"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Feature 2: College Library & Reading Room */}
          {lib && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/30">
              <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-100">
                <img
                  src={libraryImg}
                  alt="Students engaged in academic reading in the ANRCAS Library"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                  <BookOpen className="h-3.5 w-3.5 text-[var(--color-accent-dark)]" aria-hidden="true" />
                  <span>Academic Facility</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] tracking-tight">
                  {lib.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lib.description}
                </p>

                {lib.features && lib.features.length > 0 && (
                  <div className="pt-3 border-t border-slate-200/80 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                      Verified Resource Features:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {lib.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
