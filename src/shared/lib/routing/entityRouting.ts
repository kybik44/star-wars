import type { EntityType } from "@/types";
import { Routes, EntityType as EntityTypeEnum } from "@constants/routes";

/**
 * Get route pattern for entity type
 */
export function getEntityRoute(entityType: EntityType): string {
  switch (entityType) {
    case "characters":
      return Routes.characters;
    case "films":
      return Routes.films;
    case "planets":
      return Routes.planets;
    case "starships":
      return Routes.starships;
    case "species":
      return Routes.species;
    case "vehicles":
      return Routes.vehicles;
    default:
      return Routes.characters;
  }
}

/**
 * Extract entity ID from SWAPI URL
 */
export function extractEntityId(url: string): string {
  const pattern = /\/(\d+)\/?$/;
  const match = url.match(pattern);
  return match ? match[1] : "";
}

/**
 * Get current entity type from pathname
 */
export function getCurrentEntityType(pathname: string): EntityType {
  if (
    pathname === Routes.characters ||
    pathname.startsWith(`${Routes.characters}/`)
  ) {
    return EntityTypeEnum.characters;
  }
  if (
    pathname.startsWith(Routes.films) ||
    pathname.startsWith(`${Routes.films}/`)
  ) {
    return EntityTypeEnum.films;
  }
  if (
    pathname.startsWith(Routes.planets) ||
    pathname.startsWith(`${Routes.planets}/`)
  ) {
    return EntityTypeEnum.planets;
  }
  if (
    pathname.startsWith(Routes.starships) ||
    pathname.startsWith(`${Routes.starships}/`)
  ) {
    return EntityTypeEnum.starships;
  }
  if (
    pathname.startsWith(Routes.species) ||
    pathname.startsWith(`${Routes.species}/`)
  ) {
    return EntityTypeEnum.species;
  }
  if (
    pathname.startsWith(Routes.vehicles) ||
    pathname.startsWith(`${Routes.vehicles}/`)
  ) {
    return EntityTypeEnum.vehicles;
  }
  return EntityTypeEnum.characters;
}

/**
 * Build entity detail URL
 */
export function buildEntityDetailUrl(
  entityType: EntityType,
  id: string
): string {
  const route = getEntityRoute(entityType);
  return `${route}/${id}`;
}

/**
 * Check if pathname matches entity type
 */
export function isEntityRoute(
  pathname: string,
  entityType: EntityType
): boolean {
  const route = getEntityRoute(entityType);
  return pathname === route || pathname.startsWith(`${route}/`);
}
