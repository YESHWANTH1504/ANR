import React, { useEffect } from 'react'
import {
  AcademicsHero,
  AcademicFramework,
  StudyLevels,
  ProgrammeDiscovery,
  LearningApproach,
  DepartmentsPreview,
  AcademicsCTA,
} from '@/sections/academics'

export const AcademicsPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Academics | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Academic Hero */}
      <AcademicsHero />

      {/* SECTION 2: Academic Framework */}
      <AcademicFramework />

      {/* SECTION 3: Undergraduate & Postgraduate Study */}
      <StudyLevels />

      {/* SECTION 4: Programme Discovery */}
      <ProgrammeDiscovery />

      {/* SECTION 5: Learning Approach */}
      <LearningApproach />

      {/* SECTION 6: Academic Departments Preview */}
      <DepartmentsPreview />

      {/* SECTION 7: Academic Journey CTA */}
      <AcademicsCTA />
    </div>
  )
}
