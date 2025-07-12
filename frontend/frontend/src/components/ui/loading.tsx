import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <Loader2 
      size={size} 
      className={nimate-spin } 
    />
  )
}

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = "Carregando..." }: LoadingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <LoadingSpinner size={48} className="text-blue-600" />
      <p className="mt-4 text-lg text-gray-600">{message}</p>
    </div>
  )
}
