import React, { useEffect, useState } from 'react'
import {
  NewsHero,
  FeaturedNews,
  NewsCatalogue,
  InstitutionalUpdates,
  NewsCTA,
} from '@/sections/news'
import { NEWS_ARTICLES } from '@/data/news'

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'News & Events | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: News Hero */}
      <NewsHero />

      {/* SECTION 2: Featured News / Latest Update */}
      <FeaturedNews article={NEWS_ARTICLES[0]} />

      {/* SECTION 3 & 4: News & Events Catalogue with Category Filters */}
      <NewsCatalogue
        articles={NEWS_ARTICLES}
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
