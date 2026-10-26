import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Laptop, GraduationCap, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import campusImg from '@/assets/campus_main.webp'
import labImg from '@/assets/lab_students.webp'
import libraryImg from '@/assets/library_students.webp'

interface ExperiencePillar {
  id: string
  category: string
  title: string
  description: string
  image: string
  alt: string
  icon: React.ReactNode
  highlights: string[]
}

const EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: 'subject-knowledge',
    category: 'Subject Knowledge',
    title: 'Curricular Foundations',
    description:
      'Undergraduate and postgraduate instruction follows Thiruvalluvar University Choice Based Credit System (CBCS) regulations. Six academic departments deliver structured syllabi across computing, mathematics, commerce, and language studies, fostering deep subject literacy.',
    image: campusImg,
    alt: 'A.N. Radhakrishnan College campus academic building in Vadamavandal',
    icon: <BookOpen className="h-4 w-4 text-[#082046]" aria-hidden="true" />,
    highlights: [
      'University-aligned CBCS curriculum',
      'Arts, science & commerce disciplines',
      'Structured semester course progression',
    ],
  },
  {
    id: 'learning-in-practice',
    category: 'Learning in Practice',
    title: 'Laboratory & Applied Sessions',
    description:
      'Practical learning is anchored in our computer laboratory. Students in computing and mathematical disciplines complete scheduled terminal practicals in software development, database systems, and problem-solving to reinforce theoretical lectures.',
    image: labImg,
    alt: 'Students engaged in practical programming work in the computer laboratory',
    icon: <Laptop className="h-4 w-4 text-[#082046]" aria-hidden="true" />,
    highlights: [
      'Dedicated workstation terminals',
      'Hands-on software practicals',
      'Applied problem-solving sessions',
    ],
  },
  {
    id: 'academic-development',
    category: 'Academic Development',
    title: 'Library Inquiry & Mentorship',
    description:
      'Independent scholarship is cultivated through the college library and reading room, offering curricular textbooks, reference volumes, and quiet study desks. Continuous assessments and faculty guidance support student academic progression.',
    image: libraryImg,
    alt: 'Students reading curricular textbooks and reference materials in the college library',
    icon: <GraduationCap className="h-4 w-4 text-[#082046]" aria-hidden="true" />,
    highlights: [
      'Subject textbooks & reference collection',
      'Continuous internal assessments',
      'Dedicated faculty academic guidance',
    ],
  },
]

export const AcademicExperience: React.FC = () => {
  return (
    <section
      id="academic-experience"
      aria-labelledby="academic-experience-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
    >
      <Container size="wide">
        {/* ==============================================================
            SECTION HEADER: Dignified Editorial Academic Introduction
            ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
            <span>The Academic Experience</span>
          </div>

          <h2
            id="academic-experience-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082046] tracking-tight leading-[1.15]"
          >
            Building Knowledge, Skills and Confidence
          </h2>

          <div className="w-16 h-1 bg-[#E4B316] rounded-full mx-auto" aria-hidden="true" />

          <p className="font-sans text-slate-600 text-base sm:text-lg pt-1 leading-relaxed">
            At A.N. Radhakrishnan College of Arts &amp; Science, higher education balances structured university curricula with disciplined inquiry and practical preparation. Affiliated with Thiruvalluvar University, Vellore, our academic environment enables learners across six teaching departments to cultivate sound theoretical foundations, technical capability, and ethical responsibility.
          </p>
        </div>

        {/* ==============================================================
            3 SUPPORTING CONTENT BLOCKS: Responsive 3-Column Editorial Grid
            ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {EXPERIENCE_PILLARS.map((pillar) => (
            <article
              key={pillar.id}
              aria-labelledby={`experience-pillar-${pillar.id}`}
              className="group flex flex-col justify-between bg-[#F8FAFC] rounded-lg border border-slate-200 hover:border-[#082046]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Authentic Verified Photograph */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-200">
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
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
                      {pillar.icon}
                      <span>{pillar.category}</span>
                    </span>
                  </div>
                </div>

                {/* Card Editorial Content */}
                <div className="p-6 space-y-3">
                  <h3
                    id={`experience-pillar-${pillar.id}`}
                    className="font-serif text-xl sm:text-2xl font-bold text-[#082046] leading-snug group-hover:text-[#0C4DA2] transition-colors"
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  {/* Verified Highlights List */}
                  <div className="pt-3 border-t border-slate-200/80 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Key Academic Aspects:
                    </span>
                    <ul className="space-y-1.5">
                      {pillar.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#E4B316] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ==============================================================
            UNDERSTATED SECTION CTA: Explore Academic Departments
            ============================================================== */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/academics"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded border-2 border-[#082046] text-[#082046] hover:bg-[#082046] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#E4B316]"
          >
            <span>Explore Academic Departments</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
