import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useEntities } from "../../src/hooks/useEntities";
import { characters, films } from "../../src/test/mocks/data";
import { localStorageService } from "../../src/services/localStorage";
import { swapiService } from "../../src/services/swapiService";
import { AllTheProviders } from "../../src/test/providers";
import {
  createPaginatedResponse,
  createTestWrapper,
} from "../../src/test/helpers/index";
import type { EditableEntity } from "../../src/types";

vi.mock("../../src/services/swapiService", () => ({
  swapiService: {
    getEntities: vi.fn(),
  },
}));

vi.mock("../../src/services/localStorage", () => ({
  localStorageService: {
    getEntityEdits: vi.fn(),
  },
}));

const wrapper = createTestWrapper(AllTheProviders);

describe("useEntities", () => {
  const entityType = "characters" as const;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(localStorageService, "getEntityEdits").mockReturnValue({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("should fetch entities list", () => {
    it("should fetch and return entities data successfully", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entities).toEqual([]);

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entities).toHaveLength(2);
      expect(result.current.entities[0]).toHaveProperty(
        "name",
        "Luke Skywalker"
      );
      expect(result.current.entities[1]).toHaveProperty("name", "Darth Vader");
      expect(result.current.isError).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockGetEntities).toHaveBeenCalledWith(entityType, {});
    });

    it("should handle different entity types", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(films, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useEntities("films"), { wrapper });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entities).toHaveLength(2);
      expect(result.current.entities[0]).toHaveProperty("title", "A New Hope");
      expect(result.current.entities[1]).toHaveProperty(
        "title",
        "The Empire Strikes Back"
      );
    });
  });

  describe("should handle loading state", () => {
    it("should show loading state initially", () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      mockGetEntities.mockReturnValue(new Promise(() => {}));

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entities).toEqual([]);
    });

    it("should show loading state when parameters change", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result, rerender } = renderHook(
        (props) => useEntities(entityType, props),
        {
          initialProps: {},
          wrapper,
        }
      );

      await waitFor(() => !result.current.isLoading);

      rerender({ search: "Luke" });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entities).toEqual([]);
    });
  });

  describe("should handle search and filtering", () => {
    it("should handle search parameter", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const filteredResponse = createPaginatedResponse([characters[1]], 1, 10);
      mockGetEntities.mockResolvedValueOnce(filteredResponse);

      const { result } = renderHook(
        () => useEntities(entityType, { search: "Vader" }),
        { wrapper }
      );

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entities).toHaveLength(1);
      expect(result.current.entities[0]).toHaveProperty("name", "Darth Vader");
      expect(mockGetEntities).toHaveBeenCalledWith(entityType, {
        search: "Vader",
      });
    });

    it("should handle pagination parameters", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 2, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(
        () => useEntities(entityType, { page: 2 }),
        { wrapper }
      );

      await waitFor(() => !result.current.isLoading);

      expect(mockGetEntities).toHaveBeenCalledWith(entityType, { page: 2 });
    });
  });

  describe("should handle pagination info", () => {
    it("should return correct pagination info", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = {
        count: 87,
        next: "https://swapi.dev/api/people/?page=2",
        previous: null,
        results: characters,
      };
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.paginationInfo).toEqual({
        currentPage: 1,
        totalPages: 9,
        hasNext: true,
        hasPrevious: false,
        totalCount: 87,
      });
    });

    it("should handle null pagination values", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = {
        count: 2,
        next: null,
        previous: null,
        results: characters,
      };
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.paginationInfo).toEqual({
        currentPage: 1,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false,
        totalCount: 2,
      });
    });
  });

  describe("should merge with local edits", () => {
    it("should merge entities with local edits", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const localEdits = {
        "1": {
          id: "1",
          editedData: {
            name: "Luke Skywalker (Edited)",
          } as Partial<EditableEntity>,
          lastModified: "2024-01-01T00:00:00.000Z",
        },
      };

      vi.spyOn(localStorageService, "getEntityEdits").mockReturnValue(
        localEdits
      );

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entities[0]).toHaveProperty(
        "name",
        "Luke Skywalker (Edited)"
      );
      expect(result.current.entities[1]).toHaveProperty("name", "Darth Vader");
    });

    it("should handle empty local edits", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      vi.spyOn(localStorageService, "getEntityEdits").mockReturnValue({});

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entities[0]).toHaveProperty(
        "name",
        "Luke Skywalker"
      );
      expect(result.current.entities[1]).toHaveProperty("name", "Darth Vader");
    });
  });

  describe("should cache data correctly", () => {
    it("should use cached data on subsequent calls", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result, rerender } = renderHook(
        (props) => useEntities(entityType, props),
        {
          initialProps: {},
          wrapper,
        }
      );

      await waitFor(() => !result.current.isLoading);
      expect(result.current.entities).toHaveLength(2);

      rerender({});

      expect(mockGetEntities).toHaveBeenCalledTimes(1);
      expect(result.current.entities).toHaveLength(2);
    });

    it("should cache data for different parameters separately", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse1 = createPaginatedResponse(characters, 1, 10);
      const mockResponse2 = createPaginatedResponse([characters[1]], 1, 10);

      mockGetEntities
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const { result, rerender } = renderHook(
        (props) => useEntities(entityType, props),
        {
          initialProps: {},
          wrapper,
        }
      );

      await waitFor(() => !result.current.isLoading);
      expect(result.current.entities).toHaveLength(2);

      rerender({ search: "Vader" });

      await waitFor(() => !result.current.isLoading);
      expect(result.current.entities).toHaveLength(1);

      expect(mockGetEntities).toHaveBeenCalledTimes(2);
      expect(mockGetEntities).toHaveBeenCalledWith(entityType, {});
      expect(mockGetEntities).toHaveBeenCalledWith(entityType, {
        search: "Vader",
      });
    });
  });

  describe("should handle refetch", () => {
    it("should refetch data when refetch is called", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useEntities(entityType), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      act(() => {
        result.current.refetch();
      });

      expect(mockGetEntities).toHaveBeenCalledTimes(2);
    });
  });

  describe("query configuration", () => {
    it("should use correct query key", async () => {
      const mockGetEntities = vi.mocked(swapiService.getEntities);
      const mockResponse = createPaginatedResponse(characters, 1, 10);
      mockGetEntities.mockResolvedValueOnce(mockResponse);

      renderHook(() => useEntities(entityType, { search: "Luke", page: 2 }), {
        wrapper,
      });

      await waitFor(() => {
        expect(mockGetEntities).toHaveBeenCalledWith(entityType, {
          search: "Luke",
          page: 2,
        });
      });
    });
  });
});
