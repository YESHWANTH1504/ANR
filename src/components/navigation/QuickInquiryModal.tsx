import React, { useState } from 'react'
import { X, Send, CheckCircle2 } from 'lucide-react'

interface QuickInquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    programme: 'B.Sc Computer Science',
    location: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
      >
        {/* Modal Top Header */}
        <div className="bg-[#0C4DA2] text-white p-5 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E4B316] text-black text-xs font-bold uppercase tracking-wider mb-2">
              Admissions 2026–2027
            </div>
            <h3 id="inquiry-modal-title" className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              Apply or Enquire for Admission
            </h3>
            <p className="text-xs text-blue-100 mt-1">
              A.N. Radhakrishnan College of Arts and Science • Vadamavandal
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-slate-800">
                Thank You for Your Inquiry!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Our collegiate admission counseling team will contact you shortly with programme brochures, fee concession guidance, and bus transit schedules.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
                Direct Admissions Desk Helpline: <strong>+91 89398 04020</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  onClose()
                }}
                className="px-6 py-2.5 rounded bg-[#0C4DA2] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[#08387A] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Student / Candidate Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. R. Karthi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0C4DA2] focus:ring-1 focus:ring-[#0C4DA2] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0C4DA2] focus:ring-1 focus:ring-[#0C4DA2] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0C4DA2] focus:ring-1 focus:ring-[#0C4DA2] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Interested Academic Programme *
                </label>
                <select
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0C4DA2] focus:ring-1 focus:ring-[#0C4DA2] outline-none bg-white"
                >
                  <option value="B.Sc Computer Science">B.Sc Computer Science (Computing & IT)</option>
                  <option value="B.Com General">B.Com (General Commerce & Banking)</option>
                  <option value="B.Com Corporate Secretaryship">B.Com Corporate Secretaryship (CS)</option>
                  <option value="BBA">BBA (Bachelor of Business Administration)</option>
                  <option value="B.Sc Mathematics">B.Sc Mathematics (Pure & Applied)</option>
                  <option value="M.Com">M.Com (Postgraduate Commerce)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location / Hometown
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cheyyar / Kanchipuram / Vandavasi"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded focus:border-[#0C4DA2] focus:ring-1 focus:ring-[#0C4DA2] outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded bg-[#E4B316] hover:bg-[#0C4DA2] text-black hover:text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <span>Submit Application Inquiry</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>✓ Dedicated College Bus Transit</span>
                <span>✓ Thiruvalluvar University Affiliated</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
