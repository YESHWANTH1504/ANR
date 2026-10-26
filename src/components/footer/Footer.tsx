import React from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { COLLEGE_INFO } from '@/data/college'
import { BackToTop } from './BackToTop'
import logoImg from '@/assets/logo.png'
import meenakshiLogo from '@/assets/meenakshi_group.png'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  return (
    <footer
      id="global-footer"
      role="contentinfo"
      aria-label="Collegiate footer"
      className="bg-[#051630] text-stone-300 border-t border-white/10 relative overflow-hidden"
    >
      {/* Subtle institutional grid texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
        aria-hidden="true"
      />

      {/* Main Footer Directory Area */}
      <div className="relative z-10 py-14 sm:py-16 lg:py-20">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Col 1: Institutional Identity (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <Link
                to="/"
                className="inline-flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4B316] rounded-xs"
                aria-label={`${COLLEGE_INFO.name} Home`}
              >
                <img
                  src={logoImg}
                  alt=""
                  aria-hidden="true"
                  className="h-12 w-12 sm:h-14 sm:w-14 object-contain shrink-0 drop-shadow-sm transition-transform group-hover:scale-105"
                />
                <div>
                  <span className="font-serif text-lg sm:text-xl font-bold text-white block leading-tight group-hover:text-[#E4B316] transition-colors">
                    {COLLEGE_INFO.name}
                  </span>
                  <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E4B316] block mt-1">
                    {COLLEGE_INFO.affiliation}
                  </span>
                </div>
              </Link>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal max-w-sm">
                Empowering rural and semi-urban learners through university-affiliated undergraduate and postgraduate programmes, modern laboratory facilities, and dedicated faculty guidance in Vadamavandal.
              </p>

              {/* Sponsoring Patronage Verification */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <span className="text-xs text-stone-400">A unit of:</span>
                <img
                  src={meenakshiLogo}
                  alt="Meenakshi Ammal Trust"
                  className="h-6 w-auto object-contain opacity-85"
                />
              </div>
            </div>

            {/* Col 2: Academics & Study Pathways (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white border-b border-[#E4B316]/40 pb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
                <span>Academics</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">About ANRCAS</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/academics"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Academic Experience</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/departments"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Departments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programmes"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Degree Programmes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leadership"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">College Leadership</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Campus & Student Life (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white border-b border-[#E4B316]/40 pb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
                <span>Campus Life</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-400">
                <li>
                  <Link
                    to="/admissions"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Admissions Guidance</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/facilities"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Campus Facilities</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/campus-life"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Student Activities</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/placements"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Placement Cell</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">Campus Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs inline-flex items-center gap-1.5 group min-h-[32px] sm:min-h-0 py-1 sm:py-0"
                  >
                    <span className="group-hover:text-[#E4B316] transition-colors">News &amp; Events</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact & Administration (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white border-b border-[#E4B316]/40 pb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
                <span>Contact &amp; Administration</span>
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm text-stone-300 font-normal">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-[#E4B316] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="leading-relaxed text-stone-400">
                    {COLLEGE_INFO.address.street}, {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}, {COLLEGE_INFO.address.state} – 604410
                  </span>
                </div>

                {/* Mobile / Helpline */}
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-stone-400 text-xs block">Helpline &amp; Enquiries:</span>
                    <a
                      href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                      className="font-semibold text-white hover:text-[#E4B316] transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs"
                      aria-label={`Call college helpline at ${COLLEGE_INFO.contact.primaryPhone}`}
                    >
                      {COLLEGE_INFO.contact.primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Landline */}
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-stone-400 text-xs block">College Landline:</span>
                    <a
                      href={`tel:${COLLEGE_INFO.contact.landline.replace(/[^0-9]/g, '')}`}
                      className="font-semibold text-white hover:text-[#E4B316] transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs"
                      aria-label={`Call college office landline at ${COLLEGE_INFO.contact.landline}`}
                    >
                      {COLLEGE_INFO.contact.landline}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-stone-400 text-xs block">Official Email:</span>
                    <a
                      href={`mailto:${COLLEGE_INFO.contact.email}`}
                      className="font-semibold text-white hover:text-[#E4B316] transition-colors break-all focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs"
                      aria-label={`Send email to ${COLLEGE_INFO.contact.email}`}
                    >
                      {COLLEGE_INFO.contact.email}
                    </a>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-center gap-2.5 pt-1 text-xs text-stone-400">
                  <Clock className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <span>Office: Monday – Saturday, 9:00 AM – 5:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Restrained Copyright & Closing Strip */}
      <div className="border-t border-white/10 py-5 bg-[#030e20] text-xs text-stone-400 relative z-10">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <p>
                &copy; {CURRENT_YEAR} {COLLEGE_INFO.name}. All rights reserved.
              </p>
              <p className="text-[11.5px] text-stone-500">
                {COLLEGE_INFO.affiliation} • Non-Autonomous Private College
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
              <nav aria-label="Institutional quick links" className="flex items-center gap-3 text-xs">
                <Link
                  to="/about"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs py-1"
                >
                  About
                </Link>
                <span className="text-white/20 select-none" aria-hidden="true">•</span>
                <Link
                  to="/programmes"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs py-1"
                >
                  Programmes
                </Link>
                <span className="text-white/20 select-none" aria-hidden="true">•</span>
                <Link
                  to="/admissions"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs py-1"
                >
                  Admissions
                </Link>
                <span className="text-white/20 select-none" aria-hidden="true">•</span>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded-xs py-1"
                >
                  Contact
                </Link>
              </nav>

              <div className="border-t sm:border-t-0 sm:border-l border-white/15 pt-2 sm:pt-0 sm:pl-4">
                <BackToTop />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
