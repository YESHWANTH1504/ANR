import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import type { Programme } from '@/data/programmes'
import { COLLEGE_INFO } from '@/data/college'

export interface ProgrammeDetailCTAProps {
  programme: Programme
}

export const ProgrammeDetailCTA: React.FC<ProgrammeDetailCTAProps> = ({ programme }) => {
  return (
    <Section
      variant="canvas"
      padding="lg"
      id="programme-cta"
      className="border-t border-[var(--color-border)] bg-white"
    >
      <Container size="narrow" className="text-center space-y-6">
        <EditorialLabel className="text-[var(--color-primary)] bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block">
          Admissions &amp; Enrolment
        </EditorialLabel>

        <H2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Interested in {programme.name}?
        </H2>

        <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Discover admission procedures, document submission guidelines, and enrollment steps for {programme.name} at {COLLEGE_INFO.shortName}.
        </TextLead>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link to="/admissions">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<GraduationCap className="h-5 w-5" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Admissions
            </Button>
          </Link>

          <Link to="/programmes">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<BookOpen className="h-4 w-4 text-[var(--color-secondary-dark)]" />}
            >
              Explore All Programmes
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
