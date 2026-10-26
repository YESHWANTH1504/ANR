import React, { useEffect } from 'react'
import {
  AboutHero,
  InstitutionalStory,
  VisionMission,
  EducationalApproach,
  FounderVision,
  AcademicAffiliation,
  AboutDepartments,
  AboutFacilities,
  StudentCommunity,
  AboutCTA,
} from '@/sections/about'

export const AboutPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'About ANRCAS | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Institutional Page Header */}
      <AboutHero />

      {/* SECTION 2: College Introduction & Founding Purpose */}
      <InstitutionalStory />

      {/* SECTION 4: Vision & Mission */}
      <VisionMission />

      {/* SECTION 5: Educational Philosophy & Values */}
      <EducationalApproach />

      {/* SECTION 6: Leadership, Founding Vision & Governance */}
      <FounderVision />

      {/* Academic Affiliation & University Standards */}
      <AcademicAffiliation />

      {/* SECTION 7: Academic Departments & Degree Pathways */}
      <AboutDepartments />

      {/* SECTION 8: College Facilities & Learning Spaces */}
      <AboutFacilities />

      {/* Student Community, NSS Outreach & Transit */}
      <StudentCommunity />

      {/* SECTION 9: Institutional Call to Action */}
      <AboutCTA />
    </div>
  )
}
