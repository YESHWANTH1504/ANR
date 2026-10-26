import React from 'react'
import { BookOpen, Bus, CheckCircle2, Laptop, Trophy } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextBody, EditorialLabel } from '@/components/ui/Typography'
import { COLLEGE_INFO } from '@/data/college'

export const CampusLifeOverview: React.FC = () => {
  return (
    <Section variant="card" padding="lg" id="overview" className="border-b border-[var(--color-border)] bg-white">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <EditorialLabel className="text-[var(--color-primary)]">
              Campus Environment
            </EditorialLabel>

            <H2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)] tracking-tight">
              An Academic Setting Designed for Discipline &amp; Growth
            </H2>

            <TextBody className="text-slate-700 leading-relaxed text-sm sm:text-base">
              The {COLLEGE_INFO.name} campus at Vadamavandal is situated in a tranquil rural environment in Thiruvannamalai District, offering students freedom from urban distractions while maintaining modern collegiate infrastructure.
            </TextBody>

            <TextBody className="text-slate-700 leading-relaxed text-sm sm:text-base">
              Our campus balances formal degree instruction with practical lab sessions in computer science, focused reading in the college library, outdoor physical training, and community service through the National Service Scheme (NSS).
            </TextBody>

            <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface-subtle)] border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
              <span className="font-bold text-[var(--color-primary)] block">
                Integrated Campus Pillars:
              </span>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Structured undergraduate and postgraduate lecture schedules</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Hands-on computing practicals with networked terminals</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" aria-hidden="true" />
                  <span>Dedicated daily transit connecting rural communities</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Verified Campus Highlights */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 space-y-2.5">
              <div className="p-2 rounded-lg bg-white border border-slate-200/80 w-fit text-[var(--color-secondary-dark)]">
                <Laptop className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-primary)]">
                Computing Practical Labs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Networked terminals supporting software programming practicals and digital literacy across departments.
              </p>
            </div>

            <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 space-y-2.5">
              <div className="p-2 rounded-lg bg-white border border-slate-200/80 w-fit text-[var(--color-accent-dark)]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-primary)]">
                Library &amp; Reading Room
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Quiet study environment housing university textbooks, subject reference volumes, and academic periodicals.
              </p>
            </div>

            <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 space-y-2.5">
              <div className="p-2 rounded-lg bg-white border border-slate-200/80 w-fit text-emerald-700">
                <Trophy className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-primary)]">
                Sports &amp; Physical Fitness
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Outdoor athletic grounds enabling physical training sessions, intra-mural matches, and team sports.
              </p>
            </div>

            <div className="p-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)]/40 space-y-2.5">
              <div className="p-2 rounded-lg bg-white border border-slate-200/80 w-fit text-cyan-700">
                <Bus className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[var(--color-primary)]">
                Campus Bus Transit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Extensive college bus network providing safe, reliable daily commuting across regional villages.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
