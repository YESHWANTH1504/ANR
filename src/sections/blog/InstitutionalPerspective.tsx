import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Compass, GraduationCap, Laptop } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

interface PerspectivePillar {
  title: string
  description: string
  icon: React.ReactNode
  linkText: string
  linkHref: string
}

const PILLARS: PerspectivePillar[] = [
  {
    title: 'Curricular Foundations & Pedagogy',
    description: 'Explorations of undergraduate curriculum standards, student development, and academic learning under Thiruvalluvar University regulations.',
    icon: <BookOpen className="h-5 w-5 text-sky-600" aria-hidden="true" />,
    linkText: 'Explore Academics',
    linkHref: '/academics',
  },
  {
    title: 'Degree Programmes & Studies',
    description: 'Contextual overviews across Computer Science, Commerce, Mathematics, Management, and Language studies offered at ANRCAS.',
    icon: <GraduationCap className="h-5 w-5 text-indigo-600" aria-hidden="true" />,
    linkText: 'Browse Programmes',
    linkHref: '/programmes',
  },
  {
    title: 'Campus Environment & NSS Engagement',
    description: 'Reflections on student community life, civic awareness camps, cultural occasions, and youth empowerment in rural Tamil Nadu.',
    icon: <Compass className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
    linkText: 'Campus Life Details',
    linkHref: '/campus-life',
  },
  {
    title: 'Computing Labs & Practical Facilities',
    description: 'Insights into technology learning spaces, reference library study environments, and dedicated student transport networks.',
    icon: <Laptop className="h-5 w-5 text-amber-600" aria-hidden="true" />,
    linkText: 'View Facilities',
    linkHref: '/facilities',
  },
]

export const InstitutionalPerspective: React.FC = () => {
  return (
    <Section
      variant="card"
      padding="lg"
      id="editorial-scope"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Editorial Purpose &amp; Scope
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight font-serif">
            Editorial Direction at {COLLEGE_INFO.shortName}
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            The blog provides a space for longer-form educational perspectives and institutional stories that complement the college's regular news and event updates. Explore core areas of collegiate life below.
          </TextLead>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[var(--color-secondary)] hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-xs inline-block">
                  {pillar.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[var(--color-primary)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70">
                <Link
                  to={pillar.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] transition-colors group"
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
