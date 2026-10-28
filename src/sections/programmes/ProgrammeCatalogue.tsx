import React, { useState, useMemo, useEffect } from 'react'
import { BookOpen } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { PROGRAMMES, type Programme } from '@/data/programmes'
import { ProgrammeCard } from './ProgrammeCard'
import { ProgrammeFilters, type LevelFilter } from './ProgrammeFilters'
import { publicService } from '@/api/services/publicService'

export const ProgrammeCatalogue: React.FC = () => {
  const [programmesList, setProgrammesList] = useState<Programme[]>(PROGRAMMES)
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    publicService
      .getProgrammes()
      .then((data) => {
        if (data && data.length > 0) {
          setProgrammesList(
            data.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              degree: p.degree,
              level: (p.level as Programme['level']) || 'UG',
              departmentId: p.department_id,
              departmentName: p.department_name || '',
              durationYears: p.duration_years,
              description: p.description,
              overview: p.overview,
            }))
          )
        }
      })
      .catch(() => {
        // Fall back gracefully to verified initial programmes
      })
  }, [])

  const ugCount = useMemo(() => programmesList.filter((p) => p.level === 'UG').length, [programmesList])
  const pgCount = useMemo(() => programmesList.filter((p) => p.level === 'PG').length, [programmesList])

  const filteredProgrammes = useMemo(() => {
    return programmesList.filter((prog: Programme) => {
      // Level check
      if (activeLevel !== 'ALL' && prog.level !== activeLevel) {
        return false
      }

      // Search query check (name, department, description, degree)
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = prog.name.toLowerCase().includes(q)
        const matchDept = prog.departmentName.toLowerCase().includes(q)
        const matchDesc = prog.description.toLowerCase().includes(q)
        const matchDegree = prog.degree.toLowerCase().includes(q)
        return matchName || matchDept || matchDesc || matchDegree
      }

      return true
    })
  }, [programmesList, activeLevel, searchQuery])

  const handleReset = () => {
    setActiveLevel('ALL')
    setSearchQuery('')
  }

  return (
    <Section variant="card" padding="lg" id="catalogue" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        <h2 className="sr-only">Academic Programme Catalogue</h2>

        {/* Filter & Search Bar */}
        <ProgrammeFilters
          activeLevel={activeLevel}
          onLevelChange={setActiveLevel}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalCount={programmesList.length}
          filteredCount={filteredProgrammes.length}
          ugCount={ugCount}
          pgCount={pgCount}
        />

        {/* Programme Grid or Empty State */}
        {filteredProgrammes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProgrammes.map((programme, idx) => (
              <ProgrammeCard key={programme.id} programme={programme} index={idx} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="h-6 w-6 text-slate-400" />}
            title="No Matching Programmes Found"
            description={`No degree programmes matched your search "${searchQuery}". Please check your query or clear the filter.`}
            action={
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset All Filters
              </Button>
            }
            className="my-8"
          />
        )}
      </Container>
    </Section>
  )
}
