import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Trophy, Users, HeartHandshake, CheckCircle2 } from 'lucide-react'
import { Container } from '@/components/shared/Container'
import sportsImg from '@/assets/gallery_sports.webp'
import culturalImg from '@/assets/gallery_cultural.webp'
import seminarImg from '@/assets/gallery_seminar.webp'
import campusImg from '@/assets/campus_main.webp'

interface GalleryPhoto {
  id: string
  title: string
  category: string
  src: string
  alt: string
  caption: string
  colSpan: string
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'sports',
    title: 'Athletics & Sports Events',
    category: 'Sports & Athletics',
    src: sportsImg,
    alt: 'Students and athletes participating in annual sports and athletic events on the college grounds',
    caption: 'Inter-departmental track events and athletic tournaments fostering teamwork, discipline, and physical vigor.',
    colSpan: 'lg:col-span-7',
  },
  {
    id: 'cultural',
    title: 'Traditional Cultural Celebrations',
    category: 'Campus Culture',
    src: culturalImg,
    alt: 'Students performing on stage during traditional Pongal festival and cultural celebrations',
    caption: 'Traditional Pongal festival gatherings and cultural stage performances celebrating regional heritage.',
    colSpan: 'lg:col-span-5',
  },
  {
    id: 'seminar',
    title: 'Academic Gatherings & Seminars',
    category: 'Academic Seminars',
    src: seminarImg,
    alt: 'Students and faculty attending an academic seminar and symposium in the college assembly hall',
    caption: 'Faculty symposiums, guest lectures, and student presentations conducted in the college assembly hall.',
    colSpan: 'lg:col-span-5',
  },
  {
    id: 'campus',
    title: 'College Campus Environment',
    category: 'Campus Environment',
    src: campusImg,
    alt: 'Main entrance and academic building of A.N. Radhakrishnan College in Vadamavandal',
    caption: 'Expansive green grounds and peaceful academic surroundings situated along Vadamavandal Road.',
    colSpan: 'lg:col-span-7',
  },
]

interface StudentLifeHighlight {
  id: string
  title: string
  category: string
  description: string
  icon: React.ReactNode
  aspects: string[]
}

const STUDENT_LIFE_HIGHLIGHTS: StudentLifeHighlight[] = [
  {
    id: 'athletics',
    title: 'Physical Discipline & Athletics',
    category: 'Sports & Health',
    description:
      'Spacious outdoor athletic grounds host annual sports meets, track competitions, and intra-collegiate matches that foster physical stamina, endurance, and team camaraderie.',
    icon: <Trophy className="h-5 w-5 text-[#082046]" aria-hidden="true" />,
    aspects: ['Outdoor sports grounds', 'Annual college sports meet', 'Inter-departmental tournaments'],
  },
  {
    id: 'seminars',
    title: 'Academic Seminars & Assemblies',
    category: 'Co-Curricular Learning',
    description:
      'Equipped multi-purpose seminar hall hosts academic symposiums, guest lectures by subject scholars, student paper presentations, and departmental orientation assemblies.',
    icon: <Users className="h-5 w-5 text-[#082046]" aria-hidden="true" />,
    aspects: ['Audio-visual seminar hall', 'Faculty & student symposiums', 'Orientation & guest lectures'],
  },
  {
    id: 'nss',
    title: 'Civic Responsibility & NSS Outreach',
    category: 'Community Service',
    description:
      'Active National Service Scheme (NSS) unit engages student volunteers in community outreach drives across Vadamavandal, including annual seven-day special rural service camps.',
    icon: <HeartHandshake className="h-5 w-5 text-[#082046]" aria-hidden="true" />,
    aspects: ['Seven-day annual rural camp', 'Community health & civic drives', 'Voluntary student enrolment'],
  },
]

export const CampusLifeGallery: React.FC = () => {
  return (
    <section
      id="student-life"
      aria-labelledby="student-life-heading"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-slate-200"
    >
      {/* Anchor identifiers for smooth navigation */}
      <span id="gallery" className="sr-only" aria-hidden="true" />
      <span id="student-experience" className="sr-only" aria-hidden="true" />

      <Container size="wide">
        {/* ==============================================================
            SECTION HEADER: Dignified Editorial Introduction
            ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#082046]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4B316]" aria-hidden="true" />
            <span>Life at ANR</span>
          </div>

          <h2
            id="student-life-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#082046] tracking-tight leading-[1.15]"
          >
            Learning Beyond the Classroom
          </h2>

          <div className="w-16 h-1 bg-[#E4B316] rounded-full mx-auto" aria-hidden="true" />

          <p className="font-sans text-slate-600 text-base sm:text-lg pt-1 leading-relaxed">
            Collegiate life at A.N. Radhakrishnan College of Arts &amp; Science extends beyond classroom lectures into purposeful extracurricular and co-curricular engagement. From athletic events on our sports grounds and academic symposiums in the seminar hall to traditional cultural observances and civic volunteerism through the National Service Scheme (NSS), students develop leadership, camaraderie, and community awareness.
          </p>
        </div>

        {/* ==============================================================
            EDITORIAL GALLERY GRID: 4 Authentic Photos with Crisp Captions
            ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {GALLERY_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className={`${photo.colSpan} flex flex-col`}
            >
              <article
                aria-labelledby={`gallery-photo-title-${photo.id}`}
                className="group flex-1 flex flex-col justify-between bg-white rounded-lg border border-slate-200 hover:border-[#082046]/40 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Photo Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-slate-100">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 filter brightness-95"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"
                    aria-hidden="true"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-white/95 text-[#082046] border border-slate-200 rounded shadow-xs">
                      {photo.category}
                    </span>
                  </div>
                </div>

                {/* Caption Footer */}
                <div className="p-5 sm:p-6 space-y-1.5 flex-1 flex flex-col justify-center">
                  <h3
                    id={`gallery-photo-title-${photo.id}`}
                    className="font-serif text-lg sm:text-xl font-bold text-[#082046] leading-snug group-hover:text-[#0C4DA2] transition-colors"
                  >
                    {photo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* ==============================================================
            SUPPORTING STUDENT-LIFE HIGHLIGHTS: 3 Verified Cards
            ============================================================== */}
        <div className="mt-14 sm:mt-18 pt-12 sm:pt-16 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Co-Curricular &amp; Community Pursuits
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#082046]">
              Key Facets of Campus Life
            </h3>
            <p className="text-sm text-slate-600">
              Structured avenues for athletic development, academic inquiry, and social service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {STUDENT_LIFE_HIGHLIGHTS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-slate-200 p-6 space-y-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded bg-[#082046]/5 text-[#082046] border border-[#082046]/10 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E4B316] block">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#082046] mt-0.5">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {item.aspects.map((aspect, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#E4B316] shrink-0" aria-hidden="true" />
                      <span>{aspect}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==============================================================
            UNDERSTATED SECTION CTA: Explore Campus Activities
            ============================================================== */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/campus-life"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded border-2 border-[#082046] text-[#082046] hover:bg-[#082046] hover:text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#E4B316]"
          >
            <span>Explore Campus Activities</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}

