import React, { useEffect } from 'react'
import {
  CampusLifeHero,
  CampusLifeOverview,
  CampusExperience,
  CampusFacilitiesPreview,
  StudentActivities,
  CampusLifeCTA,
} from '@/sections/campus-life'

export const CampusLifePage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Campus Life | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Campus Life Hero */}
      <CampusLifeHero />

      {/* SECTION 2: Campus Life Overview */}
      <CampusLifeOverview />

      {/* SECTION 3: The ANRCAS Student Experience */}
      <CampusExperience />

      {/* SECTION 4: Facilities Preview */}
      <CampusFacilitiesPreview />

      {/* SECTION 5: Student Engagement & Extension Activities */}
      <StudentActivities />

      {/* SECTION 6: Campus Life Closing CTA */}
      <CampusLifeCTA />
    </div>
  )
}
