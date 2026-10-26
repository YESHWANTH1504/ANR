import React, { useEffect, useState } from 'react'
import {
  BlogHero,
  FeaturedBlog,
  BlogCatalogue,
  InstitutionalPerspective,
  BlogCTA,
} from '@/sections/blog'
import { BLOG_ARTICLES } from '@/data/blog'

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Blog | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Blog Hero */}
      <BlogHero />

      {/* SECTION 2: Featured Insight */}
      <FeaturedBlog />

      {/* SECTION 3: Blog Catalogue & SECTION 4: Category Navigation (if categories exist) */}
      <BlogCatalogue
        items={BLOG_ARTICLES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* SECTION 5: Institutional Perspective & Editorial Scope */}
      <InstitutionalPerspective />

      {/* SECTION 6: Closing Institutional CTA */}
      <BlogCTA />
    </div>
  )
}
