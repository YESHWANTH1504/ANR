import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Bus, ChevronRight, Laptop, Presentation, Trophy } from 'lucide-react'
import labImg from '@/assets/lab_students.webp'
import libraryImg from '@/assets/library_students.webp'
import sportsImg from '@/assets/gallery_sports.webp'
import seminarImg from '@/assets/gallery_seminar.webp'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

interface FacilityCard {
  id: string
  name: string
  category: string
  description: string
  image?: string
  icon: React.ReactNode
  features: string[]
}

const FEATURED_FACILITIES: FacilityCard[] = [
  {
    id: 'fac-computer-lab',
    name: 'Modern Computer Laboratory',
    category: 'Academic Facility',
    description: 'Equipped with networked computer terminals, software development environments, and high-speed internet connectivity for regular practical coursework.',
    image: labImg,
    icon: <Laptop className="h-5 w-5" />,
    features: ['Networked Workstations', 'Programming Practical Sessions', 'Internet Connectivity'],
  },
  {
    id: 'fac-library',
    name: 'College Library & Reading Room',
    category: 'Learning Resources',
    description: 'Academic volumes, reference materials, newspapers, periodicals, and quiet study areas supporting undergraduate and postgraduate scholarship.',
    image: libraryImg,
    icon: <BookOpen className="h-5 w-5" />,
    features: ['Curricular Textbooks', 'Reference Volumes', 'Quiet Study Hall'],
  },
  {
    id: 'fac-sports',
    name: 'Sports & Athletic Grounds',
    category: 'Student Life & Fitness',
    description: 'Outdoor athletic grounds and recreation spaces facilitating physical education training, intra-mural matches, and annual athletic meets.',
    image: sportsImg,
    icon: <Trophy className="h-5 w-5" />,
    features: ['Outdoor Athletic Grounds', 'Physical Training', 'Annual Sports Meet'],
  },
  {
    id: 'fac-seminar',
    name: 'Seminar & Conference Hall',
    category: 'Assembly & Events',
    description: 'Dedicated assembly hall with audio-visual equipment hosting guest lectures, academic symposiums, orientation programmes, and student cultural events.',
    image: seminarImg,
    icon: <Presentation className="h-5 w-5" />,
    features: ['Audio-Visual Systems', 'Academic Assemblies', 'Guest Lectures'],
  },
]

export const AboutFacilities: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="about-facilities" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <EditorialLabel className="text-[var(--color-primary)] font-semibold tracking-wider uppercase text-xs">
              Campus Infrastructure &amp; Learning Spaces
            </EditorialLabel>
            <H2 className="mt-2 collegiate-section-title font-bold text-slate-900 tracking-tight">
              College Facilities &amp; Student Life
            </H2>
            <TextLead className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
              ANRCAS maintains dedicated facilities in Vadamavandal to support rigorous laboratory practicals, academic study, physical fitness, and student transportation.
            </TextLead>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/facilities">
              <Button variant="outline" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                All Facilities
              </Button>
            </Link>
            <Link to="/campus-life">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Campus Life
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Featured Photographic Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURED_FACILITIES.map((facility) => (
            <div
              key={facility.id}
              className="rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] overflow-hidden shadow-xs hover:border-[var(--color-primary)]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {facility.image && (
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={facility.image}
                      alt={facility.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="collegiate-badge-text bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                        {facility.category}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2.5 mb-2 text-[var(--color-primary)]">
                    <div className="p-1.5 rounded-md bg-[var(--color-surface-subtle)] border border-slate-200">
                      {facility.icon}
                    </div>
                    <h3 className="text-xl font-bold font-serif text-[var(--color-primary)]">
                      {facility.name}
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 mb-4">
                    {facility.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                    {facility.features.map((feat, i) => (
                      <span
                        key={i}
                        className="collegiate-metadata bg-[var(--color-surface-subtle)] text-slate-700 px-2.5 py-1 rounded border border-slate-200/80"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Transport Feature Box */}
        <div className="mt-8 p-6 sm:p-8 rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)] shrink-0">
                <Bus className="h-6 w-6" />
              </div>
              <div>
                <span className="collegiate-metadata text-[var(--color-secondary-dark)] font-bold uppercase tracking-wider block">
                  Regional Mobility Network
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif mt-1">
                  Dedicated College Bus Transit
                </h4>
                <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  Scheduled college buses connect the Vadamavandal campus with surrounding villages and transit points across Thiruvannamalai District, providing safe daily access for rural students.
                </p>
              </div>
            </div>

            <Link to="/facilities" className="shrink-0 self-start md:self-center">
              <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                View Transit Routes
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
