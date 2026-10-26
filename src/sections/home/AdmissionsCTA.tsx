import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, Phone, CheckCircle2, Clock } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { COLLEGE_INFO } from '@/data/college'

export const AdmissionsCTA: React.FC = () => {
  return (
    <section
      id="admissions-cta"
      aria-labelledby="admissions-cta-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#082046] text-white relative overflow-hidden border-t border-[#E4B316]/20"
    >
      {/* Subtle institutional background texture & radial accent glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E4B316]/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <Container size="default" className="relative z-10 max-w-4xl text-center">
        {/* Section Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#E4B316] bg-[#E4B316]/10 border border-[#E4B316]/30 mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
          <span>Admissions</span>
        </div>

        {/* Primary Heading */}
        <h2
          id="admissions-cta-heading"
          className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]"
        >
          Take the Next Step Toward Your Future
        </h2>

        {/* Antique Gold Divider */}
        <div className="w-16 h-1 bg-[#E4B316] rounded-full mx-auto mt-4" aria-hidden="true" />

        {/* Verified Factual Narrative */}
        <p className="mt-5 font-sans text-stone-200 text-base sm:text-lg lg:text-[19px] max-w-2xl mx-auto leading-relaxed font-normal">
          Explore our Thiruvalluvar University-affiliated undergraduate and postgraduate degree programmes. Learn about the admission process, review course curricula across science, commerce, management, and languages, and connect with our admissions desk for enrollment guidance.
        </p>

        {/* Action Suite: Primary, Secondary, and Enquiry CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mt-8 sm:mt-10">
          <Link
            to="/admissions"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 rounded px-7 py-3.5 bg-[#E4B316] hover:bg-white text-[#082046] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Explore admissions information and process"
          >
            <GraduationCap className="h-4.5 w-4.5 text-[#082046]" aria-hidden="true" />
            <span>Explore Admissions</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            to="/programmes"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2.5 rounded px-6 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 backdrop-blur-xs transition-all hover:border-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Explore degree programmes and departments"
          >
            <BookOpen className="h-4.5 w-4.5 text-[#E4B316]" aria-hidden="true" />
            <span>Explore Programmes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 rounded px-5 py-3.5 bg-transparent hover:bg-white/10 text-stone-300 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider border border-white/10 hover:border-white/30 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Contact the admissions desk for enquiries"
          >
            <Phone className="h-4 w-4 text-[#E4B316]" aria-hidden="true" />
            <span>Contact Admissions Desk</span>
          </Link>
        </div>

        {/* Institutional Contact Strip & Verified Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/15">
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-8 text-xs sm:text-sm text-stone-300 font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
              <span>Thiruvalluvar University Affiliated</span>
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
              <span>Arts, Science &amp; Commerce Degrees</span>
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#E4B316] shrink-0" aria-hidden="true" />
              <span>Dedicated College Bus Transit</span>
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-stone-400">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#E4B316]" aria-hidden="true" />
              <span>Admissions Desk: Mon – Sat, 9:00 AM – 5:00 PM</span>
            </span>
            <span className="hidden sm:inline text-white/20" aria-hidden="true">•</span>
            <span>
              Helpline:{' '}
              <a
                href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="font-semibold text-stone-200 hover:text-[#E4B316] transition-colors underline decoration-white/30 underline-offset-2 focus-visible:outline-1 focus-visible:outline-white"
                aria-label={`Call Admissions Desk helpline at ${COLLEGE_INFO.contact.primaryPhone}`}
              >
                {COLLEGE_INFO.contact.primaryPhone}
              </a>
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}


