import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FormFieldConfig } from "@/types";

interface FormFieldProps<T extends FieldValues = Record<string, unknown>> {
  field: FormFieldConfig;
  control: Control<T>;
  errors: FieldErrors<T>;
}

const FormField: React.FC<FormFieldProps> = ({ field, control, errors }) => {
  const error = errors[field.key as keyof typeof errors];
  const errorMessage = error?.message;

  return (
    <FormControl key={field.key} fullWidth error={!!errorMessage}>
      {field.type === "select" && field.options ? (
        <>
          <InputLabel>{field.label}</InputLabel>
          <Controller
            name={field.key}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                value={value || ""}
                onChange={onChange}
                disabled={field.disabled}
                label={field.label}
              >
                {field.options?.map(
                  (option: { value: string; label: string }) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </Select>
            )}
          />
        </>
      ) : field.type === "textarea" ? (
        <Controller
          name={field.key}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label={field.label}
              value={value || ""}
              onChange={onChange}
              multiline
              rows={field.rows || 4}
              placeholder={field.placeholder}
              disabled={field.disabled}
              required={field.required}
            />
          )}
        />
      ) : field.type === "number" ? (
        <Controller
          name={field.key}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label={field.label}
              type="number"
              value={value || ""}
              onChange={(e) => onChange(Number(e.target.value))}
              placeholder={field.placeholder}
              disabled={field.disabled}
              required={field.required}
            />
          )}
        />
      ) : (
        <Controller
          name={field.key}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              label={field.label}
              value={value || ""}
              onChange={onChange}
              placeholder={field.placeholder}
              disabled={field.disabled}
              required={field.required}
            />
          )}
        />
      )}

      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}

      {field.helperText && !errorMessage && (
        <FormHelperText>{field.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormField;
