import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'

interface PathwayItem {
  number: string
  category: string
  title: string
  description: string
  href: string
  actionLabel: string
}

const PATHWAYS: PathwayItem[] = [
  {
    number: '01',
    category: 'Heritage',
    title: 'About ANRCAS',
    description: 'Discover the institutional story, core values, and community commitments of the college.',
    href: '/about',
    actionLabel: 'Read Institutional Story',
  },
  {
    number: '02',
    category: 'Academics',
    title: 'Academic Structure',
    description: 'Explore curriculum regulations, university affiliations, and faculty departments.',
    href: '/academics',
    actionLabel: 'Review Academics',
  },
  {
    number: '03',
    category: 'Curriculum',
    title: 'Degree Catalogues',
    description: 'Browse verified undergraduate degree programmes in Computing, Commerce, and Science.',
    href: '/programmes',
    actionLabel: 'Browse Programmes',
  },
  {
    number: '04',
    category: 'Enrolment',
    title: 'Admissions Desk',
    description: 'Review eligibility requirements, application steps, and student counseling support.',
    href: '/admissions',
    actionLabel: 'Explore Admissions',
  },
]

export const LeadershipPathways: React.FC = () => {
  return (
    <section
      id="leadership-pathways"
      className="py-16 md:py-24 bg-white border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
            <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
            <span>Institutional Pathways</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] tracking-tight leading-tight">
            Explore Institutional Sections
          </h2>

          <p className="text-base text-[var(--color-muted)] leading-relaxed">
            See how the founder's vision translates into academic discipline, campus infrastructure, and student opportunities across our primary directories.
          </p>
        </div>

        {/* 4 Prospectus Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATHWAYS.map((pathway) => (
            <Link
              key={pathway.title}
              to={pathway.href}
              className="card-prospectus group p-6 sm:p-7 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="editorial-number text-2xl font-light text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">
                    {pathway.number}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] bg-[var(--color-ivory)] px-2.5 py-0.5 rounded-full border border-[var(--color-border)]">
                    {pathway.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors">
                    {pathway.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                    {pathway.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors">
                <span>{pathway.actionLabel}</span>
                <ArrowRight
                  className="h-3.5 w-3.5 arrow-nudge text-[var(--color-gold)] group-hover:text-[var(--color-anrcas-blue)] transition-colors"
                  aria-hidden="true"
                />
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
