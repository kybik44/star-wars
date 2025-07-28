// LocalStorage keys with type safety
export const STORAGE_KEYS = {
  CHARACTER_EDITS: 'star-wars-character-edits',
  THEME_PREFERENCE: 'star-wars-theme-preference',
  SEARCH_HISTORY: 'star-wars-search-history',
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

// Storage utilities
export const createStorageKey = (key: StorageKey, suffix?: string): string => {
  return suffix ? `${key}-${suffix}` : key;
};

// Validation for storage keys
export const isValidStorageKey = (key: string): key is StorageKey => {
  return Object.values(STORAGE_KEYS).includes(key as StorageKey);
}; 