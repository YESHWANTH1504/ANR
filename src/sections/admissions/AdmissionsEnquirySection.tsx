import React, { useState, useEffect } from 'react'
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
  Sparkles,
  PhoneCall,
} from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { publicService } from '@/api/services/publicService'
import { PROGRAMMES } from '@/data/programmes'
import { COLLEGE_INFO } from '@/data/college'
import type { Programme } from '@/api/types'

interface FormErrors {
  applicantName?: string
  email?: string
  phone?: string
  message?: string
}

export const AdmissionsEnquirySection: React.FC = () => {
  const [programmes, setProgrammes] = useState<Array<{ value: string; label: string }>>([])
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    programmeName: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [referenceId, setReferenceId] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    // Populate available programmes from API or local fallback
    publicService
      .getProgrammes()
      .then((data: Programme[]) => {
        if (data && data.length > 0) {
          setProgrammes(data.map((p) => ({ value: p.name, label: `${p.name} (${p.degree})` })))
        } else {
          setProgrammes(PROGRAMMES.map((p) => ({ value: p.name, label: `${p.name} (${p.degree})` })))
        }
      })
      .catch(() => {
        setProgrammes(PROGRAMMES.map((p) => ({ value: p.name, label: `${p.name} (${p.degree})` })))
      })
  }, [])

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Applicant full name is required.'
    } else if (formData.applicantName.trim().length < 2) {
      newErrors.applicantName = 'Name must be at least 2 characters.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required for admissions notifications.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.'
    }

    const phoneClean = formData.phone.replace(/[\s\-()]/g, '')
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile contact number is required.'
    } else if (!/^\+?[0-9]{7,15}$/.test(phoneClean)) {
      newErrors.phone = 'Please enter a valid phone number (e.g. +91 98400 12345).'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details or questions regarding your admission.'
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Query details must be at least 5 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isSubmitting) return

    setIsSubmitting(true)
    setApiError(null)

    try {
      const res = await publicService.submitAdmissionsEnquiry({
        applicant_name: formData.applicantName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        programme_name: formData.programmeName || undefined,
        message: formData.message.trim(),
      })
      setReferenceId(res.id)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to connect to admissions server.'
      setApiError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      applicantName: '',
      email: '',
      phone: '',
      programmeName: '',
      message: '',
    })
    setErrors({})
    setReferenceId(null)
    setApiError(null)
  }

  return (
    <Section
      id="online-admissions-enquiry"
      variant="canvas"
      padding="lg"
      className="bg-slate-50 border-t border-b border-slate-200"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <EditorialLabel className="text-[#082046] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-bold">
              <Sparkles className="h-3.5 w-3.5 text-[#E4B316]" />
              Direct Institutional Desk
            </EditorialLabel>

            <H2 className="text-2xl sm:text-3xl font-extrabold text-[#082046] tracking-tight">
              Online Admissions Enquiry &amp; Registration (2026–2027)
            </H2>

            <TextLead className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Submit your enquiry directly to the official admissions registry at {COLLEGE_INFO.name}. Our academic counsellors will guide you through seat availability, eligibility, and scholarship pathways.
            </TextLead>

            {/* Helpline Card */}
            <div className="p-5 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#082046] text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="h-5 w-5 text-[#E4B316]" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Helpline</div>
                  <div className="text-sm font-extrabold text-[#082046]">{COLLEGE_INFO.contact.primaryPhone}</div>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Admissions desk available Monday through Saturday, 9:00 AM – 5:00 PM.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl border border-slate-200 shadow-sm">
              {referenceId ? (
                /* Success Receipt */
                <div className="text-center py-8 space-y-6">
                  <div className="h-16 w-16 rounded-full bg-emerald-100 border border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-9 w-9 text-emerald-600" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-2xl font-bold text-[#082046]">Enquiry Registered</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Thank you, <strong>{formData.applicantName}</strong>. Your admissions enquiry has been logged into our institutional database.
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs space-y-2 font-mono max-w-md mx-auto text-slate-800">
                    <div>
                      <strong>Application Ref:</strong>{' '}
                      <span className="text-blue-700 font-bold">#{referenceId.slice(0, 8).toUpperCase()}</span>
                    </div>
                    {formData.programmeName && (
                      <div>
                        <strong>Programme:</strong> {formData.programmeName}
                      </div>
                    )}
                    <div>
                      <strong>Email:</strong> {formData.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {formData.phone}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleReset}
                    rightIcon={<RotateCcw className="h-4 w-4" />}
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {apiError && (
                    <div className="p-4 rounded-md border border-red-200 bg-red-50 text-red-900 text-xs flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Submission Issue:</strong> {apiError}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      id="enquiry-applicant-name"
                      label="Applicant Full Name"
                      placeholder="e.g. S. Vignesh"
                      required
                      value={formData.applicantName}
                      onChange={(e) => {
                        setFormData({ ...formData, applicantName: e.target.value })
                        if (errors.applicantName) setErrors({ ...errors, applicantName: undefined })
                      }}
                      error={errors.applicantName}
                    />

                    <Input
                      id="enquiry-email"
                      type="email"
                      label="Email Address"
                      placeholder="vignesh@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: undefined })
                      }}
                      error={errors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      id="enquiry-phone"
                      type="tel"
                      label="Mobile Phone Number"
                      placeholder="+91 98400 12345"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        if (errors.phone) setErrors({ ...errors, phone: undefined })
                      }}
                      error={errors.phone}
                    />

                    <Select
                      id="enquiry-programme"
                      label="Programme of Interest"
                      value={formData.programmeName}
                      onChange={(e) => setFormData({ ...formData, programmeName: e.target.value })}
                      options={[
                        { value: '', label: '-- Select a Programme --' },
                        ...programmes,
                      ]}
                    />
                  </div>

                  <Textarea
                    id="enquiry-message"
                    label="Questions or Message for Admissions Desk"
                    placeholder="Enter your query regarding admissions criteria, hostel availability, fee structure, or bus routes..."
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: undefined })
                    }}
                    error={errors.message}
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      rightIcon={
                        isSubmitting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4 text-[#E4B316]" />
                        )
                      }
                      className="bg-[#082046] hover:bg-[#0C4DA2] text-white w-full sm:w-auto font-bold cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? 'REGISTERING...' : 'REGISTER ADMISSION ENQUIRY'}
                    </Button>
                    <p className="mt-2.5 text-xs text-slate-500">
                      Your information is protected and stored securely in accordance with institutional privacy standards.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
