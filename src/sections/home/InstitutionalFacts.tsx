import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  GraduationCap,
  Landmark,
  Phone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { NEWS_ARTICLES } from '@/data/news'

interface QuickLinkItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
  badge?: string
  isHighlighted?: boolean
}

const QUICK_LINKS: QuickLinkItem[] = [
  {
    title: 'Admissions 2026–2027',
    description: 'Undergraduate & postgraduate degree admissions',
    href: '/admissions',
    icon: GraduationCap,
    badge: '2026 Open',
    isHighlighted: true,
  },
  {
    title: 'Degree Programmes',
    description: 'Curricula for B.Sc, B.Com, BBA, and M.Com',
    href: '/programmes',
    icon: BookOpen,
  },
  {
    title: 'Academic Departments',
    description: 'Computing, Commerce, Mathematics, English & Tamil',
    href: '/academics',
    icon: Building2,
  },
  {
    title: 'Campus Facilities & Transit',
    description: 'Computer laboratories, library & college bus fleet',
    href: '/facilities',
    icon: Sparkles,
  },
  {
    title: 'About ANRCAS',
    description: 'Institutional heritage & Meenakshi Ammal Trust',
    href: '/about',
    icon: Landmark,
  },
  {
    title: 'Contact & Directions',
    description: 'Office desk, telephone assistance & campus route',
    href: '/contact',
    icon: Phone,
  },
]

export const AnnouncementsQuickLinks: React.FC = () => {
  // Use up to 3 verified announcements from the institutional data source
  const announcements = NEWS_ARTICLES.slice(0, 3)

  return (
    <section
      id="institutional-overview"
      aria-label="Announcements, Updates, and Quick Links"
      className="py-12 sm:py-16 lg:py-20 bg-[#F8FAFC] border-b border-slate-200"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* ==============================================================
              LEFT COLUMN (7 cols): Announcements & Updates
              ============================================================== */}
          <div className="lg:col-span-7 space-y-5">
            {/* Column Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
                  <span>College Bulletins</span>
                </div>
                <h2
                  id="announcements-section-title"
                  className="font-serif text-2xl sm:text-[28px] font-bold text-[#082046] tracking-tight leading-tight mt-1"
                >
                  Announcements &amp; Updates
                </h2>
              </div>

              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#082046] hover:text-[#0C4DA2] transition-colors group focus-visible:outline-2 focus-visible:outline-[#082046] rounded-xs"
              >
                <span>View All Notices</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>

            {/* Announcements List or Intentional Empty State */}
            {announcements.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg border border-slate-200">
                <Bell className="h-8 w-8 text-slate-400 mx-auto mb-2" aria-hidden="true" />
                <p className="text-sm font-medium text-slate-600">
                  No announcements to display right now.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5" role="feed" aria-label="Recent institutional announcements">
                {announcements.map((item) => (
                  <article
                    key={item.id}
                    className="p-4 sm:p-5 rounded-lg bg-white border border-slate-200 hover:border-[#082046] transition-all duration-200 shadow-xs hover:shadow-sm group flex flex-col justify-between"
                  >
                    <div>
                      {/* Category Badge & Verified Date */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-blue-50 text-[#082046] border border-blue-100">
                          {item.category}
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Calendar className="h-3 w-3 text-slate-400" aria-hidden="true" />
                          <span>{item.date}</span>
                        </span>
                      </div>

                      {/* Announcement Headline */}
                      <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#082046] transition-colors leading-snug">
                        <Link
                          to={`/news/${item.slug}`}
                          className="focus-visible:outline-2 focus-visible:outline-[#082046] rounded-xs"
                        >
                          {item.title}
                        </Link>
                      </h3>

                      {/* Brief Summary */}
                      <p className="font-sans text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mt-1.5 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    {/* Action link */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
                      <Link
                        to={`/news/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082046] group-hover:text-[#0C4DA2] transition-colors focus-visible:outline-2 focus-visible:outline-[#082046] rounded-xs"
                        aria-label={`Read full notice: ${item.title}`}
                      >
                        <span>Read Notice</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* ==============================================================
              RIGHT COLUMN (5 cols): Quick Links & Direct Shortcuts
              ============================================================== */}
          <div className="lg:col-span-5 space-y-5">
            {/* Column Header */}
            <div className="pb-3 border-b border-slate-200">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
                <span>Essential Shortcuts</span>
              </div>
              <h2
                id="quicklinks-section-title"
                className="font-serif text-2xl sm:text-[28px] font-bold text-[#082046] tracking-tight leading-tight mt-1"
              >
                Quick Links
              </h2>
            </div>

            {/* Quick Links List */}
            <nav aria-labelledby="quicklinks-section-title" className="space-y-2.5">
              {QUICK_LINKS.map((link, idx) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={idx}
                    to={link.href}
                    className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-lg bg-white border transition-all duration-200 shadow-xs hover:shadow-sm focus-visible:outline-2 focus-visible:outline-[#082046] focus-visible:outline-offset-2 min-h-[52px] ${
                      link.isHighlighted
                        ? 'border-[#E4B316] bg-amber-50/20 hover:border-[#D4A30B] hover:bg-amber-50/40'
                        : 'border-slate-200 hover:border-[#082046] hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0 pr-2">
                      <div
                        className={`p-2 rounded-md shrink-0 transition-colors ${
                          link.isHighlighted
                            ? 'bg-[#E4B316]/20 text-[#082046] group-hover:bg-[#E4B316] group-hover:text-[#082046]'
                            : 'bg-slate-100 text-[#082046] group-hover:bg-[#082046] group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="h-4.5 w-4.5" aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm sm:text-[14.5px] text-slate-900 group-hover:text-[#082046] transition-colors truncate">
                            {link.title}
                          </span>
                          {link.badge && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide bg-[#E4B316] text-[#082046] shrink-0">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                          {link.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className="h-4 w-4 text-slate-400 group-hover:text-[#082046] group-hover:translate-x-1 transition-all shrink-0 ml-1"
                      aria-hidden="true"
                    />
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </Container>
    </section>
  )
}

// Backward-compatible alias for existing imports in HomePage.tsx
export const InstitutionalFacts: React.FC = AnnouncementsQuickLinks

