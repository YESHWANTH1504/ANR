export interface CollegeInfo {
  name: string
  shortName: string
  tagline: string
  affiliation: string
  address: {
    street: string
    locality: string
    district: string
    state: string
    country: string
  }
  contact: {
    primaryPhone: string
    landline: string
    email: string
  }
}

export const COLLEGE_INFO: CollegeInfo = {
  name: 'A.N. Radhakrishnan College of Arts & Science',
  shortName: 'ANRCAS',
  tagline: 'Empowering minds through quality higher education',
  affiliation: 'Affiliated to Thiruvalluvar University, Vellore',
  address: {
    street: 'Vadamavandal Road',
    locality: 'Vadamavandal',
    district: 'Thiruvannamalai District',
    state: 'Tamil Nadu',
    country: 'India',
  },
  contact: {
    primaryPhone: '+91 8939804020',
    landline: '04182-247518',
    email: 'admin@anrcas.edu.in',
  },
}
