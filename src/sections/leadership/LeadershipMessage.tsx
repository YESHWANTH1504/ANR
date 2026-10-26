import React from 'react'
import { Container } from '@/components/shared/Container'
import { FOUNDER_DATA } from '@/data/leadership'

export const LeadershipMessage: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[var(--color-paper)] border-b border-[var(--color-border)] relative overflow-hidden">
      {/* Decorative Oversized Quotation Glyph Accent */}
      <div
        className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 font-serif text-[180px] sm:text-[240px] leading-none text-[var(--color-gold)]/10 select-none -z-10"
        aria-hidden="true"
      >
        “
      </div>

      <Container size="narrow" className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)] mx-auto">
          <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
          <span>Founding Message</span>
          <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
        </div>

        {/* Verified Quote in Newsreader Editorial Display */}
        <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal text-[var(--color-ink)] leading-snug tracking-tight">
          “{FOUNDER_DATA.message}”
        </blockquote>

        {/* Attribution Line */}
        <div className="pt-4 space-y-1">
          <p className="font-serif text-xl font-medium text-[var(--color-ink)]">
            {FOUNDER_DATA.name}
          </p>
          <p className="text-xs font-semibold tracking-wider uppercase text-[var(--color-gold)]">
            {FOUNDER_DATA.designation}
          </p>
          <p className="text-xs text-[var(--color-muted)]">
            {FOUNDER_DATA.trustAffiliation}
          </p>
        </div>

        {/* Contextual Narrative on Institutional Purpose */}
        <div className="pt-8 max-w-xl mx-auto border-t border-[var(--color-border)]">
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            This vision guides the college's operational philosophy: prioritizing student mentorship, fostering first-generation college completion, and ensuring rural youth have unfettered access to university degree curricula.
          </p>
        </div>
      </Container>
    </section>
  )
}
