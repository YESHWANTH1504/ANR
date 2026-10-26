import React, { useEffect } from 'react'
import {
  HeroSection,
  InstitutionalFacts,
  AboutPreview,
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

      {/* 4. About ANR */}
      <AboutPreview />

      {/* 5. Programmes & Departments */}
      <AcademicProgrammes />

      {/* 6. Academic Experience */}
      <AcademicExperience />

      {/* 7. Student Life & Campus Gallery */}
      <CampusLifeGallery />

      {/* 8. Facilities & Transport */}
      <FacilitiesPreview />

      {/* 9. News & Events */}
      <NewsEvents />

      {/* 10. Admissions Conversion CTA */}
      <AdmissionsCTA />

      {/* 11. Footer (rendered by BaseLayout) */}
    </div>
  )
}
