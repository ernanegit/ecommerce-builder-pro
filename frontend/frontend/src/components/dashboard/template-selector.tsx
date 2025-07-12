'use client'

import { Template } from '@/lib/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

interface TemplateCardProps {
  template: Template
  isSelected: boolean
  onSelect: (templateId: string) => void
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <Card className={elative cursor-pointer transition-all hover:shadow-md }>
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-blue-500 text-white rounded-full p-1">
            <Check className="w-4 h-4" />
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <CardDescription className="text-sm">{template.category}</CardDescription>
          </div>
          {template.isPopular && (
            <Badge variant="secondary" className="text-xs">
              Popular
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
        
        {template.features && template.features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recursos inclusos:</h4>
            <ul className="text-xs text-gray-500 space-y-1">
              {template.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-3 h-3 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
              {template.features.length > 3 && (
                <li className="text-gray-400">
                  +{template.features.length - 3} recursos adicionais
                </li>
              )}
            </ul>
          </div>
        )}
        
        <Button 
          onClick={() => onSelect(template.id)}
          variant={isSelected ? "default" : "outline"}
          className="w-full mt-4"
        >
          {isSelected ? 'Selecionado' : 'Selecionar Template'}
        </Button>
      </CardContent>
    </Card>
  )
}

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplateId: string | null
  onSelectTemplate: (templateId: string) => void
  isLoading?: boolean
}

export function TemplateSelector({ 
  templates, 
  selectedTemplateId, 
  onSelectTemplate,
  isLoading = false 
}: TemplateSelectorProps) {
  if (isLoading) {
    return (
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
    )
  }

  const popularTemplates = templates.filter(t => t.isPopular)
  const otherTemplates = templates.filter(t => !t.isPopular)

  return (
    <div className="space-y-8">
      {popularTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Templates Populares</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </div>
      )}

      {otherTemplates.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">
            {popularTemplates.length > 0 ? 'Outros Templates' : 'Templates Disponíveis'}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                onSelect={onSelectTemplate}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
