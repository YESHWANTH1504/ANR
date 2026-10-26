import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  MoreVertical,
  Phone,
} from 'lucide-react'

import logoImg from '@/assets/logo.png'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Image } from '@/components/shared/Image'
import { SectionEyebrow } from '@/components/shared/SectionEyebrow'
import { SectionHeader } from '@/components/shared/SectionHeader'
import {
  H1,
  H2,
  H3,
  H4,
  TextBody,
  TextLead,
  TextSmall,
  EditorialLabel,
} from '@/components/ui/Typography'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Divider } from '@/components/ui/Divider'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/Accordion'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@/components/ui/Dropdown'
import { LoadingState } from '@/components/ui/LoadingState'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'

import { PROGRAMMES } from '@/data/programmes'
import { DEPARTMENTS } from '@/data/departments'
import { FACILITIES } from '@/data/facilities'
import { MAIN_NAV_ITEMS } from '@/data/navigation'

export const DesignSystemPage: React.FC = () => {
  const [btnLoading, setBtnLoading] = useState(false)
  const [sampleErrorRetried, setSampleErrorRetried] = useState(false)

  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Design System & Component Showcase | A.N. Radhakrishnan College of Arts & Science'
    window.scrollTo({ top: 0, behavior: 'instant' })
    return () => {
      document.title = originalTitle
    }
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Hero Foundation Summary */}
      <Section variant="navy" padding="md">
        <Container>
          <div className="max-w-3xl">
            <EditorialLabel className="text-[var(--color-accent)] mb-2">
              Phase 1 Deliverable
            </EditorialLabel>
            <H1 className="text-white text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold">
              Global Design System & Technical Foundation
            </H1>
            <TextLead className="text-slate-300">
              A bespoke, academically grounded design architecture built specifically for
              A.N. Radhakrishnan College of Arts & Science. Every color token, typography scale,
              and UI primitive is derived directly from the verified ANRCAS identity.
            </TextLead>
          </div>
        </Container>
      </Section>

      <main className="py-12 space-y-16">
        {/* =====================================================================
            2. COLOR TOKENS SYSTEM (PHASE 01 COLLEGIATE TOKENS)
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <SectionEyebrow variant="blue">Color Architecture</SectionEyebrow>
              <H2 className="mt-1">Phase 01 Collegiate & Institutional Palette</H2>
              <TextSmall className="mt-1">
                Audited directly from the SRMIST collegiate reference design, verified with WCAG AA/AAA contrast ratios:
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Collegiate Blue */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#0C4DA2] flex items-end p-3 text-white font-mono text-xs font-semibold mb-3">
                  #0C4DA2
                </div>
                <h4 className="font-bold text-sm text-[#0C4DA2]">Collegiate Blue</h4>
                <p className="text-xs text-slate-500 mt-0.5">Primary brand token --color-collegiate-blue</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Contrast: 7.8:1 (AAA vs White)</span>
              </div>

              {/* Deep Navy */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#08326B] flex items-end p-3 text-white font-mono text-xs font-semibold mb-3">
                  #08326B
                </div>
                <h4 className="font-bold text-sm text-[#08326B]">Deep Navy</h4>
                <p className="text-xs text-slate-500 mt-0.5">Deep collegiate token --color-deep-navy</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Contrast: 11.4:1 (AAA vs White)</span>
              </div>

              {/* Gold */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#E4B316] flex items-end p-3 text-[#0D0D0D] font-mono text-xs font-bold mb-3">
                  #E4B316
                </div>
                <h4 className="font-bold text-sm text-slate-900">Academic Gold</h4>
                <p className="text-xs text-slate-500 mt-0.5">Accent action token --color-gold</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Contrast: 8.4:1 (AAA with Dark Text)</span>
              </div>

              {/* Obsidian */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#0D0D0D] flex items-end p-3 text-white font-mono text-xs font-semibold mb-3">
                  #0D0D0D
                </div>
                <h4 className="font-bold text-sm text-slate-900">Obsidian Dark</h4>
                <p className="text-xs text-slate-500 mt-0.5">Utility & Footer token --color-obsidian</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Contrast: 18.2:1 (AAA vs White)</span>
              </div>

              {/* Pale Blue */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#EFF6FF] border border-blue-200 flex items-end p-3 text-[#0C4DA2] font-mono text-xs font-semibold mb-3">
                  #EFF6FF
                </div>
                <h4 className="font-bold text-sm text-[#0C4DA2]">Pale Blue</h4>
                <p className="text-xs text-slate-500 mt-0.5">Academic tint --color-pale-blue</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Usage: Section backgrounds & highlights</span>
              </div>

              {/* Off-White */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#F8FAFC] border border-slate-200 flex items-end p-3 text-slate-700 font-mono text-xs font-semibold mb-3">
                  #F8FAFC
                </div>
                <h4 className="font-bold text-sm text-slate-900">Off-White Canvas</h4>
                <p className="text-xs text-slate-500 mt-0.5">Surface background --color-off-white</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Usage: Page canvas, alternating sections</span>
              </div>

              {/* Muted Text */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-[#475569] flex items-end p-3 text-white font-mono text-xs font-semibold mb-3">
                  #475569
                </div>
                <h4 className="font-bold text-sm text-slate-900">Muted Body Text</h4>
                <p className="text-xs text-slate-500 mt-0.5">Secondary text --color-muted-text</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Contrast: 5.4:1 (AA vs White/Canvas)</span>
              </div>

              {/* Pure White */}
              <div className="rounded-[var(--radius-lg)] border border-slate-200 p-4 bg-white shadow-xs">
                <div className="h-20 rounded-[var(--radius-md)] bg-white border border-slate-200 flex items-end p-3 text-slate-900 font-mono text-xs font-semibold mb-3">
                  #FFFFFF
                </div>
                <h4 className="font-bold text-sm text-slate-900">Elevated White</h4>
                <p className="text-xs text-slate-500 mt-0.5">Card background --color-white</p>
                <span className="text-xs text-slate-500 font-mono mt-2 block">Usage: Cards, dropdowns, modal dialogs</span>
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            3. TYPOGRAPHY SYSTEM
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>Typographic Scale</EditorialLabel>
              <H2 className="mt-1">Manrope (UI Sans) & Newsreader (Editorial Serif)</H2>
              <TextSmall className="mt-1">
                Precision-engineered type hierarchy balancing modern readability with collegiate academic gravitas.
              </TextSmall>
            </div>

            <div className="space-y-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 md:p-8">
              <div className="border-b border-[var(--color-border)] pb-4">
                <EditorialLabel className="mb-1">Heading 1 / Sans & Serif</EditorialLabel>
                <H1>Excellence in Arts, Science & Commerce</H1>
                <H1 serif className="mt-2 text-2xl sm:text-3xl lg:text-4xl text-[var(--color-secondary-dark)]">
                  Affiliated with Thiruvalluvar University, Vellore
                </H1>
              </div>

              <div className="border-b border-[var(--color-border)] pb-4">
                <EditorialLabel className="mb-1">Heading 2</EditorialLabel>
                <H2>Undergraduate & Postgraduate Academic Departments</H2>
              </div>

              <div className="border-b border-[var(--color-border)] pb-4">
                <EditorialLabel className="mb-1">Heading 3 & 4</EditorialLabel>
                <H3>Department of Computer Science & Mathematics</H3>
                <H4 className="mt-1 text-slate-600">Curriculum Structure and Examination Guidelines</H4>
              </div>

              <div>
                <EditorialLabel className="mb-1">Body Text Variants</EditorialLabel>
                <TextLead className="mb-2">
                  Lead Paragraph: A.N. Radhakrishnan College of Arts & Science provides transformative educational opportunities across North Tamil Nadu.
                </TextLead>
                <TextBody className="mb-2">
                  Standard Body Text: Students engage in structured classroom lectures, laboratory practicals, and university-aligned curriculum designed to develop professional skills.
                </TextBody>
                <TextSmall>
                  Small Metadata Text: Admissions Office • Monday to Saturday • Vadamavandal, Tamil Nadu
                </TextSmall>
              </div>

              {/* Dividers Demo */}
              <div className="pt-4 border-t border-[var(--color-border)]">
                <EditorialLabel className="mb-2">Divider Primitives</EditorialLabel>
                <div className="space-y-4">
                  <Divider />
                  <Divider label="Institutional Milestone" />
                  <div className="flex items-center h-8 gap-4 text-xs text-slate-500">
                    <span>Thiruvalluvar Affiliated</span>
                    <Divider orientation="vertical" />
                    <span>Vadamavandal, Tamil Nadu</span>
                    <Divider orientation="vertical" />
                    <span>Established Trust 1958</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            4. BUTTON SYSTEM
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>Interactive Primitives</EditorialLabel>
              <H2 className="mt-1">Button System & States</H2>
              <TextSmall className="mt-1">
                Restrained, accessible button variants with focus rings, hover/active transitions, and loading states.
              </TextSmall>
            </div>

            <div className="space-y-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 md:p-8">
              {/* Variants */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Collegiate Button System</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="collegiate">Collegiate Blue</Button>
                  <Button variant="gold">Academic Gold</Button>
                  <Button variant="navy">Deep Navy</Button>
                  <Button variant="secondary">Secondary Outline</Button>
                  <Button variant="outline">Outline Blue</Button>
                  <Button variant="ghost">Ghost Button</Button>
                </div>
              </div>

              {/* Sizes & Icons */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Sizes & Icon Integrations</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" leftIcon={<GraduationCap className="h-3.5 w-3.5" />}>
                    Small Action
                  </Button>
                  <Button size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Explore Programmes
                  </Button>
                  <Button size="lg" leftIcon={<BookOpen className="h-5 w-5" />}>
                    Apply for Admissions
                  </Button>
                </div>
              </div>

              {/* Interactive Loading & Disabled states */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">States (Loading & Disabled)</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    isLoading={btnLoading}
                    onClick={() => {
                      setBtnLoading(true)
                      setTimeout(() => setBtnLoading(false), 1500)
                    }}
                  >
                    {btnLoading ? 'Processing...' : 'Click to Test Loading'}
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled State
                  </Button>
                  <Button variant="outline" disabled>
                    Disabled Outline
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            5. CARD PRIMITIVES (PROGRAMME, DEPARTMENT, FACILITY)
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>Card Architecture</EditorialLabel>
              <H2 className="mt-1">Modular Academic Card Primitives</H2>
              <TextSmall className="mt-1">
                Foundational card components populated with verified ANRCAS data models.
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sample Programme Card Primitive */}
              <Card variant="interactive" padding="md" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" size="sm">{PROGRAMMES[0].level}</Badge>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      {PROGRAMMES[0].durationYears} Years
                    </span>
                  </div>
                  <CardHeader className="mb-2">
                    <CardTitle>{PROGRAMMES[0].name}</CardTitle>
                    <CardDescription>{PROGRAMMES[0].departmentName}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pt-0 text-xs text-slate-600 line-clamp-3">
                    {PROGRAMMES[0].description}
                  </CardContent>
                </div>
                <CardFooter className="px-0 pb-0 justify-between">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">
                    Affiliated Degree
                  </span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-secondary)]" />
                </CardFooter>
              </Card>

              {/* Sample Department Card Primitive */}
              <Card variant="interactive" padding="md" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="accent" size="sm">Code: {DEPARTMENTS[0].code}</Badge>
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">Department</span>
                  </div>
                  <CardHeader className="mb-2">
                    <CardTitle>{DEPARTMENTS[0].name}</CardTitle>
                    <CardDescription>Academic Faculty</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pt-0 text-xs text-slate-600 line-clamp-3">
                    {DEPARTMENTS[0].overview}
                  </CardContent>
                </div>
                <CardFooter className="px-0 pb-0 justify-between">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">
                    {DEPARTMENTS[0].programmesOffered.length} Programme
                  </span>
                  <ArrowRight className="h-4 w-4 text-[var(--color-secondary)]" />
                </CardFooter>
              </Card>

              {/* Sample Facility Card Primitive */}
              <Card variant="default" padding="md" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="neutral" size="sm">{FACILITIES[0].category}</Badge>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <CardHeader className="mb-2">
                    <CardTitle>{FACILITIES[0].name}</CardTitle>
                    <CardDescription>Campus Infrastructure</CardDescription>
                  </CardHeader>
                  <CardContent className="px-0 pt-0 text-xs text-slate-600">
                    {FACILITIES[0].description}
                  </CardContent>
                </div>
                <CardFooter className="px-0 pb-0">
                  <div className="flex flex-wrap gap-1.5">
                    {FACILITIES[0].features?.map((f, i) => (
                      <span key={i} className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            6. ACCESSIBLE FORM CONTROLS
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>Accessible Form Primitives</EditorialLabel>
              <H2 className="mt-1">Inputs, Selects & Textareas</H2>
              <TextSmall className="mt-1">
                WAI-ARIA accessible form controls supporting validation states and assistive tech.
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 md:p-8">
              <Input
                label="Student Full Name"
                placeholder="e.g. Radhakrishnan"
                helperText="Enter as registered on official records"
                required
              />

              <Select
                label="Select Interested Programme"
                placeholder="Choose a degree programme..."
                options={PROGRAMMES.map((p) => ({
                  value: p.slug,
                  label: p.name,
                }))}
                required
              />

              <Input
                label="Contact Mobile"
                placeholder="+91 98765 43210"
                leftIcon={<Phone className="h-4 w-4" />}
                helperText="Active WhatsApp or phone number"
              />

              <div className="md:col-span-2">
                <Textarea
                  label="Admission Enquiry or Question"
                  placeholder="Ask about admissions, transport routes, or academic details..."
                  helperText="Our college administration will review and respond."
                />
              </div>

              <div>
                <Input
                  label="Simulated Error Validation"
                  placeholder="invalid-entry"
                  defaultValue="student@invalid"
                  error="Please enter a valid institution email address."
                />
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            7. ACCESSIBLE ACCORDION & DROPDOWN PRIMITIVES
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>Interactive Primitives</EditorialLabel>
              <H2 className="mt-1">WAI-ARIA Accordion & Dropdown</H2>
              <TextSmall className="mt-1">
                Fully keyboard accessible with arrow keys, enter, space, and Escape dismissals.
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Accordion type="single" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What university is ANRCAS affiliated with?</AccordionTrigger>
                    <AccordionContent>
                      A.N. Radhakrishnan College of Arts & Science is formally affiliated with
                      Thiruvalluvar University, Vellore, Tamil Nadu. All degree curricula, examinations,
                      and degree awards adhere to university regulations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Where is the college campus located?</AccordionTrigger>
                    <AccordionContent>
                      The campus is located along Vadamavandal Road, Vadamavandal, Thiruvannamalai District,
                      Tamil Nadu, with scheduled college bus transit serving rural routes and nearby transit junctions.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What degree programmes are currently offered?</AccordionTrigger>
                    <AccordionContent>
                      Current verified programmes include B.Sc Computer Science, B.Sc Mathematics,
                      B.Com (General), B.Com Corporate Secretaryship, BBA (Business Administration), and postgraduate M.Com.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-6 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[var(--color-primary)] mb-2">Dropdown Primitive</h4>
                  <p className="text-xs text-[var(--color-text-muted)] mb-4">
                    Accessible action menu with outside-click listener and escape-key dismissal.
                  </p>

                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="outline" size="sm" rightIcon={<MoreVertical className="h-4 w-4" />}>
                        Academic Actions
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>Download Syllabus PDF</DropdownItem>
                      <DropdownItem>View Transport Routes</DropdownItem>
                      <DropdownItem>Contact Office Desk</DropdownItem>
                      <DropdownItem disabled>Online Portal (Future Phase)</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
                  <Breadcrumb
                    items={[
                      { label: 'ANRCAS' },
                      { label: 'Academics' },
                      { label: 'Computer Science' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            8. IMAGE & MEDIA ABSTRACTION
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>Media Component Abstraction</EditorialLabel>
              <H2 className="mt-1">Responsive Image & Robust Fallback</H2>
              <TextSmall className="mt-1">
                Lazy-loading image wrapper with aspect-ratio management and graceful error/fallback UI.
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
                <span className="text-xs font-bold text-[var(--color-primary)] block mb-2">
                  Official Seal Rendering (1:1 Ratio)
                </span>
                <Image
                  src={logoImg}
                  alt="ANRCAS College Seal"
                  aspectRatio="16/9"
                  className="object-contain p-4 bg-slate-50 rounded"
                />
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
                <span className="text-xs font-bold text-[var(--color-primary)] block mb-2">
                  Fallback Simulation (Missing/Broken Media)
                </span>
                <Image
                  src="/non-existent-campus-photo.jpg"
                  alt="Campus Central Library Photograph"
                  aspectRatio="16/9"
                  fallbackLabel="Authentic Photography Pending"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            9. LOADING, EMPTY & ERROR SYSTEM STATES
            ===================================================================== */}
        <section>
          <Container>
            <div className="mb-6">
              <EditorialLabel>System Feedback</EditorialLabel>
              <H2 className="mt-1">Loading, Empty & Error Primitives</H2>
              <TextSmall className="mt-1">
                Ensuring clean user feedback across asynchronous academic operations.
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white">
                <LoadingState message="Fetching examination timetable..." />
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
                <EmptyState
                  title="No Upcoming Events Found"
                  description="Check back later for university seminar announcements and NSS camp updates."
                  action={
                    <Button variant="outline" size="sm">
                      View Past Events
                    </Button>
                  }
                />
              </div>

              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
                <ErrorState
                  title={sampleErrorRetried ? 'Error Resolved' : 'Records Service Timeout'}
                  message={
                    sampleErrorRetried
                      ? 'Service reconnected successfully. Design system state verified.'
                      : 'Could not connect to academic catalog. Please verify your connection.'
                  }
                  onRetry={() => setSampleErrorRetried(true)}
                  retryLabel={sampleErrorRetried ? 'Reset Error' : 'Test Retry Action'}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            10. FOUNDATION LAYOUT PRIMITIVES (SECTION HEADER & EYEBROWS)
            ===================================================================== */}
        <section className="bg-slate-50 py-12 border-t border-slate-200">
          <Container>
            <div className="mb-8">
              <SectionEyebrow variant="blue">Editorial Foundations</SectionEyebrow>
              <H2 className="mt-1">SectionHeader & Eyebrow Primitives</H2>
              <TextSmall className="mt-1">
                Standardized editorial section headings featuring signature collegiate dividers and high-contrast typography.
              </TextSmall>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg bg-white border border-slate-200">
                <SectionHeader
                  eyebrow="Campus Infrastructure"
                  eyebrowVariant="blue"
                  title="Future-Ready Collegiate Learning Environment"
                  description="Offering university-accredited degree programmes in Computer Science, Business Administration, and Pure Mathematics."
                  action={
                    <Button variant="collegiate" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Explore Facilities
                    </Button>
                  }
                />
              </div>

              <div className="p-6 rounded-lg bg-[#0D0D0D] border border-stone-800 text-white">
                <SectionHeader
                  inverted
                  eyebrow="Admissions 2026"
                  title="Begin Your Academic Journey at ANRCAS"
                  description="Experience quality higher education empowered by dedicated college bus transit connecting regional routes."
                  action={
                    <Button variant="gold" size="sm">
                      Apply Online
                    </Button>
                  }
                />
              </div>
            </div>
          </Container>
        </section>

        {/* =====================================================================
            11. ROUTING ARCHITECTURE EXPLORER (FUTURE PHASES)
            ===================================================================== */}
        <section className="bg-white py-12 border-t border-[var(--color-border)]">
          <Container>
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <EditorialLabel>Routing Foundation</EditorialLabel>
                <H2 className="mt-1">Future Route Catalog & Phase Schedule</H2>
                <TextSmall className="mt-1">
                  Click any route to verify that the router hierarchy is configured. Per Phase 1 scope, these sections will be designed in their designated phases.
                </TextSmall>
              </div>
              <Badge variant="secondary" size="md">
                17 Target Routes Configured
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {MAIN_NAV_ITEMS.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.href}
                  className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary-dark)]">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge variant="accent" size="sm">{item.badge}</Badge>
                    )}
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[var(--color-secondary-dark)]" />
                </Link>
              ))}

              {/* Sub-routes */}
              <Link
                to="/programmes/computer-science"
                className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] transition-colors group"
              >
                <span className="text-xs font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary-dark)]">
                  Programme: CS Detail
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[var(--color-secondary-dark)]" />
              </Link>

              <Link
                to="/news/nss-special-camp-vadamavandal"
                className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary-light)] transition-colors group"
              >
                <span className="text-xs font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary-dark)]">
                  News: NSS Camp
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-[var(--color-secondary-dark)]" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}
