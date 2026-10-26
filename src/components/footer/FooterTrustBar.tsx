import React from 'react'
import { Award, Building2, MapPin } from 'lucide-react'
import { COLLEGE_INFO } from '@/data/college'

export const FooterTrustBar: React.FC = () => {
  return (
    <div className="py-8 my-10 border-y border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-sm">
        {/* Trust Item 1: Affiliation */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Award className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)] block">
              University Affiliation
            </span>
            <p className="font-serif text-base font-bold text-white">
              Thiruvalluvar University, Vellore
            </p>
            <p className="text-xs text-stone-300 font-normal">
              UGC / CBCS Semester Degree Framework
            </p>
          </div>
        </div>

        {/* Trust Item 2: Patronage */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <Building2 className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)] block">
              Sponsoring Patronage
            </span>
            <p className="font-serif text-base font-bold text-white">
              A Unit of Meenakshi Group
            </p>
            <p className="text-xs text-stone-300 font-normal">
              Meenakshi Ammal Trust Educational Heritage
            </p>
          </div>
        </div>

        {/* Trust Item 3: Campus Grounds */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-[var(--color-gold)]" aria-hidden="true" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)] block">
              Collegiate Grounds
            </span>
            <p className="font-serif text-base font-bold text-white">
              {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}
            </p>
            <p className="text-xs text-stone-300 font-normal">
              Vadamavandal Road, Cheyyar Taluk, Tamil Nadu
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
