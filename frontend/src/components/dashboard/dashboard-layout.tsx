'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Store, User, LogOut, Plus, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth')
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Minhas Lojas', href: '/dashboard/stores', icon: Store },
    { name: 'Nova Loja', href: '/dashboard/new-store', icon: Plus },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-gray-900">
              E-commerce Builder
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className="flex items-center w-full px-3 py-2 text-left text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Plano {user?.plan}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-1"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
