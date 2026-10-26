import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface NavGroup {
  title: string
  links: { label: string; href: string }[]
}

const FOOTER_GROUPS: NavGroup[] = [
  {
    title: 'Academics',
    links: [
      { label: 'Academics', href: '/academics' },
      { label: 'Departments', href: '/departments' },
      { label: 'Degree Programmes', href: '/programmes' },
      { label: 'Undergraduate Degrees', href: '/programmes' },
    ],
  },
  {
    title: 'Admissions',
    links: [
      { label: 'Admissions', href: '/admissions' },
      { label: 'Eligibility Guidelines', href: '/admissions' },
      { label: 'Merit Scholarships', href: '/admissions' },
      { label: 'Free Rural Transit', href: '/facilities' },
    ],
  },
  {
    title: 'Campus Life',
    links: [
      { label: 'Campus Life', href: '/campus-life' },
      { label: 'Campus Facilities', href: '/facilities' },
      { label: 'Photo Gallery', href: '/gallery' },
      { label: 'Career Placements', href: '/placements' },
    ],
  },
  {
    title: 'Institution',
    links: [
      { label: 'About ANRCAS', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'News & Events', href: '/news' },
      { label: 'Editorial Journal', href: '/blog' },
    ],
  },
]

export const FooterNavigation: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6">
      {FOOTER_GROUPS.map((group) => (
        <div key={group.title} className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span className="h-1 w-2 bg-[var(--color-gold)]" aria-hidden="true" />
            <span>{group.title}</span>
          </h4>

          <ul className="space-y-2.5 text-xs sm:text-sm font-light text-stone-400">
            {group.links.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.href}
                  className="group inline-flex items-center gap-1.5 hover:text-white transition-colors duration-150 min-h-[32px] sm:min-h-0 py-1 sm:py-0 focus-visible:outline-2 focus-visible:outline-[var(--color-gold)] rounded-xs"
                >
                  <span className="group-hover:text-[var(--color-gold-light)] transition-colors">{link.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0.5 text-[var(--color-gold)] transition-all duration-200" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
