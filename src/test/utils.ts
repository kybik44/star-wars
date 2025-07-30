import { QueryClient } from '@tanstack/react-query'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        throwOnError: false, 
      },
      mutations: {
        retry: false,
      },
    },
  }) 