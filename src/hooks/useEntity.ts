import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { swapiService } from "../services/swapiService";
import { localStorageService } from "../services/localStorage";
import type {
  EntityType,
  Entity,
  EditableEntity,
  LocalEntityEdit,
} from "../types";

export const useEntity = <T extends Entity>(
  entityType: EntityType,
  id: string
) => {
  const {
    data: originalEntity,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [entityType, id],
    queryFn: () => swapiService.getEntity<T>(entityType, id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
  });

  const localEdit = useMemo(() => {
    return localStorageService.getEntityEdit(entityType, id);
  }, [entityType, id]);

  const entity: (T & EditableEntity) | null = useMemo(() => {
    if (!originalEntity) return null;

    const baseEntity = {
      ...originalEntity,
      id: swapiService.extractEntityId(originalEntity.url, entityType),
    } as T & EditableEntity;

    if (localEdit) {
      return {
        ...baseEntity,
        ...localEdit.editedData,
      };
    }

    return baseEntity;
  }, [originalEntity, localEdit, entityType]);

  const saveLocalEdit = (editedData: Partial<EditableEntity>) => {
    const newEdit: LocalEntityEdit = {
      id,
      editedData,
      lastModified: new Date().toISOString(),
    };

    localStorageService.setEntityEdit(entityType, id, newEdit);
  };

  const clearLocalEdit = () => {
    localStorageService.removeEntityEdit(entityType, id);
  };

  const hasLocalEdits = !!localEdit;

  return {
    entity,
    originalEntity,
    isLoading,
    error: error as Error | null,
    isError,
    hasLocalEdits,
    localEdit,
    saveLocalEdit,
    clearLocalEdit,
  };
};
