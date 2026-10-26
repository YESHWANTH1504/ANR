import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Building2, CalendarDays, Compass, Mail, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

interface InformationChannel {
  title: string
  description: string
  icon: React.ReactNode
  linkText: string
  linkHref: string
}

const CHANNELS: InformationChannel[] = [
  {
    title: 'Departmental Academic Notice Boards',
    description: 'Affiliated curriculum updates, semester examination timetables, and official circulars from Thiruvalluvar University are posted on departmental boards.',
    icon: <BookOpen className="h-5 w-5 text-sky-600" aria-hidden="true" />,
    linkText: 'Explore Academics',
    linkHref: '/academics',
  },
  {
    title: 'Student Life & NSS Volunteer Bulletins',
    description: 'Schedules for the annual 7-day NSS community camp, health awareness drives, inter-departmental symposiums, and cultural events.',
    icon: <Compass className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
    linkText: 'View Campus Activities',
    linkHref: '/campus-life',
  },
  {
    title: 'Admissions & Enrollment Announcements',
    description: 'Application intake schedules, eligibility criteria for arts and science streams, and enrollment procedures for UG and PG candidates.',
    icon: <CalendarDays className="h-5 w-5 text-amber-600" aria-hidden="true" />,
    linkText: 'Admissions Information',
    linkHref: '/admissions',
  },
  {
    title: 'Administrative Office & Official Enquiries',
    description: 'Official correspondence, document verification, and administrative enquiries handled directly through the campus office in Vadamavandal.',
    icon: <Building2 className="h-5 w-5 text-indigo-600" aria-hidden="true" />,
    linkText: 'Contact Office',
    linkHref: '/contact',
  },
]

export const InstitutionalUpdates: React.FC = () => {
  return (
    <Section
      variant="card"
      padding="lg"
      id="institutional-updates"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Context & Official Direct Pathways */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <EditorialLabel className="text-[var(--color-primary)]">
                Information Dissemination
              </EditorialLabel>

              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
                How Official Updates Are Published
              </H2>

              <TextLead className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At {COLLEGE_INFO.name}, official announcements are issued through verified departmental channels, physical campus notice boards, and the administrative registry.
              </TextLead>
            </div>

            {/* Direct Administrative Notice Box */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)]">
                Direct Administrative Contact
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For urgent verifications, official circular copies, or press correspondence, please reach the college administration directly:
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                    className="font-semibold hover:text-[var(--color-primary)]"
                  >
                    {COLLEGE_INFO.contact.primaryPhone}
                  </a>
                  <span className="text-slate-400">|</span>
                  <span>{COLLEGE_INFO.contact.landline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
                  <a
                    href={`mailto:${COLLEGE_INFO.contact.email}`}
                    className="font-semibold hover:text-[var(--color-primary)]"
                  >
                    {COLLEGE_INFO.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Information Channels */}
          <div className="lg:col-span-7 space-y-4">
            {CHANNELS.map((channel, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl border border-slate-200/90 bg-white hover:border-[var(--color-secondary)] hover:shadow-xs transition-all duration-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 shrink-0">
                    {channel.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-[var(--color-primary)]">
                      {channel.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {channel.description}
                    </p>
                  </div>
                </div>

                <div className="sm:shrink-0 pt-2 sm:pt-0 self-end sm:self-center">
                  <Link
                    to={channel.linkHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap group"
                  >
                    <span>{channel.linkText}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
