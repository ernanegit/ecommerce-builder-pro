'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Store, Zap, Shield, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'



export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecionando para o dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                E-commerce Builder Pro
              </span>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                onClick={() => router.push('/auth')}
              >
                Entrar
              </Button>
              <Button onClick={() => router.push('/auth')}>
                Começar Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crie sua loja virtual em{' '}
            <span className="text-blue-600">5 minutos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para criar, gerenciar e escalar seu e-commerce. 
            Templates profissionais, analytics em tempo real e integrações brasileiras.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => router.push('/auth')}
              className="text-lg px-8 py-3"
            >
              Criar Loja Grátis
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3"
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para vender online
            </h2>
            <p className="text-xl text-gray-600">
              Ferramentas profissionais para fazer seu negócio crescer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Setup Rápido</CardTitle>
                <CardDescription>
                  Crie sua loja em minutos com nossos templates otimizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>✓ Templates responsivos</li>
                  <li>✓ Configuração automática</li>
                  <li>✓ SSL gratuito</li>
                  <li>✓ CDN global</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Integrações Brasileiras</CardTitle>
                <CardDescription>
                  Pagamentos e logística otimizados para o Brasil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>✓ PagSeguro & Mercado Pago</li>
                  <li>✓ Correios integrado</li>
                  <li>✓ Nota Fiscal automática</li>
                  <li>✓ PIX nativo</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Analytics Avançadas</CardTitle>
                <CardDescription>
                  Dados em tempo real para otimizar suas vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>✓ Dashboard em tempo real</li>
                  <li>✓ Funil de conversão</li>
                  <li>✓ Abandono de carrinho</li>
                  <li>✓ Relatórios automáticos</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de empreendedores que já vendem online
          </p>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => router.push('/auth')}
            className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-50"
          >
            Criar Minha Loja Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 E-commerce Builder Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}