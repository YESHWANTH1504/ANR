import React from 'react'
import { Bus, Clock, ExternalLink } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const CampusLocation: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
      <Container size="wide">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-slate-200 pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="collegiate-eyebrow text-[#0C4DA2]">
                Geographic &amp; Regional Access
              </div>
              <h2 className="collegiate-section-title font-bold text-slate-900 leading-[1.12]">
                College Location &amp; Regional Connectivity
              </h2>
              <div className="collegiate-gold-divider" />
              <p className="collegiate-body text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
                Situated on Vadamavandal Road along the Cheyyar – Kanchipuram corridor, offering a serene green collegiate setting with dedicated college bus transit connecting regional centers.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=A.N.+Radhakrishnan+College+of+Arts+and+Science+Vadamavandal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0C4DA2] hover:text-[#08387A] transition-colors self-start md:self-end group focus-visible:outline-2 focus-visible:outline-[#0C4DA2]"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        {/* 2-Column: Details Card + Responsive Google Map Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Transit & Distance Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-slate-50 p-6 sm:p-8 rounded-lg border border-slate-200">
            <Reveal delay={100}>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                  A.N. Radhakrishnan College of Arts &amp; Science
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {COLLEGE_INFO.address.street}, {COLLEGE_INFO.address.locality}, {COLLEGE_INFO.address.district}, {COLLEGE_INFO.address.state} - 604410
                </p>
              </div>

              {/* Travel Distance Markers */}
              <div className="space-y-3 mt-6">
                <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-slate-700">
                  Transit Distances from Regional Centers
                </h4>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3.5 bg-white rounded border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Cheyyar Town</span>
                    <span className="font-bold text-[#0C4DA2]">~8 km</span>
                  </div>
                  <div className="p-3.5 bg-white rounded border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Kanchipuram</span>
                    <span className="font-bold text-[#0C4DA2]">~28 km</span>
                  </div>
                  <div className="p-3.5 bg-white rounded border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Vandavasi</span>
                    <span className="font-bold text-[#0C4DA2]">~24 km</span>
                  </div>
                  <div className="p-3.5 bg-white rounded border border-slate-200 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Arani</span>
                    <span className="font-bold text-[#0C4DA2]">~32 km</span>
                  </div>
                </div>
              </div>

              {/* Free College Transit Notice */}
              <div className="mt-6 p-4.5 bg-[#0D0D0D] text-white rounded-lg border border-white/10 flex items-start gap-3.5">
                <div className="p-2.5 bg-white/10 rounded text-[#E4B316] shrink-0">
                  <Bus className="h-5 w-5" />
                </div>
                <div className="text-sm">
                  <strong className="text-base font-serif font-bold text-white block mb-0.5">
                    Dedicated Daily Bus Transit
                  </strong>
                  <span className="text-stone-300 font-light leading-relaxed">
                    College buses depart daily at scheduled morning hours from surrounding town transit points directly to the college gates.
                  </span>
                </div>
              </div>

              {/* Office hours quick strip */}
              <div className="mt-6 pt-4 flex items-center justify-between text-xs sm:text-sm text-slate-600 border-t border-slate-200 font-medium">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#0C4DA2]" />
                  Office: 9:00 AM – 5:00 PM
                </span>
                <a
                  href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                  className="font-bold text-[#0C4DA2] hover:text-[#08387A]"
                >
                  {COLLEGE_INFO.contact.primaryPhone}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Embedded Interactive Map */}
          <div className="lg:col-span-7">
            <Reveal delay={200} className="h-full">
              <div className="h-full min-h-[360px] sm:min-h-[420px] w-full rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shadow-xs">
                <iframe
                  title="ANRCAS College Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3892.428059039396!2d79.5441865!3d12.6853245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52c38827fa11c1%3A0x6b3a067098e94fa1!2sA.N.Radhakrishnan%20College%20of%20Arts%20and%20Science!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full min-h-[380px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
