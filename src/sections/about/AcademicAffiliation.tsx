import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, BookOpen, CheckCircle2, FileText, Landmark } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextBody, EditorialLabel } from '@/components/ui/Typography'

export const AcademicAffiliation: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="affiliation" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative and Academic Context */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <EditorialLabel className="text-[var(--color-primary)]">
                University Relationship
              </EditorialLabel>
              <H2 className="mt-2 collegiate-section-title font-bold text-slate-900 tracking-tight">
                Affiliated with Thiruvalluvar University, Vellore
              </H2>
            </div>

            <TextBody className="text-slate-700 leading-relaxed text-base sm:text-lg">
              A.N. Radhakrishnan College of Arts &amp; Science is formally affiliated with <strong>Thiruvalluvar University, Vellore</strong>, a state university established by the Government of Tamil Nadu.
            </TextBody>

            <TextBody className="text-slate-700 leading-relaxed text-base sm:text-lg">
              Under this formal affiliation, all undergraduate (B.Sc, B.Com, BBA) and postgraduate (M.Com) degree programmes follow the standardized university curricula, Choice Based Credit System (CBCS) frameworks, and centralized examination regulations. Degrees conferred carry full academic recognition for employment and postgraduate research.
            </TextBody>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-[var(--color-primary)] block">Standardized Syllabus</strong>
                  <span>Semester examinations and grading under university control.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-slate-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-[var(--color-primary)] block">Recognized Qualifications</strong>
                  <span>Qualifying graduates for competitive exams and corporate recruitment.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/academics">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore Academics &amp; Departments
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Typographic Affiliation Credential Panel */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-[var(--color-surface-subtle)] rounded-[var(--radius-xl)] border border-[var(--color-border)] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="p-2.5 rounded-full bg-[var(--color-primary)] text-white">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Affiliating Body
                  </span>
                  <h3 className="text-base font-bold text-[var(--color-primary)] leading-tight">
                    Thiruvalluvar University
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">Serkkadu, Vellore, Tamil Nadu</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Award className="h-3.5 w-3.5 text-[var(--color-accent-dark)] shrink-0 mt-0.5" />
                  <span>State University established under Tamil Nadu Act 32 of 2002</span>
                </div>
                <div className="flex items-start gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-[var(--color-secondary)] shrink-0 mt-0.5" />
                  <span>Curriculum model: CBCS semester framework</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="h-3.5 w-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>Academic validation: Recognized degree transcripts and diplomas</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 text-xs text-slate-500">
                <span>College Code &amp; Registration: Maintained as per university records at ANRCAS office.</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
