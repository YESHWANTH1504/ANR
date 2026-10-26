import React from 'react'
import { BookOpen, FileCheck, MessageSquare, Search, ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'

interface JourneyStep {
  number: string
  label: string
  title: string
  description: string
  icon: React.ReactNode
}

const STEPS: JourneyStep[] = [
  {
    number: '01',
    label: 'DISCOVER',
    title: 'Explore Programme Offerings',
    description: 'Browse university undergraduate and postgraduate degree programmes offered across Computing, Science, Commerce, Management, and Languages.',
    icon: <Search className="h-5 w-5 text-[var(--color-ink)]" aria-hidden="true" />,
  },
  {
    number: '02',
    label: 'CHOOSE',
    title: 'Review Curricula & Syllabi',
    description: 'Review degree duration, core subject modules, laboratory practicals, and CBCS university grading structures affiliated with Thiruvalluvar University.',
    icon: <BookOpen className="h-5 w-5 text-[var(--color-ink)]" aria-hidden="true" />,
  },
  {
    number: '03',
    label: 'APPLY',
    title: 'Connect with Admissions Desk',
    description: 'Engage directly with collegiate admissions counselors in person at Vadamavandal or by phone for eligibility checks, guidance, and document verification.',
    icon: <MessageSquare className="h-5 w-5 text-[var(--color-ink)]" aria-hidden="true" />,
  },
  {
    number: '04',
    label: 'BEGIN',
    title: 'Commence Collegiate Studies',
    description: 'Finalize official registration, access dedicated college bus transport services, and start your academic semester with dedicated faculty mentorship.',
    icon: <FileCheck className="h-5 w-5 text-[var(--color-ink)]" aria-hidden="true" />,
  },
]

export const AdmissionJourney: React.FC = () => {
  return (
    <section id="journey" className="py-20 lg:py-28 border-b border-[var(--color-border)] bg-[var(--color-ivory)]">
      <Container size="wide">
        {/* Editorial Section Header */}
        <Reveal>
          <div className="max-w-2xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              <span className="h-px w-6 bg-[var(--color-gold)]" />
              <span>Step-by-Step Progression</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-ink)] tracking-tight leading-[1.12]">
              The Admission Journey
            </h2>

            <p className="text-[var(--color-muted)] text-base sm:text-lg leading-relaxed">
              A clear progression to help prospective students navigate academic choices and engage with the collegiate admissions desk.
            </p>
          </div>
        </Reveal>

        {/* 4-Stage Visual Progression */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STEPS.map((step, index) => (
            <Reveal key={step.number} delay={index * 100}>
              <div className="h-full flex flex-col justify-between p-6 sm:p-8 card-prospectus relative group">
                <div>
                  {/* Top Stage Header */}
                  <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-4 mb-5">
                    <span className="editorial-number text-4xl sm:text-5xl text-[var(--color-gold)]">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--color-sand)]/60 text-[var(--color-ink)] border border-[var(--color-border)]">
                      {step.label}
                    </span>
                  </div>

                  <div className="p-2 w-fit bg-[var(--color-sand)]/50 mb-4 group-hover:bg-[var(--color-gold)]/20 transition-colors">
                    {step.icon}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-semibold text-[var(--color-ink-soft)] uppercase tracking-wider">
                  <span>Stage {index + 1} of 4</span>
                  <ArrowRight className="h-3 w-3 text-[var(--color-gold)] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-[var(--color-muted)] text-center italic">
          Note: This sequence outlines the general student inquiry workflow. Formal institutional admission protocols are coordinated directly by the college administration.
        </p>
      </Container>
    </section>
  )
}
