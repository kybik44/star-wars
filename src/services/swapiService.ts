import { getEntityConfig } from "../constants/entityConfigs";
import type {
  Character,
  CharacterSearchParams,
  Entity,
  EntitySearchParams,
  EntityType,
  Film,
  Planet,
  Starship,
  SwapiResponse,
} from "../types";

const BASE_URL = "https://swapi.py4e.com/api";

class SwapiService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new ApiError(error.message);
      }
      throw new ApiError("An unknown error occurred");
    }
  }

  /**
   * Get endpoint for entity type
   */
  private getEndpoint(entityType: EntityType): string {
    const config = getEntityConfig(entityType);
    return config.endpoint;
  }

  /**
   * Universal method to fetch entities with optional search and pagination
   */
  async getEntities<T extends Entity>(
    entityType: EntityType,
    params: EntitySearchParams = {}
  ): Promise<SwapiResponse<T>> {
    const endpoint = this.getEndpoint(entityType);
    const searchParams = new URLSearchParams();

    if (params.search) {
      searchParams.append("search", params.search);
    }

    if (params.page) {
      searchParams.append("page", params.page.toString());
    }

    const url = `${BASE_URL}${endpoint}/?${searchParams.toString()}`;
    return this.fetchWithErrorHandling<SwapiResponse<T>>(url);
  }

  /**
   * Universal method to fetch a single entity by ID
   */
  async getEntity<T extends Entity>(
    entityType: EntityType,
    id: string
  ): Promise<T> {
    const endpoint = this.getEndpoint(entityType);
    const url = `${BASE_URL}${endpoint}/${id}/`;
    return this.fetchWithErrorHandling<T>(url);
  }

  /**
   * Extract entity ID from SWAPI URL
   */
  extractEntityId(url: string, entityType: EntityType): string {
    const endpoint = this.getEndpoint(entityType);
    const pattern = new RegExp(`${endpoint}/(\\d+)/`);
    const match = url.match(pattern);
    return match ? match[1] : "";
  }

  /**
   * Fetch characters with optional search and pagination
   */
  async getCharacters(
    params: CharacterSearchParams = {}
  ): Promise<SwapiResponse<Character>> {
    return this.getEntities<Character>("characters", params);
  }

  /**
   * Fetch a single character by ID
   */
  async getCharacter(id: string): Promise<Character> {
    return this.getEntity<Character>("characters", id);
  }

  /**
   * Extract character ID from SWAPI URL
   */
  extractCharacterId(url: string): string {
    return this.extractEntityId(url, "characters");
  }

  /**
   * Fetch films with optional search and pagination
   */
  async getFilms(
    params: EntitySearchParams = {}
  ): Promise<SwapiResponse<Film>> {
    return this.getEntities<Film>("films", params);
  }

  /**
   * Fetch a single film by ID
   */
  async getFilm(id: string): Promise<Film> {
    return this.getEntity<Film>("films", id);
  }

  /**
   * Extract film ID from SWAPI URL
   */
  extractFilmId(url: string): string {
    return this.extractEntityId(url, "films");
  }

  /**
   * Fetch planets with optional search and pagination
   */
  async getPlanets(
    params: EntitySearchParams = {}
  ): Promise<SwapiResponse<Planet>> {
    return this.getEntities<Planet>("planets", params);
  }

  /**
   * Fetch a single planet by ID
   */
  async getPlanet(id: string): Promise<Planet> {
    return this.getEntity<Planet>("planets", id);
  }

  /**
   * Extract planet ID from SWAPI URL
   */
  extractPlanetId(url: string): string {
    return this.extractEntityId(url, "planets");
  }

  /**
   * Fetch starships with optional search and pagination
   */
  async getStarships(
    params: EntitySearchParams = {}
  ): Promise<SwapiResponse<Starship>> {
    return this.getEntities<Starship>("starships", params);
  }

  /**
   * Fetch a single starship by ID
   */
  async getStarship(id: string): Promise<Starship> {
    return this.getEntity<Starship>("starships", id);
  }

  /**
   * Extract starship ID from SWAPI URL
   */
  extractStarshipId(url: string): string {
    return this.extractEntityId(url, "starships");
  }

  /**
   * Get total pages from response count
   */
  getTotalPages(count: number, pageSize: number = 10): number {
    return Math.ceil(count / pageSize);
  }

  /**
   * Get current page from next/previous URLs
   */
  getCurrentPage(next: string | null, previous: string | null): number {
    if (next) {
      const match = next.match(/page=(\d+)/);
      return match ? parseInt(match[1], 10) - 1 : 1;
    }

    if (previous) {
      const match = previous.match(/page=(\d+)/);
      return match ? parseInt(match[1], 10) + 1 : 1;
    }

    return 1;
  }

  /**
   * Get display name for entity (title for films, name for others)
   */
  getEntityDisplayName(entity: Entity): string {
    if ("title" in entity && entity.title) {
      return entity.title;
    }
    if ("name" in entity && entity.name) {
      return entity.name;
    }
    return "Unknown";
  }

  /**
   * Get entity route pattern for navigation
   */
  getEntityRoute(entityType: EntityType): string {
    switch (entityType) {
      case "characters":
        return "/characters";
      case "films":
        return "/films";
      case "planets":
        return "/planets";
      case "starships":
        return "/starships";
      case "species":
        return "/species";
      case "vehicles":
        return "/vehicles";
      default:
        return "/";
    }
  }
}

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export const swapiService = new SwapiService();
