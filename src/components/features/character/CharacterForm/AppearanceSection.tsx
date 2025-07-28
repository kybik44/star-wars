import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import type { Control, FieldErrors } from "react-hook-form";

import FormField from "./FormField";
import styles from "./CharacterForm.module.css";

interface AppearanceSectionProps {
  control: Control<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
}

const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  control,
  errors,
}) => {
  return (
    <Box className={styles.section}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Appearance
      </Typography>
      <Divider className={styles.divider} />

      <Box className={styles.row}>
        <FormField
          name="hair_color"
          control={control}
          label="Hair Color"
          error={errors.hair_color}
          required
        />

        <FormField
          name="skin_color"
          control={control}
          label="Skin Color"
          error={errors.skin_color}
          required
        />

        <FormField
          name="eye_color"
          control={control}
          label="Eye Color"
          error={errors.eye_color}
          required
        />
      </Box>
    </Box>
  );
};

export default AppearanceSection;
