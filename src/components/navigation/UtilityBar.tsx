import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { UTILITY_BAR_LINKS } from '@/data/navigation'
import { COLLEGE_INFO } from '@/data/college'

interface UtilityBarProps {
  isCompact?: boolean
}

export const UtilityBar: React.FC<UtilityBarProps> = () => {
  const phoneTel = COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')

  return (
    <div
      className="w-full bg-[#082046] text-slate-200 text-xs sm:text-[13px] border-b border-[#0C4DA2]/30 hidden md:block select-none relative z-50 transition-colors"
      aria-label="Institutional Quick Information & Contact"
    >
      <Container size="wide">
        <div className="flex items-center justify-between gap-4 py-2">
          {/* Left: Verified Contact Information & University Affiliation */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#E4B316] transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] focus-visible:outline-offset-2 rounded-xs"
              aria-label={`Call ANRCAS Office at ${COLLEGE_INFO.contact.primaryPhone}`}
            >
              <Phone className="h-3.5 w-3.5 text-[#E4B316]" aria-hidden="true" />
              <span>{COLLEGE_INFO.contact.primaryPhone}</span>
            </a>

            <span className="text-white/20 select-none" aria-hidden="true">|</span>

            <a
              href={`mailto:${COLLEGE_INFO.contact.email}`}
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-[#E4B316] transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] focus-visible:outline-offset-2 rounded-xs"
              aria-label={`Email ANRCAS Office at ${COLLEGE_INFO.contact.email}`}
            >
              <Mail className="h-3.5 w-3.5 text-[#E4B316]" aria-hidden="true" />
              <span>{COLLEGE_INFO.contact.email}</span>
            </a>

            <span className="text-white/20 select-none hidden lg:inline" aria-hidden="true">|</span>

            <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300/90 text-[12px]">
              <Sparkles className="h-3 w-3 text-[#E4B316]" aria-hidden="true" />
              <span>{COLLEGE_INFO.affiliation}</span>
            </span>
          </div>

          {/* Right: Restrained Institutional Shortcuts */}
          <nav aria-label="Quick institutional shortcuts" className="flex items-center gap-4 text-xs font-medium">
            {UTILITY_BAR_LINKS.map((link, idx) => {
              const isAdmissions = link.href === '/admissions'
              return (
                <React.Fragment key={idx}>
                  <Link
                    to={link.href}
                    className={`transition-colors focus-visible:outline-2 focus-visible:outline-[#E4B316] focus-visible:outline-offset-2 rounded-xs ${
                      isAdmissions
                        ? 'text-[#E4B316] hover:text-white font-semibold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                  {idx < UTILITY_BAR_LINKS.length - 1 && (
                    <span className="text-white/20 select-none" aria-hidden="true">|</span>
                  )}
                </React.Fragment>
              )
            })}
          </nav>
        </div>
      </Container>
    </div>
  )
}

