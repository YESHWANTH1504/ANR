import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Mail, Compass } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { H1, TextBody, TextSmall } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = '404 — Page Not Found | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <Section variant="canvas" padding="lg" className="min-h-[70vh] flex items-center">
      <Container size="narrow">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: '404 Not Found' },
          ]}
          className="mb-8"
        />

        <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-8 sm:p-12 md:p-16 shadow-[var(--shadow-card)] text-center relative overflow-hidden">
          {/* Institutional Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#E4B316]" />

          {/* Editorial 404 Stamp */}
          <div className="inline-flex items-center gap-2 border border-[#E4B316]/40 bg-[#E4B316]/10 px-3.5 py-1 text-xs sm:text-[13px] font-bold uppercase tracking-widest text-[#B45309] mb-6">
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span>Navigation Notice</span>
          </div>

          <div className="font-serif text-6xl sm:text-7xl md:text-8xl font-normal text-slate-900 tracking-tight mb-4 select-none">
            404
          </div>

          <H1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Page Not Found
          </H1>

          <TextBody className="text-slate-600 max-w-lg mx-auto mb-8 text-base sm:text-lg leading-relaxed">
            The page you are looking for does not exist, has been relocated, or is temporarily unavailable in the college directory.
          </TextBody>

          {/* Institutional Trust Note */}
          <div className="max-w-md mx-auto mb-8 p-4 rounded-[var(--radius-md)] bg-slate-50 border border-slate-200 text-left">
            <TextSmall className="text-slate-900 font-bold text-sm sm:text-base block">
              {COLLEGE_INFO.name}
            </TextSmall>
            <TextSmall className="text-slate-600 text-xs sm:text-sm mt-0.5 block">
              {COLLEGE_INFO.affiliation} • {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}
            </TextSmall>
          </div>

          {/* Action Pathways */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Link to="/">
              <Button
                variant="primary"
                size="md"
                leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
              >
                Return Home
              </Button>
            </Link>

            <Link to="/programmes">
              <Button
                variant="outline"
                size="md"
                leftIcon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
              >
                Explore Programmes
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="ghost"
                size="md"
                leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
              >
                Contact ANRCAS
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
