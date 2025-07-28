// API Response Types
export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Character Types
export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

// Local edited character with optional fields for editing
export interface EditableCharacter extends Omit<Character, 'created' | 'edited' | 'url' | 'homeworld' | 'films' | 'species' | 'vehicles' | 'starships'> {
  id: string; // extracted from URL
  homeworld?: string;
  films?: string[];
  species?: string[];
  vehicles?: string[];
  starships?: string[];
}

// Character for local storage (edited versions)
export interface LocalCharacterEdit {
  id: string;
  editedData: Partial<EditableCharacter>;
  lastModified: string;
}

// Search and pagination params
export interface CharacterSearchParams {
  search?: string;
  page?: number;
}

// API Error type
export interface ApiError {
  message: string;
  status?: number;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalCount: number;
} 