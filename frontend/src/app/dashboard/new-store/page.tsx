import { CreateStoreForm } from '@/components/dashboard/create-store-form'

export default function NewStorePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Criar Nova Loja</h1>
        <p className="text-gray-600">
          Configure sua nova loja virtual em poucos passos
        </p>
      </div>
      <CreateStoreForm />
    </div>
  )
}
