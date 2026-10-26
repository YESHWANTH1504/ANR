import React from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { CONTACT_DATA } from '@/data/contact'

export const VisitCampus: React.FC = () => {
  return (
    <section
      id="plan-visit"
      className="py-16 md:py-24 bg-[var(--color-sand)]/50 border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
            <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
            <span>Campus Visit</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] tracking-tight leading-tight">
            Plan Your Visit
          </h2>

          <p className="text-base text-[var(--color-muted)] leading-relaxed">
            Connect with the institution before visiting the campus. Prospective students, parents, and academic visitors are welcome to reach out to the college desk for visiting guidance.
          </p>
        </div>

        {/* 3 Verified Institutional Visit Touchpoints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Touchpoint 1: Location Coordination */}
          <div className="p-8 rounded-sm border border-[var(--color-border)] bg-white shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
                <MapPin className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  On-Campus Address
                </span>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  Vadamavandal
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {CONTACT_DATA.address.street}, {CONTACT_DATA.address.locality}, {CONTACT_DATA.address.district}, {CONTACT_DATA.address.state}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <a
                href={CONTACT_DATA.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                  className="border-[var(--color-border)] text-[var(--color-ink)]"
                >
                  Get Directions
                </Button>
              </a>
            </div>
          </div>

          {/* Touchpoint 2: Direct Telephonic Coordination */}
          <div className="p-8 rounded-sm border border-[var(--color-border)] bg-white shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
                <Phone className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Telephone Contact
                </span>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  College Office Desk
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  Call ahead to coordinate with admissions or administrative staff prior to your arrival on campus.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <a href={`tel:${CONTACT_DATA.contact.primaryPhoneClean}`}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                  className="border-[var(--color-border)] text-[var(--color-ink)]"
                >
                  Call {CONTACT_DATA.contact.primaryPhone}
                </Button>
              </a>
            </div>
          </div>

          {/* Touchpoint 3: Official Written Scheduling */}
          <div className="p-8 rounded-sm border border-[var(--color-border)] bg-white shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-full bg-[var(--color-ivory)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-ink)]">
                <Mail className="h-5 w-5 text-[var(--color-gold)]" aria-hidden="true" />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                  Written Correspondence
                </span>
                <h3 className="font-serif text-xl font-medium text-[var(--color-ink)]">
                  Email the Desk
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  For formal visits, institutional correspondence, or admissions documentation, email the administrative desk.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)]">
              <a href={`mailto:${CONTACT_DATA.contact.email}`}>
                <Button
                  variant="outline"
                  size="sm"
                  rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}
                  className="border-[var(--color-border)] text-[var(--color-ink)]"
                >
                  Email {CONTACT_DATA.contact.email}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

