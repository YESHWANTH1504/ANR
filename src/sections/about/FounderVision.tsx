import { ArrowRight, Award, Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import founderImg from '@/assets/founder.webp'
import logoImg from '@/assets/logo.png'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Button } from '@/components/ui/Button'
import { H2, TextBody, EditorialLabel } from '@/components/ui/Typography'
import { LEADERSHIP } from '@/data/leadership'

export const FounderVision: React.FC = () => {
  const founder = LEADERSHIP.find((l) => l.isFounder) || LEADERSHIP[0]

  return (
    <Section variant="subtle" padding="lg" id="founder" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Founder Portrait Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-white border border-[var(--color-border)] p-5 text-center shadow-xs">
              <div className="relative h-80 w-full overflow-hidden bg-stone-100 mb-4 border border-[var(--color-border)]">
                <img
                  src={founderImg}
                  alt={founder.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top filter contrast-[1.02] hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)] block">
                    Visionary &amp; Philanthropist
                  </span>
                  <span className="font-serif text-xl font-bold block leading-tight">
                    {founder.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-left p-3.5 bg-[var(--color-paper)] border border-[var(--color-border)]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[var(--color-ink)] leading-snug">
                    {founder.name}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">
                    {founder.designation}
                  </p>
                </div>
                <img src={logoImg} alt="ANRCAS Seal" className="h-8 w-8 object-contain shrink-0" />
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--color-border)] text-left space-y-2 text-xs sm:text-sm text-[var(--color-charcoal)]">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[var(--color-gold)] shrink-0" />
                  <span>Founding Purpose: Rural Educational Upliftment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-[var(--color-gold)] shrink-0" />
                  <span>Legacy: Institutional Character &amp; Discipline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Narrative on Founding Vision */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <EditorialLabel className="text-[var(--color-primary)]">
                Founding Vision
              </EditorialLabel>
              <H2 className="mt-2 collegiate-section-title font-bold text-slate-900 tracking-tight">
                Empowering Rural Youth Through Higher Education
              </H2>
            </div>

            <TextBody className="text-slate-700 leading-relaxed text-base sm:text-lg">
              The college honors the vision of its founder, <strong>{founder.name}</strong>, who recognized that the sustainable progress of Vadamavandal and North Tamil Nadu depended upon bringing higher educational institutions directly to rural families.
            </TextBody>

            <TextBody className="text-slate-700 leading-relaxed text-base sm:text-lg">
              Believing that university education is the foremost catalyst for personal dignity and generational advancement, the founding goal was to create a disciplined collegiate environment where young men and women—many the first in their families to attend college—could pursue recognized degree qualifications close to home.
            </TextBody>

            <TextBody className="text-slate-700 leading-relaxed text-base sm:text-lg">
              Today, that founding commitment endures in every dimension of the college: in affordable fee structures, structured bus transit serving distant hamlets, dedicated faculty mentorship, and active social responsibility programs.
            </TextBody>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700">
              <div className="p-3 bg-white rounded-[var(--radius-md)] border border-slate-200/80">
                <span className="font-bold text-[var(--color-primary)] block">Accessible Opportunity</span>
                <span className="text-slate-500">Bridging rural students with university qualifications.</span>
              </div>
              <div className="p-3 bg-white rounded-[var(--radius-md)] border border-slate-200/80">
                <span className="font-bold text-[var(--color-primary)] block">Value-Grounded Growth</span>
                <span className="text-slate-500">Cultivating ethical character, social empathy, and discipline.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/leadership">
                <Button variant="outline" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore Leadership &amp; Governance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
