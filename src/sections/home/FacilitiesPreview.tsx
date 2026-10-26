import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bus, CheckCircle2, Monitor, BookOpen, Mic } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import labImg from '@/assets/lab_students.webp'
import libImg from '@/assets/library_students.webp'
import seminarImg from '@/assets/gallery_seminar.webp'

interface LearningFacility {
  id: string
  name: string
  category: string
  description: string
  image: string
  alt: string
  icon: React.ReactNode
  highlights: string[]
}

const LEARNING_FACILITIES: LearningFacility[] = [
  {
    id: 'fac-computer-lab',
    name: 'Modern Computer Laboratory',
    category: 'Computing & Practical Learning',
    description:
      'Equipped with networked computer terminals, operating environments, and high-speed internet connectivity, supporting practical sessions in programming and database management.',
    image: labImg,
    alt: 'Students working at individual desktop workstations during computing laboratory practicals',
    icon: <Monitor className="h-4 w-4 text-[#082046]" aria-hidden="true" />,
    highlights: ['Networked desktop workstations', 'Modern operating environments', 'Scheduled practical sessions'],
  },
  {
    id: 'fac-library',
    name: 'College Library & Reading Room',
    category: 'Academic Resources & Study',
    description:
      'Houses university curricular textbooks, reference volumes, periodicals, and quiet reading desks supporting undergraduate and postgraduate inquiry.',
    image: libImg,
    alt: 'Students studying at central library tables with reference book stacks in the background',
    icon: <BookOpen className="h-4 w-4 text-[#082046]" aria-hidden="true" />,
    highlights: ['Subject textbooks & reference collection', 'Quiet study reading area', 'Periodicals & reference stacks'],
  },
  {
    id: 'fac-seminar-hall',
    name: 'Seminar & Conference Hall',
    category: 'Symposiums & Assemblies',
    description:
      'A multi-purpose hall equipped with audio-visual equipment, hosting academic symposiums, departmental guest lectures, student orientations, and cultural assemblies.',
    image: seminarImg,
    alt: 'Faculty, keynote presenters, and students participating in an academic symposium at ANRCAS',
    icon: <Mic className="h-4 w-4 text-[#082046]" aria-hidden="true" />,
    highlights: ['Audio-visual presentation equipment', 'Assembly seating capacity', 'Department symposium hosting'],
  },
]

export const FacilitiesPreview: React.FC = () => {
  return (
    <section
      id="facilities"
      aria-labelledby="facilities-section-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      <Container size="wide">
        {/* ==============================================================
            SECTION HEADER: Dignified Editorial Facilities Introduction
            ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
            <span>Campus Infrastructure</span>
          </div>

          <h2
            id="facilities-section-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082046] tracking-tight leading-[1.15]"
          >
            Facilities for Learning
          </h2>

          <div className="w-16 h-1 bg-[#E4B316] rounded-full mx-auto" aria-hidden="true" />

          <p className="font-sans text-slate-600 text-base sm:text-lg pt-1 leading-relaxed">
            A.N. Radhakrishnan College of Arts &amp; Science maintains purpose-built facilities designed to support university instruction, practical laboratory experiments, and independent inquiry in a disciplined rural campus setting.
          </p>
        </div>

        {/* ==============================================================
            FACILITIES GRID: 3 Core Learning Environments
            ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {LEARNING_FACILITIES.map((facility) => (
            <article
              key={facility.id}
              aria-labelledby={`facility-title-${facility.id}`}
              className="group flex flex-col justify-between bg-white rounded-lg border border-slate-200 hover:border-[#082046]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Authentic Facility Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                  <img
                    src={facility.image}
                    alt={facility.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"
                    aria-hidden="true"
                  />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/95 text-[#082046] border border-slate-200 rounded shadow-xs">
                      {facility.icon}
                      <span>{facility.category}</span>
                    </span>
                  </div>
                </div>

                {/* Facility Details */}
                <div className="p-6 space-y-3">
                  <h3
                    id={`facility-title-${facility.id}`}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#082046] group-hover:text-[#0C4DA2] transition-colors leading-snug"
                  >
                    {facility.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>

                  {/* Verified Features */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {facility.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#E4B316] shrink-0" aria-hidden="true" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to="/facilities"
                    className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#082046] group-hover:text-[#0C4DA2] transition-colors rounded py-1 focus-visible:outline-2 focus-visible:outline-[#E4B316]"
                    aria-label={`View details about ${facility.name}`}
                  >
                    <span>Explore Facility Details</span>
                    <ArrowRight className="h-4 w-4 text-[#E4B316] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ==============================================================
            SECTION CTA: Explore All Facilities
            ============================================================== */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/facilities"
            className="inline-flex items-center gap-2 px-6 py-3 rounded border-2 border-[#082046] text-[#082046] hover:bg-[#082046] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#E4B316]"
          >
            <span>Explore All Facilities</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* ==============================================================
            TRANSPORT SUBSECTION: Dedicated College Bus Transit Panel
            ============================================================== */}
        <div className="mt-16 sm:mt-20 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
                <Bus className="h-4 w-4 text-[#E4B316]" aria-hidden="true" />
                <span>Regional Connectivity</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082046] leading-snug">
                Dedicated College Bus Transit
              </h3>

              <p className="font-sans text-slate-600 text-sm sm:text-base leading-relaxed">
                To support commuting learners across the Cheyyar–Kanchipuram corridor and surrounding rural communities in Thiruvannamalai District, the college operates a dedicated bus transit network. Buses operate on scheduled timings coordinated with daily academic lecture hours.
              </p>

              {/* Verified Transport Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <span>Scheduled academic timings</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <span>Serving regional transit junctions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#E4B316] shrink-0" aria-hidden="true" />
                  <span>Rural &amp; town connectivity</span>
                </div>
              </div>
            </div>

            {/* Transport Action Box */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <span className="text-xs text-slate-500 lg:text-right max-w-xs">
                For current route stops and bus schedule details, contact the administrative office.
              </span>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded bg-[#082046] hover:bg-[#E4B316] text-white hover:text-[#082046] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#E4B316]"
              >
                <span>Transport Enquiries</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

