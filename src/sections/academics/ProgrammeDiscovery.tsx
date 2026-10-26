import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Code, Database, Globe, Landmark, TrendingUp } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

interface AreaOfStudy {
  title: string
  icon: React.ReactNode
  department: string
  programmes: { name: string; slug?: string }[]
  summary: string
}

const STUDY_AREAS: AreaOfStudy[] = [
  {
    title: 'Computer Science & Computing',
    icon: <Code className="h-5 w-5 text-[var(--color-secondary-dark)]" />,
    department: 'Department of Computer Science',
    programmes: [{ name: 'B.Sc Computer Science', slug: 'computer-science' }],
    summary: 'Hardware-software fundamentals, programming languages, algorithms, and practical software design.',
  },
  {
    title: 'Mathematical Sciences',
    icon: <Database className="h-5 w-5 text-[var(--color-secondary-dark)]" />,
    department: 'Department of Mathematics',
    programmes: [{ name: 'B.Sc Mathematics', slug: 'mathematics' }],
    summary: 'Rigorous analytical problem-solving, theoretical calculus, linear algebra, and mathematical models.',
  },
  {
    title: 'Commerce & Corporate Finance',
    icon: <Landmark className="h-5 w-5 text-[var(--color-accent-dark)]" />,
    department: 'Department of Commerce',
    programmes: [
      { name: 'B.Com (General)', slug: 'bcom' },
      { name: 'B.Com Corporate Secretaryship', slug: 'corporate-secretaryship' },
      { name: 'M.Com (Master of Commerce)', slug: 'mcom' },
    ],
    summary: 'Financial accounting, corporate compliance, secretarial practice, and commercial operations.',
  },
  {
    title: 'Business Administration & Management',
    icon: <TrendingUp className="h-5 w-5 text-emerald-600" />,
    department: 'Department of Management Studies',
    programmes: [{ name: 'BBA - Bachelor of Business Administration', slug: 'bba' }],
    summary: 'Managerial fundamentals, marketing, organizational strategy, and entrepreneurial decision-making.',
  },
  {
    title: 'Languages & Communication',
    icon: <Globe className="h-5 w-5 text-amber-600" />,
    department: 'Departments of Tamil & English',
    programmes: [
      { name: 'Language Foundation Courses' },
      { name: 'Professional Communication Studies' },
    ],
    summary: 'Classical literature appreciation, cultural studies, and professional verbal and written English.',
  },
]

export const ProgrammeDiscovery: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="areas-of-study" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <EditorialLabel className="text-[var(--color-primary)]">
              Academic Organization
            </EditorialLabel>
            <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              Explore Areas of Study
            </H2>
            <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
              See how our academic departments connect foundational disciplines with specialized degree programmes.
            </TextLead>
          </div>

          <Link to="/programmes" className="shrink-0 hidden sm:inline-flex">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Programmes
            </Button>
          </Link>
        </div>

        {/* Areas of Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STUDY_AREAS.map((area, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-[var(--color-border)] flex flex-col justify-between hover:border-[var(--color-secondary)] transition-colors"
            >
              <div>
                <div className="p-2.5 w-fit rounded-[var(--radius-md)] bg-white border border-slate-200 mb-4 shadow-2xs">
                  {area.icon}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-1">
                  {area.title}
                </h3>

                <span className="text-xs font-semibold text-[var(--color-secondary-dark)] block mb-3">
                  {area.department}
                </span>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {area.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Degrees Offered
                </span>
                <ul className="space-y-1.5 text-xs font-medium text-slate-800">
                  {area.programmes.map((p, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)] shrink-0" />
                      {p.slug ? (
                        <Link
                          to={`/programmes/${p.slug}`}
                          className="hover:text-[var(--color-secondary-dark)] hover:underline"
                        >
                          {p.name}
                        </Link>
                      ) : (
                        <span>{p.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/programmes" className="w-full block">
            <Button variant="outline" size="md" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Programmes
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
