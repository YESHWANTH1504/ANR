import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Compass, Laptop } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

interface ContextPillar {
  title: string
  description: string
  icon: React.ReactNode
  linkText: string
  linkHref: string
}

const PILLARS: ContextPillar[] = [
  {
    title: 'Academic Symposiums & Seminars',
    description: 'Documenting scholarly guest presentations, student paper sessions, and departmental seminars held in the college auditorium and seminar spaces.',
    icon: <BookOpen className="h-5 w-5 text-sky-600" aria-hidden="true" />,
    linkText: 'View News & Bulletins',
    linkHref: '/news',
  },
  {
    title: 'Practical Computing Laboratories',
    description: 'Capturing hands-on programming, web design, and computational coursework in the networked computer laboratory.',
    icon: <Laptop className="h-5 w-5 text-indigo-600" aria-hidden="true" />,
    linkText: 'Explore Facilities',
    linkHref: '/facilities',
  },
  {
    title: 'Cultural Festivities & Athletics',
    description: 'Preserving moments from annual Pongal celebrations, inter-departmental athletic tournaments, and community service camps.',
    icon: <Compass className="h-5 w-5 text-emerald-600" aria-hidden="true" />,
    linkText: 'Campus Life Details',
    linkHref: '/campus-life',
  },
]

export const GalleryContext: React.FC = () => {
  return (
    <Section
      variant="card"
      padding="lg"
      id="gallery-context"
      className="border-b border-[var(--color-border)] bg-white"
    >
      <Container size="wide">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-3">
          <EditorialLabel className="text-[var(--color-primary)]">
            Archive Standards &amp; Scope
          </EditorialLabel>

          <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
            Visual Documentation at {COLLEGE_INFO.shortName}
          </H2>

          <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
            Campus life is experienced through classrooms, practical laboratories, academic gatherings, student athletics, and shared community spaces. This gallery presents selected authentic photographs preserved in our institutional archive.
          </TextLead>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[var(--color-secondary)] hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-xs inline-block">
                  {pillar.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/70">
                <Link
                  to={pillar.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] transition-colors group"
                >
                  <span>{pillar.linkText}</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
