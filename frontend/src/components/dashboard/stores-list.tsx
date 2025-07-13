// frontend/src/components/dashboard/stores-list.tsx
'use client'

import { Store } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading'
import { useStores } from '@/hooks/use-api'
import { ExternalLink, Settings, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface StoreCardProps {
  store: Store
}

function StoreCard({ store }: StoreCardProps) {
  const router = useRouter()

  const getStatusColor = (status: Store['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Store['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'Ativa'
      case 'PENDING':
        return 'Pendente'
      case 'SUSPENDED':
        return 'Suspensa'
      default:
        return status
    }
  }

  const storeUrl = store.domain || `${store.subdomain}.ecommerce-builder.com`

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{store.name}</CardTitle>
            <CardDescription className="text-sm">
              {storeUrl}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(store.status)}>
            {getStatusText(store.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {store.template && (
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Template:</span> {store.template.name}
            </p>
            <p className="text-xs text-gray-500">{store.template.category}</p>
          </div>
        )}

        <div className="text-xs text-gray-500">
          Criada em: {new Date(store.createdAt).toLocaleDateString('pt-BR')}
        </div>

        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => window.open(`https://${storeUrl}`, '_blank')}
            disabled={store.status !== 'ACTIVE'}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Visitar
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => router.push(`/dashboard/stores/${store.id}/analytics`)}
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Analytics
          </Button>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => router.push(`/dashboard/stores/${store.id}/settings`)}
          >
            <Settings className="w-4 h-4 mr-1" />
            Configurar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function StoresList() {
  const { data: storesData, isLoading, error } = useStores()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Minhas Lojas</h1>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Erro ao carregar lojas: {error.message}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Tentar Novamente
        </Button>
      </div>
    )
  }

  const stores = storesData?.stores || []

  if (stores.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Minhas Lojas</h1>
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma loja criada ainda
          </h2>
          <p className="text-gray-600 mb-6">
            Crie sua primeira loja virtual em apenas alguns minutos
          </p>
          <Button onClick={() => router.push('/dashboard/new-store')}>
            Criar Primeira Loja
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minhas Lojas</h1>
        <Button onClick={() => router.push('/dashboard/new-store')}>
          Nova Loja
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  )}