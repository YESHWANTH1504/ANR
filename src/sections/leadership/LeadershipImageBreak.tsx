import React from 'react'
import campusImg from '@/assets/campus_main.webp'
import { Container } from '@/components/shared/Container'
import { COLLEGE_INFO } from '@/data/college'

export const LeadershipImageBreak: React.FC = () => {
  return (
    <section className="relative w-full h-80 sm:h-96 lg:h-[440px] overflow-hidden bg-[var(--color-ink)] border-b border-[var(--color-border)] group">
      {/* Authentic Campus Grounds Photography */}
      <img
        src={campusImg}
        alt={`${COLLEGE_INFO.name} Campus Grounds`}
        loading="lazy"
        className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05] group-hover:scale-102 transition-transform duration-700 ease-out"
      />

      {/* Layered Architectural Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/40 to-transparent"
        aria-hidden="true"
      />

      {/* Centered Institutional Monospace Plate */}
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
        <Container size="narrow" className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium tracking-wide text-[var(--color-gold-light)]">
            <span>Vadamavandal, Tamil Nadu</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            {COLLEGE_INFO.name}
          </h2>

          <p className="text-sm sm:text-base text-slate-200">
            {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}, {COLLEGE_INFO.address.state} • {COLLEGE_INFO.affiliation}
          </p>
        </Container>
      </div>
    </section>
  )
}
