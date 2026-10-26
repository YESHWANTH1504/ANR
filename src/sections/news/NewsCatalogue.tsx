import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, FileText, Inbox } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { NEWS_ARTICLES, type NewsArticle } from '@/data/news'
import { NewsFilters } from './NewsFilters'

interface NewsCatalogueProps {
  articles?: NewsArticle[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

export const NewsCatalogue: React.FC<NewsCatalogueProps> = ({
  articles = NEWS_ARTICLES,
  selectedCategory,
  onSelectCategory,
}) => {
  // Derive unique categories present in the dataset
  const categories = useMemo(() => {
    const unique = Array.from(new Set(articles.map((a) => a.category)))
    return ['All', ...unique]
  }, [articles])

  // Count items per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: articles.length }
    articles.forEach((a) => {
      map[a.category] = (map[a.category] || 0) + 1
    })
    return map
  }, [articles])

  // Filtered articles
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return articles
    return articles.filter((a) => a.category === selectedCategory)
  }, [articles, selectedCategory])

  return (
    <Section
      variant="canvas"
      padding="lg"
      id="catalogue"
      className="border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl space-y-2">
            <EditorialLabel className="text-[var(--color-primary)]">
              Announcements &amp; Archive
            </EditorialLabel>
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              News &amp; Events Catalogue
            </H2>
            <TextLead className="text-slate-600 text-sm sm:text-base">
              Chronological records of campus symposiums, community service initiatives, and institutional notices.
            </TextLead>
          </div>

          {/* Filter Bar */}
          <NewsFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            counts={counts}
          />
        </div>

        {/* Content Listing */}
        {filteredArticles.length === 0 ? (
          <EmptyState
            icon={<Inbox className="h-8 w-8 text-slate-400" />}
            title="No Announcements in this Category"
            description="There are currently no published institutional updates under this filter. Please select 'All' to review current announcements."
            action={
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className="text-xs font-bold text-[var(--color-secondary-dark)] hover:underline"
              >
                Reset Filter to All
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const badgeVariant =
                article.category === 'Academics'
                  ? 'primary'
                  : article.category === 'Camp'
                  ? 'accent'
                  : 'neutral'

              return (
                <article
                  key={article.id}
                  className="rounded-xl border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between hover:border-[var(--color-secondary)] hover:shadow-xs transition-all duration-200 group"
                >
                  <div className="space-y-3.5">
                    {/* Category & Date Header */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={badgeVariant} size="sm">
                        {article.category}
                      </Badge>
                      {article.date && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Calendar className="h-3 w-3 text-slate-400" aria-hidden="true" />
                          {article.date}
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary-dark)] transition-colors leading-snug">
                      <Link to={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Notice Bulletin
                    </span>

                    <Link
                      to={`/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary-dark)] group-hover:translate-x-1 transition-transform"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </Container>
    </Section>
  )
}
