import React, { useEffect } from 'react'
import {
  PlacementsHero,
  PlacementSupport,
  AcademicCareerConnection,
  StudentReadiness,
  PlacementInformation,
  PlacementsCTA,
} from '@/sections/placements'

export const PlacementsPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Placements | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Placements Hero */}
      <PlacementsHero />

      {/* SECTION 2: Career Preparation / Placement Support */}
      <PlacementSupport />

      {/* SECTION 3: Academic-to-Career Connection */}
      <AcademicCareerConnection />

      {/* SECTION 4: Student Readiness Framework */}
      <StudentReadiness />

      {/* SECTION 5: Placement Information / Transparency Notice */}
      <PlacementInformation />

      {/* SECTION 6: Contact / Career Enquiry CTA */}
      <PlacementsCTA />
    </div>
  )
}
