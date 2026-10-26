import React from 'react'
import { ArrowUpRight, GraduationCap, MapPin, Navigation } from 'lucide-react'
import campusImg from '@/assets/campus_main.webp'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { CONTACT_DATA } from '@/data/contact'

export const ContactLocation: React.FC = () => {
  return (
    <section
      id="campus-location"
      className="py-16 md:py-24 bg-[var(--color-ink)] text-white border-b border-white/10 relative overflow-hidden"
    >
      {/* Background Architectural Grid Accent */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-30 -z-10"
        aria-hidden="true"
      />

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Location Dossier */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
              <span>Location</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              College Location &amp; Grounds
            </h2>

            <p className="text-base text-[var(--color-sand)] leading-relaxed font-light">
              Situated along Vadamavandal Road in Thiruvannamalai District, Tamil Nadu. The campus provides a focused academic setting for higher education, accessible across the regional taluks.
            </p>

            {/* Verified Address Block */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-sm space-y-4 backdrop-blur-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[var(--color-gold)] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Collegiate Address
                  </p>
                  <p className="text-base font-medium text-white">
                    {CONTACT_DATA.address.street}, {CONTACT_DATA.address.locality}
                  </p>
                  <p className="text-sm text-slate-300">
                    {CONTACT_DATA.address.district}, {CONTACT_DATA.address.state}, {CONTACT_DATA.address.country}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400">
                <GraduationCap className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span>{CONTACT_DATA.affiliation}</span>
              </div>
            </div>

            {/* Safe External Directions Link */}
            <div className="pt-2">
              <a
                href={CONTACT_DATA.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button
                  variant="outline"
                  size="md"
                  rightIcon={<ArrowUpRight className="h-4 w-4" />}
                  className="border-[var(--color-gold)] text-[var(--color-gold-light)] hover:bg-[var(--color-gold)]/10"
                >
                  Find on Google Maps
                </Button>
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Location Visual with Authentic Campus Photo */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm overflow-hidden border border-white/15 bg-black/40 shadow-xl group">
              {/* Authentic Campus Photograph */}
              <div className="aspect-16/10 sm:aspect-16/9 w-full overflow-hidden relative">
                <img
                  src={campusImg}
                  alt="A.N. Radhakrishnan College of Arts & Science Campus Grounds, Vadamavandal"
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05] group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/40 to-transparent"
                  aria-hidden="true"
                />

                {/* Architectural Grid / Crosshair Accents */}
                <div
                  className="absolute top-4 left-4 p-2 rounded bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-200 flex items-center gap-2"
                >
                  <Navigation className="h-3.5 w-3.5 text-[var(--color-gold)]" aria-hidden="true" />
                  <span>ANRCAS // VADAMAVANDAL</span>
                </div>

                <div
                  className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-[var(--color-gold)] opacity-80"
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-[var(--color-gold)] opacity-80"
                  aria-hidden="true"
                />

                {/* Architectural Lower Panel */}
                <div className="absolute bottom-4 right-4 left-4 sm:left-auto p-4 sm:p-5 rounded bg-black/75 backdrop-blur-md border border-white/15 max-w-sm space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)]">
                    College Grounds
                  </div>
                  <div className="text-sm sm:text-base font-serif font-bold text-white">
                    {CONTACT_DATA.institution}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200">
                    Vadamavandal Road, Thiruvannamalai District
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

