import { apiClient } from '../client'
import type {
  AuthResponse,
  AdminUser,
  DashboardStats,
  AdmissionsEnquiry,
  ContactMessage,
  Department,
  Programme,
  NewsArticle,
  GalleryItem,
} from '../types'

export interface SiteSettingItem {
  id: number
  key: string
  value: string
  is_public: boolean
  description?: string
  updated_at: string
}

export const adminService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/admin/auth/login', { email, password })
    if (res.access_token) {
      localStorage.setItem('anrcas_admin_token', res.access_token)
      localStorage.setItem('anrcas_admin_user', JSON.stringify(res.user))
    }
    return res
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/admin/auth/logout')
    } catch {
      // Ignore network errors or expired sessions on logout
    } finally {
      localStorage.removeItem('anrcas_admin_token')
      localStorage.removeItem('anrcas_admin_user')
    }
  },

  getCurrentUser: (): AdminUser | null => {
    const raw = localStorage.getItem('anrcas_admin_user')
    if (!raw) return null
    try {
      return JSON.parse(raw) as AdminUser
    } catch {
      return null
    }
  },

  getMe: () => apiClient.get<AdminUser>('/admin/auth/me'),

  getDashboardStats: () => apiClient.get<DashboardStats>('/site-settings/admin/dashboard/stats'),

  // Enquiries
  getEnquiries: (status?: string, search?: string) => {
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    if (search) params.append('search', search)
    const qs = params.toString() ? `?${params.toString()}` : ''
    return apiClient.get<AdmissionsEnquiry[]>(`/admissions-enquiries/admin/all${qs}`)
  },

  getEnquiry: (id: string) => apiClient.get<AdmissionsEnquiry>(`/admissions-enquiries/admin/${id}`),

  updateEnquiry: (id: string, data: { status?: string; admin_notes?: string }) =>
    apiClient.patch<AdmissionsEnquiry>(`/admissions-enquiries/admin/${id}`, data),

  deleteEnquiry: (id: string) => apiClient.delete(`/admissions-enquiries/admin/${id}`),

  // Contact Messages
  getContactMessages: (status?: string, search?: string) => {
    const params = new URLSearchParams()
    if (status) params.append('status', status)
    if (search) params.append('search', search)
    const qs = params.toString() ? `?${params.toString()}` : ''
    return apiClient.get<ContactMessage[]>(`/contact-messages/admin/all${qs}`)
  },

  getContactMessage: (id: string) => apiClient.get<ContactMessage>(`/contact-messages/admin/${id}`),

  updateContactMessage: (id: string, data: { status?: string; admin_notes?: string }) =>
    apiClient.patch<ContactMessage>(`/contact-messages/admin/${id}`, data),

  deleteContactMessage: (id: string) => apiClient.delete(`/contact-messages/admin/${id}`),

  // Departments
  getAllDepartments: () => apiClient.get<Department[]>('/departments/admin/all'),

  createDepartment: (dept: Partial<Department>) =>
    apiClient.post<Department>('/departments/admin', dept),

  updateDepartment: (id: string, dept: Partial<Department>) =>
    apiClient.put<Department>(`/departments/admin/${id}`, dept),

  deleteDepartment: (id: string) => apiClient.delete(`/departments/admin/${id}`),

  // Programmes
  getAllProgrammes: () => apiClient.get<Programme[]>('/programmes/admin/all'),

  createProgramme: (prog: Partial<Programme>) =>
    apiClient.post<Programme>('/programmes/admin', prog),

  updateProgramme: (id: string, prog: Partial<Programme>) =>
    apiClient.put<Programme>(`/programmes/admin/${id}`, prog),

  deleteProgramme: (id: string) => apiClient.delete(`/programmes/admin/${id}`),

  // News
  getAllNews: () => apiClient.get<NewsArticle[]>('/news/admin/all'),

  createNews: (article: Partial<NewsArticle>) =>
    apiClient.post<NewsArticle>('/news/admin', article),

  updateNews: (id: string, article: Partial<NewsArticle>) =>
    apiClient.put<NewsArticle>(`/news/admin/${id}`, article),

  deleteNews: (id: string) => apiClient.delete(`/news/admin/${id}`),

  // Gallery
  getAllGallery: () => apiClient.get<GalleryItem[]>('/gallery/admin/all'),

  createGalleryItem: (item: Partial<GalleryItem>) =>
    apiClient.post<GalleryItem>('/gallery/admin', item),

  updateGalleryItem: (id: string, item: Partial<GalleryItem>) =>
    apiClient.put<GalleryItem>(`/gallery/admin/${id}`, item),

  deleteGalleryItem: (id: string) => apiClient.delete(`/gallery/admin/${id}`),

  // Settings
  getAllSettings: () => apiClient.get<SiteSettingItem[]>('/site-settings/admin/all'),

  updateSetting: (key: string, value: string, description?: string) =>
    apiClient.put<SiteSettingItem>(`/site-settings/admin/${encodeURIComponent(key)}`, {
      value,
      description,
    }),

  // File Upload
  uploadImage: (file: File) => apiClient.upload(file),
}
