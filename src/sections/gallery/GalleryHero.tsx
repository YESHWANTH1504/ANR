import React from 'react'
import { Camera, Image as ImageIcon, Sparkles, ArrowRight } from 'lucide-react'
import campusImg from '@/assets/campus_main.webp'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const GalleryHero: React.FC = () => {
  return (
    <section className="relative min-h-[50vh] lg:min-h-[58vh] flex flex-col justify-between overflow-hidden bg-[var(--color-ink)] text-white border-b border-white/10">
      {/* Immersive background photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src={campusImg}
          alt="A.N. Radhakrishnan College Campus Grounds"
          className="h-full w-full object-cover object-center filter brightness-[0.70] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/75 to-[var(--color-ink)]/40" />
      </div>

      {/* Semantic Breadcrumbs */}
      <div className="relative z-10 pt-6">
        <Container size="wide">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Gallery' },
            ]}
            className="text-stone-300"
          />
        </Container>
      </div>

      {/* Center Headline */}
      <div className="relative z-10 my-auto py-12 lg:py-16">
        <Container size="wide">
          <div className="max-w-3xl space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 px-3.5 py-1 text-xs font-semibold text-[var(--color-gold-light)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                <span>Verified Photographic Archive</span>
              </div>

              {/* Single Primary H1 */}
              <h1 className="mt-3 font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight">
                Visual Chronicles of Campus Scholarship &amp; Life.
              </h1>

              <p className="mt-4 text-stone-200 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                Explore verified photographs documenting academic laboratories, learning environments, cultural gatherings, and campus life at {COLLEGE_INFO.name}.
              </p>

              <div className="pt-2">
                <a
                  href="#collection"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-[var(--color-gold-light)] transition-colors group"
                >
                  <span>Browse Photographic Archive</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Verified Institutional Highlights Strip */}
      <div className="relative z-10 border-t border-white/15 bg-black/40 backdrop-blur-md py-4">
        <Container size="wide">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
              <span>Campus Grounds &amp; Premises</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
              <span>Cultural &amp; Sports Events</span>
            </div>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-[var(--color-gold-light)] shrink-0" aria-hidden="true" />
              <span>Academic &amp; Computing Labs</span>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
