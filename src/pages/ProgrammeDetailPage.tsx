import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { BookOpen, ArrowRight, Layers } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { H1, TextLead } from '@/components/ui/Typography'
import { getProgrammeBySlug, type Programme } from '@/data/programmes'
import {
  ProgrammeDetailHero,
  ProgrammeFacts,
  ProgrammeOverview,
  RelatedDepartment,
  RelatedProgrammes,
  ProgrammeDetailCTA,
} from '@/sections/programme-detail'
import { publicService } from '@/api/services/publicService'

export const ProgrammeDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [programme, setProgramme] = useState<Programme | undefined>(() =>
    slug ? getProgrammeBySlug(slug) : undefined
  )

  useEffect(() => {
    if (!slug) return

    publicService
      .getProgramme(slug)
      .then((data) => {
        if (data) {
          setProgramme({
            id: data.id,
            name: data.name,
            slug: data.slug,
            degree: data.degree,
            level: (data.level as Programme['level']) || 'UG',
            departmentId: data.department_id,
            departmentName: data.department_name || '',
            durationYears: data.duration_years,
            description: data.description,
            overview: data.overview,
          })
        }
      })
      .catch(() => {
        // Fall back gracefully to verified initial programme
      })
  }, [slug])

  useEffect(() => {
    const originalTitle = document.title
    if (programme) {
      document.title = `${programme.name} | A.N. Radhakrishnan College of Arts & Science`
    } else {
      document.title = 'Programme Not Found | A.N. Radhakrishnan College of Arts & Science'
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [programme])

  // Not Found State for Invalid Programme Slug
  if (!programme) {
    return (
      <div className="w-full">
        <Section variant="canvas" padding="none" className="border-b border-[var(--color-border)]">
          <Container size="wide" className="pt-6 pb-12">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Academics', href: '/academics' },
                { label: 'Programmes', href: '/programmes' },
                { label: 'Not Found' },
              ]}
              className="mb-8"
            />

            <div className="max-w-xl mx-auto text-center space-y-4">
              <H1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-primary)]">
                Programme Not Found
              </H1>
              <TextLead className="text-slate-600 text-sm sm:text-base">
                The academic degree programme you are looking for could not be found or may have been renamed in the curriculum directory.
              </TextLead>
            </div>
          </Container>
        </Section>

        <Section variant="subtle" padding="lg">
          <Container size="narrow">
            <EmptyState
              icon={<BookOpen className="h-6 w-6 text-slate-400" />}
              title="Programme Record Unavailable"
              description="Please review our catalogue of available undergraduate and postgraduate programmes, or browse our academic departments."
              action={
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link to="/programmes">
                    <Button variant="primary" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      View All Programmes
                    </Button>
                  </Link>
                  <Link to="/departments">
                    <Button variant="outline" size="md" leftIcon={<Layers className="h-4 w-4" />}>
                      Academic Departments
                    </Button>
                  </Link>
                </div>
              }
            />
          </Container>
        </Section>
      </div>
    )
  }

  // Valid Programme Detail View
  return (
    <div className="w-full">
      {/* SECTION 1: Programme Detail Hero with Breadcrumb & Single H1 */}
      <ProgrammeDetailHero programme={programme} />

      {/* SECTION 2: Main Academic Content & Facts Panel */}
      <Section variant="card" padding="lg" id="programme-content" className="bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Content Column */}
            <main className="lg:col-span-8 space-y-10">
              {/* Verified Curriculum & Highlights */}
              <ProgrammeOverview programme={programme} />

              {/* Affiliated Academic Department Relationship */}
              <RelatedDepartment programme={programme} />

              {/* Related Programmes in same area */}
              <RelatedProgrammes currentProgramme={programme} />
            </main>

            {/* Right Aside Column: Structured Specifications Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <ProgrammeFacts programme={programme} />
            </div>
          </div>
        </Container>
      </Section>

      {/* SECTION 3: Admissions & Catalog CTA */}
      <ProgrammeDetailCTA programme={programme} />
    </div>
  )
}
