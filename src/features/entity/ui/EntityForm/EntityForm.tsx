import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ButtonsGroup, createValidationSchema } from "@/shared";
import { getEntityConfig } from "@constants/entityConfigs";
import type { EntityType, FormFieldConfig } from "@/types";
import FormField from "./FormField";
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
    return createValidationSchema(formFields);
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
      return (
        <FormField
          key={field.key}
          field={field}
          control={control}
          errors={errors}
        />
      );
    },
    [errors, control]
  );

  return (
    <Paper elevation={2} className={styles.paper}>
      <Typography variant="h2" component="h1" className={styles.title}>
        Edit {config.name}
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
