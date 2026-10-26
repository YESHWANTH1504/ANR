import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, Newspaper, Sparkles } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { H2, EditorialLabel } from '@/components/ui/Typography'
import { getFeaturedBlogArticle, type BlogArticle } from '@/data/blog'

export interface FeaturedBlogProps {
  article?: BlogArticle
}

export const FeaturedBlog: React.FC<FeaturedBlogProps> = ({
  article = getFeaturedBlogArticle(),
}) => {
  return (
    <Section
      variant="card"
      padding="lg"
      id="featured-insight"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-8 space-y-2">
          <EditorialLabel className="text-[var(--color-primary)]">
            Featured Editorial
          </EditorialLabel>
          <H2 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-primary)] tracking-tight font-serif">
            Institutional Perspective
          </H2>
        </div>

        {article ? (
          /* When authentic article is available */
          <div className="rounded-2xl border border-[var(--color-border)] bg-slate-50/50 overflow-hidden shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {article.image && (
                <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] bg-slate-900 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary-dark)]/80 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>
              )}

              <div
                className={`${
                  article.image ? 'lg:col-span-5' : 'lg:col-span-12'
                } p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  {article.category && (
                    <Badge variant="accent" size="sm">
                      {article.category}
                    </Badge>
                  )}

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--color-primary)] font-serif leading-tight">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  )}

                  {article.date && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{article.date}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <Link to={`/blog/${article.slug}`}>
                    <Button
                      variant="primary"
                      size="md"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                    >
                      Read Full Article
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Editorial Intentional Empty State (Strict Data Authenticity) */
          <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50/80 via-white to-sky-50/30 p-8 sm:p-12 lg:p-14 text-center max-w-4xl mx-auto shadow-xs">
            <div className="flex flex-col items-center max-w-xl mx-auto space-y-5">
              <div className="h-14 w-14 rounded-2xl bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <BookOpen className="h-7 w-7" aria-hidden="true" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <Sparkles className="h-3 w-3 text-amber-500" aria-hidden="true" />
                  Editorial Desk
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)] font-serif tracking-tight">
                  Featured Insight in Preparation
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our faculty members, departments, and academic leadership are preparing in-depth collegiate perspectives, subject commentaries, and student learning narratives. Key long-form pieces will be featured here following formal editorial review.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Link to="/news">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Newspaper className="h-4 w-4" />}
                  >
                    View Timely Campus News
                  </Button>
                </Link>

                <Link to="/academics">
                  <Button
                    variant="outline"
                    size="md"
                    leftIcon={<BookOpen className="h-4 w-4 text-[var(--color-secondary-dark)]" />}
                  >
                    Explore Academics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  )
}
