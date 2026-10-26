import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  MapPin,
  Radio,
} from 'lucide-react'
import campusMainImg from '@/assets/campus_building.jpg'
import { Container } from '@/components/shared/Container'
import { publicService } from '@/api/services/publicService'

export const HeroSection: React.FC = () => {
  const [notice, setNotice] = useState<string>(
    'ADMISSIONS 2026–2027: Application portals active for UG & PG Degree Programmes.'
  )

  useEffect(() => {
    publicService
      .getSiteSettings()
      .then((settings) => {
        if (settings?.campus_notice) {
          setNotice(settings.campus_notice)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="w-full">
      {/* ==============================================================
          1. TOP CAMPUS NOTICE / BROADCAST TICKER BAR
          ============================================================== */}
      <div className="bg-[#082046] text-white text-xs sm:text-[13px] font-medium py-2 px-4 border-b border-[#0C4DA2]/30">
        <Container size="wide">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/15 text-white text-[11px] font-extrabold uppercase tracking-wider">
                <Bell className="h-3 w-3 text-white" aria-hidden="true" />
                Campus Notice
              </span>
              <span className="inline-flex items-center gap-1.5 text-white/90">
                <Radio className="h-3 w-3 text-sky-300 animate-pulse" aria-hidden="true" />
                <span>{notice}</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-4 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#E4B316]" aria-hidden="true" />
                Vadamavandal, Tamil Nadu
              </span>
              <span className="text-white/30">•</span>
              <span>Affiliated to Thiruvalluvar University</span>
            </div>
          </div>
        </Container>
      </div>

      {/* ==============================================================
          2. HERO SECTION WITH FULL-BLEED BACKGROUND & OVERLAID CONTENT
          Unobstructed background image with clear typography on left
          ============================================================== */}
      <section
        aria-labelledby="hero-headline"
        className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-slate-950 text-white py-12 sm:py-16 lg:py-20"
      >
        {/* Full-Bleed Campus Building Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={campusMainImg}
            alt="A.N. Radhakrishnan College of Arts & Science main campus building in Vadamavandal"
            fetchPriority="high"
            className="w-full h-full object-cover object-center lg:object-[center_35%]"
          />

          {/* Contrast scrim & vignette to guarantee text readability while keeping the building vibrant */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"
            aria-hidden="true"
          />
        </div>

        {/* Hero Content Container */}
        <Container size="wide" className="relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            {/* Display Typography & Text Content */}
            <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5 text-left">
              {/* College Tag Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-xs sm:text-[13px] font-semibold text-white shadow-md">
                <span className="h-2 w-2 rounded-full bg-[#E4B316] animate-pulse" aria-hidden="true" />
                <span>A.N. Radhakrishnan College of Arts &amp; Science</span>
              </div>

              {/* Huge Bold Headline Overlaid Directly on Background Image */}
              <div>
                <h1
                  id="hero-headline"
                  className="font-serif text-4xl sm:text-6xl lg:text-[70px] font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-md"
                >
                  Campus <br />
                  <span className="text-[#E4B316]">Excellence</span>
                </h1>

                <p className="font-serif text-xl sm:text-2xl font-bold text-slate-100 tracking-wide mt-2 drop-shadow-sm">
                  Learn. Explore. Achieve.
                </p>
              </div>

              {/* Supporting Text Paragraphs Overlaid on Image */}
              <div className="space-y-2.5 text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow-xs">
                <p>
                  A higher education institution under Meenakshi Ammal Trust offering Thiruvalluvar University degree programmes across computing, commerce, mathematics, and languages.
                </p>
                <p>
                  Empowering rural youth through practical laboratory training, central library study, faculty mentorship, and free college bus transit across surrounding villages.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/programmes"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 px-7 py-3 rounded-[var(--radius-sm)] bg-[#E4B316] hover:bg-[#D4A30B] active:bg-[#C29309] text-[#082046] font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Programmes</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  to="/admissions"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6.5 py-3 rounded-[var(--radius-sm)] bg-white/15 hover:bg-white/25 active:bg-white/30 text-white border border-white/30 font-bold text-sm backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md"
                >
                  <span>Admissions 2026–27</span>
                </Link>
              </div>
            </div>

            {/* Campus Location Footnote Pill */}
            <div className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg shrink-0">
              <MapPin className="h-3.5 w-3.5 text-[#E4B316]" aria-hidden="true" />
              <span>Main Academic Block • Vadamavandal Campus</span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}


