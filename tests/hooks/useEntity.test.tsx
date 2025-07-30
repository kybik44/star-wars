import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useEntity } from "../../src/hooks/useEntity";
import { characters, films } from "../../src/test/mocks/data";
import { localStorageService } from "../../src/services/localStorage";
import { swapiService } from "../../src/services/swapiService";
import { AllTheProviders } from "../../src/test/providers";
import { createTestWrapper } from "../../src/test/helpers/index";
import type { EditableEntity, EntityType } from "../../src/types";

vi.mock("../../src/services/swapiService", () => ({
  swapiService: {
    getEntity: vi.fn(),
  },
}));

vi.mock("../../src/services/localStorage", () => ({
  localStorageService: {
    getEntityEdit: vi.fn(),
    setEntityEdit: vi.fn(),
    removeEntityEdit: vi.fn(),
  },
}));

const wrapper = createTestWrapper(AllTheProviders);

describe("useEntity", () => {
  const mockCharacter = characters[0];
  const entityType = "characters" as const;
  const entityId = "1";

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(localStorageService, "getEntityEdit").mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("should fetch single entity", () => {
    it("should fetch and return entity data successfully", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entity).toBeNull();

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entity).toEqual({
        ...mockCharacter,
        id: "1",
      });
      expect(result.current.originalEntity).toEqual(mockCharacter);
      expect(result.current.isError).toBe(false);
      expect(result.current.error).toBeNull();
      expect(mockGetEntity).toHaveBeenCalledWith(entityType, entityId);
    });

    it("should extract entity ID from URL correctly", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entity?.id).toBe("1");
    });

    it("should handle different entity types", async () => {
      const mockFilm = films[0];

      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockFilm);

      const { result } = renderHook(() => useEntity("films", "1"), { wrapper });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.entity?.id).toBe("1");
      expect((result.current.entity as { title: string })?.title).toBe(
        "A New Hope"
      );
    });
  });

  describe("should handle loading state", () => {
    it("should show loading state initially", () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockReturnValue(new Promise(() => {}));

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entity).toBeNull();
    });

    it("should show loading state when ID changes", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const { result, rerender } = renderHook(
        ({ entityType, id }) => useEntity(entityType, id),
        {
          initialProps: { entityType, id: entityId },
          wrapper,
        }
      );

      await waitFor(() => !result.current.isLoading);

      rerender({ entityType, id: "2" });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.entity).toBeNull();
    });
  });

  describe("should handle invalid ID", () => {
    it("should handle empty ID", () => {
      const { result } = renderHook(() => useEntity(entityType, ""), {
        wrapper,
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.entity).toBeNull();
      expect(result.current.isError).toBe(false);
    });

    it("should not make API call when ID is empty", () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);

      renderHook(() => useEntity(entityType, ""), { wrapper });

      expect(mockGetEntity).not.toHaveBeenCalled();
    });
  });

  describe("should cache entity data", () => {
    it("should use cached data on subsequent calls", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const { result, rerender } = renderHook(
        ({ entityType, id }) => useEntity(entityType, id),
        {
          initialProps: { entityType, id: entityId },
          wrapper,
        }
      );

      await waitFor(() => !result.current.isLoading);

      rerender({ entityType, id: entityId });

      expect(mockGetEntity).toHaveBeenCalledTimes(1);
      expect(result.current.entity).toEqual({
        ...mockCharacter,
        id: "1",
      });
    });

    it("should cache data for different entity types separately", async () => {
      const mockFilm = films[0];

      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity
        .mockResolvedValueOnce(mockCharacter)
        .mockResolvedValueOnce(mockFilm);

      const { result: characterResult, rerender } = renderHook(
        ({ entityType, id }: { entityType: EntityType; id: string }) =>
          useEntity(entityType, id),
        {
          initialProps: { entityType: "characters", id: "1" },
          wrapper,
        }
      );

      await waitFor(() => !characterResult.current.isLoading);

      rerender({ entityType: "films" as const, id: "1" });

      await waitFor(() => !characterResult.current.isLoading);

      expect(mockGetEntity).toHaveBeenCalledTimes(2);
      expect(mockGetEntity).toHaveBeenCalledWith("characters" as const, "1");
      expect(mockGetEntity).toHaveBeenCalledWith("films" as const, "1");
    });
  });

  describe("local storage integration", () => {
    it("should merge local edits with original entity", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const localEdit = {
        id: "1",
        editedData: {
          name: "Luke Skywalker (Edited)",
        } as Partial<EditableEntity>,
        lastModified: "2024-01-01T00:00:00.000Z",
      };

      vi.spyOn(localStorageService, "getEntityEdit").mockReturnValue(localEdit);

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect((result.current.entity as { name: string })?.name).toBe(
        "Luke Skywalker (Edited)"
      );
      expect(result.current.hasLocalEdits).toBe(true);
      expect(result.current.localEdit).toEqual(localEdit);
    });

    it("should save local edits", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const mockSetEntityEdit = vi.mocked(localStorageService.setEntityEdit);

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      act(() => {
        result.current.saveLocalEdit({
          name: "New Name",
        } as Partial<EditableEntity>);
      });

      expect(mockSetEntityEdit).toHaveBeenCalledWith(
        entityType,
        entityId,
        expect.objectContaining({
          id: entityId,
          editedData: { name: "New Name" } as Partial<EditableEntity>,
          lastModified: expect.any(String),
        })
      );
    });

    it("should clear local edits", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const mockRemoveEntityEdit = vi.mocked(
        localStorageService.removeEntityEdit
      );

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      act(() => {
        result.current.clearLocalEdit();
      });

      expect(mockRemoveEntityEdit).toHaveBeenCalledWith(entityType, entityId);
    });

    it("should update local edit version when saving", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      const { result } = renderHook(() => useEntity(entityType, entityId), {
        wrapper,
      });

      await waitFor(() => !result.current.isLoading);

      expect(result.current.hasLocalEdits).toBe(false);

      act(() => {
        result.current.saveLocalEdit({
          name: "New Name",
        } as Partial<EditableEntity>);
      });

      expect(localStorageService.setEntityEdit).toHaveBeenCalledWith(
        entityType,
        entityId,
        expect.objectContaining({
          id: entityId,
          editedData: { name: "New Name" } as Partial<EditableEntity>,
          lastModified: expect.any(String),
        })
      );
    });
  });

  describe("query configuration", () => {
    it("should use correct query key", async () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);
      mockGetEntity.mockResolvedValueOnce(mockCharacter);

      renderHook(() => useEntity(entityType, entityId), { wrapper });

      await waitFor(() => {
        expect(mockGetEntity).toHaveBeenCalledWith(entityType, entityId);
      });
    });

    it("should enable query only when ID is provided", () => {
      const mockGetEntity = vi.mocked(swapiService.getEntity);

      renderHook(() => useEntity(entityType, ""), { wrapper });

      expect(mockGetEntity).not.toHaveBeenCalled();
    });
  });
});
