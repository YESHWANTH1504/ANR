import React from 'react'
import { BookMarked, Cpu, MessageSquare, BrainCircuit, Award } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

interface ReadinessDimension {
  number: string
  title: string
  subtitle: string
  icon: React.ReactNode
  description: string
  competencies: string[]
}

const READINESS_DIMENSIONS: ReadinessDimension[] = [
  {
    number: '01',
    title: 'Academic Grounding & Conceptual Depth',
    subtitle: 'Disciplinary Rigour',
    icon: <BookMarked className="h-5 w-5 text-slate-700" aria-hidden="true" />,
    description: 'Thorough comprehension of degree curricula prescribed by Thiruvalluvar University, establishing clear conceptual understanding across core subject areas.',
    competencies: [
      'Comprehensive syllabus mastery',
      'Systematic internal examinations',
      'Analytical reference material review',
    ],
  },
  {
    number: '02',
    title: 'Practical Application & Digital Literacy',
    subtitle: 'Applied Technical Skills',
    icon: <Cpu className="h-5 w-5 text-slate-700" aria-hidden="true" />,
    description: 'Hands-on practice in the college computer laboratory and departmental assignments, equipping students with essential software and analytical skills.',
    competencies: [
      'Hands-on programming & computing',
      'Spreadsheet & data management',
      'Accounting & commercial computational tools',
    ],
  },
  {
    number: '03',
    title: 'Communication & Expressive Ability',
    subtitle: 'Interpersonal Standards',
    icon: <MessageSquare className="h-5 w-5 text-slate-700" aria-hidden="true" />,
    description: 'Development of structured oral presentation skills, formal written correspondence, and clarity of expression necessary for professional workplace settings.',
    competencies: [
      'Structured interview responses',
      'Formal academic & business writing',
      'Participatory classroom presentations',
    ],
  },
  {
    number: '04',
    title: 'Analytical Inquiry & Problem Solving',
    subtitle: 'Quantitative & Logical Thought',
    icon: <BrainCircuit className="h-5 w-5 text-slate-700" aria-hidden="true" />,
    description: 'Training in mathematical logic, commercial problem decomposition, and critical evaluation of real-world scenarios across arts and science streams.',
    competencies: [
      'Logical problem breakdown',
      'Data interpretation & calculation',
      'Structured case reasoning',
    ],
  },
  {
    number: '05',
    title: 'Professional Ethics & Social Responsibility',
    subtitle: 'Conduct & Institutional Values',
    icon: <Award className="h-5 w-5 text-slate-700" aria-hidden="true" />,
    description: 'Cultivating punctuality, ethical awareness, integrity, and collaborative spirit through campus community initiatives and NSS volunteer activities.',
    competencies: [
      'Institutional discipline & integrity',
      'Teamwork in co-curricular tasks',
      'Community service & civic values',
    ],
  },
]

export const StudentReadiness: React.FC = () => {
  return (
    <Section
      variant="card"
      padding="lg"
      id="student-readiness"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Student Competency Framework
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Dimensions of Student Career Readiness
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            Preparation for professional environments requires balanced development across academic knowledge, technical capability, effective communication, and ethical responsibility.
          </TextLead>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Contextual Column */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="p-6 border border-[var(--color-border)] bg-[var(--color-paper)] space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] block">
                Foundational Philosophy
              </span>
              <h3 className="font-serif text-xl font-bold text-[var(--color-ink)] leading-snug">
                Our Educational Perspective
              </h3>
              <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light">
                Rather than treating career placement as an isolated final-semester event, student readiness is built cumulatively across all semesters through consistent academic discipline, practical laboratory coursework, and faculty counsel.
              </p>
              <div className="pt-3 border-t border-[var(--color-border)]/60 text-xs sm:text-sm text-[var(--color-charcoal)] font-medium">
                Focusing on durable core competencies that support lifelong professional adaptability.
              </div>
            </div>
          </div>

          {/* Right Dimensions List */}
          <div className="lg:col-span-8 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {READINESS_DIMENSIONS.map((dim) => (
              <div
                key={dim.number}
                className="py-6 sm:py-8 first:pt-4 last:pb-4 group transition-colors duration-150"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Number & Icon Indicator */}
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 shrink-0">
                    <span className="editorial-number text-3xl sm:text-4xl text-[var(--color-gold)]">
                      {dim.number}
                    </span>
                    <div className="p-2 bg-[var(--color-sand)]/40 border border-[var(--color-border)] text-[var(--color-ink)]">
                      {dim.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                        {dim.subtitle}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors mt-0.5 leading-snug">
                        {dim.title}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-light">
                      {dim.description}
                    </p>

                    {/* Competency badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {dim.competencies.map((comp, cIdx) => (
                        <span
                          key={cIdx}
                          className="inline-flex items-center text-xs px-2.5 py-1 bg-[var(--color-sand)]/40 text-[var(--color-charcoal)] border border-[var(--color-border)]/80"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
