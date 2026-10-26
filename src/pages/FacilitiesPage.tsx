import React, { useEffect } from 'react'
import {
  FacilitiesHero,
  FacilityFeature,
  FacilitiesDirectory,
  FacilitiesCTA,
} from '@/sections/facilities'

export const FacilitiesPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Facilities | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Facilities Hero */}
      <FacilitiesHero />

      {/* SECTION 2: Key Academic Learning Spaces Spotlight */}
      <FacilityFeature />

      {/* SECTION 3: Complete Verified Facilities Directory */}
      <FacilitiesDirectory />

      {/* SECTION 4: Facilities Closing CTA */}
      <FacilitiesCTA />
    </div>
  )
}
