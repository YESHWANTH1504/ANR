import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, PhoneCall, Mail, MessageSquare, ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

interface FAQItem {
  id: string
  question: string
  answer: string
}

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I apply for undergraduate (UG) admissions at ANRCAS?',
    answer: 'Students who have passed Higher Secondary (10+2 / +2) from any recognized board (Tamil Nadu State Board, CBSE, ICSE) are eligible to apply. You can apply directly through our admissions section or visit the college admissions office at Vadamavandal with your marksheets and certificates for counseling and provisional admission.',
  },
  {
    id: 'faq-2',
    question: 'What bus transportation facilities are available for students?',
    answer: 'ANRCAS operates dedicated daily college bus routes connecting Vadamavandal with surrounding localities including Cheyyar, Kanchipuram, Arani, Vandavasi, and nearby villages, ensuring accessible, dependable daily transit for rural and suburban students.',
  },
  {
    id: 'faq-3',
    question: 'Which university awards the degree upon graduation?',
    answer: 'All degree programmes (B.Sc, B.Com, BBA, M.Com) are formally affiliated with and conferred by Thiruvalluvar University, Vellore, recognized by the UGC and state authorities. All semester examinations and curricula adhere strictly to university CBCS regulations.',
  },
  {
    id: 'faq-4',
    question: 'What scholarship schemes and fee concessions are available?',
    answer: 'Students can avail Tamil Nadu State Government First-Graduate concessions, SC/ST/OBC community welfare scholarships, as well as institutional merit scholarships sponsored by the Meenakshi Ammal Trust for students scoring high marks in their higher secondary examinations.',
  },
  {
    id: 'faq-5',
    question: 'What career development and placement support is offered?',
    answer: 'ANRCAS maintains an active Training & Placement Cell that arranges pre-placement soft skills training, technical coding practicals, mock interview drills, and on-campus recruitment drives in collaboration with regional IT companies, corporate banks, and commercial enterprises.',
  },
]

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Display Typography & Direct Support */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal>
              <div className="space-y-3">
                <div className="collegiate-eyebrow text-[#0C4DA2]">
                  Admission &amp; Student Inquiries
                </div>
                <h2 className="collegiate-section-title font-bold text-slate-900 tracking-tight leading-[1.12]">
                  Frequently Inquired Academic Matters
                </h2>
                <div className="collegiate-gold-divider" />
                <p className="collegiate-body text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
                  Key answers regarding eligibility criteria, fee concessions, transport routes, and university degree conferral.
                </p>
              </div>
            </Reveal>

            {/* Direct Helpline Card */}
            <Reveal delay={150}>
              <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-7 space-y-5 shadow-xs">
                <h3 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <MessageSquare className="h-5 w-5 text-[#0C4DA2]" />
                  <span>Direct Admissions Desk</span>
                </h3>

                <div className="space-y-3.5 text-sm sm:text-[15px]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-blue-50 text-[#0C4DA2] shrink-0">
                      <PhoneCall className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">Telephone Helpline</span>
                      <a href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`} className="font-bold text-slate-900 hover:text-[#0C4DA2]">
                        {COLLEGE_INFO.contact.primaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded bg-blue-50 text-[#0C4DA2] shrink-0">
                      <Mail className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block font-medium">Email Correspondence</span>
                      <a href={`mailto:${COLLEGE_INFO.contact.email}`} className="font-bold text-slate-900 hover:text-[#0C4DA2]">
                        {COLLEGE_INFO.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/admissions"
                    className="inline-flex items-center justify-between w-full pt-3.5 border-t border-slate-100 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C4DA2] hover:text-[#08387A] transition-colors"
                  >
                    <span>Read Full Admission Guidelines</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Editorial Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <Reveal key={faq.id} delay={index * 80}>
                  <div className="bg-white rounded-lg border border-slate-200 hover:border-[#0C4DA2] transition-colors shadow-xs">
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#0C4DA2]"
                    >
                      <span className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                      <span className={`p-1 text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#0C4DA2]' : ''}`}>
                        <ChevronDown className="h-5 w-5" />
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="px-5 sm:px-6 pb-6 text-base sm:text-[17px] text-slate-600 leading-relaxed border-t border-slate-100 pt-4"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
