import React, { useEffect } from 'react'
import {
  ContactHero,
  ContactInformation,
  ContactForm,
  ContactLocation,
  VisitCampus,
  ContactPathways,
  ContactCTA,
} from '@/sections/contact'

export const ContactPage: React.FC = () => {
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Contact | A.N. Radhakrishnan College of Arts & Science'

    const metaDescription = document.querySelector('meta[name="description"]')
    const originalDescription = metaDescription?.getAttribute('content') ?? ''
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Contact A.N. Radhakrishnan College of Arts & Science in Vadamavandal, Thiruvannamalai District, Tamil Nadu.'
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
      {/* SECTION 1: Editorial Contact Hero */}
      <ContactHero />

      {/* SECTION 2: Official Contact Information Directory (Ivory) */}
      <ContactInformation />

      {/* SECTION 3: Enquiry Form Experience (Paper/White) */}
      <ContactForm />

      {/* SECTION 4: Campus Location Dossier (Deep Ink) */}
      <ContactLocation />

      {/* SECTION 5: Plan Your Visit Touchpoints (Sand) */}
      <VisitCampus />

      {/* SECTION 6: Dedicated Enquiry Pathways (White) */}
      <ContactPathways />

      {/* SECTION 7: Closing Institutional CTA (Deep Ink) */}
      <ContactCTA />
    </div>
  )
}

