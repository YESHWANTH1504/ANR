import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Code2, Calculator, Briefcase, Landmark, ShieldCheck, Info } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { PROGRAMMES } from '@/data/programmes'

interface CareerPathwayInfo {
  slug: string
  icon: React.ReactNode
  accentColor: string
  focusArea: string
  exploratoryFields: string[]
  furtherStudy: string[]
}

const CAREER_PATHWAYS: Record<string, CareerPathwayInfo> = {
  'computer-science': {
    slug: 'computer-science',
    icon: <Code2 className="h-5 w-5 text-sky-600" aria-hidden="true" />,
    accentColor: 'border-l-sky-600',
    focusArea: 'Software development fundamentals, data handling, and computing systems.',
    exploratoryFields: [
      'Junior software development & web technologies',
      'Technical support & system administration',
      'Database entry & data operations assistance',
      'IT operations & network maintenance support',
    ],
    furtherStudy: ['M.Sc Computer Science', 'MCA', 'Data Analytics & Cloud Certifications'],
  },
  'mathematics': {
    slug: 'mathematics',
    icon: <Calculator className="h-5 w-5 text-indigo-600" aria-hidden="true" />,
    accentColor: 'border-l-indigo-600',
    focusArea: 'Rigorous analytical problem-solving, mathematical modeling, and numerical methods.',
    exploratoryFields: [
      'Statistical data collation & numerical analysis',
      'Banking & financial calculation support',
      'Operations research & logistics analysis',
      'Competitive civil and public sector examinations',
    ],
    furtherStudy: ['M.Sc Mathematics', 'M.Sc Statistics / Data Science', 'B.Ed in Mathematics'],
  },
  'bcom': {
    slug: 'bcom',
    icon: <Landmark className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
    accentColor: 'border-l-emerald-600',
    focusArea: 'Accounting systems, corporate taxation, commercial law, and banking procedures.',
    exploratoryFields: [
      'Accounting & bookkeeping assistance',
      'Commercial banking & financial service operations',
      'Taxation documentation & GST filing support',
      'Internal audit & inventory reconciliation support',
    ],
    furtherStudy: ['M.Com', 'Chartered Accountancy (CA)', 'CMA / Cost Management', 'MBA Finance'],
  },
  'corporate-secretaryship': {
    slug: 'corporate-secretaryship',
    icon: <ShieldCheck className="h-5 w-5 text-amber-600" aria-hidden="true" />,
    accentColor: 'border-l-amber-600',
    focusArea: 'Company law, secretarial standards, statutory records, and institutional governance.',
    exploratoryFields: [
      'Corporate secretarial & compliance assistance',
      'Statutory filing & registrar correspondence',
      'Executive office administration & coordination',
      'Legal & corporate documentation support',
    ],
    furtherStudy: ['Company Secretary (ICSI / ACS)', 'Corporate Law (LL.B)', 'M.Com Corporate Secretaryship'],
  },
  'bba': {
    slug: 'bba',
    icon: <Briefcase className="h-5 w-5 text-blue-600" aria-hidden="true" />,
    accentColor: 'border-l-blue-600',
    focusArea: 'Business operations, human resource basics, marketing principles, and management strategy.',
    exploratoryFields: [
      'Business development & client coordination',
      'Retail management & sales operations',
      'Human resource coordination & recruitment support',
      'Supply chain & administrative supervisory roles',
    ],
    furtherStudy: ['MBA (General / Specialised)', 'PGDM', 'Digital Marketing & Management Diplomas'],
  },
  'mcom': {
    slug: 'mcom',
    icon: <BookOpen className="h-5 w-5 text-purple-600" aria-hidden="true" />,
    accentColor: 'border-l-purple-600',
    focusArea: 'Postgraduate financial accounting theory, research methodology, and corporate finance.',
    exploratoryFields: [
      'Senior accounts executive & financial analyst support',
      'Corporate advisory & financial consulting roles',
      'Collegiate lecturing & higher education teaching',
      'Public sector finance & commercial enterprises',
    ],
    furtherStudy: ['UGC-NET / SET for Assistant Professorship', 'Ph.D. in Commerce', 'Advanced Financial Certifications'],
  },
}

export const AcademicCareerConnection: React.FC = () => {
  return (
    <Section
      variant="canvas"
      padding="lg"
      id="academic-career-connection"
      className="border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Programmes &amp; Career Pathways
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Connecting Academic Disciplines with Career Exploration
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            Degree programmes at ANRCAS are structured around Thiruvalluvar University syllabi to provide fundamental theoretical knowledge and practical capabilities. Each discipline supports exploratory pathways into professional industries and postgraduate research.
          </TextLead>
        </div>

        {/* Informational Guidance Notice */}
        <div className="mb-10 p-4 sm:p-5 rounded-lg border border-amber-200/80 bg-amber-50/60 flex items-start gap-3.5">
          <Info className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Informational Note: </span>
            The career directions outlined below represent potential areas of professional exploration and postgraduate progression aligned with course curricula. These illustrative pathways do not represent guaranteed placement offers or institutional recruitment assurances.
          </div>
        </div>

        {/* 6 Programme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMMES.map((programme) => {
            const pathway = CAREER_PATHWAYS[programme.slug]
            if (!pathway) return null

            return (
              <div
                key={programme.id}
                className={`flex flex-col justify-between p-6 rounded-xl border border-[var(--color-border)] bg-white shadow-xs hover:shadow-md transition-shadow duration-200 border-l-4 ${pathway.accentColor}`}
              >
                <div className="space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {programme.level} • {programme.durationYears} Years
                      </span>
                      <h3 className="text-lg font-bold text-[var(--color-primary)] leading-snug">
                        {programme.name}
                      </h3>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 shrink-0">
                      {pathway.icon}
                    </div>
                  </div>

                  {/* Discipline Focus */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pathway.focusArea}
                  </p>

                  {/* Career Exploration Areas */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Possible Career Directions
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {pathway.exploratoryFields.map((field, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)] mt-1.5 shrink-0" aria-hidden="true" />
                          <span>{field}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Further Study Opportunities */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Postgraduate &amp; Professional Options
                    </div>
                    <p className="text-xs text-slate-600 italic">
                      {pathway.furtherStudy.join(' • ')}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    to={`/programmes/${programme.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-secondary-dark)] transition-colors group"
                  >
                    <span>View Programme Curriculum</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
