import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { swapiService } from "../services/swapiService";
import { localStorageService } from "../services/localStorage";
import type { EditableCharacter, LocalCharacterEdit } from "../types";

export const useCharacter = (id: string) => {
  const {
    data: originalCharacter,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["character", id],
    queryFn: () => swapiService.getCharacter(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 3,
  });

  // Get local edits for this character
  const localEdit = useMemo(() => {
    return localStorageService.getCharacterEdit(id);
  }, [id]);

  // Merge original character with local edits
  const character: EditableCharacter | null = useMemo(() => {
    if (!originalCharacter) return null;

    const baseCharacter: EditableCharacter = {
      ...originalCharacter,
      id: swapiService.extractCharacterId(originalCharacter.url),
    };

    if (localEdit) {
      return {
        ...baseCharacter,
        ...localEdit.editedData,
      };
    }

    return baseCharacter;
  }, [originalCharacter, localEdit]);

  // Save local edits
  const saveLocalEdit = (editedData: Partial<EditableCharacter>) => {
    const newEdit: LocalCharacterEdit = {
      id,
      editedData,
      lastModified: new Date().toISOString(),
    };

    localStorageService.setCharacterEdit(id, newEdit);
  };

  // Clear local edits for this character
  const clearLocalEdit = () => {
    localStorageService.removeCharacterEdit(id);
  };

  // Check if character has local edits
  const hasLocalEdits = !!localEdit;

  return {
    character,
    originalCharacter,
    isLoading,
    error: error as Error | null,
    isError,
    hasLocalEdits,
    localEdit,
    saveLocalEdit,
    clearLocalEdit,
  };
};
