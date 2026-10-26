export interface BlogArticle {
  id: string
  slug: string
  title: string
  excerpt?: string
  category?: string
  date?: string
  image?: string
  content?: string
  featured?: boolean
}

/**
 * Authentic ANRCAS Blog / Institutional Insights dataset.
 * Currently empty to adhere strictly to the Data Authenticity Rule:
 * No fabricated articles, authors, or publication metrics are introduced.
 */
export const BLOG_ARTICLES: BlogArticle[] = []

export const getFeaturedBlogArticle = (): BlogArticle | undefined => {
  return BLOG_ARTICLES.find((article) => article.featured) || BLOG_ARTICLES[0]
}

export const getBlogCategories = (): string[] => {
  const categories = Array.from(
    new Set(BLOG_ARTICLES.map((article) => article.category).filter(Boolean))
  ) as string[]
  return categories.length > 0 ? ['All', ...categories] : []
}
