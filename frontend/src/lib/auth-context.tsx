'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { apiClient, User } from './api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          apiClient.setToken(token)
          const userData = await apiClient.getUser()
          setUser(userData)
        } catch (error) {
          console.error('Failed to load user:', error)
          localStorage.removeItem('auth_token')
          apiClient.clearToken()
        }
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await apiClient.login(email, password)
    apiClient.setToken(response.token)
    setUser(response.user)
  }

  const register = async (email: string, password: string, name: string) => {
    const response = await apiClient.register(email, password, name)
    apiClient.setToken(response.token)
    setUser(response.user)
  }

  const logout = () => {
    apiClient.clearToken()
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
