import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Newspaper } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { H1, TextBody } from '@/components/ui/Typography'
import { BLOG_ARTICLES } from '@/data/blog'

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const article = BLOG_ARTICLES.find((item) => item.slug === slug)

  useEffect(() => {
    const originalTitle = document.title
    if (article) {
      document.title = `${article.title} | A.N. Radhakrishnan College of Arts & Science`
    } else {
      document.title = 'Editorial Article Not Found | A.N. Radhakrishnan College of Arts & Science'
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
              { label: 'Blog & Perspectives', href: '/blog' },
              { label: 'Not Found' },
            ]}
            className="mb-8"
          />

          <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-paper)] p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] mb-4">
              <span>Notice</span>
            </div>

            <H1 className="text-2xl sm:text-3xl font-bold text-[var(--color-ink)] mb-3">
              Editorial Article Not Found
            </H1>

            <TextBody className="text-[var(--color-muted)] max-w-md mx-auto mb-8">
              No published article matching this identifier was found in the ANRCAS editorial archive.
            </TextBody>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/blog">
                <Button
                  variant="primary"
                  size="md"
                  leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
                >
                  Return to Blog
                </Button>
              </Link>
              <Link to="/news">
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<Newspaper className="h-4 w-4" aria-hidden="true" />}
                >
                  Read News Bulletins
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
      <Section variant="canvas" padding="md" className="border-b border-[var(--color-border)]">
        <Container size="narrow" className="pt-4 pb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: article.title },
            ]}
            className="mb-8"
          />

          <H1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] font-serif tracking-tight leading-snug mb-6">
            {article.title}
          </H1>

          {article.excerpt && (
            <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-6 font-light">
              {article.excerpt}
            </p>
          )}
        </Container>
      </Section>

      <Section variant="paper" padding="lg">
        <Container size="narrow">
          <div className="prose prose-slate max-w-none text-[var(--color-charcoal)] leading-relaxed space-y-4">
            <p className="text-base sm:text-lg leading-relaxed">
              {article.content || article.excerpt}
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex items-center justify-between">
            <Link to="/blog">
              <Button
                variant="outline"
                size="md"
                leftIcon={<ArrowLeft className="h-4 w-4" aria-hidden="true" />}
              >
                Back to Blog
              </Button>
            </Link>
            <Link to="/academics">
              <Button
                variant="ghost"
                size="md"
                leftIcon={<BookOpen className="h-4 w-4" aria-hidden="true" />}
              >
                Explore Curricula
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  )
}
