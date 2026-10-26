import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Button } from '@/components/ui/Button'
import { CONTACT_DATA } from '@/data/contact'

export const ContactCTA: React.FC = () => {
  return (
    <section
      id="contact-final-cta"
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
          <span>Direct Communications</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1]">
          Start a Conversation.
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-[var(--color-sand)] max-w-xl mx-auto font-light leading-relaxed">
          Reach {CONTACT_DATA.institution} through the official institutional channels for academic, administrative, and admission assistance.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a href={`mailto:${CONTACT_DATA.contact.email}`}>
            <Button
              variant="primary"
              size="lg"
              rightIcon={<Mail className="h-4 w-4" />}
              className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-light)] text-[var(--color-ink)] font-semibold border-none shadow-md"
            >
              Email ANRCAS
            </Button>
          </a>

          <a href={`tel:${CONTACT_DATA.contact.primaryPhoneClean}`}>
            <Button
              variant="outline"
              size="lg"
              rightIcon={<Phone className="h-4 w-4" />}
              className="border-white/25 text-white hover:bg-white/10 hover:border-white/50"
            >
              Call {CONTACT_DATA.contact.primaryPhone}
            </Button>
          </a>

          <Link to="/admissions">
            <Button
              variant="ghost"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="text-[var(--color-sand)] hover:text-white hover:bg-white/5"
            >
              Explore Admissions
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

