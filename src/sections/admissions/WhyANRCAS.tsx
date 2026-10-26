import React from 'react'
import { Award, BookOpen, Layers, MapPin } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'
import { DEPARTMENTS } from '@/data/departments'
import { PROGRAMMES } from '@/data/programmes'

interface ReasonItem {
  icon: React.ReactNode
  title: string
  detail: string
}

export const WhyANRCAS: React.FC = () => {
  const reasons: ReasonItem[] = [
    {
      icon: <Award className="h-5 w-5 text-[var(--color-accent-dark)]" aria-hidden="true" />,
      title: 'University Affiliation',
      detail: `All undergraduate and postgraduate degrees are formally affiliated with and recognized under ${COLLEGE_INFO.affiliation}.`,
    },
    {
      icon: <Layers className="h-5 w-5 text-[var(--color-secondary-dark)]" aria-hidden="true" />,
      title: 'Structured Academic Faculties',
      detail: `${DEPARTMENTS.length} academic departments organizing curricula across Science, Commerce, Management, and Languages.`,
    },
    {
      icon: <BookOpen className="h-5 w-5 text-[var(--color-secondary-dark)]" aria-hidden="true" />,
      title: 'Standardized Degree Framework',
      detail: `${PROGRAMMES.length} degree programmes adhering strictly to the Choice Based Credit System (CBCS) and university semester standards.`,
    },
    {
      icon: <MapPin className="h-5 w-5 text-emerald-700" aria-hidden="true" />,
      title: 'Dedicated Campus Transit',
      detail: `Situated at ${COLLEGE_INFO.address.locality}, ${COLLEGE_INFO.address.district}, supported by extensive college bus transit reaching surrounding villages.`,
    },
  ]

  return (
    <Section variant="subtle" padding="lg" id="why-anrcas" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="max-w-2xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Institutional Standards
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Academic Grounding at ANRCAS
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            Grounded in university rigour, disciplined instruction, and community accessibility to empower students across Thiruvannamalai District.
          </TextLead>
        </div>

        {/* 4-Column Verified Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-xs space-y-3"
            >
              <div className="p-2.5 rounded-lg bg-[var(--color-surface-subtle)] border border-slate-100 w-fit">
                {item.icon}
              </div>

              <h3 className="text-base font-bold text-[var(--color-primary)] tracking-tight">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
