import { MenuItem, TextField } from "@mui/material";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import styles from "./CharacterForm.module.css";

interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: unknown;
  helperText?: string;
  required?: boolean;
  type?: "text" | "select";
  options?: Array<{ value: string; label: string }>;
  className?: string;
}

const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  helperText,
  required = false,
  type = "text",
  options = [],
  className = styles.field,
}: FormFieldProps<T>) => {
  const errorMessage =
    error && typeof error === "object" && "message" in error
      ? (error as { message: string }).message
      : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          error={!!error}
          helperText={errorMessage || helperText || ""}
          required={required}
          className={className}
          select={type === "select"}
        >
          {type === "select" &&
            options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
};

export default FormField;
