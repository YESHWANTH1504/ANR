import React from 'react'
import { Container } from '@/components/shared/Container'
import { Section } from '@/components/shared/Section'
import { H2, TextLead, EditorialLabel } from '@/components/ui/Typography'
import { Reveal } from '@/components/shared/Reveal'
import campusImg from '@/assets/campus_main.webp'
import labImg from '@/assets/lab_students.webp'
import libImg from '@/assets/library_students.webp'
import sportsImg from '@/assets/gallery_sports.webp'
import culturalImg from '@/assets/gallery_cultural.webp'

interface CollageItem {
  title: string
  subtitle: string
  category: string
  image: string
  span: string
}

const COLLAGE_ITEMS: CollageItem[] = [
  {
    title: 'Modern Computing Practice',
    subtitle: 'Practical algorithm development and software experiments in university-accredited computing labs.',
    category: 'Technology & Applied Skills',
    image: labImg,
    span: 'lg:col-span-7 aspect-[16/10]',
  },
  {
    title: 'Central Reading & Scholarship',
    subtitle: 'Quiet collaborative study environments with university reference holdings and periodicals.',
    category: 'Academic Life',
    image: libImg,
    span: 'lg:col-span-5 aspect-[4/3] lg:aspect-auto',
  },
  {
    title: 'Athletic Meet & Physical Vigor',
    subtitle: 'Spacious outdoor grounds hosting intra-mural athletics, track events, and team fitness.',
    category: 'Sports & Athletics',
    image: sportsImg,
    span: 'lg:col-span-4 aspect-[4/3]',
  },
  {
    title: 'Cultural Heritage & Harmony',
    subtitle: 'Traditional Tamil festivals, music, performing arts, and vibrant collegiate gatherings.',
    category: 'Campus Culture',
    image: culturalImg,
    span: 'lg:col-span-4 aspect-[4/3]',
  },
  {
    title: 'Tranquil College Grounds',
    subtitle: 'Expansive rural learning environment surrounded by greenery along Vadamavandal Road.',
    category: 'Campus Grounds',
    image: campusImg,
    span: 'lg:col-span-4 aspect-[4/3]',
  },
]

export const CampusExperience: React.FC = () => {
  return (
    <Section variant="subtle" padding="lg" id="experience" className="border-b border-[var(--color-border)] bg-[var(--color-ivory)]">
      <Container size="wide">
        <Reveal>
          <div className="max-w-3xl mb-12 space-y-3">
            <EditorialLabel className="text-[var(--color-primary)]">
              Visual Chronicle of Student Life
            </EditorialLabel>

            <H2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-serif text-[var(--color-ink)] tracking-tight">
              A Photographic Collage of ANRCAS Life
            </H2>

            <TextLead className="text-[var(--color-muted)] text-base sm:text-lg font-light leading-relaxed">
              Collegiate life at ANRCAS balances formal university curricula with hands-on laboratory work, athletic competitions, festive celebrations, and rural civic responsibility.
            </TextLead>
          </div>
        </Reveal>

        {/* Asymmetrical Photographic Collage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {COLLAGE_ITEMS.map((item, idx) => (
            <Reveal key={idx} delay={idx * 80} className={item.span}>
              <div className="group card-image-tile relative h-full w-full overflow-hidden bg-stone-900 border border-[var(--color-border)]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover object-center group-hover:scale-104 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[var(--color-ink)]/90 text-[var(--color-gold-light)] border border-white/10 backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1.5 leading-relaxed font-light line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
