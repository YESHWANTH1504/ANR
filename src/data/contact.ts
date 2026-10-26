import { COLLEGE_INFO } from './college'

export interface EnquiryPathway {
  title: string
  description: string
  href: string
  actionText: string
}

export type EnquiryType =
  | 'General Enquiry'
  | 'Admissions'
  | 'Academics'
  | 'Campus / Facilities'

export interface EnquiryFormData {
  fullName: string
  email: string
  phone: string
  enquiryType: EnquiryType
  message: string
}

export const CONTACT_DATA = {
  institution: COLLEGE_INFO.name,
  shortName: COLLEGE_INFO.shortName,
  affiliation: COLLEGE_INFO.affiliation,
  address: {
    street: COLLEGE_INFO.address.street,
    locality: COLLEGE_INFO.address.locality,
    district: COLLEGE_INFO.address.district,
    state: COLLEGE_INFO.address.state,
    country: COLLEGE_INFO.address.country,
    fullFormatted: `${COLLEGE_INFO.address.street}, ${COLLEGE_INFO.address.locality}, ${COLLEGE_INFO.address.district}, ${COLLEGE_INFO.address.state}, ${COLLEGE_INFO.address.country}`,
  },
  contact: {
    primaryPhone: COLLEGE_INFO.contact.primaryPhone,
    primaryPhoneClean: '+918939804020',
    landline: COLLEGE_INFO.contact.landline,
    landlineClean: '04182247518',
    email: COLLEGE_INFO.contact.email,
  },
  directionsUrl:
    'https://www.google.com/maps/search/?api=1&query=A.N.+Radhakrishnan+College+of+Arts+%26+Science+Vadamavandal',
}

