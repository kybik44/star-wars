import { extractEntityId } from "@/shared";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { localStorageService } from "../services/localStorage";
import { swapiService } from "../services/swapiService";
import type {
  EditableEntity,
  Entity,
  EntityType,
  LocalEntityEdit,
} from "../types";

export const useEntity = <T extends Entity>(
  entityType: EntityType,
  id: string
) => {
  const [localEditVersion, setLocalEditVersion] = useState(0);

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
  }, [entityType, id, localEditVersion]);

  const entity: (T & EditableEntity) | null = useMemo(() => {
    if (!originalEntity) return null;

    const baseEntity = {
      ...originalEntity,
      id: extractEntityId(originalEntity.url),
    } as T & EditableEntity;

    if (localEdit) {
      return {
        ...baseEntity,
        ...localEdit.editedData,
      };
    }

    return baseEntity;
  }, [originalEntity, localEdit]);

  const saveLocalEdit = useCallback(
    (editedData: Partial<EditableEntity>) => {
      const newEdit: LocalEntityEdit = {
        id,
        editedData,
        lastModified: new Date().toISOString(),
      };

      localStorageService.setEntityEdit(entityType, id, newEdit);
      setLocalEditVersion((prev) => prev + 1);
    },
    [entityType, id]
  );

  const clearLocalEdit = useCallback(() => {
    localStorageService.removeEntityEdit(entityType, id);
    setLocalEditVersion((prev) => prev + 1);
  }, [entityType, id]);

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
