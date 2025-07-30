import * as z from "zod";
import type { FormFieldConfig } from "@/types";

export function createValidationSchema(formFields: FormFieldConfig[]) {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  formFields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "number":
        fieldSchema = z.number();
        break;
      case "select":
        fieldSchema = z.string();
        break;
      case "textarea":
        fieldSchema = z.string();
        break;
      default:
        fieldSchema = z.string();
    }

    if (field.validation) {
      if (field.validation.min !== undefined) {
        if (field.type === "number") {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            field.validation.min,
            field.validation.message
          );
        } else {
          fieldSchema = (fieldSchema as z.ZodString).min(
            field.validation.min,
            field.validation.message
          );
        }
      }

      if (field.validation.max !== undefined) {
        if (field.type === "number") {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            field.validation.max,
            field.validation.message
          );
        } else {
          fieldSchema = (fieldSchema as z.ZodString).max(
            field.validation.max,
            field.validation.message
          );
        }
      }

      if (field.validation.pattern) {
        fieldSchema = (fieldSchema as z.ZodString).regex(
          new RegExp(field.validation.pattern),
          field.validation.message
        );
      }
    }

    if (field.required) {
      if (field.type === "number") {
        fieldSchema = (fieldSchema as z.ZodNumber).min(
          1,
          `${field.label} is required`
        );
      } else {
        fieldSchema = (fieldSchema as z.ZodString).min(
          1,
          `${field.label} is required`
        );
      }
    } else {
      fieldSchema = fieldSchema.optional();
    }

    schemaFields[field.key] = fieldSchema;
  });

  return z.object(schemaFields);
}

/**
 * Validation patterns
 */
export const VALIDATION_PATTERNS = {
  HEIGHT: /^(\d+|unknown|n\/a)$/,
  MASS: /^(\d+|unknown|n\/a)$/,
  BIRTH_YEAR: /^(\d+BBY|\d+ABY|unknown|n\/a)$/,
  COLOR: /^[a-zA-Z\s,-]+$/,
} as const;

/**
 * Validation messages
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: (fieldName: string) => `${fieldName} is required`,
  LENGTH_RANGE: (fieldName: string, min: number, max: number) =>
    `${fieldName} must be between ${min} and ${max} characters`,
  INVALID_FORMAT: (fieldName: string, format: string) =>
    `${fieldName} format: ${format}`,
  HEIGHT: 'Height must be a number, "unknown", or "n/a"',
  MASS: 'Mass must be a number, "unknown", or "n/a"',
  BIRTH_YEAR: 'Birth year format: "19BBY", "112ABY", "unknown", or "n/a"',
} as const;
