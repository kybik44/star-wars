import type { Character, SwapiResponse, CharacterSearchParams } from '../types';

const BASE_URL = 'https://swapi.py4e.com/api';
const PEOPLE_ENDPOINT = '/people';

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
      throw new ApiError('An unknown error occurred');
    }
  }

  /**
   * Fetch characters with optional search and pagination
   */
  async getCharacters(params: CharacterSearchParams = {}): Promise<SwapiResponse<Character>> {
    const searchParams = new URLSearchParams();
    
    if (params.search) {
      searchParams.append('search', params.search);
    }
    
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }

    const url = `${BASE_URL}${PEOPLE_ENDPOINT}/?${searchParams.toString()}`;
    return this.fetchWithErrorHandling<SwapiResponse<Character>>(url);
  }

  /**
   * Fetch a single character by ID
   */
  async getCharacter(id: string): Promise<Character> {
    const url = `${BASE_URL}${PEOPLE_ENDPOINT}/${id}/`;
    return this.fetchWithErrorHandling<Character>(url);
  }

  /**
   * Extract character ID from SWAPI URL
   */
  extractCharacterId(url: string): string {
    const match = url.match(/\/people\/(\d+)\//);
    return match ? match[1] : '';
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
}

// Custom error class for API errors
export class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const swapiService = new SwapiService(); 