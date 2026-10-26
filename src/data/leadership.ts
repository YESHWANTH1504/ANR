export interface LeaderProfile {
  id: string
  name: string
  role: string
  designation: string
  title: string
  message: string
  isFounder: boolean
  trustAffiliation: string
  keyCommitments: string[]
}

export const FOUNDER_DATA: LeaderProfile = {
  id: 'leader-founder',
  name: 'Thiru. A.N. Radhakrishnan',
  role: 'Founder',
  designation: 'Visionary Founder, ANR College of Arts & Science',
  title: 'Founder & Guiding Light',
  message:
    'Established with the mission to bring accessible, value-grounded higher education to students of rural and suburban Tamil Nadu.',
  isFounder: true,
  trustAffiliation: 'A Unit of Meenakshi Group',
  keyCommitments: [
    'Rural Educational Upliftment & Accessible Collegiate Opportunity',
    'Generational Advancement for First-Generation Degree Aspirants',
    'Value-Grounded Growth, Ethical Character & Disciplined Learning',
  ],
}

export const LEADERSHIP: LeaderProfile[] = [FOUNDER_DATA]

