import React from 'react'
import { Link } from 'react-router-dom'
import { X, Bell, Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react'

interface AnnouncementsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Admissions Open for Academic Year 2026–2027',
    tag: 'Admissions 2026',
    date: 'Apr 2026',
    desc: 'Applications are actively invited for B.Sc Computer Science, B.Com, BBA, B.Sc Mathematics, and M.Com. Apply online or visit the campus admission desk.',
    href: '/admissions',
    urgent: true,
  },
  {
    id: 2,
    title: 'College Bus Transit Routes Updated',
    tag: 'Transport',
    date: 'Mar 2026',
    desc: 'College transit fleet operates daily routes spanning Cheyyar, Kanchipuram, Vandavasi, Arani, and surrounding rural villages.',
    href: '/facilities',
  },
  {
    id: 3,
    title: 'Merit Scholarships & First-Graduate Concessions',
    tag: 'Scholarships',
    date: 'Mar 2026',
    desc: 'Special fee concessions awarded to students scoring above 85% in Higher Secondary exams and first-generation graduate applicants.',
    href: '/admissions',
  },
  {
    id: 4,
    title: 'State-Level AI & Python Technical Symposium',
    tag: 'Academic Event',
    date: 'May 2026',
    desc: 'Department of Computer Science hosts annual inter-collegiate technology symposium with paper presentation and coding hackathons.',
    href: '/news',
  },
]

export const AnnouncementsDrawer: React.FC<AnnouncementsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="announcements-drawer-title"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#0C4DA2] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-white/15">
              <Bell className="h-5 w-5 text-[#E4B316]" />
            </div>
            <div>
              <h3 id="announcements-drawer-title" className="font-bold text-base sm:text-lg leading-tight">
                Campus Announcements
              </h3>
              <p className="text-xs text-blue-100">Official bulletins &amp; circulars</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close announcements drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3 text-sm text-amber-900">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Admissions counseling is active at the college campus in Vadamavandal. Free student transport guidance available on campus.
            </span>
          </div>

          <div className="space-y-3.5">
            {ANNOUNCEMENTS.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg border border-slate-200 hover:border-[#0C4DA2] hover:shadow-md transition-all bg-white group"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                    item.urgent 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-blue-50 text-[#0C4DA2]'
                  }`}>
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0C4DA2] transition-colors leading-snug">
                  {item.title}
                </h4>

                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C4DA2] hover:text-[#08387A] transition-colors"
                  >
                    <span>Read Details</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2.5">
          <Link
            to="/admissions"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded bg-[#E4B316] hover:bg-[#0C4DA2] text-black hover:text-white font-bold text-sm uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Apply Now 2026–2027</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
          <div className="text-center">
            <span className="text-xs sm:text-sm text-slate-600 font-medium">Need help? Call +91 89398 04020</span>
          </div>
        </div>
      </div>
    </div>
  )
}
