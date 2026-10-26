import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, EditorialLabel } from '@/components/ui/Typography'
import { NEWS_ARTICLES, type NewsArticle } from '@/data/news'
import seminarImg from '@/assets/gallery_seminar.webp'

interface FeaturedNewsProps {
  article?: NewsArticle
}

export const FeaturedNews: React.FC<FeaturedNewsProps> = ({ article }) => {
  const featured = article || NEWS_ARTICLES[0]

  if (!featured) return null

  return (
    <Section
      variant="card"
      padding="lg"
      id="featured-news"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <EditorialLabel className="text-[var(--color-primary)]">
            Spotlight Story
          </EditorialLabel>
          <H2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Featured Institutional Update
          </H2>
        </div>

        {/* Large Editorial Feature Split Card */}
        <div className="border border-[var(--color-border)] bg-[var(--color-paper)] overflow-hidden shadow-xs hover:border-[var(--color-ink)] transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full bg-slate-900 overflow-hidden group">
              <img
                src={seminarImg}
                alt="ANRCAS Academic and Community Gathering"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center filter brightness-95 group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/30 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-ink)]/90 backdrop-blur-xs text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)] border border-white/10">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--color-gold)]" aria-hidden="true" />
                  Campus Life &amp; Outreach
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-sand)]/60 text-[var(--color-ink)] border border-[var(--color-border)]">
                    {featured.category}
                  </span>

                  {featured.date && (
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--color-muted)] font-medium">
                      <Calendar className="h-3.5 w-3.5 text-[var(--color-gold)]" aria-hidden="true" />
                      {featured.date}
                    </span>
                  )}

                  <span className="text-xs text-[var(--color-muted)] font-medium ml-auto">
                    Institutional Bulletin
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--color-ink)] leading-tight">
                  <Link
                    to={`/news/${featured.slug}`}
                    className="hover:text-[var(--color-anrcas-blue)] transition-colors"
                  >
                    {featured.title}
                  </Link>
                </h3>

                <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light">
                  {featured.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[var(--color-muted)] font-medium">
                  Published by College Administrative Desk
                </span>

                <Link
                  to={`/news/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--color-ink)] hover:bg-[var(--color-charcoal)] text-white text-xs font-semibold transition-all group"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="h-3.5 w-3.5 arrow-nudge" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
