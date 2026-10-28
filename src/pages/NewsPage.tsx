import React, { useEffect, useState } from 'react'
import {
  NewsHero,
  FeaturedNews,
  NewsCatalogue,
  InstitutionalUpdates,
  NewsCTA,
} from '@/sections/news'
import { NEWS_ARTICLES, type NewsArticle } from '@/data/news'
import { publicService } from '@/api/services/publicService'

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [articles, setArticles] = useState<NewsArticle[]>(NEWS_ARTICLES)

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'News & Events | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })

    publicService
      .getNews()
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(
            data.map((d) => ({
              id: d.id,
              title: d.title,
              slug: d.slug,
              date: d.publication_date || 'Recent',
              category: (d.category as NewsArticle['category']) || 'Notice',
              summary: d.summary,
              content: d.content,
            }))
          )
        }
      })
      .catch(() => {
        // Fall back gracefully to verified initial content
      })

    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: News Hero */}
      <NewsHero />

      {/* SECTION 2: Featured News / Latest Update */}
      <FeaturedNews article={articles[0] || NEWS_ARTICLES[0]} />

      {/* SECTION 3 & 4: News & Events Catalogue with Category Filters */}
      <NewsCatalogue
        articles={articles}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* SECTION 5: Institutional Updates / Information Channels */}
      <InstitutionalUpdates />

      {/* SECTION 6: Stay Connected CTA */}
      <NewsCTA />
    </div>
  )
}
