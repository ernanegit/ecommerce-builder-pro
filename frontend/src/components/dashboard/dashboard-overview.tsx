'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useStores, useHealthCheck } from '@/hooks/use-api'
import { useAuth } from '@/lib/auth-context'
import { Store, BarChart3, TrendingUp, Users, ShoppingCart, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/ui/loading'

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: {
    value: number
    isPositive: boolean
  }
}

function StatsCard({ title, value, description, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className={lex items-center text-xs }>
            <TrendingUp className={h-3 w-3 mr-1 } />
            {trend.value}% desde o mês passado
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function DashboardOverview() {
  const { user } = useAuth()
  const { data: storesData, isLoading: storesLoading } = useStores()
  const { data: healthData } = useHealthCheck()
  const router = useRouter()

  const stores = storesData?.stores || []
  const activeStores = stores.filter(store => store.status === 'ACTIVE')
  const pendingStores = stores.filter(store => store.status === 'PENDING')

  if (storesLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size={48} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo de volta, {user?.name}! 
            {healthData?.status === 'OK' && (
              <Badge variant="secondary" className="ml-2">
                Sistema Online
              </Badge>
            )}
          </p>
        </div>
        <Button onClick={() => router.push('/dashboard/new-store')}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Loja
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Lojas"
          value={stores.length}
          description="Lojas criadas na plataforma"
          icon={Store}
        />
        <StatsCard
          title="Lojas Ativas"
          value={activeStores.length}
          description="Lojas em funcionamento"
          icon={TrendingUp}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Visitantes"
          value="2,543"
          description="Visitantes este mês"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Vendas"
          value="R$ 12,345"
          description="Receita este mês"
          icon={ShoppingCart}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Recent Stores */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lojas Recentes</CardTitle>
            <CardDescription>
              Suas últimas lojas criadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stores.length === 0 ? (
              <div className="text-center py-6">
                <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Nenhuma loja criada ainda</p>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/dashboard/new-store')}
                >
                  Criar Primeira Loja
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {stores.slice(0, 5).map((store) => (
                  <div key={store.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-gray-600">
                        {store.subdomain}.ecommerce-builder.com
                      </p>
                    </div>
                    <Badge 
                      variant={store.status === 'ACTIVE' ? 'default' : 'secondary'}
                    >
                      {store.status === 'ACTIVE' ? 'Ativa' : 
                       store.status === 'PENDING' ? 'Pendente' : 'Suspensa'}
                    </Badge>
                  </div>
                ))}
                {stores.length > 5 && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/dashboard/stores')}
                  >
                    Ver Todas as Lojas
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics Rápidas</CardTitle>
            <CardDescription>
              Resumo de performance das suas lojas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeStores.length === 0 ? (
              <div className="text-center py-6">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  Analytics aparecerão quando você tiver lojas ativas
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">98.5%</p>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">1.2s</p>
                    <p className="text-sm text-gray-600">Tempo de Carregamento</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Conversão média</span>
                    <span className="font-medium">2.4%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ticket médio</span>
                    <span className="font-medium">R$ 89,50</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Abandono carrinho</span>
                    <span className="font-medium">65%</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {pendingStores.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Ações Pendentes</CardTitle>
            <CardDescription className="text-yellow-700">
              Algumas lojas precisam da sua atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingStores.map((store) => (
                <div key={store.id} className="flex items-center justify-between">
                  <span className="text-yellow-800">
                    {store.name} - Configuração pendente
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => router.push(/dashboard/stores//settings)}
                  >
                    Configurar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
