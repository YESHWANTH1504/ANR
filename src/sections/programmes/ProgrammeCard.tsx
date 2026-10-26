import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, GraduationCap } from 'lucide-react'
import type { Programme } from '@/data/programmes'
import progBba from '@/assets/prog_bba.webp'
import progBcom from '@/assets/prog_bcom.webp'
import progMaths from '@/assets/prog_maths.webp'
import progTamil from '@/assets/prog_tamil.webp'
import progEnglish from '@/assets/prog_english.webp'
import progCs from '@/assets/lab_students.webp'

const PROGRAMME_IMAGES: Record<string, string> = {
  'computer-science': progCs,
  bca: progCs,
  bcom: progBcom,
  'corporate-secretaryship': progBcom,
  bba: progBba,
  mathematics: progMaths,
  mcom: progBcom,
  tamil: progTamil,
  english: progEnglish,
}

export interface ProgrammeCardProps {
  programme: Programme
  index?: number
}

export const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ programme, index = 0 }) => {
  const isPg = programme.level === 'PG'
  const num = String(index + 1).padStart(2, '0')
  const image = PROGRAMME_IMAGES[programme.slug]

  return (
    <article
      aria-labelledby={`programme-title-${programme.id}`}
      className="group relative flex flex-col justify-between bg-[var(--color-paper)] border border-[var(--color-border)] hover:border-[var(--color-ink)] hover:bg-[var(--color-ivory)] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden"
    >
      <div>
        {/* Optional Authentic Image Thumbnail */}
        {image && (
          <div className="relative h-36 w-full overflow-hidden bg-stone-900 border-b border-[var(--color-border)]">
            <img
              src={image}
              alt={programme.name}
              loading="lazy"
              className="h-full w-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-transparent to-transparent opacity-60" />
            <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)]/90 text-[var(--color-gold-light)] border border-white/10 backdrop-blur-xs">
              {isPg ? 'PG Degree' : 'UG Degree'}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-7">
          {/* Top: Serial Number & Degree */}
          <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-4 mb-4">
            <span className="editorial-number text-4xl text-[var(--color-gold)]">
              {num}
            </span>

            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--color-sand)]/60 text-[var(--color-ink)] border border-[var(--color-border)]">
              {programme.degree}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] mb-2 font-medium">
            <Clock className="h-4 w-4 text-[var(--color-gold)]" />
            <span>{programme.durationYears} {programme.durationYears === 1 ? 'Year' : 'Years'} Full-Time</span>
          </div>

          {/* Degree Name */}
          <h3
            id={`programme-title-${programme.id}`}
            className="font-serif text-xl sm:text-2xl font-normal text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors leading-snug tracking-tight"
          >
            {programme.degree} {programme.name}
          </h3>

          {/* Department Association */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-charcoal)] mt-2 mb-3">
            <GraduationCap className="h-3.5 w-3.5 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
            <span>{programme.departmentName}</span>
          </div>

          {/* Verified Description */}
          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3 font-light">
            {programme.description}
          </p>
        </div>
      </div>

      {/* Accessible Action Footer */}
      <div className="p-6 sm:p-7 pt-0">
        <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--color-charcoal)]">
            {programme.degree} Syllabus
          </span>

          <Link
            to={`/programmes/${programme.slug}`}
            aria-label={`View programme details for ${programme.name}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors"
          >
            <span>Explore Programme</span>
            <ArrowRight className="h-3.5 w-3.5 arrow-nudge" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}
