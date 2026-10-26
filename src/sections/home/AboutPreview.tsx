import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, MapPin } from 'lucide-react'
import founderImg from '@/assets/founder.webp'
import meenakshiLogo from '@/assets/meenakshi_group.png'
import { Container } from '@/components/shared/Container'

export const AboutPreview: React.FC = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-section-heading"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
    >
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* ==============================================================
              LEFT COLUMN (7 cols): Editorial Institutional Story
              ============================================================== */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            {/* Section Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
              <span>About ANR</span>
            </div>

            {/* Main Section Headings */}
            <div>
              <h2
                id="about-section-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082046] tracking-tight leading-[1.15]"
              >
                A Place to Learn, Explore and Grow
              </h2>
              <div className="w-16 h-1 bg-[#E4B316] rounded-full mt-3" aria-hidden="true" />
            </div>

            {/* Verified Institutional Narrative */}
            <div className="font-sans text-slate-700 text-base sm:text-[17px] leading-relaxed space-y-4">
              <p>
                A.N. Radhakrishnan College of Arts &amp; Science (ANRCAS) is an institution of higher education established under the aegis of the Meenakshi Ammal Trust, dedicated to providing accessible, value-grounded learning in Vadamavandal, Tamil Nadu.
              </p>
              <p>
                Affiliated with <strong>Thiruvalluvar University, Vellore</strong>, the college offers structured undergraduate and postgraduate degree programmes across computing, commerce, business administration, mathematics, and literature. Academic life at ANRCAS integrates university curriculum standards with practical computer laboratory sessions, central library study, and civic development through the National Service Scheme (NSS).
              </p>
              <p>
                Situated along the Cheyyar – Kanchipuram corridor in Thiruvannamalai District, the college supports students with experienced faculty guidance and dedicated college bus transit connecting surrounding rural villages and transit junctions.
              </p>
            </div>

            {/* Verified Institutional Attributes Strip */}
            <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-[13px] font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 border border-slate-200">
                <GraduationCap className="h-3.5 w-3.5 text-[#082046]" aria-hidden="true" />
                <span>Thiruvalluvar University Affiliated</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 border border-slate-200">
                <BookOpen className="h-3.5 w-3.5 text-[#082046]" aria-hidden="true" />
                <span>Arts &amp; Science Programmes</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-100 border border-slate-200">
                <MapPin className="h-3.5 w-3.5 text-[#082046]" aria-hidden="true" />
                <span>Vadamavandal, Tamil Nadu</span>
              </span>
            </div>

            {/* Call to Action Link */}
            <div className="pt-3">
              <Link
                to="/about"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 px-6.5 py-3 rounded-[var(--radius-sm)] bg-[#082046] hover:bg-[#0C4DA2] active:bg-[#061833] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#082046]"
              >
                <span>Discover Our College</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* ==============================================================
              RIGHT COLUMN (5 cols): Founder & Heritage Visual Card
              Preserves natural 1:1 image proportions without cropping or distortion
              ============================================================== */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md bg-white rounded-[var(--radius-md)] border border-slate-200 shadow-lg overflow-hidden relative group">
              {/* Antique Gold Accent Top Bar */}
              <div className="h-1 bg-[#E4B316] w-full" aria-hidden="true" />

              {/* Founder Portrait Frame (Proportions Preserved) */}
              <div className="p-6 bg-gradient-to-b from-slate-50 via-slate-50/80 to-blue-50/30 flex flex-col items-center text-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden bg-white p-2 border-2 border-slate-200 shadow-sm mb-4">
                  <img
                    src={founderImg}
                    alt="Portrait of Founder Thiru A.N. Radhakrishnan"
                    loading="lazy"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E4B316] mb-1">
                  Founder &amp; Guiding Vision
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#082046] leading-tight">
                  Thiru A.N. Radhakrishnan
                </h3>
                <p className="font-sans text-xs text-slate-600 mt-1">
                  A.N. Radhakrishnan College of Arts &amp; Science
                </p>
                <p className="font-serif italic text-xs sm:text-[13px] text-slate-500 mt-3 px-2 leading-relaxed">
                  &ldquo;Dedicated to bringing accessible higher education to rural and regional Tamil Nadu.&rdquo;
                </p>
              </div>

              {/* Sponsoring Trust Endorsement Footer */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                    Under the Aegis of
                  </span>
                  <span className="block text-xs font-bold text-slate-800 leading-tight mt-0.5">
                    Meenakshi Ammal Trust
                  </span>
                </div>
                <img
                  src={meenakshiLogo}
                  alt="Meenakshi Ammal Trust"
                  className="h-7 w-auto object-contain opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

