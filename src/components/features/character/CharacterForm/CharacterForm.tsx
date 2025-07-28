import { zodResolver } from "@hookform/resolvers/zod";
import {
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AppearanceSection from "./AppearanceSection";
import BasicInfoSection from "./BasicInfoSection";
import FormActions from "./FormActions";
import type { EditableCharacter } from "../../../../types";
import styles from "./CharacterForm.module.css";

// Validation schema
const characterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  height: z.string().min(1, "Height is required"),
  mass: z.string().min(1, "Mass is required"),
  hair_color: z.string().min(1, "Hair color is required"),
  skin_color: z.string().min(1, "Skin color is required"),
  eye_color: z.string().min(1, "Eye color is required"),
  birth_year: z.string().min(1, "Birth year is required"),
  gender: z.string().min(1, "Gender is required"),
});

type CharacterFormData = z.infer<typeof characterSchema>;

interface CharacterFormProps {
  character: EditableCharacter;
  onSave: (data: CharacterFormData) => void;
  onCancel: () => void;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  character,
  onSave,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CharacterFormData>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      name: character.name,
      height: character.height,
      mass: character.mass,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      birth_year: character.birth_year,
      gender: character.gender,
    },
  });

  const onSubmit = (data: CharacterFormData) => {
    onSave(data);
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "hermaphrodite", label: "Hermaphrodite" },
    { value: "n/a", label: "N/A" },
    { value: "none", label: "None" },
    { value: "unknown", label: "Unknown" },
  ];

  return (
    <Paper elevation={2} className={styles.paper}>
      <Typography variant="h4" component="h1" className={styles.title}>
        Edit Character
      </Typography>

      <Typography variant="body1" className={styles.description}>
        Make changes to character information. All changes are saved locally
        and won't affect the original data.
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <BasicInfoSection
          control={control}
          errors={errors}
          genderOptions={genderOptions}
        />

        <AppearanceSection
          control={control}
          errors={errors}
        />

        <FormActions
          isSubmitting={isSubmitting}
          isDirty={isDirty}
          onCancel={onCancel}
        />
      </form>
    </Paper>
  );
};

export default CharacterForm; 