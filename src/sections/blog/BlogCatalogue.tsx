import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Newspaper } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { BLOG_ARTICLES, type BlogArticle, getBlogCategories } from '@/data/blog'
import { BlogFilters } from './BlogFilters'

export interface BlogCatalogueProps {
  items?: BlogArticle[]
  selectedCategory?: string
  onSelectCategory?: (category: string) => void
}

export const BlogCatalogue: React.FC<BlogCatalogueProps> = ({
  items = BLOG_ARTICLES,
  selectedCategory = 'All',
  onSelectCategory,
}) => {
  const categories = useMemo(() => getBlogCategories(), [])

  // Item counts per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: items.length }
    items.forEach((item) => {
      if (item.category) {
        map[item.category] = (map[item.category] || 0) + 1
      }
    })
    return map
  }, [items])

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return items
    return items.filter((item) => item.category === selectedCategory)
  }, [items, selectedCategory])

  return (
    <Section
      variant="canvas"
      padding="lg"
      id="catalogue"
      className="border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-2">
            <EditorialLabel className="text-[var(--color-primary)]">
              Publication Archive
            </EditorialLabel>
            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight font-serif">
              Articles &amp; Educational Perspectives
            </H2>
            <TextLead className="text-slate-600 text-sm sm:text-base">
              Long-form editorial reflections, pedagogical explorations, and institutional knowledge sharing from ANRCAS.
            </TextLead>
          </div>

          {onSelectCategory && categories.length > 1 && (
            <BlogFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
              counts={counts}
            />
          )}
        </div>

        {/* Content Grid or Institutional Empty State */}
        {filteredItems.length === 0 ? (
          <div className="max-w-2xl mx-auto my-8 border border-[var(--color-border)] bg-[var(--color-paper)] p-8 sm:p-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
              <span>COMING SOON</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--color-ink)]">
              Educational Perspectives &amp; Reflections
            </h3>

            <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light max-w-lg mx-auto">
              New institutional insights will appear here as they are published.
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-sm)] bg-[var(--color-ink)] text-white text-xs font-medium hover:bg-[var(--color-charcoal)] transition-colors"
              >
                <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Read Verified Bulletins</span>
              </Link>
              <Link
                to="/academics"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-sm)] bg-transparent border border-[var(--color-border)] text-[var(--color-ink)] text-xs font-medium hover:bg-[var(--color-ivory)] transition-colors"
              >
                <span>Explore Curricula</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((article) => (
              <article
                key={article.id}
                className="rounded-xl border border-[var(--color-border)] bg-white overflow-hidden shadow-xs hover:border-[var(--color-secondary)] hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {article.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center group-hover:scale-104 motion-reduce:transform-none transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    {article.category && (
                      <Badge variant="neutral" size="sm">
                        {article.category}
                      </Badge>
                    )}

                    <h3 className="text-lg font-bold text-[var(--color-primary)] font-serif group-hover:text-[var(--color-secondary-dark)] transition-colors leading-snug">
                      <Link to={`/blog/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {article.excerpt && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    {article.date ? (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {article.date}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">ANRCAS Editorial</span>
                    )}

                    <Link
                      to={`/blog/${article.slug}`}
                      className="font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  )
}
