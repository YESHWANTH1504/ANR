import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextBody, EditorialLabel } from '@/components/ui/Typography'

export const ProgrammeDiscovery: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="guidance" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-4">
            <EditorialLabel className="text-[var(--color-primary)]">
              Academic Navigation
            </EditorialLabel>

            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              Choose Your Academic Path
            </H2>

            <TextBody className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Each undergraduate and postgraduate degree at ANRCAS is structured to build subject mastery, analytical discipline, and computer literacy. Learn more about the academic faculties delivering these curricula or review the university degree guidelines.
            </TextBody>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link to="/departments">
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Explore Departments
                </Button>
              </Link>

              <Link to="/academics">
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<BookOpen className="h-4 w-4 text-[var(--color-secondary-dark)]" />}
                >
                  Academic Overview
                </Button>
              </Link>
            </div>
          </div>

          {/* Guidelines Box */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-[var(--shadow-card)] space-y-4">
            <h3 className="text-base font-bold text-[var(--color-primary)] flex items-center gap-2">
              <Layers className="h-4 w-4 text-[var(--color-secondary-dark)]" />
              Programme Verification Notes
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>All degree awards conferred formally by Thiruvalluvar University, Vellore.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Undergraduate programmes follow 3-year (6 semesters) full-time study framework.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>Postgraduate programmes follow 2-year (4 semesters) advanced study framework.</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}
