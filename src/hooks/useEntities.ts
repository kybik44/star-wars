import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { swapiService } from "../services/swapiService";
import { localStorageService } from "../services/localStorage";
import { extractEntityId, getCurrentPage, getTotalPages } from "@/shared";
import type {
  EntityType,
  EntitySearchParams,
  PaginationInfo,
  Entity,
  EditableEntity,
} from "../types";

export const useEntities = <T extends Entity>(
  entityType: EntityType,
  params: EntitySearchParams = {}
) => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: [entityType, params],
    queryFn: () => swapiService.getEntities<T>(entityType, params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Merge server data with local edits
  const entitiesWithLocalEdits = useMemo(() => {
    if (!data?.results) return [];
    
    const localEdits = localStorageService.getEntityEdits(entityType);
    
    return data.results.map((entity) => {
      const entityId = extractEntityId(entity.url);
      const localEdit = localEdits[entityId];
      
      if (localEdit) {
        // Merge original entity with local edits
        return {
          ...entity,
          ...localEdit.editedData,
        } as T & EditableEntity;
      }
      
      return entity as T;
    });
  }, [data?.results, entityType]);

  const paginationInfo: PaginationInfo | null = data
    ? {
        currentPage: getCurrentPage(data.next, data.previous),
        totalPages: getTotalPages(data.count),
        hasNext: !!data.next,
        hasPrevious: !!data.previous,
        totalCount: data.count,
      }
    : null;

  return {
    entities: entitiesWithLocalEdits,
    paginationInfo,
    isLoading,
    error: error as Error | null,
    isError,
    refetch,
  };
};
