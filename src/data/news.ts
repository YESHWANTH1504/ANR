export interface NewsArticle {
  id: string
  title: string
  slug: string
  date: string
  category: 'Event' | 'Camp' | 'Academics' | 'Notice'
  summary: string
  content?: string
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-nss-camp',
    title: 'NSS Unit Completes Seven-Day Special Camp in Vadamavandal',
    slug: 'nss-special-camp-vadamavandal',
    date: 'Recent',
    category: 'Camp',
    summary: 'College National Service Scheme (NSS) volunteers organized community welfare and civic awareness initiatives across Vadamavandal.',
    content: 'Student volunteers of A.N. Radhakrishnan College of Arts & Science successfully carried out a comprehensive seven-day special village camp in Vadamavandal. Under the supervision of college faculty program officers, volunteers engaged in rural sanitation drives, health and hygiene awareness campaigns, tree sapling distribution, and local community outreach. The annual NSS camp reflects the college\'s foundational commitment to civic responsibility, rural upliftment, and active student citizenship.',
  },
  {
    id: 'news-symposium',
    title: 'Inter-Departmental Symposium Hosted at ANR College',
    slug: 'inter-departmental-symposium',
    date: 'Recent',
    category: 'Academics',
    summary: 'Students presented technical and commerce papers highlighting emerging trends in computing, economics, and business practice.',
    content: 'The Departments of Computer Science and Commerce organized an inter-departmental academic symposium on campus. Students presented seminar papers covering software problem-solving, corporate accounting frameworks, and business management applications. Faculty mentors commended the analytical rigor and practical presentation skills demonstrated by participating student teams.',
  },
  {
    id: 'news-sports-meet',
    title: 'Annual Inter-Departmental Sports & Athletics Meet Held',
    slug: 'annual-sports-athletics-meet',
    date: 'Recent',
    category: 'Event',
    summary: 'Students from across science, commerce, and language departments participated in track events, volleyball, and athletic contests.',
    content: 'ANRCAS held its annual inter-departmental athletic meet on the college sports grounds. The event featured track competitions, volleyball tournaments, and team fitness challenges, fostering camaraderie, healthy sportsmanship, and physical discipline among students across all departments.',
  },
  {
    id: 'news-welfare',
    title: 'Social Welfare & Health Awareness Programme Conducted',
    slug: 'social-welfare-awareness-programme',
    date: 'Recent',
    category: 'Event',
    summary: 'Interactive awareness sessions focused on community wellbeing and civic responsibility organized on campus.',
    content: 'A special campus awareness programme addressing youth health, civic discipline, and social welfare was conducted in the college seminar hall. Attended by undergraduate students and faculty members, the session emphasized balanced lifestyle habits, personal responsibility, and community values.',
  },
]
