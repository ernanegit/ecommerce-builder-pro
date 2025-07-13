// frontend/src/components/ui/loading.tsx
import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <Loader2
      size={size}
      className={`animate-spin ${className || ''}`}
    />
  )
}

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = "Carregando..." }: LoadingPageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size={48} className="mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}