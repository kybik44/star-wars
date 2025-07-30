// LocalStorage keys with type safety
export const STORAGE_KEYS = {
  CHARACTER_EDITS: 'star-wars-character-edits',
  ENTITY_EDITS: 'star-wars-entity-edits',
  THEME_PREFERENCE: 'star-wars-theme-preference',
  SEARCH_HISTORY: 'star-wars-search-history',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

// Create entity-specific storage key
export const createEntityStorageKey = (entityType: string, suffix?: string): string => {
  const baseKey = `star-wars-${entityType}-edits`;
  return suffix ? `${baseKey}-${suffix}` : baseKey;
}; 