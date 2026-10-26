import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Compass } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'

import { COLLEGE_INFO } from '@/data/college'

export const LeadershipCTA: React.FC = () => {
  return (
    <section
      id="leadership-cta"
      className="py-20 md:py-28 bg-[var(--color-ink)] text-white relative overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-30 -z-10"
        aria-hidden="true"
      />

      <Container size="narrow" className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[var(--color-gold)]/30 text-xs font-semibold tracking-widest uppercase text-[var(--color-gold-light)] mx-auto">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
          <span>Institutional Legacy</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1]">
          Discover ANRCAS
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[var(--color-sand)] max-w-xl mx-auto font-light leading-relaxed">
          Learn how the founder's vision translates into dynamic academic programmes, student mentorship, and transformative higher education in {COLLEGE_INFO.address.locality}.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/academics">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<BookOpen className="h-4 w-4" />}
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-ink)] font-semibold border-none shadow-md"
            >
              Explore Academics
            </Button>
          </Link>

          <Link to="/programmes">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<Compass className="h-4 w-4" />}
              className="border-white/25 text-white hover:bg-white/10 hover:border-white/50"
            >
              View Programmes
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              variant="ghost"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="text-[var(--color-sand)] hover:text-white hover:bg-white/5"
            >
              Contact ANRCAS
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
