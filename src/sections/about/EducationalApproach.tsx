import React from 'react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

interface ApproachPillar {
  number: string
  title: string
  description: string
}

const PILLARS: ApproachPillar[] = [
  {
    number: '01',
    title: 'Disciplined University Curriculum',
    description:
      'Rigorous adherence to the syllabi, continuous assessment models, and evaluation standards established by Thiruvalluvar University, Vellore.',
  },
  {
    number: '02',
    title: 'Applied Laboratory Learning',
    description:
      'Complementing theoretical lectures with practical computer laboratory experiments, quantitative problem-solving, and commerce applications.',
  },
  {
    number: '03',
    title: 'Civic Responsibility & Character',
    description:
      'Cultivating ethical awareness, social empathy, and community service through the National Service Scheme and collegiate student activities.',
  },
  {
    number: '04',
    title: 'Accessible Regional Opportunity',
    description:
      'Ensuring that students from rural and suburban backgrounds receive equal opportunity to gain recognized degrees and pursue career mobility.',
  },
]

export const EducationalApproach: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="approach" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)] font-semibold tracking-wider uppercase text-xs">
            Core Philosophy &amp; Pedagogy
          </EditorialLabel>
          <H2 className="mt-2 collegiate-section-title font-bold text-slate-900 tracking-tight">
            Our Educational Approach
          </H2>
          <TextLead className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            The pedagogical principles and institutional commitments that shape daily academic instruction, laboratory rigor, and student mentoring across our departments.
          </TextLead>
        </div>

        {/* 4 Numbered Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.number}
              className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-primary)]/40 hover:shadow-xs transition-all"
            >
              <div>
                <span className="block font-serif text-3xl font-extrabold text-[var(--color-accent-dark)] mb-3">
                  {pillar.number}
                </span>

                <h3 className="text-lg font-bold text-[var(--color-primary)] leading-snug mb-2 font-serif">
                  {pillar.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80 collegiate-metadata text-slate-500 font-semibold uppercase tracking-wider">
                Institutional Pillar
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
