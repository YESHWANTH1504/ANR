export interface NavItem {
  label: string
  href: string
  description?: string
  children?: NavItem[]
  badge?: string
  isExternal?: boolean
}

export interface UtilityLink {
  label: string
  href: string
  badge?: string
  isExternal?: boolean
}

/**
 * Top Utility Bar Links — Verified ANRCAS shortcuts
 * Examinations, News and Notices, Admissions, Contact
 */
export const UTILITY_BAR_LINKS: UtilityLink[] = [
  { label: 'Examinations', href: '/academics' },
  { label: 'News & Notices', href: '/news' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Contact', href: '/contact' },
]

/**
 * Backward compatibility alias
 */
export const AUDIENCE_LINKS: UtilityLink[] = UTILITY_BAR_LINKS

/**
 * Primary Institutional Navigation Hierarchy:
 * 1. Home
 * 2. About (Institutional Profile, Founder & Leadership)
 * 3. Academics (Academic Overview & Syllabi, Departments)
 * 4. Programmes (UG & PG)
 * 5. Campus Life (Student Life, Placements, Gallery)
 * 6. Facilities
 * 7. News & Events (Circulars & Notices, Blog)
 * 8. Contact
 */
export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
    children: [
      {
        label: 'Institutional Profile & Heritage',
        href: '/about',
        description: 'Meenakshi Ammal Trust vision, university affiliation & collegiate ethos',
      },
      {
        label: 'Founder & Leadership',
        href: '/leadership',
        description: 'Founder Thiru A.N. Radhakrishnan & college administrative governance',
      },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      {
        label: 'Academic Overview & Syllabi',
        href: '/academics',
        description: 'Curriculum structure, CBCS pattern & Thiruvalluvar University regulations',
      },
      {
        label: 'Academic Departments',
        href: '/departments',
        description: 'Computer Science, Commerce, Mathematics, English & Tamil',
      },
    ],
  },
  {
    label: 'Programmes',
    href: '/programmes',
  },
  {
    label: 'Campus Life',
    href: '/campus-life',
    children: [
      {
        label: 'Life at ANRCAS',
        href: '/campus-life',
        description: 'Student activities, NSS community service & sports development',
      },
      {
        label: 'Career Guidance & Placements',
        href: '/placements',
        description: 'Skill development, career training & campus placement drives',
      },
      {
        label: 'Photo & Video Gallery',
        href: '/gallery',
        description: 'Visual archive of campus life, cultural celebrations & events',
      },
    ],
  },
  {
    label: 'Facilities',
    href: '/facilities',
  },
  {
    label: 'News & Events',
    href: '/news',
    children: [
      {
        label: 'Circulars & Campus Notices',
        href: '/news',
        description: 'Official academic announcements, examination schedules & circulars',
      },
      {
        label: 'Academic Perspectives Blog',
        href: '/blog',
        description: 'Faculty perspectives, student achievements & educational articles',
      },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export const UTILITY_LINKS: UtilityLink[] = [
  { label: 'Departments', href: '/departments' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'Contact Desk', href: '/contact' },
]

