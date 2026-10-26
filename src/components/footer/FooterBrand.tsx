import React from 'react'
import { Link } from 'react-router-dom'
import logoImg from '@/assets/logo.png'
import meenakshiLogo from '@/assets/meenakshi_group.png'
import { COLLEGE_INFO } from '@/data/college'

export const FooterBrand: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* Official Identity & Seal */}
      <Link
        to="/"
        className="inline-flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] rounded-sm"
        aria-label={`${COLLEGE_INFO.name} Home`}
      >
        <img
          src={logoImg}
          alt="ANRCAS Official Seal"
          className="h-12 w-12 sm:h-14 sm:w-14 object-contain shrink-0 drop-shadow-sm"
        />
        <div>
          <span className="font-serif text-lg sm:text-xl font-normal text-white block leading-tight group-hover:text-[var(--color-gold-light)] transition-colors">
            {COLLEGE_INFO.name}
          </span>
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] block mt-0.5">
            {COLLEGE_INFO.affiliation}
          </span>
        </div>
      </Link>

      {/* Factual Verified Institutional Narrative */}
      <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light max-w-sm">
        Dedicated to delivering accessible university education, high-tech computing laboratories, and holistic rural youth empowerment in Vadamavandal, Cheyyar, and across North Tamil Nadu.
      </p>

      {/* Meenakshi Group Sponsoring Patronage */}
      <div className="pt-2 flex items-center gap-3 border-t border-white/10">
        <span className="text-xs text-stone-400">A unit of:</span>
        <img
          src={meenakshiLogo}
          alt="Meenakshi Group"
          className="h-6 w-auto object-contain opacity-85"
        />
      </div>
    </div>
  )
}
