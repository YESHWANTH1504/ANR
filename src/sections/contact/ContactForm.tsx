import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, Info, Phone, RotateCcw, AlertCircle, Loader2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { CONTACT_DATA, type EnquiryFormData, type EnquiryType } from '@/data/contact'
import { publicService } from '@/api/services/publicService'

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  enquiryType?: string
  message?: string
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: 'General Enquiry',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submittedMessageId, setSubmittedMessageId] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters.'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required for communication.'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@example.com).'
    }

    // Phone validation (optional)
    if (formData.phone.trim()) {
      const phoneClean = formData.phone.replace(/[\s\-()]/g, '')
      if (!/^\+?[0-9]{7,15}$/.test(phoneClean)) {
        newErrors.phone = 'Please provide a valid phone number with digits only.'
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide the details of your enquiry.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate() || isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setApiError(null)

    try {
      const res = await publicService.submitContactMessage({
        sender_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        subject: formData.enquiryType,
        message: formData.message.trim(),
      })
      setSubmittedMessageId(res.id)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to submit enquiry to server.'
      setApiError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      enquiryType: 'General Enquiry',
      message: '',
    })
    setErrors({})
    setSubmittedMessageId(null)
    setApiError(null)
  }

  return (
    <section
      id="enquiry-form"
      className="py-16 md:py-24 bg-[var(--color-paper)] border-b border-[var(--color-border)]"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context & Transparency Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-gold)]">
              <span className="h-1 w-6 bg-[var(--color-gold)]" aria-hidden="true" />
              <span>Enquire with ANRCAS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-ink)] leading-tight">
              Have a question?
            </h2>

            <p className="text-base text-[var(--color-muted)] leading-relaxed">
              Submit your enquiry regarding admissions, academic structure, or collegiate facilities. All correspondence is directed to the official ANRCAS college desk.
            </p>

            {/* Direct Dispatch Guidance Card */}
            <div className="p-6 bg-white border border-[var(--color-border)] rounded-sm space-y-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[var(--color-gold)] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[var(--color-ink)]">
                    Official Email Routing
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                    Submitting this form prepares a formatted enquiry in your default mail application addressed directly to <strong>{CONTACT_DATA.contact.email}</strong>. This ensures transparent correspondence with no third-party tracking.
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-muted)]">
                <Phone className="h-3.5 w-3.5 text-[var(--color-gold)] shrink-0" aria-hidden="true" />
                <span>Urgent telephone support: {CONTACT_DATA.contact.primaryPhone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 border border-[var(--color-border)] rounded-sm shadow-xs">
              {submittedMessageId ? (
                /* Verified Institutional Desk Submission Confirmation */
                <div className="space-y-6 text-center py-6">
                  <div className="h-14 w-14 rounded-full bg-emerald-100 border border-emerald-500 text-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-[var(--color-ink)]">
                      Enquiry Registered Successfully
                    </h3>
                    <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                      Your enquiry has been received and logged directly into the ANRCAS administrative desk system. Our team will review your submission and contact you via email or phone.
                    </p>
                  </div>

                  <div className="p-4 bg-[var(--color-paper)] border border-[var(--color-border)] rounded text-xs text-left text-[var(--color-ink)] space-y-2 font-mono">
                    <div><strong>Reference ID:</strong> <span className="text-[var(--color-collegiate-blue)] font-bold">#{submittedMessageId.slice(0, 8).toUpperCase()}</span></div>
                    <div><strong>Category:</strong> {formData.enquiryType}</div>
                    <div><strong>Name:</strong> {formData.fullName}</div>
                    <div><strong>Sender Email:</strong> {formData.email}</div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleReset}
                      rightIcon={<RotateCcw className="h-4 w-4" />}
                      className="border-[var(--color-border)]"
                    >
                      Submit Another Enquiry
                    </Button>
                  </div>
                </div>
              ) : (
                /* Editorial Form Fields */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {apiError && (
                    <div className="p-4 rounded border border-red-200 bg-red-50 flex items-start gap-3 text-red-900 text-xs">
                      <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Submission Issue:</strong> {apiError}
                        <p className="mt-1 text-red-700">You may also reach our desk directly at {CONTACT_DATA.contact.email}.</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <Input
                      id="contact-full-name"
                      label="Full Name"
                      placeholder="e.g. R. Anbarasan"
                      required
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value })
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                      }}
                      error={errors.fullName}
                    />

                    {/* Email */}
                    <Input
                      id="contact-email"
                      type="email"
                      label="Email Address"
                      placeholder="name@example.com"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: undefined })
                      }}
                      error={errors.email}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <Input
                      id="contact-phone"
                      type="tel"
                      label="Phone Number"
                      placeholder="+91 98765 43210"
                      helperText="Optional, for callback support"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        if (errors.phone) setErrors({ ...errors, phone: undefined })
                      }}
                      error={errors.phone}
                    />

                    {/* Enquiry Type */}
                    <Select
                      id="contact-enquiry-type"
                      label="Enquiry Type"
                      required
                      value={formData.enquiryType}
                      onChange={(e) => {
                        setFormData({ ...formData, enquiryType: e.target.value as EnquiryType })
                      }}
                      options={[
                        { value: 'General Enquiry', label: 'General Enquiry' },
                        { value: 'Admissions', label: 'Admissions' },
                        { value: 'Academics', label: 'Academics' },
                        { value: 'Campus / Facilities', label: 'Campus / Facilities' },
                      ]}
                    />
                  </div>

                  {/* Message */}
                  <Textarea
                    id="contact-message"
                    label="Message"
                    placeholder="Describe your enquiry, programme of interest, or verification details..."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: undefined })
                    }}
                    error={errors.message}
                  />

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      rightIcon={isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                      className="bg-[var(--color-ink)] hover:bg-[var(--color-ink-soft)] text-white w-full sm:w-auto font-medium disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? 'SUBMITTING...' : 'SEND ENQUIRY'}
                    </Button>
                    <p className="mt-3 text-xs text-[var(--color-muted)]">
                      Routes directly to official institutional desk and persists to database.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

