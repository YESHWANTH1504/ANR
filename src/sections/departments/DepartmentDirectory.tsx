import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { DEPARTMENTS, type Department } from '@/data/departments'
import { PROGRAMMES } from '@/data/programmes'
import { publicService } from '@/api/services/publicService'

export const DepartmentDirectory: React.FC = () => {
  const [departmentList, setDepartmentList] = useState<Department[]>(DEPARTMENTS)

  useEffect(() => {
    publicService
      .getDepartments()
      .then((data) => {
        if (data && data.length > 0) {
          setDepartmentList(
            data.map((d) => {
              const staticMatch = DEPARTMENTS.find((item) => item.id === d.id || item.slug === d.slug)
              return {
                id: d.id,
                name: d.name,
                slug: d.slug,
                code: d.code,
                overview: d.overview,
                category: (d.category as Department['category']) || 'Science',
                programmesOffered: staticMatch?.programmesOffered || [],
              }
            })
          )
        }
      })
      .catch(() => {
        // Fall back gracefully to verified initial departments
      })
  }, [])

  // Helper to find slug for a programme name
  const findProgrammeSlug = (progName: string): string | undefined => {
    const match = PROGRAMMES.find((p) =>
      p.name.toLowerCase().includes(progName.toLowerCase()) ||
      progName.toLowerCase().includes(p.name.toLowerCase()) ||
      (progName.includes('Corporate Secretaryship') && p.slug === 'corporate-secretaryship') ||
      (progName.includes('BBA') && p.slug === 'bba') ||
      (progName.includes('M.Com') && p.slug === 'mcom')
    )
    return match?.slug
  }

  return (
    <Section variant="card" padding="lg" id="directory" className="bg-white border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)]">
            Academic Roster
          </EditorialLabel>
          <H2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Department Directory
          </H2>
          <TextLead className="mt-2 text-slate-600 text-sm sm:text-base">
            Detailed overview of all 6 academic departments, their discipline focus, and affiliated degree offerings.
          </TextLead>
        </div>

        {/* Prospectus Directory List */}
        <div className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {departmentList.map((dept, index) => {
            const indexNumber = String(index + 1).padStart(2, '0')

            return (
              <div
                key={dept.id}
                className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start group hover:bg-slate-50/50 transition-colors px-2 sm:px-4 rounded-[var(--radius-lg)]"
              >
                {/* Left: Department Number & Code */}
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start justify-between gap-3">
                  <span className="editorial-number text-4xl lg:text-5xl text-[var(--color-gold)]">
                    {indexNumber}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-[var(--color-sand)]/50 text-[var(--color-ink)] border border-[var(--color-border)]">
                    Code: {dept.code}
                  </span>
                </div>

                {/* Center: Department Title, Category & Overview */}
                <div className="lg:col-span-6 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                      {dept.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors tracking-tight">
                    {dept.name}
                  </h3>

                  <p className="text-[var(--color-muted)] text-sm sm:text-base leading-relaxed max-w-2xl font-light">
                    {dept.overview}
                  </p>
                </div>

                {/* Right: Programmes & Direct Actions */}
                <div className="lg:col-span-4 bg-[var(--color-paper)] p-4 sm:p-5 border border-[var(--color-border)] space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-ink)] uppercase tracking-wider">
                    <GraduationCap className="h-4 w-4 text-[var(--color-gold)]" />
                    <span>Affiliated Programmes</span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm font-medium text-[var(--color-charcoal)]">
                    {dept.programmesOffered.map((prog, pIdx) => {
                      const slug = findProgrammeSlug(prog)

                      return (
                        <li key={pIdx} className="flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] shrink-0" />
                            <span>{prog}</span>
                          </span>

                          {slug && (
                            <Link
                              to={`/programmes/${slug}`}
                              className="text-xs sm:text-sm font-bold text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)] inline-flex items-center gap-1 shrink-0 group"
                            >
                              <span>Explore</span>
                              <ArrowRight className="h-3.5 w-3.5 arrow-nudge" />
                            </Link>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
