import type { Entity } from "@/types";

/**
 * Get display name for any entity type
 */
export function getEntityDisplayName(entity: Entity): string {
  if ("title" in entity && entity.title) {
    return entity.title;
  }
  if ("name" in entity && entity.name) {
    return entity.name;
  }
  return "Unknown";
}

/**
 * Check if entity has a specific property
 */
export function hasEntityProperty<K extends keyof Entity>(
  entity: Entity,
  property: K
): entity is Entity & Record<K, NonNullable<Entity[K]>> {
  return (
    property in entity &&
    entity[property] !== null &&
    entity[property] !== undefined
  );
}

/**
 * Get entity property value safely
 */
export function getEntityProperty<K extends keyof Entity>(
  entity: Entity,
  property: K,
  fallback: string = "Unknown"
): string {
  if (hasEntityProperty(entity, property)) {
    const value = entity[property];
    return typeof value === "string" ? value : String(value);
  }
  return fallback;
}

/**
 * Check if entity is a specific type
 */
export function isEntityOfType<T extends Entity>(
  entity: Entity,
  typeCheck: (entity: Entity) => entity is T
): entity is T {
  return typeCheck(entity);
}
/**
 * Type guards for specific entity types
 */
export const entityTypeGuards = {
  isCharacter: (
    entity: Entity
  ): entity is Entity & { name: string; height: string } => {
    return "name" in entity && "height" in entity;
  },

  isFilm: (
    entity: Entity
  ): entity is Entity & { title: string; episode_id: number } => {
    return "title" in entity && "episode_id" in entity;
  },

  isPlanet: (
    entity: Entity
  ): entity is Entity & { name: string; diameter: string } => {
    return "name" in entity && "diameter" in entity;
  },

  isStarship: (
    entity: Entity
  ): entity is Entity & { name: string; model: string } => {
    return "name" in entity && "model" in entity;
  },
} as const;
