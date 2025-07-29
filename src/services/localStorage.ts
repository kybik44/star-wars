import {
  STORAGE_KEYS,
  createEntityStorageKey,
  type StorageKey,
} from "../constants/storage";
import type { LocalCharacterEdit, LocalEntityEdit, EntityType } from "../types";

export class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  get<T>(key: StorageKey): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  }

  getCustom<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return null;
    }
  }

  set<T>(key: StorageKey, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }

  setCustom<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }

  remove(key: StorageKey): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }

  removeCustom(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }
  clear(): void {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  getEntityEdits(entityType: EntityType): Record<string, LocalEntityEdit> {
    const key = createEntityStorageKey(entityType);
    return this.getCustom<Record<string, LocalEntityEdit>>(key) || {};
  }

  setEntityEdits(
    entityType: EntityType,
    edits: Record<string, LocalEntityEdit>
  ): void {
    const key = createEntityStorageKey(entityType);
    this.setCustom(key, edits);
  }

  getEntityEdit(entityType: EntityType, id: string): LocalEntityEdit | null {
    const edits = this.getEntityEdits(entityType);
    return edits[id] || null;
  }

  setEntityEdit(
    entityType: EntityType,
    id: string,
    edit: LocalEntityEdit
  ): void {
    const edits = this.getEntityEdits(entityType);
    edits[id] = edit;
    this.setEntityEdits(entityType, edits);
  }

  removeEntityEdit(entityType: EntityType, id: string): void {
    const edits = this.getEntityEdits(entityType);
    delete edits[id];
    this.setEntityEdits(entityType, edits);
  }

  getCharacterEdits(): Record<string, LocalCharacterEdit> {
    return (
      this.get<Record<string, LocalCharacterEdit>>(
        STORAGE_KEYS.CHARACTER_EDITS
      ) || {}
    );
  }

  setCharacterEdits(edits: Record<string, LocalCharacterEdit>): void {
    this.set(STORAGE_KEYS.CHARACTER_EDITS, edits);
  }

  getCharacterEdit(id: string): LocalCharacterEdit | null {
    const edits = this.getCharacterEdits();
    return edits[id] || null;
  }

  setCharacterEdit(id: string, edit: LocalCharacterEdit): void {
    const edits = this.getCharacterEdits();
    edits[id] = edit;
    this.setCharacterEdits(edits);
  }

  removeCharacterEdit(id: string): void {
    const edits = this.getCharacterEdits();
    delete edits[id];
    this.setCharacterEdits(edits);
  }

  getThemePreference(): "light" | "dark" | null {
    return this.get<"light" | "dark">(STORAGE_KEYS.THEME_PREFERENCE);
  }

  setThemePreference(theme: "light" | "dark"): void {
    this.set(STORAGE_KEYS.THEME_PREFERENCE, theme);
  }

  getSearchHistory(): string[] {
    return this.get<string[]>(STORAGE_KEYS.SEARCH_HISTORY) || [];
  }

  setSearchHistory(history: string[]): void {
    this.set(STORAGE_KEYS.SEARCH_HISTORY, history);
  }

  addSearchTerm(term: string): void {
    const history = this.getSearchHistory();
    const filtered = history.filter((item) => item !== term);
    const newHistory = [term, ...filtered].slice(0, 10);
    this.setSearchHistory(newHistory);
  }

  isValidData<T>(data: unknown): data is T {
    return data !== null && typeof data === "object";
  }

  migrateData<T>(
    oldKey: string,
    newKey: StorageKey,
    transformer?: (data: unknown) => T
  ): void {
    try {
      const oldData = localStorage.getItem(oldKey);
      if (oldData) {
        const parsed = JSON.parse(oldData);
        const transformed = transformer ? transformer(parsed) : parsed;
        this.set(newKey, transformed);
        localStorage.removeItem(oldKey);
      }
    } catch (error) {
      console.error(
        `Error migrating data from "${oldKey}" to "${newKey}":`,
        error
      );
    }
  }
}

export const localStorageService = LocalStorageService.getInstance();
