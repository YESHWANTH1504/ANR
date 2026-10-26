export type DegreeLevel = 'UG' | 'PG' | 'Certificate'
export type DepartmentCategory = 'Science' | 'Commerce & Management' | 'Languages'

export interface Department {
  id: string
  name: string
  slug: string
  code: string
  category: DepartmentCategory | string
  overview: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface Programme {
  id: string
  department_id: string
  department_name?: string
  name: string
  slug: string
  degree: string
  level: DegreeLevel | string
  duration_years: number
  description: string
  overview?: string
  admission_info?: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface NewsArticle {
  id: string
  title: string
  slug: string
  category: 'Event' | 'Camp' | 'Academics' | 'Notice' | string
  summary: string
  content?: string
  image_url?: string
  is_published: boolean
  publication_date: string
  created_at?: string
  updated_at?: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image_url: string
  alt_text: string
  caption: string
  is_featured: boolean
  display_order: number
  is_published: boolean
  created_at?: string
  updated_at?: string
}

export interface PublicSettings {
  college_name: string
  short_name: string
  affiliation: string
  primary_phone: string
  landline: string
  email: string
  address_locality: string
  address_state: string
  campus_notice: string
  admissions_active: boolean
}

export interface AdmissionsEnquiryCreate {
  applicant_name: string
  email: string
  phone: string
  programme_id?: string
  programme_name?: string
  message: string
}

export interface AdmissionsEnquiry extends AdmissionsEnquiryCreate {
  id: string
  status: 'New' | 'Contacted' | 'In Progress' | 'Closed'
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface ContactMessageCreate {
  sender_name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactMessage extends ContactMessageCreate {
  id: string
  status: 'New' | 'Read' | 'Replied' | 'Archived'
  admin_notes?: string
  created_at: string
  updated_at: string
}

export interface DashboardStats {
  total_enquiries: number
  new_enquiries: number
  total_messages: number
  new_messages: number
  total_programmes: number
  active_programmes: number
  total_departments: number
  total_news: number
  published_news: number
  total_gallery_items: number
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: AdminUser
}
