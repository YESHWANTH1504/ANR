import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Mail, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H1, TextBody, TextSmall } from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { COLLEGE_INFO } from '@/data/college'

export interface PlaceholderRouteProps {
  title: string
  phaseNumber?: number
  description?: string
}

export const PlaceholderRoute: React.FC<PlaceholderRouteProps> = ({
  title = 'Committees & Governance',
}) => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = `${title} | A.N. Radhakrishnan College of Arts & Science`
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [title])

  const statutoryBodies = [
    {
      name: 'Internal Quality Assurance Cell (IQAC)',
      purpose: 'Continuous evaluation and enhancement of curriculum delivery, teaching quality, and institutional practices.',
    },
    {
      name: 'Anti-Ragging Committee & Flying Squad',
      purpose: 'Zero-tolerance statutory oversight ensuring campus safety, dignity, and a disciplined academic environment.',
    },
    {
      name: 'Internal Complaints Committee (ICC)',
      purpose: 'Statutory compliance ensuring gender sensitization, equality, and grievance redressal for all students and staff.',
    },
    {
      name: 'Students Grievance Redressal Cell',
      purpose: 'Transparent institutional mechanism for receiving and addressing academic and collegiate student feedback.',
    },
    {
      name: 'Discipline & Campus Welfare Committee',
      purpose: 'Fostering collegiate harmony, student welfare initiatives, and ethical codes of conduct across campus.',
    },
  ]

  return (
    <Section variant="canvas" padding="lg" className="min-h-[70vh]">
      <Container size="narrow">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: title },
          ]}
          className="mb-8"
        />

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-paper)] p-8 md:p-12 shadow-[var(--shadow-card)]">
          <div className="inline-flex items-center gap-2 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-6">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Statutory Compliance</span>
          </div>

          <H1 className="text-2xl sm:text-3xl md:text-4xl text-[var(--color-ink)] mb-4 font-serif">
            {title}
          </H1>

          <TextBody className="text-[var(--color-muted)] mb-8 text-sm sm:text-base leading-relaxed">
            In compliance with the regulations of {COLLEGE_INFO.affiliation} and statutory higher education norms, {COLLEGE_INFO.name} maintains functional institutional committees and cells ensuring academic transparency, safety, and welfare.
          </TextBody>

          {/* Statutory Cells Roster */}
          <div className="space-y-4 mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
              Statutory Committees &amp; Cells
            </h2>
            <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
              {statutoryBodies.map((body, idx) => (
                <div key={idx} className="py-3.5 flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-[var(--color-gold)] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--color-ink)]">
                      {body.name}
                    </h3>
                    <p className="text-xs text-[var(--color-muted)] mt-0.5 leading-relaxed">
                      {body.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Compliance Notice */}
          <div className="rounded-[var(--radius-md)] bg-[var(--color-ivory)] p-4 border border-[var(--color-border)] mb-8">
            <TextSmall className="text-[var(--color-ink-soft)] font-medium block">
              Official Records &amp; Nominations
            </TextSmall>
            <TextSmall className="text-[var(--color-muted)] text-xs mt-1 block leading-relaxed">
              Detailed member rosters, meeting proceedings, and compliance circulars are archived at the College Administrative Office in Vadamavandal. Enquiries may be directed to the administrative desk.
            </TextSmall>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
              >
                Return to Home
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="outline"
                size="md"
                leftIcon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
              >
                About ANRCAS
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="ghost"
                size="md"
                leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
              >
                Contact Administration
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
