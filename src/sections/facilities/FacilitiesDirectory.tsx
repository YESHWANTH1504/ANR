import React, { useState, useMemo } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { Reveal } from '@/components/shared/Reveal'
import { FACILITIES, type Facility } from '@/data/facilities'
import labImg from '@/assets/lab_students.webp'
import libImg from '@/assets/library_students.webp'
import campusImg from '@/assets/campus_main.webp'
import sportsImg from '@/assets/gallery_sports.webp'
import seminarImg from '@/assets/gallery_seminar.webp'

type FacilityCategoryFilter = 'ALL' | 'Academic' | 'Infrastructure' | 'Student Life'

const FACILITY_IMAGES: Record<string, string> = {
  'fac-computer-lab': labImg,
  'fac-library': libImg,
  'fac-transport': campusImg,
  'fac-sports': sportsImg,
  'fac-seminar-hall': seminarImg,
}

export const FacilitiesDirectory: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FacilityCategoryFilter>('ALL')

  const categories: { label: string; value: FacilityCategoryFilter; count: number }[] = useMemo(() => [
    { label: 'All Facilities', value: 'ALL', count: FACILITIES.length },
    { label: 'Academic', value: 'Academic', count: FACILITIES.filter((f) => f.category === 'Academic').length },
    { label: 'Infrastructure', value: 'Infrastructure', count: FACILITIES.filter((f) => f.category === 'Infrastructure').length },
    { label: 'Student Life', value: 'Student Life', count: FACILITIES.filter((f) => f.category === 'Student Life').length },
  ], [])

  const filteredFacilities = useMemo(() => {
    if (activeCategory === 'ALL') return FACILITIES
    return FACILITIES.filter((f) => f.category === activeCategory)
  }, [activeCategory])

  return (
    <Section variant="subtle" padding="lg" id="directory" className="border-b border-[var(--color-border)] bg-[var(--color-ivory)]">
      <Container size="wide">
        <Reveal>
          <div className="max-w-2xl mb-8 space-y-3">
            <EditorialLabel className="text-[var(--color-primary)]">
              Complete Catalogue
            </EditorialLabel>

            <H2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[var(--color-ink)] tracking-tight">
              Collegiate Facilities Directory
            </H2>

            <TextLead className="text-[var(--color-muted)] text-base sm:text-lg font-light leading-relaxed">
              All physical, technological, and transport infrastructure maintained on-campus for student instruction and community convenience.
            </TextLead>
          </div>
        </Reveal>

        {/* Accessible Filter Buttons */}
        <div
          role="group"
          aria-label="Filter facilities by category"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              aria-pressed={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-[var(--radius-sm)] ${
                activeCategory === cat.value
                  ? 'bg-[var(--color-ink)] text-white shadow-xs'
                  : 'bg-white text-[var(--color-charcoal)] border border-[var(--color-border)] hover:border-[var(--color-ink)]'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Editorial Facility Catalogue Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility: Facility, idx) => {
            const image = FACILITY_IMAGES[facility.id] || campusImg

            return (
              <Reveal key={facility.id} delay={idx * 80}>
                <article
                  aria-labelledby={`facility-title-${facility.id}`}
                  className="group card-editorial flex flex-col justify-between h-full bg-white border border-[var(--color-border)] hover:border-[var(--color-ink)] overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div>
                    {/* Large Image with 1.04 zoom and overlay */}
                    <div className="relative h-60 w-full overflow-hidden bg-stone-900 border-b border-[var(--color-border)]">
                      <img
                        src={image}
                        alt={facility.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)]/90 text-[var(--color-gold-light)] border border-white/10 backdrop-blur-xs">
                        {facility.category}
                      </div>

                      <div className="absolute bottom-3 left-3 text-xs sm:text-sm text-white flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="h-4 w-4 text-[var(--color-gold-light)]" />
                        <span>Verified Facility</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        id={`facility-title-${facility.id}`}
                        className="font-serif text-xl sm:text-2xl font-bold text-[var(--color-ink)] group-hover:text-[var(--color-anrcas-blue)] transition-colors leading-snug tracking-tight mb-2.5"
                      >
                        {facility.name}
                      </h3>

                      <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed font-light">
                        {facility.description}
                      </p>

                      {facility.features && facility.features.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-[var(--color-border)]/60">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold)] block mb-2">
                            Key Specifications
                          </span>
                          <ul className="space-y-1.5">
                            {facility.features.map((feat, fIdx) => (
                              <li key={fIdx} className="text-xs sm:text-sm text-[var(--color-charcoal)] flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Accessible Action Footer */}
                  <div className="p-6 pt-0">
                    <div className="pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-semibold text-[var(--color-ink)]">
                      <span>On-Campus Infrastructure</span>
                      <ArrowRight className="h-4 w-4 text-[var(--color-gold)] group-hover:text-[var(--color-anrcas-blue)] arrow-nudge" />
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
