import { apiClient } from '../client'
import type {
  Department,
  Programme,
  NewsArticle,
  GalleryItem,
  PublicSettings,
  AdmissionsEnquiryCreate,
  AdmissionsEnquiry,
  ContactMessageCreate,
  ContactMessage,
} from '../types'

export const publicService = {
  getDepartments: (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : ''
    return apiClient.get<Department[]>(`/departments${query}`)
  },

  getDepartmentBySlug: (slug: string) => {
    return apiClient.get<Department>(`/departments/${encodeURIComponent(slug)}`)
  },

  getProgrammes: (level?: string, departmentId?: string) => {
    const params = new URLSearchParams()
    if (level) params.append('level', level)
    if (departmentId) params.append('department_id', departmentId)
    const qs = params.toString() ? `?${params.toString()}` : ''
    return apiClient.get<Programme[]>(`/programmes${qs}`)
  },

  getProgramme: (slugOrId: string) => {
    return apiClient.get<Programme>(`/programmes/${encodeURIComponent(slugOrId)}`)
  },

  getNews: (category?: string, limit = 20, offset = 0) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    params.append('limit', String(limit))
    params.append('offset', String(offset))
    return apiClient.get<NewsArticle[]>(`/news?${params.toString()}`)
  },

  getNewsArticle: (slug: string) => {
    return apiClient.get<NewsArticle>(`/news/${encodeURIComponent(slug)}`)
  },

  getGallery: (category?: string, featuredOnly?: boolean) => {
    const params = new URLSearchParams()
    if (category) params.append('category', category)
    if (featuredOnly) params.append('featured_only', 'true')
    const qs = params.toString() ? `?${params.toString()}` : ''
    return apiClient.get<GalleryItem[]>(`/gallery${qs}`)
  },

  getSiteSettings: () => {
    return apiClient.get<PublicSettings>('/site-settings')
  },

  submitAdmissionsEnquiry: (data: AdmissionsEnquiryCreate) => {
    return apiClient.post<AdmissionsEnquiry>('/admissions-enquiries', data)
  },

  submitContactMessage: (data: ContactMessageCreate) => {
    return apiClient.post<ContactMessage>('/contact-messages', data)
  },
}
