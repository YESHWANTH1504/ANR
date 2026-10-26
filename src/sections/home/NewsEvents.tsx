import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { NEWS_ARTICLES } from '@/data/news'
import seminarImg from '@/assets/gallery_seminar.webp'

export const NewsEvents: React.FC = () => {
  const featuredNews = NEWS_ARTICLES[0]
  const additionalArticles = NEWS_ARTICLES.slice(1, 4)

  return (
    <section
      id="news"
      aria-labelledby="news-section-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
    >
      <Container size="wide">
        {/* ==============================================================
            SECTION HEADER: Editorial News Introduction
            ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
            <span>Campus Updates</span>
          </div>

          <h2
            id="news-section-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082046] tracking-tight leading-[1.15]"
          >
            Life and Learning at ANR
          </h2>

          <div className="w-16 h-1 bg-[#E4B316] rounded-full mx-auto" aria-hidden="true" />

          <p className="font-sans text-slate-600 text-base sm:text-lg pt-1 leading-relaxed">
            Follow verified institutional reports on academic symposiums, community service initiatives, athletic meets, and official notices from A.N. Radhakrishnan College of Arts &amp; Science.
          </p>
        </div>

        {/* ==============================================================
            EDITORIAL NEWS GRID: 1 Featured Item + 3 Compact Notices
            ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Featured Article Card (7 columns) */}
          {featuredNews && (
            <div className="lg:col-span-7 flex flex-col">
              <article
                aria-labelledby={`featured-news-title-${featuredNews.id}`}
                className="group flex-1 flex flex-col justify-between bg-[#F8FAFC] rounded-lg border border-slate-200 hover:border-[#082046]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-900 border-b border-slate-200">
                    <img
                      src={seminarImg}
                      alt="Students and faculty gathered for an institutional gathering at ANRCAS"
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"
                      aria-hidden="true"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/95 text-[#082046] border border-slate-200 rounded shadow-xs">
                        <Newspaper className="h-3.5 w-3.5 text-[#082046]" aria-hidden="true" />
                        <span>Featured Report • {featuredNews.category}</span>
                      </span>
                    </div>
                  </div>

                  {/* Editorial Body */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <h3
                      id={`featured-news-title-${featuredNews.id}`}
                      className="font-serif text-2xl sm:text-3xl font-bold text-[#082046] group-hover:text-[#0C4DA2] transition-colors leading-snug"
                    >
                      <Link
                        to={`/news/${featuredNews.slug}`}
                        className="focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded"
                      >
                        {featuredNews.title}
                      </Link>
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {featuredNews.summary}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="pt-4 border-t border-slate-200/80">
                    <Link
                      to={`/news/${featuredNews.slug}`}
                      className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#082046] group-hover:text-[#0C4DA2] transition-colors py-1 focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded"
                      aria-label={`Read full report: ${featuredNews.title}`}
                    >
                      <span>Read Full Report</span>
                      <ArrowRight className="h-4 w-4 text-[#E4B316] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Supporting News Stream (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
            {additionalArticles.map((article) => (
              <article
                key={article.id}
                aria-labelledby={`side-news-title-${article.id}`}
                className="flex-1 p-5 sm:p-6 rounded-lg bg-[#F8FAFC] border border-slate-200 hover:border-[#082046]/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#082046] px-2.5 py-0.5 rounded bg-white border border-slate-200 shadow-xs">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Institutional Record
                    </span>
                  </div>

                  <h3
                    id={`side-news-title-${article.id}`}
                    className="font-serif text-lg sm:text-xl font-bold text-[#082046] group-hover:text-[#0C4DA2] transition-colors leading-snug"
                  >
                    <Link
                      to={`/news/${article.slug}`}
                      className="focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded"
                    >
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200/80 flex justify-end">
                  <Link
                    to={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#082046] group-hover:text-[#0C4DA2] focus-visible:outline-2 focus-visible:outline-[#E4B316] rounded"
                    aria-label={`Read notice: ${article.title}`}
                  >
                    <span>Read Notice</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#E4B316] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ==============================================================
            MAIN SECTION CTA: View All News & Events
            ============================================================== */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/news"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded border-2 border-[#082046] text-[#082046] hover:bg-[#082046] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#E4B316]"
          >
            <span>View All News &amp; Events</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

