import React from 'react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { COLLEGE_INFO } from '@/data/college'

export const InstitutionalStory: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="story" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Editorial Typographic Statement */}
          <div className="lg:col-span-5 space-y-4">
            <div className="collegiate-eyebrow text-[#0C4DA2]">
              Institutional Heritage &amp; Purpose
            </div>

            <h2 className="collegiate-section-title font-bold text-slate-900 leading-[1.15]">
              About ANRCAS
            </h2>
            <div className="collegiate-gold-divider" />

            <blockquote className="border-l-3 border-[var(--color-accent)] pl-4 py-1.5 text-slate-800 font-serif italic text-lg sm:text-xl lg:text-2xl leading-snug">
              &ldquo;An academic home where rural and regional youth gain the knowledge, practical skills, and character necessary to participate fully in modern professional life.&rdquo;
            </blockquote>

            <p className="text-sm text-slate-600 font-medium">
              Vadamavandal, Thiruvannamalai District &bull; Affiliated to {COLLEGE_INFO.affiliation}
            </p>
          </div>

          {/* Right Column: Narrative Explaining the Institution */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 text-base sm:text-[17px] leading-relaxed">
            <p>
              A.N. Radhakrishnan College of Arts &amp; Science was founded with a direct social and educational objective: to eliminate the geographical and socio-economic hurdles that historically restricted rural youth in North Tamil Nadu from accessing quality university education.
            </p>

            <p>
              Situated along Vadamavandal Road in Cheyyar Taluk, the institution brings degree programmes directly to students across Thiruvannamalai District. Rather than compelling students to relocate to distant urban centres, ANRCAS provides formal collegiate instruction locally, supported by dedicated college transport networks that connect surrounding rural villages with the campus daily.
            </p>

            <p>
              As an affiliated college of <strong>Thiruvalluvar University, Vellore</strong>, ANRCAS strictly observes university regulations, semester academic calendars, and continuous evaluation frameworks across its undergraduate and postgraduate streams. The curriculum balances classroom lectures with hands-on computer laboratory practicals, library research, and student community drives through the National Service Scheme (NSS).
            </p>

            <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-4 text-xs sm:text-sm font-bold text-[#0C4DA2]">
              <span>Arts &amp; Science Curriculum</span>
              <span className="text-slate-300">&bull;</span>
              <span>Semester Degree Framework</span>
              <span className="text-slate-300">&bull;</span>
              <span>Affiliated University Standards</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
