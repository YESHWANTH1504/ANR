import React, { useEffect } from 'react'
import {
  ProgrammesHero,
  ProgrammeCatalogue,
  ProgrammeDiscovery,
  ProgrammesCTA,
} from '@/sections/programmes'

export const ProgrammesPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Programmes | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Programme Hero */}
      <ProgrammesHero />

      {/* SECTION 2: Programme Catalogue with Level Navigation & Search */}
      <ProgrammeCatalogue />

      {/* SECTION 3: Programme Discovery Guidance */}
      <ProgrammeDiscovery />

      {/* SECTION 4: Admissions CTA */}
      <ProgrammesCTA />
    </div>
  )
}
