import { useQuery } from '@tanstack/react-query';
import { swapiService } from '../services/swapiService';
import type { CharacterSearchParams, PaginationInfo } from '../types';

export const useCharacters = (params: CharacterSearchParams = {}) => {
  const {
    data,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['characters', params],
    queryFn: () => swapiService.getCharacters(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Calculate pagination info
  const paginationInfo: PaginationInfo | null = data ? {
    currentPage: swapiService.getCurrentPage(data.next, data.previous),
    totalPages: swapiService.getTotalPages(data.count),
    hasNext: !!data.next,
    hasPrevious: !!data.previous,
    totalCount: data.count,
  } : null;

  return {
    characters: data?.results || [],
    paginationInfo,
    isLoading,
    error: error as Error | null,
    isError,
    refetch,
  };
}; 