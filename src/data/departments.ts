export interface Department {
  id: string
  name: string
  slug: string
  code: string
  overview: string
  category: 'Science' | 'Commerce & Management' | 'Languages'
  programmesOffered: string[]
}

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-cs',
    name: 'Department of Computer Science',
    slug: 'computer-science',
    code: 'CS',
    category: 'Science',
    overview: 'Nurturing foundational and applied computing competencies with hands-on computer lab facilities and software development practicals.',
    programmesOffered: ['B.Sc Computer Science'],
  },
  {
    id: 'dept-maths',
    name: 'Department of Mathematics',
    slug: 'mathematics',
    code: 'MATH',
    category: 'Science',
    overview: 'Fostering analytical acumen, theoretical inquiry, and numerical discipline across pure and applied mathematical frameworks.',
    programmesOffered: ['B.Sc Mathematics'],
  },
  {
    id: 'dept-commerce',
    name: 'Department of Commerce',
    slug: 'commerce',
    code: 'COM',
    category: 'Commerce & Management',
    overview: 'Delivering grounded education in corporate accounting, financial systems, banking regulations, and commercial law.',
    programmesOffered: ['B.Com (Bachelor of Commerce)', 'B.Com Corporate Secretaryship', 'M.Com'],
  },
  {
    id: 'dept-management',
    name: 'Department of Management Studies',
    slug: 'management-studies',
    code: 'BBA',
    category: 'Commerce & Management',
    overview: 'Equipping students with modern managerial methods, decision analysis, organizational communication, and leadership skills.',
    programmesOffered: ['BBA - Bachelor of Business Administration'],
  },
  {
    id: 'dept-tamil',
    name: 'Department of Tamil',
    slug: 'tamil',
    code: 'TAM',
    category: 'Languages',
    overview: 'Cultivating classical literary appreciation, cultural heritage, and linguistic proficiency in the Tamil language.',
    programmesOffered: ['Language Foundation Courses'],
  },
  {
    id: 'dept-english',
    name: 'Department of English',
    slug: 'english',
    code: 'ENG',
    category: 'Languages',
    overview: 'Promoting professional communication skills, literary analysis, and fluency in global and corporate English.',
    programmesOffered: ['Language & Communication Courses'],
  },
]
