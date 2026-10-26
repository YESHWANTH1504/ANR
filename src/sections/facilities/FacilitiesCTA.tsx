import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Users } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const FacilitiesCTA: React.FC = () => {
  return (
    <Section
      variant="canvas"
      padding="lg"
      id="facilities-cta"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="narrow" className="text-center space-y-6">
        <EditorialLabel className="text-[var(--color-primary)] bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block">
          Join Our Campus
        </EditorialLabel>

        <H2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Experience Our Campus Facilities
        </H2>

        <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Discover how our learning laboratories, library resources, and dedicated transport network support student success at {COLLEGE_INFO.shortName}.
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

          <Link to="/campus-life">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Users className="h-4 w-4 text-[var(--color-secondary-dark)]" />}
            >
              Campus Life
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
