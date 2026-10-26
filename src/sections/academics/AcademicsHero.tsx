import React from 'react'
import { Award, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react'
import labImg from '@/assets/lab_students.webp'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const AcademicsHero: React.FC = () => {
  return (
    <section className="relative bg-white border-b border-slate-200 overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumbs */}
        <Breadcrumb
          items={[{ label: 'Academics' }]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Academic Heading & Scope */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="collegiate-eyebrow text-[#0C4DA2]">
                Academic Catalog • UGC / CBCS
              </div>

              {/* Single Primary H1 for Academics Page */}
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.12] tracking-tight">
                Academic Disciplines Structured for Depth &amp; Practical Capability
              </h1>

              <p className="mt-4 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                At <strong className="font-semibold text-slate-900">{COLLEGE_INFO.name}</strong>, academic study is organized under the Choice Based Credit System (CBCS) of <strong className="font-semibold text-slate-900">{COLLEGE_INFO.affiliation}</strong>. We deliver disciplined undergraduate and postgraduate degree programmes across Science, Commerce, Management, and Languages at our college premises in Vadamavandal.
              </p>

              {/* Academic Credential Badges */}
              <div className="pt-6 mt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-[15px] text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-[#0C4DA2] shrink-0" aria-hidden="true" />
                  <span>Thiruvalluvar University Syllabi</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4.5 w-4.5 text-[#0C4DA2] shrink-0" aria-hidden="true" />
                  <span>6 Academic Departments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#0C4DA2] shrink-0" aria-hidden="true" />
                  <span>Semester Examination System</span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#programme-discovery"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C4DA2] hover:text-[#08387A] transition-colors group focus-visible:outline-2 focus-visible:outline-[#0C4DA2]"
                >
                  <span>Explore Programme Offerings</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Programme Imagery */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={150}>
              <div className="relative mx-auto max-w-md">
                <div className="relative h-80 sm:h-96 w-full rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shadow-sm">
                  <img
                    src={labImg}
                    alt="ANRCAS Students in Computing Laboratory"
                    className="h-full w-full object-cover object-center filter brightness-95 contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E4B316] block mb-1">
                      Hands-on Scholarship
                    </span>
                    <span className="font-serif text-lg font-bold leading-snug block">
                      Practical laboratory hours paired with core theoretical curricula
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
