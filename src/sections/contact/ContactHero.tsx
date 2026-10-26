import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { CONTACT_DATA } from '@/data/contact'

export const ContactHero: React.FC = () => {
  return (
    <section className="relative bg-[var(--color-ink)] text-white pt-8 pb-16 md:pt-12 md:pb-24 border-b border-white/10 overflow-hidden">
      {/* Subtle Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:32px_32px] opacity-40 -z-10"
        aria-hidden="true"
      />

      <Container size="wide">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contact' },
          ]}
          className="mb-8 [&_a]:text-slate-400 [&_a:hover]:text-[var(--color-gold-light)] [&_span]:text-white/80 [&_svg]:text-slate-500"
        />

        <div className="max-w-4xl space-y-6">
          {/* Editorial Category Label */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 border border-[var(--color-gold)]/30 text-xs font-semibold tracking-widest uppercase text-[var(--color-gold-light)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
            <span>Official Institutional Channels</span>
          </div>

          {/* Newsreader Editorial Display Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.08] animate-hero-text">
            Contact ANRCAS
          </h1>

          {/* Supporting Lead Copy */}
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-sand)] max-w-2xl font-light leading-relaxed animate-hero-text [animation-delay:150ms]">
            Visitors, prospective students, parents, and academic stakeholders are welcome to connect with {CONTACT_DATA.institution} through verified institutional channels.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3 animate-hero-cta [animation-delay:300ms]">
            <a href="#enquiry-form">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowDown className="h-4 w-4" />}
                className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-ink)] font-semibold border-none shadow-md"
              >
                Get in Touch
              </Button>
            </a>

            <Link to="/admissions">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="border-white/25 text-white hover:bg-white/10 hover:border-white/50"
              >
                Explore Admissions
              </Button>
            </Link>
          </div>

          {/* Verified Institutional Quick Strip */}
          <div className="pt-8 mt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
              <span>{CONTACT_DATA.contact.primaryPhone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
              <span className="truncate">{CONTACT_DATA.contact.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
              <span>Vadamavandal, Tamil Nadu</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

