import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const DepartmentsCTA: React.FC = () => {
  return (
    <Section
      variant="navy"
      padding="lg"
      id="departments-cta"
      className="relative overflow-hidden bg-[var(--color-primary-dark)] text-white"
    >
      {/* Decorative Collegiate Light Arc */}
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[var(--color-secondary)]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10 text-center">
        <EditorialLabel className="text-[var(--color-accent)] bg-white/10 px-3.5 py-1 rounded-full border border-white/15 inline-flex mb-4">
          Academic Discovery
        </EditorialLabel>

        <H2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Explore Our Programmes
        </H2>

        <TextLead className="mt-4 text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Learn how each department translates curriculum into degree qualifications, laboratory practice, and continuous collegiate mentorship.
        </TextLead>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link to="/programmes">
            <Button
              variant="accent"
              size="lg"
              leftIcon={<BookOpen className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Our Programmes
            </Button>
          </Link>

          <Link to="/academics">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<GraduationCap className="h-4 w-4" />}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white"
            >
              Academic Overview
            </Button>
          </Link>
        </div>

        {/* Institutional Contact Strip */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
            <span>Campus: Vadamavandal, Thiruvannamalai District</span>
          </span>

          <span className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 text-[var(--color-secondary)]" />
            <a
              href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors"
            >
              Enquiries: {COLLEGE_INFO.contact.primaryPhone}
            </a>
          </span>
        </div>
      </Container>
    </Section>
  )
}
