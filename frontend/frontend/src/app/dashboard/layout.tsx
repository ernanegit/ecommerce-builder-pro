'use client'

import { useAuth } from '@/lib/auth-context'
import { LoadingPage } from '@/components/ui/loading'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <LoadingPage message="Carregando dashboard..." />
  }

  if (!isAuthenticated) {
    return <LoadingPage message="Redirecionando..." />
  }

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  )
}
