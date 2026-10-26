import React from 'react'
import { Award, BookOpen, Layers, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

interface FrameworkStep {
  step: string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
}

const FRAMEWORK_STEPS: FrameworkStep[] = [
  {
    step: 'Stage 01',
    title: 'Undergraduate Foundation',
    subtitle: '3-Year Full-Time Degrees',
    description:
      'Rigorous bachelor-level instruction in Computer Science, Mathematics, Commerce, Corporate Secretaryship, and Business Administration.',
    icon: <BookOpen className="h-5 w-5 text-[var(--color-secondary-dark)]" />,
  },
  {
    step: 'Stage 02',
    title: 'Postgraduate Inquiry',
    subtitle: '2-Year Advanced Degree',
    description:
      'Advanced master-level study in Commerce (M.Com) deepening analytical capabilities, financial strategy, and academic research methods.',
    icon: <Layers className="h-5 w-5 text-[var(--color-accent-dark)]" />,
  },
  {
    step: 'Stage 03',
    title: 'CBCS Semester Model',
    subtitle: 'State University Standards',
    description:
      'Structured evaluation incorporating continuous internal assessments, practical laboratory tests, and final semester university examinations.',
    icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />,
  },
]

export const AcademicFramework: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="framework" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)]">
            Academic Pathway
          </EditorialLabel>
          <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            The Academic Framework
          </H2>
          <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
            How higher education at ANRCAS is structured under the regulations of {COLLEGE_INFO.affiliation} to ensure academic credibility and student progression.
          </TextLead>
        </div>

        {/* Horizontal Pathway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {FRAMEWORK_STEPS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-secondary)] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="p-2 rounded-[var(--radius-md)] bg-white border border-slate-200 shadow-2xs">
                    {item.icon}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-1">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-[var(--color-secondary-dark)] block mb-3">
                  {item.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Affiliation Standard</span>
                <Award className="h-3.5 w-3.5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
