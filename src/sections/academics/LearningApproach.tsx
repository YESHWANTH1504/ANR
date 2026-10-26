import React from 'react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

interface AcademicPillar {
  number: string
  title: string
  subtitle: string
  description: string
}

const ACADEMIC_PILLARS: AcademicPillar[] = [
  {
    number: '01',
    title: 'University Syllabus Rigour',
    subtitle: 'CBCS Semester Curriculum',
    description:
      'Direct alignment with Thiruvalluvar University credit allocations, standard textbooks, core subject fundamentals, and semester examinations.',
  },
  {
    number: '02',
    title: 'Laboratory Practicals',
    subtitle: 'Hands-on Computing Sessions',
    description:
      'Scheduled programming and numerical experiments in our computer lab, bridging theoretical lectures with applied problem-solving.',
  },
  {
    number: '03',
    title: 'Continuous Assessment',
    subtitle: 'Periodic Tests & Seminars',
    description:
      'Structured internal evaluations, student seminars, and guided assignments that encourage steady study habits and academic confidence.',
  },
  {
    number: '04',
    title: 'Civic Context & Ethics',
    subtitle: 'Value-Centered Higher Learning',
    description:
      'Infusing academic instruction with ethical character and community consciousness through volunteer projects under the National Service Scheme.',
  },
]

export const LearningApproach: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="learning-approach" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)]">
            Pedagogical Model
          </EditorialLabel>
          <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Our Academic Learning Approach
          </H2>
          <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
            How classroom instruction, lab practicals, and university assessment methods work together to foster student competence.
          </TextLead>
        </div>

        {/* 4 Academic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACADEMIC_PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] flex flex-col justify-between shadow-2xs hover:border-[var(--color-secondary)] transition-colors"
            >
              <div>
                <span className="block font-mono text-2xl font-extrabold text-[var(--color-secondary-dark)] mb-3">
                  {pillar.number}
                </span>

                <h3 className="text-base font-bold text-[var(--color-primary)] leading-snug mb-1">
                  {pillar.title}
                </h3>

                <span className="text-xs font-semibold text-[var(--color-accent-dark)] block mb-3">
                  {pillar.subtitle}
                </span>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-slate-400">
                Instructional Standard
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
