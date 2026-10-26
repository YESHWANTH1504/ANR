import React, { useEffect } from 'react'
import {
  AdmissionsHero,
  AdmissionJourney,
  AdmissionsProgrammes,
  StudyLevels,
  WhyANRCAS,
  AdmissionsInformation,
  AdmissionsEnquirySection,
  AdmissionsCTA,
} from '@/sections/admissions'

export const AdmissionsPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Admissions | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Admissions Hero */}
      <AdmissionsHero />

      {/* SECTION 2: Admission Journey (Prospective Student Guidance) */}
      <AdmissionJourney />

      {/* SECTION 3: Explore Available Programmes */}
      <AdmissionsProgrammes />

      {/* SECTION 4: Undergraduate & Postgraduate Paths */}
      <StudyLevels />

      {/* SECTION 5: Why Explore ANRCAS (Verified Institutional Grounding) */}
      <WhyANRCAS />

      {/* SECTION 6: Admission Information / Verified Contact Notice */}
      <AdmissionsInformation />

      {/* SECTION 7: Online Admissions Enquiry & Registration Form */}
      <AdmissionsEnquirySection />

      {/* SECTION 8: Contact / Enquiry Final CTA */}
      <AdmissionsCTA />
    </div>
  )
}
