import sportsImg from '@/assets/gallery_sports.webp'
import culturalImg from '@/assets/gallery_cultural.webp'
import seminarImg from '@/assets/gallery_seminar.webp'
import labImg from '@/assets/lab_students.webp'
import libraryImg from '@/assets/library_students.webp'
import campusImg from '@/assets/campus_main.webp'

export interface GalleryItem {
  id: string
  title: string
  category: 'Campus Grounds' | 'Academic Life' | 'Technology Labs' | 'Sports & Athletics' | 'Campus Culture'
  src: string
  alt: string
  caption: string
  featured?: boolean
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'campus-grounds',
    title: 'Main Campus Entrance & College Grounds',
    category: 'Campus Grounds',
    src: campusImg,
    alt: 'Main entrance arch and administrative academic block at ANRCAS campus in Vadamavandal',
    caption: 'Serene academic environment and campus premises situated peacefully along Vadamavandal Road.',
    featured: true,
  },
  {
    id: 'seminar-hall',
    title: 'National Academic Symposium & Seminar Hall',
    category: 'Academic Life',
    src: seminarImg,
    alt: 'Faculty, keynote presenters, and students participating in an academic symposium at ANRCAS',
    caption: 'Scholars, keynote speakers, and faculty members delivering collegiate presentations and guest lectures.',
  },
  {
    id: 'computer-laboratory',
    title: 'Computer Science Practical Systems Lab',
    category: 'Technology Labs',
    src: labImg,
    alt: 'Students working at individual desktop workstations during computing laboratory practicals',
    caption: 'Dedicated hands-on software development and digital literacy sessions in the networked computing lab.',
  },
  {
    id: 'central-library',
    title: 'Central Reading Room & Reference Library',
    category: 'Academic Life',
    src: libraryImg,
    alt: 'Students studying at central library tables with reference book stacks in the background',
    caption: 'Quiet collaborative study sessions supported by comprehensive university reference collections.',
  },
  {
    id: 'sports-meet',
    title: 'Annual Sports & Athletic Events',
    category: 'Sports & Athletics',
    src: sportsImg,
    alt: 'Students and athletes gathered on the college grounds during sports activities and competitions',
    caption: 'Inter-departmental track events and athletic tournaments fostering teamwork, discipline, and physical vigor.',
  },
  {
    id: 'cultural-celebrations',
    title: 'Pongal Festival & Cultural Celebrations',
    category: 'Campus Culture',
    src: culturalImg,
    alt: 'Students performing on the college auditorium stage during traditional cultural celebrations',
    caption: 'Traditional Tamil cultural celebrations, music, folk dance performances, and community harmony.',
  },
]

export const getFeaturedGalleryItem = (): GalleryItem => {
  return GALLERY_ITEMS.find((item) => item.featured) || GALLERY_ITEMS[0]
}

export const getGalleryCategories = (): string[] => {
  const categories = Array.from(new Set(GALLERY_ITEMS.map((item) => item.category)))
  return ['All', ...categories]
}
