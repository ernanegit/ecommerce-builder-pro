'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading'
import { TemplateSelector } from './template-selector'
import { useTemplates, useCreateStore } from '@/hooks/use-api'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function CreateStoreForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    templateId: '',
    domain: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const router = useRouter()
  const { data: templatesData, isLoading: templatesLoading } = useTemplates()
  const createStoreMutation = useCreateStore()

  const templates = templatesData?.templates || []

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da loja é obrigatório'
    }

    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'Subdomínio é obrigatório'
    } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'Subdomínio deve conter apenas letras minúsculas, números e hífens'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.templateId) {
      newErrors.templateId = 'Selecione um template'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    try {
      await createStoreMutation.mutateAsync({
        name: formData.name,
        subdomain: formData.subdomain,
        templateId: formData.templateId,
        domain: formData.domain || undefined,
      })
      router.push('/dashboard/stores')
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Erro ao criar loja' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const selectedTemplate = templates.find(t => t.id === formData.templateId)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium }>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={w-16 h-1 mx-2 } />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Informações Básicas</span>
          <span>Escolher Template</span>
          <span>Confirmar</span>
        </div>
      </div>

      {/* Step 1: Basic Information */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Informações da Loja</CardTitle>
            <CardDescription>
              Defina o nome e o endereço da sua nova loja virtual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Loja</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ex: Minha Loja Incrível"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain">Subdomínio</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="subdomain"
                  name="subdomain"
                  placeholder="minhaloja"
                  value={formData.subdomain}
                  onChange={handleInputChange}
                  className={lex-1 }
                />
                <span className="text-sm text-gray-500">.ecommerce-builder.com</span>
              </div>
              {errors.subdomain && (
                <p className="text-sm text-red-600">{errors.subdomain}</p>
              )}
              <p className="text-sm text-gray-500">
                Sua loja será acessível em: {formData.subdomain || 'subdomain'}.ecommerce-builder.com
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain">Domínio Personalizado (Opcional)</Label>
              <Input
                id="domain"
                name="domain"
                placeholder="www.minhaloja.com"
                value={formData.domain}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Você pode configurar um domínio personalizado depois
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleNext}>
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Template Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Escolha um Template</CardTitle>
              <CardDescription>
                Selecione o design que melhor representa sua marca
              </CardDescription>
            </CardHeader>
          </Card>

          {errors.templateId && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {errors.templateId}
            </div>
          )}

          <TemplateSelector
            templates={templates}
            selectedTemplateId={formData.templateId}
            onSelectTemplate={(templateId) => {
              setFormData(prev => ({ ...prev, templateId }))
              if (errors.templateId) {
                setErrors(prev => ({ ...prev, templateId: '' }))
              }
            }}
            isLoading={templatesLoading}
          />

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button onClick={handleNext} disabled={!formData.templateId}>
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Confirmar Criação</CardTitle>
            <CardDescription>
              Revise as informações antes de criar sua loja
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-gray-900">Informações da Loja</h3>
                <dl className="mt-2 space-y-1">
                  <div>
                    <dt className="text-sm text-gray-500">Nome:</dt>
                    <dd className="text-sm font-medium">{formData.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Subdomínio:</dt>
                    <dd className="text-sm font-medium">{formData.subdomain}.ecommerce-builder.com</dd>
                  </div>
                  {formData.domain && (
                    <div>
                      <dt className="text-sm text-gray-500">Domínio personalizado:</dt>
                      <dd className="text-sm font-medium">{formData.domain}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {selectedTemplate && (
                <div>
                  <h3 className="font-medium text-gray-900">Template Selecionado</h3>
                  <div className="mt-2 p-3 border rounded-md">
                    <h4 className="font-medium">{selectedTemplate.name}</h4>
                    <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Categoria: {selectedTemplate.category}</p>
                  </div>
                </div>
              )}
            </div>

            {errors.submit && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {errors.submit}
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button 
                onClick={handleSubmit} 
                disabled={createStoreMutation.isPending}
              >
                {createStoreMutation.isPending ? (
                  <>
                    <LoadingSpinner size={16} className="mr-2" />
                    Criando Loja...
                  </>
                ) : (
                  'Criar Loja'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
