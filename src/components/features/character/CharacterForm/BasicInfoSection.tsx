import { Box, Divider, Typography } from "@mui/material";
import type { Control, FieldErrors } from "react-hook-form";

import React from "react";
import styles from "./CharacterForm.module.css";
import FormField from "./FormField";

interface BasicInfoSectionProps {
  control: Control<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
  genderOptions: Array<{ value: string; label: string }>;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  control,
  errors,
  genderOptions,
}) => {
  return (
    <Box className={styles.section}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Basic Information
      </Typography>
      <Divider className={styles.divider} />

      <Box className={styles.row}>
        <FormField
          name="name"
          control={control}
          label="Name"
          error={errors.name}
          required
        />

        <FormField
          name="gender"
          control={control}
          label="Gender"
          error={errors.gender}
          type="select"
          options={genderOptions}
          required
        />
      </Box>

      <Box className={styles.row}>
        <FormField
          name="height"
          control={control}
          label="Height (cm)"
          error={errors.height}
          helperText='Enter height in centimeters or "unknown"'
          required
        />

        <FormField
          name="mass"
          control={control}
          label="Mass (kg)"
          error={errors.mass}
          helperText='Enter mass in kilograms or "unknown"'
          required
        />

        <FormField
          name="birth_year"
          control={control}
          label="Birth Year"
          error={errors.birth_year}
          helperText='e.g., "19BBY", "112BBY", "unknown"'
          required
        />
      </Box>
    </Box>
  );
};

export default BasicInfoSection;
