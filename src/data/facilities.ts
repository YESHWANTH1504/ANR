export interface Facility {
  id: string
  name: string
  category: 'Academic' | 'Infrastructure' | 'Student Life'
  description: string
  features?: string[]
}

export const FACILITIES: Facility[] = [
  {
    id: 'fac-computer-lab',
    name: 'Modern Computer Laboratory',
    category: 'Academic',
    description: 'Equipped with networked computer terminals, development environments, and high-speed internet connectivity for practical sessions.',
    features: ['High-speed internet', 'Modern OS environments', 'Dedicated workstations'],
  },
  {
    id: 'fac-library',
    name: 'College Library & Reading Room',
    category: 'Academic',
    description: 'Academic volumes, reference materials, periodicals, and quiet study areas supporting undergraduate and postgraduate research.',
    features: ['Reference section', 'Subject textbooks', 'Reading room facilities'],
  },
  {
    id: 'fac-transport',
    name: 'Dedicated College Bus Transit',
    category: 'Infrastructure',
    description: 'Extensive college bus network connecting Vadamavandal with surrounding villages and transit hubs across Thiruvannamalai District.',
    features: ['Covers rural routes', 'Scheduled timings', 'Safe student transit'],
  },
  {
    id: 'fac-sports',
    name: 'Sports & Physical Education Grounds',
    category: 'Student Life',
    description: 'Outdoor athletic grounds and recreation areas facilitating physical training, intra-mural tournaments, and fitness.',
    features: ['Outdoor play areas', 'Athletics coaching', 'Annual sports events'],
  },
  {
    id: 'fac-seminar-hall',
    name: 'Seminar & Conference Hall',
    category: 'Academic',
    description: 'Multi-purpose hall with audio-visual equipment hosting symposiums, guest lectures, orientations, and cultural assemblies.',
    features: ['Audio-visual system', 'Acoustic treatment', 'Assembly seating'],
  },
]
