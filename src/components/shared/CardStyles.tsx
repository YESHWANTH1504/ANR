import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ==========================================================================
   STYLE A — EDITORIAL CARD
   Large image, small category label, large title, animated arrow.
   Hover: image zoom (1.04), subtle overlay tint, title shift, arrow translate.
   ========================================================================== */
export interface EditorialCardProps {
  to?: string
  href?: string
  category?: string
  title: string
  description?: string
  image: string
  imageAlt?: string
  meta?: string
  className?: string
  aspectRatio?: '16/10' | '4/3' | '3/2' | '1/1'
}

export const EditorialCard: React.FC<EditorialCardProps> = ({
  to,
  href,
  category,
  title,
  description,
  image,
  imageAlt,
  meta,
  className,
  aspectRatio = '16/10',
}) => {
  const aspectClasses = {
    '16/10': 'aspect-[16/10]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
  }

  const content = (
    <article
      className={cn(
        'group card-editorial flex flex-col justify-between overflow-hidden cursor-pointer',
        className
      )}
    >
      <div>
        <div className={cn('relative w-full overflow-hidden bg-stone-900', aspectClasses[aspectRatio])}>
          <img
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            className="h-full w-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          {category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)]/90 backdrop-blur-xs text-[var(--color-gold-light)] border border-white/10">
              {category}
            </span>
          )}
        </div>

        <div className="p-5 sm:p-6 space-y-2.5">
          {meta && (
            <p className="text-xs font-medium tracking-wide text-[var(--color-muted)]">
              {meta}
            </p>
          )}
          <h3 className="font-serif text-lg sm:text-xl font-normal text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors leading-snug group-hover:translate-x-0.5 duration-200">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-semibold text-[var(--color-ink)]">
        <span className="text-xs uppercase tracking-wider text-[var(--color-gold)]">Read Article</span>
        <ArrowRight className="h-4 w-4 text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] arrow-nudge" />
      </div>
    </article>
  )

  if (to) {
    return <Link to={to} className="block no-underline focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)]">{content}</Link>
  }
  if (href) {
    return <a href={href} className="block no-underline focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)]">{content}</a>
  }
  return content
}

/* ==========================================================================
   STYLE B — PROGRAMME / PROSPECTUS CARD
   Prestige university prospectus: 01, degree, capitalized title, divider,
   animated explore arrow.
   ========================================================================== */
export interface ProspectusCardProps {
  number: string
  degree: string
  title: string
  department?: string
  duration?: string
  description?: string
  to: string
  className?: string
}

