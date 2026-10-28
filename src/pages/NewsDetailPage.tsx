import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag, ShieldCheck, Newspaper } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { H1, TextLead, TextBody, TextSmall } from '@/components/ui/Typography'
import { NEWS_ARTICLES, type NewsArticle } from '@/data/news'
import { publicService } from '@/api/services/publicService'

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<NewsArticle | undefined>(() =>
    NEWS_ARTICLES.find((item) => item.slug === slug)
  )

  useEffect(() => {
    if (!slug) return

    publicService
      .getNewsArticle(slug)
      .then((data) => {
        if (data) {
          setArticle({
            id: data.id,
            title: data.title,
            slug: data.slug,
            date: data.publication_date || 'Recent',
            category: (data.category as NewsArticle['category']) || 'Notice',
            summary: data.summary,
            content: data.content,
          })
        }
      })
      .catch(() => {
        // Fall back to static dataset if available
      })
  }, [slug])

  useEffect(() => {
    const originalTitle = document.title
    if (article) {
      document.title = `${article.title} | A.N. Radhakrishnan College of Arts & Science`
    } else {
      document.title = 'News Article Not Found | A.N. Radhakrishnan College of Arts & Science'
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [article])

  if (!article) {
    return (
      <Section variant="canvas" padding="lg" className="min-h-[60vh] flex items-center">
        <Container size="narrow">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'News & Events', href: '/news' },
              { label: 'Not Found' },
            ]}
            className="mb-8"
          />

          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-paper)] p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-4">
              <span>Notice</span>
            </div>

            <H1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] mb-3">
              News Article Not Found
            </H1>

            <TextBody className="text-[var(--color-muted)] max-w-md mx-auto mb-8">
              The requested news bulletin or event record could not be found or may have been archived.
            </TextBody>

            <div className="flex justify-center">
              <Link to="/news">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
                >
                  Return to News &amp; Events
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <div className="w-full">
      {/* Header / Article Meta Section */}
      <Section variant="canvas" padding="md" className="border-b border-[var(--color-border)]">
        <Container size="narrow" className="pt-4 pb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'News & Events', href: '/news' },
              { label: article.title },
            ]}
            className="mb-8"
          />

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="primary" size="sm">
              <Tag className="h-3 w-3 mr-1 inline" aria-hidden="true" />
              {article.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-mono">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {article.date}
            </span>
          </div>

          <H1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] font-serif tracking-tight leading-snug mb-6">
            {article.title}
          </H1>

          <TextLead className="text-[var(--color-charcoal)] leading-relaxed mb-6 font-normal">
            {article.summary}
          </TextLead>

          {/* Institutional Verification Stamp */}
          <div className="rounded-[var(--radius-md)] bg-[var(--color-ivory)] border border-[var(--color-border)] p-4 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink)] block">
                Official Campus Bulletin
              </span>
              <TextSmall className="text-[var(--color-muted)] mt-0.5">
                Published by A.N. Radhakrishnan College of Arts &amp; Science, Vadamavandal. Affiliated to Thiruvalluvar University, Vellore.
              </TextSmall>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Body */}
      <Section variant="paper" padding="lg">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none text-[var(--color-charcoal)] leading-relaxed space-y-4">
            <p className="text-base sm:text-lg leading-relaxed">
              {article.content || article.summary}
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              For administrative inquiries or more details regarding college activities and student initiatives, please contact the college administration office at Vadamavandal.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-4">
            <Link to="/news">
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
              >
                Back to News &amp; Events
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="ghost"
                size="md"
                leftIcon={<Newspaper className="h-4 w-4" aria-hidden="true" />}
              >
                Contact Administration
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
