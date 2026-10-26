import React from 'react'
import { BookOpen, CheckCircle2, FileText, Laptop, Users } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

interface SupportPillar {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  highlights: string[]
}

const PILLARS: SupportPillar[] = [
  {
    icon: <BookOpen className="h-6 w-6 text-[var(--color-secondary-dark)]" aria-hidden="true" />,
    title: 'Curriculum-Aligned Academic Foundation',
    subtitle: 'Core Disciplinary Competence',
    description: 'Degree curricula affiliated with Thiruvalluvar University build deep subject comprehension across Computer Science, Mathematics, Commerce, and Management.',
    highlights: ['Choice Based Credit System (CBCS)', 'Continuous internal evaluations', 'Rigorous end-semester examinations'],
  },
  {
    icon: <Laptop className="h-6 w-6 text-[var(--color-secondary-dark)]" aria-hidden="true" />,
    title: 'Applied Practical Laboratory Training',
    subtitle: 'Technical Hands-On Work',
    description: 'Practical computing sessions in our networked computer laboratory provide students with applied software, data processing, and programming skills.',
    highlights: ['Individual computer terminals', 'Modern programming environments', 'Hands-on practical assessments'],
  },
  {
    icon: <FileText className="h-6 w-6 text-[var(--color-accent-dark)]" aria-hidden="true" />,
    title: 'Career Awareness & Professional Etiquette',
    subtitle: 'Pre-Placement Orientation',
    description: 'Faculty-led orientation sessions introduce graduating students to resume structuring, interview etiquette, and corporate communication standards.',
    highlights: ['Professional resume development', 'Interview presentation guidance', 'Workplace communication standards'],
  },
  {
    icon: <Users className="h-6 w-6 text-emerald-700" aria-hidden="true" />,
    title: 'Faculty Mentorship & Pathway Guidance',
    subtitle: 'Individual Academic Support',
    description: 'Dedicated faculty mentors provide personalized counsel regarding postgraduate admissions, competitive examinations, and commercial sector opportunities.',
    highlights: ['Postgraduate study guidance', 'Competitive exam awareness', 'Subject-specific career directions'],
  },
]

export const PlacementSupport: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="placement-support" className="border-b border-[var(--color-border)] bg-white">
      <Container size="wide">
        <div className="max-w-2xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Institutional Preparation
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            How ANRCAS Supports Student Career Readiness
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            Career transition is grounded in consistent classroom learning, practical software experience, and structured faculty mentorship throughout the degree programme.
          </TextLead>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 hover:bg-white hover:border-[var(--color-secondary)] hover:shadow-[var(--shadow-card)] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {pillar.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70 space-y-1.5">
                {pillar.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