export const ProspectusCard: React.FC<ProspectusCardProps> = ({
  number,
  degree,
  title,
  department,
  duration,
  description,
  to,
  className,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        'group card-prospectus flex flex-col justify-between p-6 sm:p-8 no-underline focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)]',
        className
      )}
    >
      <div>
        {/* Top: Serial Number & Degree */}
        <div className="flex items-start justify-between border-b border-[var(--color-border)] pb-4 mb-5">
          <span className="editorial-number text-4xl sm:text-5xl text-[var(--color-gold)]">
            {number}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--color-sand)]/60 text-[var(--color-ink)] border border-[var(--color-border)]">
            {degree}
          </span>
        </div>

        {duration && (
          <p className="text-xs uppercase tracking-wider text-[var(--color-muted)] font-medium mb-1.5">
            {duration}
          </p>
        )}

        {/* Title */}
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors leading-snug">
          {title}
        </h3>

        {department && (
          <p className="text-xs text-[var(--color-charcoal)] font-medium mt-1 mb-3">
            {department}
          </p>
        )}

        {description && (
          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mt-3 line-clamp-3">
            {description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-semibold text-[var(--color-ink)]">
        <span className="group-hover:text-[var(--color-anrcas-blue)] transition-colors">Explore programme</span>
        <ArrowRight className="h-4 w-4 text-[var(--color-gold)] group-hover:text-[var(--color-anrcas-blue)] arrow-nudge" />
      </div>
    </Link>
  )
}

/* ==========================================================================
   STYLE C — IMAGE TILE
   Large image, bottom typography with dark gradient overlay.
   Hover: image zoom + upward content shift.
   ========================================================================== */
export interface ImageTileProps {
  image: string
  imageAlt?: string
  title: string
  subtitle?: string
  tag?: string
  to?: string
  onClick?: () => void
  aspectRatio?: string
  className?: string
}

export const ImageTile: React.FC<ImageTileProps> = ({
  image,
  imageAlt,
  title,
  subtitle,
  tag,
  to,
  onClick,
  aspectRatio = 'aspect-[4/3]',
  className,
}) => {
  const content = (
    <div
      onClick={onClick}
      className={cn(
        'group card-image-tile relative w-full overflow-hidden cursor-pointer',
        aspectRatio,
        className
      )}
    >
      <img
        src={image}
        alt={imageAlt || title}
        loading="lazy"
        className="h-full w-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/40 to-transparent group-hover:from-[var(--color-ink)]/95 transition-all duration-300" />

      {tag && (
        <span className="absolute top-4 left-4 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)]/80 text-[var(--color-gold-light)] border border-white/15 backdrop-blur-xs">
          {tag}
        </span>
      )}

      <div className="absolute bottom-4 left-4 right-4 text-white group-hover:-translate-y-1 transition-transform duration-300">
        <h3 className="font-serif text-lg sm:text-xl font-normal leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-stone-300 mt-1 line-clamp-2 font-light">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )

  if (to) {
    return <Link to={to} className="block no-underline">{content}</Link>
  }
  return content
}

/* ==========================================================================
   STYLE D — ASYMMETRIC FEATURE CARD
   Image occupies ~60%, content occupies remaining ~40%.
   ========================================================================== */
export interface FeatureCardProps {
  image: string
  imageAlt?: string
  category?: string
  title: string
  description: string
  ctaText?: string
  to?: string
  reverse?: boolean
  className?: string
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  imageAlt,
  category,
  title,
  description,
  ctaText = 'Explore details',
  to,
  reverse = false,
  className,
}) => {
  return (
    <article
      className={cn(
        'group grid grid-cols-1 lg:grid-cols-12 border border-[var(--color-border)] bg-white overflow-hidden transition-all duration-300 hover:border-[var(--color-ink)] hover:shadow-md',
        className
      )}
    >
      <div
        className={cn(
          'lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] overflow-hidden bg-stone-900',
          reverse && 'lg:order-2'
        )}
      >
        <img
          src={image}
          alt={imageAlt || title}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transform-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/60 via-transparent to-transparent opacity-40" />
      </div>

      <div
        className={cn(
          'lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[var(--color-paper)]',
          reverse && 'lg:order-1'
        )}
      >
        <div className="space-y-3">
          {category && (
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              {category}
            </span>
          )}
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--color-ink)] leading-snug">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed font-light">
            {description}
          </p>
        </div>

        {to && (
          <div className="pt-4 border-t border-[var(--color-border)]">
            <Link
              to={to}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)] transition-colors"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-3.5 w-3.5 arrow-nudge" />
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}

/* ==========================================================================
   STYLE E — MINIMAL TEXT CARD
   Typography, border and generous whitespace for text-heavy academic areas.
   ========================================================================== */
export interface MinimalTextCardProps {
  eyebrow?: string
  title: string
  description: string
  meta?: string
  to?: string
  className?: string
}

export const MinimalTextCard: React.FC<MinimalTextCardProps> = ({
  eyebrow,
  title,
  description,
  meta,
  to,
  className,
}) => {
  const content = (
    <article
      className={cn(
        'group card-minimal p-6 sm:p-7 flex flex-col justify-between space-y-4 cursor-pointer',
        className
      )}
    >
      <div className="space-y-2.5">
        {eyebrow && (
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
            {eyebrow}
          </span>
        )}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed font-light">
          {description}
        </p>
      </div>

      {meta && (
        <div className="pt-3 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs sm:text-sm font-medium text-[var(--color-ink-soft)]">
          <span>{meta}</span>
          <ArrowRight className="h-3.5 w-3.5 arrow-nudge" />
        </div>
      )}
    </article>
  )

  if (to) {
    return <Link to={to} className="block no-underline focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)]">{content}</Link>
  }
  return content
}
