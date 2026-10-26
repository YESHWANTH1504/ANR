const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, '') ||
  (import.meta.env.PROD ? '/api/v1' : 'http://localhost:8000/api/v1')

export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('anrcas_admin_token')
  if (token) {
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  
  const headers = new Headers(options.headers || {})
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  const authHeaders = getAuthHeader()
  for (const [key, value] of Object.entries(authHeaders)) {
    if (!headers.has(key)) {
      headers.set(key, value)
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    })

    if (response.status === 204) {
      return {} as T
    }

    const contentType = response.headers.get('content-type')
    const isJson = contentType && contentType.includes('application/json')
    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`
      if (typeof data === 'object' && data !== null && 'detail' in data) {
        errorMessage = String((data as { detail: unknown }).detail)
      } else if (typeof data === 'string' && data.length > 0) {
        errorMessage = data
      }
      throw new ApiError(errorMessage, response.status, data)
    }

    return data as T
  } catch (err) {
    if (err instanceof ApiError) {
      throw err
    }
    const message = err instanceof Error ? err.message : 'Network error or backend server unreachable'
    throw new ApiError(message, 0)
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    }),

  patch: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),

  upload: async (file: File): Promise<{ filename: string; url: string; size_bytes: number }> => {
    const formData = new FormData()
    formData.append('file', file)
    return request<{ filename: string; url: string; size_bytes: number }>('/admin/uploads', {
      method: 'POST',
      body: formData,
    })
  },
}
