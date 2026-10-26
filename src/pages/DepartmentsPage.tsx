import React, { useEffect } from 'react'
import {
  DepartmentsHero,
  DepartmentDirectory,
  DepartmentCategories,
  ProgrammeConnections,
  DepartmentsCTA,
} from '@/sections/departments'

export const DepartmentsPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Academic Departments | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Department Hero */}
      <DepartmentsHero />

      {/* SECTION 2: Department Directory */}
      <DepartmentDirectory />

      {/* SECTION 3: Academic Areas / Categories */}
      <DepartmentCategories />

      {/* SECTION 4: Programme Connections */}
      <ProgrammeConnections />

      {/* SECTION 5: Department CTA */}
      <DepartmentsCTA />
    </div>
  )
}
