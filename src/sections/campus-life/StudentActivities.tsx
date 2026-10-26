import React from 'react'
import { CheckCircle2, HeartHandshake, Mic, Trophy } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

export const StudentActivities: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="activities" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="max-w-2xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Community &amp; Physical Activities
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Student Engagement &amp; Extension Activities
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            Beyond structured degree lectures, students participate in community civic service, departmental symposiums, and physical education initiatives.
          </TextLead>
        </div>

        {/* 3-Column Structured Extension Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* NSS Community Welfare Card */}
          <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-xs space-y-4">
            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 w-fit border border-emerald-100">
              <HeartHandshake className="h-6 w-6" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                National Service Scheme (NSS)
              </h3>
              <span className="text-xs font-semibold text-emerald-700 block mb-3">
                Civic &amp; Community Extension
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Student volunteers participate in community outreach drives across Vadamavandal and neighboring villages, addressing public health awareness, tree planting, and rural sanitation.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Seven-day annual special village camp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Voluntary student enrolment</span>
              </div>
            </div>
          </div>

          {/* Physical Education & Athletics Card */}
          <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-xs space-y-4">
            <div className="p-2.5 rounded-lg bg-amber-50 text-[var(--color-accent-dark)] w-fit border border-amber-100">
              <Trophy className="h-6 w-6" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                Sports &amp; Physical Training
              </h3>
              <span className="text-xs font-semibold text-[var(--color-accent-dark)] block mb-3">
                Athletics &amp; Outdoor Play
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Coaching sessions and intra-mural matches conducted on dedicated campus grounds, fostering sportsmanship, physical stamina, and inter-departmental collaboration.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Annual athletics and field tournaments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Outdoor grounds for team games</span>
              </div>
            </div>
          </div>

          {/* Academic Seminars & Assemblies Card */}
          <div className="p-6 sm:p-7 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-xs space-y-4">
            <div className="p-2.5 rounded-lg bg-blue-50 text-[var(--color-secondary-dark)] w-fit border border-blue-100">
              <Mic className="h-6 w-6" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-1">
                Seminars &amp; Academic Assemblies
              </h3>
              <span className="text-xs font-semibold text-[var(--color-secondary-dark)] block mb-3">
                Curricular Enrichment
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hosting academic guest presentations, orientation sessions for new entrants, and inter-departmental discussions in the multimedia seminar auditorium.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Audio-visual equipped seminar hall</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Departmental guest symposiums</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
