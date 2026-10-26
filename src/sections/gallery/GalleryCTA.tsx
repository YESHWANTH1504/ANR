import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bell, Compass, Mail } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const GalleryCTA: React.FC = () => {
  return (
    <Section
      variant="canvas"
      padding="lg"
      id="gallery-final-cta"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="narrow" className="text-center space-y-6">
        <EditorialLabel className="text-[var(--color-primary)] bg-slate-100 px-3 py-1 rounded-full border border-slate-200 inline-block">
          Discover ANRCAS
        </EditorialLabel>

        <H2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Experience Student Life in Person
        </H2>

        <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          From academic lectures and computing laboratories to athletics and community outreach, learn more about student experiences at {COLLEGE_INFO.name}.
        </TextLead>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link to="/campus-life">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Compass className="h-5 w-5" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Campus Life
            </Button>
          </Link>

          <Link to="/news">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Bell className="h-4 w-4 text-[var(--color-secondary-dark)]" />}
            >
              View News &amp; Events
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<Mail className="h-4 w-4 text-slate-500" />}
            >
              Contact ANRCAS
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
