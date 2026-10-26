import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Bus, Laptop, Mic, Trophy } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { FACILITIES } from '@/data/facilities'

const facilityIcons: Record<string, React.ReactNode> = {
  'fac-computer-lab': <Laptop className="h-5 w-5 text-[var(--color-secondary-dark)]" aria-hidden="true" />,
  'fac-library': <BookOpen className="h-5 w-5 text-[var(--color-accent-dark)]" aria-hidden="true" />,
  'fac-transport': <Bus className="h-5 w-5 text-cyan-700" aria-hidden="true" />,
  'fac-sports': <Trophy className="h-5 w-5 text-emerald-700" aria-hidden="true" />,
  'fac-seminar-hall': <Mic className="h-5 w-5 text-purple-700" aria-hidden="true" />,
}

export const CampusFacilitiesPreview: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="facilities-preview" className="border-b border-[var(--color-border)] bg-white">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <EditorialLabel className="text-[var(--color-primary)]">
              Infrastructure Preview
            </EditorialLabel>

            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              Collegiate Facilities Supporting Daily Life
            </H2>

            <TextLead className="text-slate-600 text-sm sm:text-base md:text-lg">
              Explore the physical and digital facilities dedicated to student instruction, quiet study, physical recreation, and daily rural transportation.
            </TextLead>
          </div>

          <Link to="/facilities" className="shrink-0 hidden sm:inline-flex">
            <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Facilities
            </Button>
          </Link>
        </div>

        {/* Dynamic Facility Cards Grid from FACILITIES data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((fac) => (
            <div
              key={fac.id}
              className="flex flex-col justify-between p-6 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 hover:bg-white hover:border-[var(--color-secondary)] hover:shadow-[var(--shadow-card)] transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                    {facilityIcons[fac.id] || <Laptop className="h-5 w-5" aria-hidden="true" />}
                  </div>
                  <Badge variant="secondary" size="sm">
                    {fac.category}
                  </Badge>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--color-primary)] mb-2">
                  {fac.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {fac.description}
                </p>

                {fac.features && fac.features.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                    {fac.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-2 py-0.5 rounded bg-white border border-slate-200/80 text-slate-600"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6 pt-3 border-t border-slate-200/60">
                <Link
                  to="/facilities"
                  aria-label={`View full facilities directory including ${fac.name}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-secondary-dark)] hover:text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-secondary)] rounded-xs"
                >
                  <span>Facility Details</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/facilities" className="w-full block">
            <Button variant="outline" size="md" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
              View All Facilities
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}
