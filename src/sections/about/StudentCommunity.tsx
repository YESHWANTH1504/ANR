import { Bus, CheckCircle2, HeartHandshake, Laptop } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'

export const StudentCommunity: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="community" className="border-b border-[var(--color-border)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <EditorialLabel className="text-[var(--color-primary)] font-semibold tracking-wider uppercase text-xs">
            Community Engagement &amp; Social Responsibility
          </EditorialLabel>
          <H2 className="mt-2 collegiate-section-title font-bold text-slate-900 tracking-tight">
            Commitment to Students &amp; Community
          </H2>
          <TextLead className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Higher education at ANRCAS is deeply linked with the wellbeing, daily mobility, and civic progress of Vadamavandal and Thiruvannamalai District.
          </TextLead>
        </div>

        {/* 3-Column Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Rural Transit */}
          <div className="rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[var(--color-primary)]/30 transition-all">
            <div>
              <div className="p-3 w-fit rounded-full bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)] mb-4">
                <Bus className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2 font-serif">
                Accessible College Transit
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Operating a structured college bus network that reaches into rural villages and nearby junction stops, removing travel constraints for first-generation and female learners across the region.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 collegiate-metadata text-[var(--color-secondary-dark)] font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Safe rural transport connectivity</span>
            </div>
          </div>

          {/* Card 2: NSS Civic Service */}
          <div className="rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[var(--color-primary)]/30 transition-all">
            <div>
              <div className="p-3 w-fit rounded-full bg-emerald-50 text-emerald-700 mb-4">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2 font-serif">
                NSS Civic Outreach
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our active National Service Scheme unit conducts annual 7-day rural service camps in Vadamavandal, leading public health drives, civic cleanliness campaigns, and community awareness rallies.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 collegiate-metadata text-emerald-700 font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Student volunteerism &amp; social empathy</span>
            </div>
          </div>

          {/* Card 3: Practical Lab Skill Training */}
          <div className="rounded-[var(--radius-xl)] bg-white border border-[var(--color-border)] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[var(--color-primary)]/30 transition-all">
            <div>
              <div className="p-3 w-fit rounded-full bg-[var(--color-accent-light)] text-[var(--color-accent-dark)] mb-4">
                <Laptop className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-2 font-serif">
                Hands-on Lab Competence
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Equipped computer lab facilities provide practical programming and analytical exposure, ensuring theoretical syllabus topics translate into demonstrable skills for career readiness.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 collegiate-metadata text-[var(--color-accent-dark)] font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Dedicated practical lab sessions</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
