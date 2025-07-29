import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { ButtonsGroup } from "@/shared";
import { getEntityConfig } from "@constants/entityConfigs";
import type { EntityType, FormFieldConfig } from "../../../../types";
import styles from "./EntityForm.module.css";

interface EntityFormProps {
  entityType: EntityType;
  entity: Record<string, unknown>;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}

const EntityForm: React.FC<EntityFormProps> = ({
  entityType,
  entity,
  onSave,
  onCancel,
}) => {
  const config = getEntityConfig(entityType);
  const formFields = useMemo(() => config.formFields || [], [config]);

  const validationSchema = useMemo(() => {
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
  }, [formFields]);
  type FormData = z.infer<typeof validationSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: formFields.reduce((acc, field) => {
      acc[field.key] = entity[field.key] || field.defaultValue || "";
      return acc;
    }, {} as Record<string, unknown>),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      onSave(data);
    },
    [onSave]
  );

  const renderField = useCallback(
    (field: FormFieldConfig) => {
      const error = errors[field.key as keyof typeof errors];
      const errorMessage = error?.message;

      return (
        <FormControl key={field.key} fullWidth error={!!errorMessage}>
          {field.type === "select" && field.options ? (
            <>
              <InputLabel>{field.label}</InputLabel>
              <Controller
                name={field.key as keyof FormData}
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
              name={field.key as keyof FormData}
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
              name={field.key as keyof FormData}
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
              name={field.key as keyof FormData}
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
    },
    [errors, control]
  );

  return (
    <Paper elevation={2} className={styles.paper}>
      <Typography variant="h2" component="h1" className={styles.title}>
        Edit {config.name} (fieldname)
      </Typography>

      <Typography variant="body1" className={styles.description}>
        Make changes to {config.name.toLowerCase()} information. All changes are
        saved locally and won't affect the original data.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Box className={styles.fields}>{formFields.map(renderField)}</Box>

        {!isDirty && (
          <Alert severity="info" className={styles.infoAlert}>
            No changes have been made to the {config.name.toLowerCase()} data.
          </Alert>
        )}

        <Divider className={styles.divider} />

        <ButtonsGroup
          buttons={[
            {
              label: "Cancel",
              onClick: onCancel,
              variant: "outlined",
              disabled: isSubmitting,
            },
            {
              label: isSubmitting ? "Saving..." : "Save Changes",
              onClick: () => handleSubmit(onSubmit)(),
              variant: "contained",
              disabled: isSubmitting || !isDirty,
            },
          ]}
          direction="horizontal"
          spacing="sm"
          align="end"
          responsive
        />
      </form>
    </Paper>
  );
};

export default EntityForm;
