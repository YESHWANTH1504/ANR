import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Bus, Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import { Reveal } from '@/components/shared/Reveal'
import { COLLEGE_INFO } from '@/data/college'

export const ContactPreview: React.FC = () => {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${COLLEGE_INFO.name}, Vadamavandal, Tamil Nadu`
  )}`

  return (
    <section id="contact-preview" className="py-20 lg:py-28 bg-[var(--color-paper)] border-b border-[var(--color-border)]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Institutional Contact Information */}
          <div className="lg:col-span-6 bg-white border border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                  <span className="h-px w-6 bg-[var(--color-gold)]" />
                  <span>Institutional Reach</span>
                </div>

                <h2 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--color-ink)] leading-snug">
                  Collegiate Office &amp; Administration.
                </h2>

                <p className="mt-2 text-[var(--color-muted)] text-sm sm:text-base leading-relaxed">
                  Whether inquiring about admissions, college bus routes, or academic certificates, our administrative office will assist you.
                </p>

                <div className="mt-6 space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[var(--color-sand)]/60 text-[var(--color-ink)] shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--color-ink)] block">Campus Address</span>
                      <p className="text-[var(--color-muted)] mt-0.5 leading-relaxed">
                        {COLLEGE_INFO.address.street}, {COLLEGE_INFO.address.locality},<br />
                        {COLLEGE_INFO.address.district}, {COLLEGE_INFO.address.state}, {COLLEGE_INFO.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[var(--color-sand)]/60 text-[var(--color-ink)] shrink-0 mt-0.5">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--color-ink)] block">Telephone Assistance</span>
                      <p className="text-[var(--color-muted)] mt-0.5">
                        <a href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`} className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)]">
                          {COLLEGE_INFO.contact.primaryPhone}
                        </a>
                        <span className="text-stone-300 mx-2">•</span>
                        <a href={`tel:${COLLEGE_INFO.contact.landline.replace(/[^0-9]/g, '')}`} className="hover:underline">
                          {COLLEGE_INFO.contact.landline}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[var(--color-sand)]/60 text-[var(--color-ink)] shrink-0 mt-0.5">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--color-ink)] block">Official Email</span>
                      <p className="text-[var(--color-muted)] mt-0.5">
                        <a href={`mailto:${COLLEGE_INFO.contact.email}`} className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)]">
                          {COLLEGE_INFO.contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-border)]/60 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${COLLEGE_INFO.contact.primaryPhone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-ink)] hover:bg-[var(--color-charcoal)] text-white font-medium px-5 py-2.5 text-xs transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Office</span>
                </a>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-transparent hover:bg-[var(--color-ivory)] text-[var(--color-ink)] font-medium px-5 py-2.5 text-xs border border-[var(--color-border)] transition-colors group"
                >
                  <span>Detailed Contact Page</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Campus Location Card & Transit Guide */}
          <div className="lg:col-span-6 bg-white border border-[var(--color-border)] p-6 sm:p-8 flex flex-col justify-between">
            <Reveal delay={100}>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
                  <span className="h-px w-6 bg-[var(--color-gold)]" />
                  <span>Regional Access</span>
                </div>

                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[var(--color-ink)] leading-snug">
                  Travel &amp; Daily Transit.
                </h3>

                <p className="mt-2 text-[var(--color-muted)] text-sm leading-relaxed">
                  Located near major highways connecting Cheyyar, Kanchipuram, and Vandavasi with daily campus transportation.
                </p>

                <div className="mt-6 space-y-4 text-xs sm:text-sm">
                  <div className="p-4 bg-[var(--color-sand)]/30 border border-[var(--color-border)]">
                    <div className="flex items-center gap-2 text-[var(--color-ink)] font-bold mb-1">
                      <Bus className="h-4 w-4 text-[var(--color-gold)]" />
                      <span>Dedicated College Bus Fleet</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                      Daily student transport covers 15+ surrounding rural villages, taluks, and road intersections free of charge.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[var(--color-sand)]/60 text-[var(--color-ink)] shrink-0 mt-0.5">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-[var(--color-ink)] block">Office Working Hours</span>
                      <p className="text-[var(--color-muted)] mt-0.5">
                        Monday – Saturday: 9:00 AM – 5:00 PM (Closed on Sundays &amp; Government Holidays)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[var(--color-border)]/60 flex items-center justify-between">
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-ink)] hover:text-[var(--color-anrcas-blue)] transition-colors group"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Get Driving Directions</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
