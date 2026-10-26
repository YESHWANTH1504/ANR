import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Newspaper, Feather, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const BlogHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-paper)] border-b border-[var(--color-border)] overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog' },
          ]}
          className="mb-8"
        />

        <div className="max-w-4xl space-y-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              <span className="h-px w-6 bg-[var(--color-gold)]" />
              <span>Collegiate Journal &amp; Perspectives</span>
            </div>

            {/* Single Primary H1 with Editorial Magazine Typography */}
            <h1 className="mt-3 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[var(--color-ink)] leading-[1.08] tracking-tight">
              Insights &amp; Stories.
            </h1>

            <p className="mt-4 font-serif italic text-lg sm:text-xl lg:text-2xl text-[var(--color-ink-soft)] leading-relaxed font-normal max-w-3xl">
              "An editorial journal for ideas, perspectives and conversations from the {COLLEGE_INFO.shortName} community."
            </p>

            <p className="mt-2 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light max-w-2xl">
              Explore educational viewpoints and institutional reflections from faculty and academic departments. Formal publications will appear here as they are reviewed and released.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] hover:bg-[var(--color-charcoal)] text-white font-medium px-6 py-3.5 text-sm transition-all hover:-translate-y-0.5"
              >
                <Newspaper className="h-4 w-4" />
                <span>View News &amp; Bulletins</span>
              </Link>

              <Link
                to="/academics"
                className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-transparent hover:bg-[var(--color-ivory)] text-[var(--color-ink)] font-medium px-6 py-3.5 text-sm border border-[var(--color-border)] transition-colors"
              >
                <BookOpen className="h-4 w-4 text-[var(--color-gold)]" />
                <span>Academic Curricula</span>
              </Link>
            </div>

            {/* Verified Institutional Pillars Strip */}
            <div className="pt-8 mt-8 border-t border-[var(--color-border)] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[var(--color-charcoal)]">
              <div className="flex items-center gap-2">
                <Feather className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Educational Perspectives</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Institutional Reflections</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span className="font-medium">Pedagogical Knowledge</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
