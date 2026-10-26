import React from 'react'
import { Award, BookOpen, Building2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { COLLEGE_INFO } from '@/data/college'
import { FOUNDER_DATA } from '@/data/leadership'

export const InstitutionalGovernance: React.FC = () => {
  return (
    <section
      id="governance"
      className="py-16 md:py-24 bg-[var(--color-sand)]/50 border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
            <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
            <span>Governance &amp; Structure</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] tracking-tight leading-tight">
            Institutional Governance &amp; Academic Framework
          </h2>

          <p className="text-base text-[var(--color-muted)] leading-relaxed">
            {COLLEGE_INFO.name} operates under the statutory academic governance of {COLLEGE_INFO.affiliation} and the educational stewardship of the Meenakshi Group.
          </p>
        </div>

        {/* 3 Verified Institutional Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: University Affiliation */}
          <div className="p-8 rounded-sm border border-[var(--color-border)] bg-white shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
                <Award className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Statutory Body
                </span>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  Thiruvalluvar University
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Academic syllabi, curriculum regulations, degree examinations, and graduation credentials are governed under Thiruvalluvar University, Vellore.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] text-xs font-medium text-[var(--color-charcoal)]">
              UGC / CBCS Semester Framework
            </div>
          </div>

          {/* Pillar 2: Sponsoring Trust */}
          <div className="p-8 rounded-sm border border-[var(--color-border)] bg-white shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
                <Building2 className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Sponsoring Group
                </span>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  {FOUNDER_DATA.trustAffiliation}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Guided by the philanthropic legacy of the Meenakshi Ammal Trust, supporting campus infrastructure, student scholarships, and rural outreach.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] text-xs font-medium text-[var(--color-charcoal)]">
              Established Institutional Patronage
            </div>
          </div>

          {/* Pillar 3: Academic Organization */}
          <div className="p-8 rounded-sm border border-[var(--color-border)] bg-white shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
                <BookOpen className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Departmental Structure
                </span>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  Collegiate Faculties
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Structured academic faculties across Computer Science, Mathematics, Commerce, Corporate Secretaryship, and Business Administration.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] text-xs font-medium text-[var(--color-charcoal)]">
              5 Dedicated Academic Departments
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
