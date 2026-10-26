import React, { useState, useMemo } from 'react'
import { BookOpen } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { PROGRAMMES, type Programme } from '@/data/programmes'
import { ProgrammeCard } from './ProgrammeCard'
import { ProgrammeFilters, type LevelFilter } from './ProgrammeFilters'

export const ProgrammeCatalogue: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<LevelFilter>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const ugCount = useMemo(() => PROGRAMMES.filter((p) => p.level === 'UG').length, [])
  const pgCount = useMemo(() => PROGRAMMES.filter((p) => p.level === 'PG').length, [])

  const filteredProgrammes = useMemo(() => {
    return PROGRAMMES.filter((prog: Programme) => {
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
  }, [activeLevel, searchQuery])

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
          totalCount={PROGRAMMES.length}
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
