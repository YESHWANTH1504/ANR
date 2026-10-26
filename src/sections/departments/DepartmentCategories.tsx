import { Code, Globe, Landmark } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { DEPARTMENTS } from '@/data/departments'

export const DepartmentCategories: React.FC = () => {
  const scienceDepts = DEPARTMENTS.filter((d) => d.category === 'Science')
  const commerceDepts = DEPARTMENTS.filter((d) => d.category === 'Commerce & Management')
  const languageDepts = DEPARTMENTS.filter((d) => d.category === 'Languages')

  const CATEGORIES = [
    {
      title: 'Computing & Mathematical Sciences',
      icon: <Code className="h-5 w-5 text-[var(--color-secondary-dark)]" />,
      description: 'Focuses on analytical reasoning, software algorithms, hardware-software integration, and pure/applied mathematical logic.',
      departments: scienceDepts,
    },
    {
      title: 'Commerce & Business Studies',
      icon: <Landmark className="h-5 w-5 text-[var(--color-accent-dark)]" />,
      description: 'Covers financial accounting, taxation, company law, secretarial compliance, and managerial organizational strategy.',
      departments: commerceDepts,
    },
    {
      title: 'Languages & Humanities',
      icon: <Globe className="h-5 w-5 text-emerald-600" />,
      description: 'Cultivates literary appreciation, classical cultural heritage, and professional bilingual communication in Tamil and English.',
      departments: languageDepts,
    },
  ]

  return (
    <Section variant="subtle" padding="lg" id="categories" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)]">
            Discipline Groupings
          </EditorialLabel>
          <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Academic Areas &amp; Streams
          </H2>
          <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
            Academic departments at ANRCAS are organized across three primary disciplinary clusters.
          </TextLead>
        </div>

        {/* Categories 3-Column Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[var(--radius-lg)] bg-white border border-[var(--color-border)] flex flex-col justify-between shadow-2xs hover:border-[var(--color-secondary)] transition-colors"
            >
              <div>
                <div className="p-2.5 w-fit rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] border border-slate-200 mb-4">
                  {cat.icon}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-2">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Constituent Departments
                </span>
                <ul className="space-y-1 text-xs font-semibold text-[var(--color-primary)]">
                  {cat.departments.map((d) => (
                    <li key={d.id} className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary)] shrink-0" />
                      <span>{d.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
