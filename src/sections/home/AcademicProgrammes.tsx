import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, BookOpen, Layers } from 'lucide-react'
import labImg from '@/assets/lab_students.webp'
import progMaths from '@/assets/prog_maths.webp'
import progBcom from '@/assets/prog_bcom.webp'
import progBba from '@/assets/prog_bba.webp'
import { Container } from '@/components/shared/Container'
import { PROGRAMMES } from '@/data/programmes'
import { DEPARTMENTS } from '@/data/departments'

const PROGRAMME_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  'computer-science': {
    src: labImg,
    alt: 'Students in Computer Science Laboratory',
  },
  mathematics: {
    src: progMaths,
    alt: 'Students engaged in Mathematics Instruction',
  },
  bcom: {
    src: progBcom,
    alt: 'Commerce Students in Academic Discussion',
  },
  'corporate-secretaryship': {
    src: progBcom,
    alt: 'Corporate Secretaryship Students in Business Class',
  },
  bba: {
    src: progBba,
    alt: 'Management Studies Students in Interactive Session',
  },
  mcom: {
    src: progBcom,
    alt: 'Postgraduate Commerce Students in Research and Academic Study',
  },
}

export const AcademicProgrammes: React.FC = () => {
  return (
    <section
      id="programmes"
      aria-labelledby="programmes-section-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      {/* Hidden anchor to maintain compatibility with #departments navigation */}
      <span id="departments" className="sr-only" aria-hidden="true" />

      <Container size="wide">
        {/* ==============================================================
            SECTION HEADER: Editorial Academic Introduction
            ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
            <span>ACADEMICS AT ANR</span>
          </div>

          <h2
            id="programmes-section-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082046] tracking-tight leading-[1.15]"
          >
            Explore Our Programmes
          </h2>

          <div className="w-16 h-1 bg-[#E4B316] rounded-full mx-auto" aria-hidden="true" />

          <p className="font-sans text-slate-600 text-base sm:text-lg pt-1 leading-relaxed">
            Discover our range of undergraduate and postgraduate degree programmes affiliated with Thiruvalluvar University, Vellore. Each curriculum combines university-aligned academic rigor with practical laboratory work and foundational career competencies.
          </p>
        </div>

        {/* ==============================================================
            PROGRAMME CATALOGUE: 6 Verified Course Cards (3x2 Desktop Grid)
            ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PROGRAMMES.map((programme) => {
            const isPg = programme.level === 'PG'
            const imageData = PROGRAMME_IMAGE_MAP[programme.slug] || {
              src: progBcom,
              alt: `${programme.name} course overview`,
            }

            return (
              <article
                key={programme.id}
                aria-labelledby={`programme-title-${programme.id}`}
                className="group flex flex-col justify-between bg-white rounded-lg border border-slate-200 hover:border-[#082046]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Authentic Visual Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                    <img
                      src={imageData.src}
                      alt={imageData.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-70"
                      aria-hidden="true"
                    />

                    {/* Degree Level Badge */}
                    <div className="absolute top-3 left-3">
                      {isPg ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#E4B316] text-[#082046] rounded shadow-xs">
                          <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Postgraduate (PG)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/95 text-[#082046] border border-slate-200 rounded shadow-xs">
                          <BookOpen className="h-3.5 w-3.5 text-[#082046]" aria-hidden="true" />
                          <span>Undergraduate (UG)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {programme.departmentName}
                    </div>

                    <h3
                      id={`programme-title-${programme.id}`}
                      className="font-serif text-xl sm:text-2xl font-bold text-[#082046] group-hover:text-[#0C4DA2] transition-colors leading-snug"
                    >
                      {programme.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {programme.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      to={`/programmes/${programme.slug}`}
                      className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold uppercase tracking-wider text-[#082046] group-hover:text-[#0C4DA2] transition-colors rounded py-1 focus-visible:outline-2 focus-visible:outline-[#E4B316]"
                      aria-label={`View programme details for ${programme.name}`}
                    >
                      <span>View Programme Details</span>
                      <ArrowRight className="h-4 w-4 text-[#E4B316] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* ==============================================================
            SECTION CTA: View All Programmes
            ============================================================== */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded bg-[#082046] hover:bg-[#E4B316] text-white hover:text-[#082046] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#E4B316]"
          >
            <span>View All Programmes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* ==============================================================
            DEPARTMENT DISCOVERY: Visually Secondary Compact Directory
            ============================================================== */}
        <div className="mt-16 sm:mt-20 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046] mb-1.5">
                <Layers className="h-3.5 w-3.5 text-[#E4B316]" aria-hidden="true" />
                <span>Academic Departments</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082046]">
                Academic Department Directory
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Explore our six verified academic departments guiding instructional delivery, practical laboratories, and university curriculum standards.
              </p>
            </div>

            <Link
              to="/academics"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#082046] hover:text-[#0C4DA2] shrink-0 focus-visible:outline-2 focus-visible:outline-[#E4B316]"
            >
              <span>Explore All Departments</span>
              <ArrowRight className="h-4 w-4 text-[#E4B316]" aria-hidden="true" />
            </Link>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {DEPARTMENTS.map((dept) => (
              <Link
                key={dept.id}
                to="/academics"
                className="group p-4 rounded-lg bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-[#082046]/40 hover:shadow-xs transition-all flex items-start gap-3.5 focus-visible:outline-2 focus-visible:outline-[#E4B316]"
              >
                <div className="w-10 h-10 rounded bg-[#082046]/5 text-[#082046] border border-[#082046]/10 font-bold text-xs flex items-center justify-center shrink-0 group-hover:bg-[#082046] group-hover:text-white transition-colors">
                  {dept.code}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-[#082046] group-hover:text-[#0C4DA2] transition-colors truncate">
                      {dept.name}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-[#E4B316] group-hover:translate-x-0.5 transition-all shrink-0" aria-hidden="true" />
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    Category: {dept.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Institutional Note */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>All degree programmes and curricula are governed under Thiruvalluvar University regulations.</span>
            <Link
              to="/academics"
              className="font-semibold text-[#082046] hover:underline focus-visible:outline-2 focus-visible:outline-[#E4B316]"
            >
              Learn about our academic structure &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}

