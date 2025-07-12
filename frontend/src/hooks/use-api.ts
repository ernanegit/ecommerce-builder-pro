import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient, Template, Store, CreateStoreRequest } from '@/lib/api'

export function useTemplates() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: () => apiClient.getTemplates(),
  })
}

export function useStores() {
  return useQuery({
    queryKey: ['stores'],
    queryFn: () => apiClient.getStores(),
  })
}

export function useCreateStore() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateStoreRequest) => apiClient.createStore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stores'] })
    },
  })
}

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.healthCheck(),
    refetchInterval: 30000, // Check every 30 seconds
  })
}
