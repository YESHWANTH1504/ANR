import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const AboutCTA: React.FC = () => {
  return (
    <Section variant="navy" padding="lg" id="about-cta" className="relative overflow-hidden bg-[var(--color-primary-dark)] text-white">
      {/* Background Subtle Accent */}
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[var(--color-secondary)]/10 blur-3xl"
        aria-hidden="true"
      />

      <Container size="narrow" className="relative z-10 text-center">
        <EditorialLabel className="text-[var(--color-gold-light)] bg-white/10 px-3.5 py-1 rounded-full border border-white/15 inline-flex mb-4 uppercase text-xs font-semibold tracking-wider">
          Next Steps &amp; Engagement
        </EditorialLabel>

        <H2 className="collegiate-hero-title font-bold text-white tracking-tight">
          Explore the Academic Journey at ANRCAS
        </H2>

        <TextLead className="mt-4 text-slate-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover our verified degree programmes in Computer Science, Mathematics, Commerce, and Management, or connect with our admissions office in Vadamavandal for academic counseling.
        </TextLead>

        {/* 3 Clear CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Link to="/programmes">
            <Button
              variant="accent"
              size="lg"
              leftIcon={<BookOpen className="h-4 w-4" />}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Programmes
            </Button>
          </Link>

          <Link to="/admissions">
            <Button
              variant="outline"
              size="lg"
              leftIcon={<GraduationCap className="h-4 w-4" />}
              className="border-white/40 text-white hover:bg-white/10 hover:border-white"
            >
              View Admissions
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<Phone className="h-4 w-4" />}
              className="text-white hover:bg-white/10"
            >
              Contact the College
            </Button>
          </Link>
        </div>

        {/* Institutional Contact Strip */}
        <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 collegiate-metadata text-slate-300">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--color-gold)] shrink-0" />
            <span>Vadamavandal, Cheyyar Taluk, Thiruvannamalai District</span>
          </span>

          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[var(--color-gold)] shrink-0" />
            <a
              href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="hover:text-white transition-colors"
            >
              Office: {COLLEGE_INFO.contact.primaryPhone}
            </a>
          </span>

          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-[var(--color-gold)] shrink-0" />
            <a
              href={`mailto:${COLLEGE_INFO.contact.email}`}
              className="hover:text-white transition-colors"
            >
              {COLLEGE_INFO.contact.email}
            </a>
          </span>
        </div>
      </Container>
    </Section>
  )
}
