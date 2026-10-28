import React, { useEffect } from 'react'
import {
  HeroSection,
  InstitutionalFacts,
  AcademicProgrammes,
  AcademicExperience,
  CampusLifeGallery,
  FacilitiesPreview,
  NewsEvents,
  AdmissionsCTA,
} from '@/sections/home'

export const HomePage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'A.N. Radhakrishnan College of Arts & Science | Vadamavandal'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Header & Navigation (rendered by BaseLayout) */}

      {/* 2. Hero */}
      <HeroSection />

      {/* 3. Announcements & Quick Links */}
      <InstitutionalFacts />

      {/* 4. Programmes & Departments */}
      <AcademicProgrammes />

      {/* 5. Academic Experience */}
      <AcademicExperience />

      {/* 6. Student Life & Campus Gallery */}
      <CampusLifeGallery />

      {/* 7. Facilities & Transport */}
      <FacilitiesPreview />

      {/* 8. News & Events */}
      <NewsEvents />

      {/* 9. Admissions Conversion CTA */}
      <AdmissionsCTA />

      {/* 10. Footer (rendered by BaseLayout) */}
    </div>
  )
}
