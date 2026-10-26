import React, { useEffect } from 'react'
import {
  LeadershipHero,
  FounderFeature,
  LeadershipMessage,
  LeadershipImageBreak,
  InstitutionalGovernance,
  LeadershipPathways,
  LeadershipCTA,
} from '@/sections/leadership'

export const LeadershipPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Leadership | A.N. Radhakrishnan College of Arts & Science'

    const metaDescription = document.querySelector('meta[name="description"]')
    const originalDescription = metaDescription?.getAttribute('content') ?? ''
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Learn about the verified leadership and institutional vision of A.N. Radhakrishnan College of Arts & Science.'
      )
    }

    window.scrollTo({ top: 0, behavior: 'instant' })

    return () => {
      document.title = originalTitle
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription)
      }
    }
  }, [])

  return (
    <div className="w-full">
      {/* SECTION 1: Leadership & Vision Hero (Deep Ink) */}
      <LeadershipHero />

      {/* SECTION 2: Founder Feature & Purpose (Ivory) */}
      <FounderFeature />

      {/* SECTION 3: Verified Founder Message (Paper) */}
      <LeadershipMessage />

      {/* SECTION 4: Photographic Campus Break (Full-Bleed Image) */}
      <LeadershipImageBreak />

      {/* SECTION 5: Institutional Governance & Affiliation (Sand) */}
      <InstitutionalGovernance />

      {/* SECTION 6: Leadership & Institutional Pathways (White) */}
      <LeadershipPathways />

      {/* SECTION 7: Closing Action CTA (Deep Ink) */}
      <LeadershipCTA />
    </div>
  )
}
