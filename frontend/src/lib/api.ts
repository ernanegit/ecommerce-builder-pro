const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface User {
  id: string
  email: string
  name: string
  plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'
  createdAt: string
}

export interface Template {
  id: string
  name: string
  category: string
  description: string
  imageUrl?: string
  features: string[]
  isPopular?: boolean
}

export interface Store {
  id: string
  name: string
  subdomain: string
  domain?: string
  status: 'PENDING' | 'ACTIVE' | 'SUSPENDED'
  templateId: string
  template?: Template
  userId: string
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface CreateStoreRequest {
  name: string
  subdomain: string
  templateId: string
  domain?: string
}

class ApiClient {
  private token: string | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = ${API_URL}
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = Bearer 
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || HTTP )
    }

    return response.json()
  }

  // Auth
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  // User
  async getUser(): Promise<User> {
    return this.request<User>('/api/users/me')
  }

  // Templates
  async getTemplates(): Promise<{ templates: Template[] }> {
    return this.request<{ templates: Template[] }>('/api/templates')
  }

  // Stores
  async getStores(): Promise<{ stores: Store[] }> {
    return this.request<{ stores: Store[] }>('/api/stores')
  }

  async createStore(data: CreateStoreRequest): Promise<{ store: Store }> {
    return this.request<{ store: Store }>('/api/stores', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>('/health')
  }
}

export const apiClient = new ApiClient()
