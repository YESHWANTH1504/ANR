import React from 'react'
import { Info, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const AdmissionsInformation: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="information" className="border-b border-[var(--color-border)] bg-white">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Notice on Admission Criteria */}
          <div className="lg:col-span-6 space-y-5">
            <EditorialLabel className="text-[var(--color-primary)]">
              Important Notice
            </EditorialLabel>

            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              Admission Information &amp; Guidelines
            </H2>

            <TextLead className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Programme availability and admission details are updated directly by the institution in accordance with Thiruvalluvar University admissions circulars and Government of Tamil Nadu higher education directives.
            </TextLead>

            <div className="p-5 rounded-[var(--radius-xl)] border border-blue-200/80 bg-blue-50/50 space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2 text-[var(--color-secondary-dark)] font-bold">
                <Info className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Admissions Enrolment Notice</span>
              </div>
              <p className="leading-relaxed">
                Prospective candidates seeking admission to undergraduate (B.Sc, B.Com, BBA) or postgraduate (M.Com) degree courses are advised to contact the collegiate admission desk directly for current subject requirements, application submission schedules, and enrollment paperwork.
              </p>
            </div>
          </div>

          {/* Right Column: Verified Collegiate Contact Information */}
          <div className="lg:col-span-6 bg-[var(--color-surface-subtle)]/60 p-6 sm:p-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-primary)] tracking-tight">
                Admissions Helpdesk &amp; Office
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Official contact channels for admission enquiries and campus visits
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Primary Mobile */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white border border-slate-200/70">
                <div className="p-2 rounded-md bg-blue-50 text-[var(--color-secondary-dark)] shrink-0">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Mobile Enquiries
                  </span>
                  <a
                    href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                    className="font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary-dark)] transition-colors text-sm sm:text-base"
                  >
                    {COLLEGE_INFO.contact.primaryPhone}
                  </a>
                </div>
              </div>

              {/* Landline */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white border border-slate-200/70">
                <div className="p-2 rounded-md bg-blue-50 text-[var(--color-secondary-dark)] shrink-0">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    College Landline
                  </span>
                  <a
                    href={`tel:${COLLEGE_INFO.contact.landline}`}
                    className="font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary-dark)] transition-colors text-sm sm:text-base"
                  >
                    {COLLEGE_INFO.contact.landline}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white border border-slate-200/70">
                <div className="p-2 rounded-md bg-blue-50 text-[var(--color-secondary-dark)] shrink-0">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Admissions Email
                  </span>
                  <a
                    href={`mailto:${COLLEGE_INFO.contact.email}`}
                    className="font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary-dark)] transition-colors text-sm sm:text-base break-all"
                  >
                    {COLLEGE_INFO.contact.email}
                  </a>
                </div>
              </div>

              {/* Campus Address */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-white border border-slate-200/70">
                <div className="p-2 rounded-md bg-emerald-50 text-emerald-700 shrink-0">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Campus Address
                  </span>
                  <p className="font-semibold text-slate-700 mt-0.5 leading-snug">
                    {COLLEGE_INFO.address.street}, {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}, {COLLEGE_INFO.address.state}, {COLLEGE_INFO.address.country}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
