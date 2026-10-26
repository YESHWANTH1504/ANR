export type DegreeLevel = 'UG' | 'PG' | 'Certificate'

export interface Programme {
  id: string
  name: string
  slug: string
  degree: string
  level: DegreeLevel
  departmentId: string
  departmentName: string
  durationYears: number
  description: string
  overview?: string
  highlights?: string[]
}

export const PROGRAMMES: Programme[] = [
  {
    id: 'prog-bsc-cs',
    name: 'B.Sc Computer Science',
    slug: 'computer-science',
    degree: 'Bachelor of Science (B.Sc)',
    level: 'UG',
    departmentId: 'dept-cs',
    departmentName: 'Department of Computer Science',
    durationYears: 3,
    description: 'Foundational computer science education covering computing principles, programming paradigms, and software systems.',
  },
  {
    id: 'prog-bsc-maths',
    name: 'B.Sc Mathematics',
    slug: 'mathematics',
    degree: 'Bachelor of Science (B.Sc)',
    level: 'UG',
    departmentId: 'dept-maths',
    departmentName: 'Department of Mathematics',
    durationYears: 3,
    description: 'Rigorous mathematical training in pure and applied mathematics, analytical problem-solving, and mathematical modeling.',
  },
  {
    id: 'prog-bcom-gen',
    name: 'B.Com (Bachelor of Commerce)',
    slug: 'bcom',
    degree: 'Bachelor of Commerce (B.Com)',
    level: 'UG',
    departmentId: 'dept-commerce',
    departmentName: 'Department of Commerce',
    durationYears: 3,
    description: 'Comprehensive business, financial accounting, taxation, and commercial management education.',
  },
  {
    id: 'prog-bcom-cs',
    name: 'B.Com Corporate Secretaryship',
    slug: 'corporate-secretaryship',
    degree: 'Bachelor of Commerce (B.Com CS)',
    level: 'UG',
    departmentId: 'dept-commerce',
    departmentName: 'Department of Commerce & Corporate Secretaryship',
    durationYears: 3,
    description: 'Specialized corporate governance, corporate law, secretarial practice, and managerial operations training.',
  },
  {
    id: 'prog-bba',
    name: 'BBA - Bachelor of Business Administration',
    slug: 'bba',
    degree: 'Bachelor of Business Administration (BBA)',
    level: 'UG',
    departmentId: 'dept-management',
    departmentName: 'Department of Management Studies',
    durationYears: 3,
    description: 'Hands-on management training emphasizing business administration, marketing, organisational strategy, and leadership.',
  },
  {
    id: 'prog-mcom',
    name: 'M.Com (Master of Commerce)',
    slug: 'mcom',
    degree: 'Master of Commerce (M.Com)',
    level: 'PG',
    departmentId: 'dept-commerce',
    departmentName: 'Department of Commerce',
    durationYears: 2,
    description: 'Advanced postgraduate inquiry into corporate finance, accounting theory, research methodology, and international business.',
  },
]

export const getProgrammeBySlug = (slug: string): Programme | undefined => {
  return PROGRAMMES.find((p) => p.slug.toLowerCase() === slug.toLowerCase())
}

export const getProgrammesByLevel = (level: DegreeLevel): Programme[] => {
  return PROGRAMMES.filter((p) => p.level === level)
}

export const getRelatedProgrammes = (programme: Programme, limit = 2): Programme[] => {
  // First match programmes in the same department
  const sameDept = PROGRAMMES.filter(
    (p) => p.id !== programme.id && p.departmentId === programme.departmentId
  )
  if (sameDept.length >= limit) {
    return sameDept.slice(0, limit)
  }

  // Next match programmes of the same level
  const sameLevel = PROGRAMMES.filter(
    (p) => p.id !== programme.id && p.departmentId !== programme.departmentId && p.level === programme.level
  )

  return [...sameDept, ...sameLevel].slice(0, limit)
}

