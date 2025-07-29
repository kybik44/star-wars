// Base entity interface
export interface BaseEntity {
  url: string;
  created: string;
  edited: string;
}

// Character interfaces
export interface Character extends BaseEntity {
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
}

// Film interfaces
export interface Film extends BaseEntity {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

// Planet interfaces
export interface Planet extends BaseEntity {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
}

// Starship interfaces
export interface Starship extends BaseEntity {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
}

// Species interfaces
export interface Species extends BaseEntity {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
}

// Vehicle interfaces
export interface Vehicle extends BaseEntity {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
}

// Union types
export type EntityType = 'characters' | 'films' | 'planets' | 'starships' | 'species' | 'vehicles';
export type Entity = Character | Film | Planet | Starship | Species | Vehicle;

// Editable interfaces for all entities
export interface EditableEntity {
  id: string;
}

export interface EditableCharacter extends Character, EditableEntity {}
export interface EditableFilm extends Film, EditableEntity {}
export interface EditablePlanet extends Planet, EditableEntity {}
export interface EditableStarship extends Starship, EditableEntity {}
export interface EditableSpecies extends Species, EditableEntity {}
export interface EditableVehicle extends Vehicle, EditableEntity {}

// Local edit interfaces
export interface LocalEntityEdit {
  id: string;
  editedData: Partial<EditableEntity>;
  lastModified: string;
}

export interface LocalCharacterEdit {
  id: string;
  editedData: Partial<EditableCharacter>;
  lastModified: string;
}

export interface LocalFilmEdit {
  id: string;
  editedData: Partial<EditableFilm>;
  lastModified: string;
}

export interface LocalPlanetEdit {
  id: string;
  editedData: Partial<EditablePlanet>;
  lastModified: string;
}

export interface LocalStarshipEdit {
  id: string;
  editedData: Partial<EditableStarship>;
  lastModified: string;
}

export interface LocalSpeciesEdit {
  id: string;
  editedData: Partial<EditableSpecies>;
  lastModified: string;
}

export interface LocalVehicleEdit {
  id: string;
  editedData: Partial<EditableVehicle>;
  lastModified: string;
}

// API response types
export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Search and pagination types
export interface CharacterSearchParams {
  search?: string;
  page?: number;
}

export interface EntitySearchParams {
  search?: string;
  page?: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  totalCount: number;
}

// Field configuration types
export type FieldType = 'text' | 'number' | 'select' | 'textarea' | 'array';

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  unit?: string;
  format?: (value: unknown) => string;
  required?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  helperText?: string;
}

// Form field configuration
export interface FormFieldConfig extends FieldConfig {
  defaultValue?: string | number;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

// Detail section configuration
export interface DetailSection {
  title: string;
  fields: FieldConfig[];
}

// Entity configuration
export interface EntityConfig {
  type: EntityType;
  name: string;
  pluralName: string;
  endpoint: string;
  icon: string;
  primaryField: string;
  searchable: boolean;
  cardFields: FieldConfig[];
  detailSections: DetailSection[];
  formFields?: FormFieldConfig[];
  validationSchema?: Record<string, unknown>;
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