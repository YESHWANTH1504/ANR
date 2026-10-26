import React from 'react'
import { Award, BookOpen, GraduationCap, MapPin, ShieldCheck } from 'lucide-react'
import logoImg from '@/assets/logo.png'
import campusImg from '@/assets/campus_main.webp'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-white border-b border-slate-200 overflow-hidden">
      <Container size="wide" className="pt-6 pb-16 lg:pb-24">
        {/* Semantic Breadcrumb */}
        <Breadcrumb
          items={[{ label: 'About ANRCAS' }]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal>
              <div className="collegiate-eyebrow text-[#0C4DA2]">
                Institutional Heritage &amp; Profile
              </div>

              {/* Editorial H1 Display Heading */}
              <h1 className="mt-3 font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.12] tracking-tight">
                An Institution Built Around Purpose, Learning &amp; Opportunity
              </h1>

              <p className="mt-4 text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                <strong className="font-semibold text-slate-900">{COLLEGE_INFO.name}</strong> was established to provide disciplined, value-grounded higher education to students of Vadamavandal and surrounding rural communities across Thiruvannamalai District. Affiliated with <strong className="font-semibold text-slate-900">{COLLEGE_INFO.affiliation}</strong>, the college offers recognized degree pathways in Science, Commerce, Management, and Languages.
              </p>

              {/* Verified Institutional Anchor Badges */}
              <div className="pt-6 mt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-[15px] text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#0C4DA2] shrink-0" aria-hidden="true" />
                  <span>Thiruvalluvar Affiliated</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4.5 w-4.5 text-[#0C4DA2] shrink-0" aria-hidden="true" />
                  <span>UG &amp; PG Degree Syllabi</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 text-[#0C4DA2] shrink-0" aria-hidden="true" />
                  <span>Thiruvannamalai District</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Imagery & Overlapping Seal Card */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={150}>
              <div className="relative mx-auto max-w-md">
                {/* Background Campus Photograph */}
                <div className="relative h-80 sm:h-96 w-full rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shadow-sm">
                  <img
                    src={campusImg}
                    alt="A.N. Radhakrishnan College Campus"
                    className="h-full w-full object-cover object-center filter brightness-95 contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#E4B316] block">
                      College Premises
                    </span>
                    <span className="font-serif text-lg font-bold">Vadamavandal, Cheyyar</span>
                  </div>
                </div>

                {/* Overlapping Seal Card */}
                <div className="sm:-mt-12 sm:-ml-6 relative z-10 bg-white rounded-lg border border-slate-200 p-6 shadow-md max-w-sm">
                  <div className="flex items-center gap-4">
                    <img
                      src={logoImg}
                      alt="ANRCAS Seal"
                      className="h-14 w-14 object-contain shrink-0"
                    />
                    <div>
                      <h2 className="font-serif text-base font-bold text-slate-900 leading-snug">
                        {COLLEGE_INFO.name}
                      </h2>
                      <p className="text-xs font-semibold text-[#0C4DA2] mt-0.5">
                        {COLLEGE_INFO.affiliation}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-1.5 font-medium">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#0C4DA2] shrink-0" />
                      <span>UGC / CBCS Semester System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#0C4DA2] shrink-0" />
                      <span>Arts, Science, Commerce, Management</span>
                    </div>
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
