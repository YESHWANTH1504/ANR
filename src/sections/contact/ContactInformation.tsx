import React from 'react'
import { ArrowUpRight, GraduationCap, Mail, MapPin, Phone, PhoneCall } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { CONTACT_DATA } from '@/data/contact'

export const ContactInformation: React.FC = () => {
  return (
    <section
      id="contact-information"
      className="py-16 md:py-24 bg-[var(--color-ivory)] border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Header Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
              <span>Contact ANRCAS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] leading-tight">
              Official Contact Directory
            </h2>

            <p className="text-base text-[var(--color-muted)] leading-relaxed">
              Reach the administrative desk, admissions guidance team, or collegiate office directly through official institutional channels.
            </p>

            {/* Institution Badge */}
            <div className="p-6 bg-white border border-[var(--color-border)] rounded-sm space-y-3">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)]">
                  Affiliated Institution
                </span>
              </div>
              <p className="text-sm font-serif font-medium text-[var(--color-ink)]">
                {CONTACT_DATA.institution}
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                {CONTACT_DATA.affiliation}
              </p>
            </div>
          </div>

          {/* Right Editorial Contact Rows with Architectural Dividers */}
          <div className="lg:col-span-7 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {/* Postal Address */}
            <div className="py-6 sm:py-7 group transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">
                    <MapPin className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
                    <span>Campus Location</span>
                  </div>
                  <p className="text-lg sm:text-xl font-medium text-[var(--color-ink)]">
                    {CONTACT_DATA.address.street}, {CONTACT_DATA.address.locality}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {CONTACT_DATA.address.district}, {CONTACT_DATA.address.state}, {CONTACT_DATA.address.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Phone Line */}
            <div className="py-6 sm:py-7 group transition-colors">
              <a
                href={`tel:${CONTACT_DATA.contact.primaryPhoneClean}`}
                className="flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] p-2 -m-2 rounded"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">
                    <Phone className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
                    <span>Mobile / Primary Phone</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors">
                    {CONTACT_DATA.contact.primaryPhone}
                  </p>
                  <span className="text-xs text-[var(--color-muted)]">
                    Administrative desk &amp; student admissions helpline
                  </span>
                </div>
                <div className="h-10 w-10 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-all">
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
              </a>
            </div>

            {/* Collegiate Landline */}
            <div className="py-6 sm:py-7 group transition-colors">
              <a
                href={`tel:${CONTACT_DATA.contact.landlineClean}`}
                className="flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] p-2 -m-2 rounded"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">
                    <PhoneCall className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
                    <span>College Landline</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors">
                    {CONTACT_DATA.contact.landline}
                  </p>
                  <span className="text-xs text-[var(--color-muted)]">
                    Official collegiate office &amp; statutory inquiries
                  </span>
                </div>
                <div className="h-10 w-10 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-all">
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
              </a>
            </div>

            {/* Official Email */}
            <div className="py-6 sm:py-7 group transition-colors">
              <a
                href={`mailto:${CONTACT_DATA.contact.email}`}
                className="flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] p-2 -m-2 rounded"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">
                    <Mail className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
                    <span>Official Email</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors break-all">
                    {CONTACT_DATA.contact.email}
                  </p>
                  <span className="text-xs text-[var(--color-muted)]">
                    Institutional documentation &amp; formal correspondence
                  </span>
                </div>
                <div className="h-10 w-10 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-gold)] group-hover:bg-[var(--color-gold)]/10 flex items-center justify-center text-[var(--color-muted)] group-hover:text-[var(--color-ink)] transition-all">
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

