import type { FieldConfig, FormFieldConfig } from "@/types";

/**
 * Helper function for creating basic field configurations
 */
export function createBasicField(
  key: string, 
  label: string, 
  unit?: string
): FieldConfig {
  return {
    key,
    label,
    type: 'text',
    unit,
  };
}

/**
 * Helper function for creating array field configurations
 */
export function createArrayField(
  key: string, 
  label: string
): FieldConfig {
  return {
    key,
    label,
    type: 'array',
    format: (value: unknown) => Array.isArray(value) ? `${value.length} items` : '0 items',
  };
}

/**
 * Helper function for creating form field configurations
 */
export function createFormField(
  key: string, 
  label: string, 
  type: 'text' | 'number' | 'select' | 'textarea' = 'text',
  options?: Array<{ value: string; label: string }>,
  required = false,
  helperText?: string
): FormFieldConfig {
  return {
    key,
    label,
    type,
    required,
    helperText,
    options,
  };
}

/**
 * Helper function for creating form field configurations with validation
 */
export function createFormFieldWithValidation(
  key: string, 
  label: string, 
  type: 'text' | 'number' | 'select' | 'textarea' = 'text',
  options?: Array<{ value: string; label: string }>,
  required = false,
  helperText?: string,
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  }
): FormFieldConfig {
  return {
    key,
    label,
    type,
    required,
    helperText,
    options,
    validation,
  };
}

