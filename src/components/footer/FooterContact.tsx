import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Mail, MapPin, Phone, PhoneCall } from 'lucide-react'
import { COLLEGE_INFO } from '@/data/college'

export const FooterContact: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
        <span className="h-1 w-2 bg-[var(--color-gold)]" aria-hidden="true" />
        <span>Campus &amp; Admissions Desk</span>
      </h4>

      <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light">
        <div className="flex items-start gap-2.5">
          <MapPin className="h-4 w-4 text-[var(--color-gold)] shrink-0 mt-0.5" aria-hidden="true" />
          <span className="leading-relaxed">
            {COLLEGE_INFO.address.street}, {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}, {COLLEGE_INFO.address.state}, {COLLEGE_INFO.address.country}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Phone className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
          <a
            href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="hover:text-[var(--color-gold-light)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] rounded-xs"
          >
            {COLLEGE_INFO.contact.primaryPhone} (Helpline)
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <PhoneCall className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
          <a
            href={`tel:${COLLEGE_INFO.contact.landline.replace(/\s+/g, '')}`}
            className="hover:text-[var(--color-gold-light)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] rounded-xs"
          >
            {COLLEGE_INFO.contact.landline} (Office)
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
          <a
            href={`mailto:${COLLEGE_INFO.contact.email}`}
            className="hover:text-[var(--color-gold-light)] transition-colors break-all focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] rounded-xs"
          >
            {COLLEGE_INFO.contact.email}
          </a>
        </div>
      </div>

      <div className="pt-2">
        <Link
          to="/admissions"
          className="group inline-flex items-center gap-2 w-full justify-center px-4 py-3 rounded-[var(--radius-sm)] bg-white hover:bg-[var(--color-sand)] text-[var(--color-ink)] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]"
        >
          <GraduationCap className="h-4 w-4 text-[var(--color-ink)]" aria-hidden="true" />
          <span>Explore Admissions</span>
          <ArrowRight className="h-3.5 w-3.5 text-[var(--color-ink)] arrow-nudge" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
