import type { FieldConfig } from "@/types";

/**
 * Formats field value according to its configuration
 */
export function formatFieldValue(value: unknown, field: FieldConfig): string {
  if (field.format) {
    return field.format(value);
  }
  return String(value);
}

/**
 * Formats field value with unit if applicable
 */
export function formatFieldValueWithUnit(
  value: unknown,
  field: FieldConfig
): string {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "";
    }
    return value.join(", ");
  }

  if (value === "unknown" || value === "n/a") {
    return String(value);
  }

  const formattedValue = formatFieldValue(value, field);

  if (field.unit && value !== "unknown" && value !== "n/a" && !field.format) {
    return `${formattedValue} ${field.unit}`;
  }

  return formattedValue;
}

/**
 * Common data formatters
 */
export const formatters = {
  /**
   * Format attribute handling unknown/n/a values
   */
  attribute: (value: string): string => {
    return value === "n/a" || value === "unknown" ? "Unknown" : value;
  },

  /**
   * Format height with cm unit
   */
  height: (height: string): string => {
    const formatted = formatters.attribute(height);
    return formatted !== "Unknown" ? `${formatted} cm` : formatted;
  },

  /**
   * Format mass with kg unit
   */
  mass: (mass: string): string => {
    const formatted = formatters.attribute(mass);
    return formatted !== "Unknown" ? `${formatted} kg` : formatted;
  },

  /**
   * Format birth year
   */
  birthYear: (birthYear: string): string => {
    return formatters.attribute(birthYear);
  },

  /**
   * Format gender
   */
  gender: (gender: string): string => {
    return formatters.attribute(gender);
  },

  /**
   * Format array count
   */
  arrayCount: (value: unknown): string => {
    return Array.isArray(value) ? `${value.length} items` : "0 items";
  },

  /**
   * Format film count
   */
  filmCount: (count: number): string => {
    return `Appeared in ${count} film${count !== 1 ? "s" : ""}`;
  },

  /**
   * Format species count
   */
  speciesCount: (count: number): string => {
    return count === 0 ? "No species data" : `${count} species`;
  },

  /**
   * Format vehicles count
   */
  vehiclesCount: (count: number): string => {
    return count === 0 ? "No vehicles" : `${count} vehicles`;
  },

  /**
   * Format starships count
   */
  starshipsCount: (count: number): string => {
    return count === 0 ? "No starships" : `${count} starships`;
  },

  /**
   * Format pagination results summary
   */
  resultsSummary: (
    count: number,
    total: number,
    searchTerm?: string
  ): string => {
    if (searchTerm) {
      return `Showing ${count} result${
        count !== 1 ? "s" : ""
      } for "${searchTerm}"`;
    }
    return `Showing ${count} of ${total} characters`;
  },
} as const;
