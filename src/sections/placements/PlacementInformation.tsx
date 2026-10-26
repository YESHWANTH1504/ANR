import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, AlertCircle, Building2, HelpCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const PlacementInformation: React.FC = () => {
  return (
    <Section
      variant="canvas"
      padding="lg"
      id="placement-transparency"
      className="border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Information Transparency
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Institutional Placement Information &amp; Enquiries
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            ANRCAS maintains a policy of accurate, verified institutional communication. Detailed recruitment metrics and campus placement inquiries are handled directly through official administrative channels.
          </TextLead>
        </div>

        {/* Prominent Institutional Transparency Notice */}
        <div className="p-6 sm:p-8 rounded-xl border border-slate-300 bg-white shadow-xs space-y-4 mb-10">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <AlertCircle className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[var(--color-primary)]">
                Status of Published Placement Metrics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Detailed placement statistics, historical recruitment ratios, and company-specific salary data are not currently published in the website data repository. In keeping with institutional integrity, {COLLEGE_INFO.name} does not display estimated, extrapolated, or unverified placement figures.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Students, recruiters, and prospective applicants seeking current information regarding campus recruitment drives, industry outreach, or career advisement are encouraged to contact the college office directly.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Guidance Columns: Students, Recruiters, Administrative Office */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* For Prospective Recruiters */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[var(--color-primary)]">
                <Building2 className="h-5 w-5 text-[var(--color-secondary-dark)]" aria-hidden="true" />
                <h4 className="font-bold text-base">For Prospective Recruiters</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Organisations interested in conducting on-campus recruitment, sharing vacancy announcements, or exploring student talent across Computer Science, Commerce, and Management streams can send formal recruitment communication to the college administration.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Formal correspondence via official college email or administrative telephone.
            </div>
          </div>

          {/* For Current Students */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[var(--color-primary)]">
                <HelpCircle className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                <h4 className="font-bold text-base">For Current Students</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Graduating students are advised to maintain active contact with their respective Heads of Department and faculty advisors. Campus circulars, regional recruitment notices, and higher education notifications are posted on official institutional notice boards.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Consult departmental notice boards and faculty mentors regularly.
            </div>
          </div>

          {/* Official Contact Directory */}
          <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-[var(--color-primary)]">
                <Phone className="h-5 w-5 text-[var(--color-accent-dark)]" aria-hidden="true" />
                <h4 className="font-bold text-base">Official Contact Pathways</h4>
              </div>
              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                    className="font-medium hover:text-[var(--color-primary)] transition-colors"
                  >
                    {COLLEGE_INFO.contact.primaryPhone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <span className="font-medium">{COLLEGE_INFO.contact.landline} (Landline)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${COLLEGE_INFO.contact.email}`}
                    className="font-medium hover:text-[var(--color-primary)] transition-colors"
                  >
                    {COLLEGE_INFO.contact.email}
                  </a>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-slate-600">
                    {COLLEGE_INFO.address.street}, {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary-dark)] transition-colors group"
              >
                <span>Visit Contact Page</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
