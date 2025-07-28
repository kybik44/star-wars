import {
  Alert,
  Badge,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import CharacterForm from "../../components/features/character/CharacterForm/CharacterForm";
import ErrorBoundary from "../../components/common/ErrorBoundary/ErrorBoundary";
import Avatar from "@components/features/character/Avatar/Avatar";
import CharacterActions from "@components/features/character/CharacterActions/CharacterActions";
import CharacterStats from "@components/features/character/CharacterStats/CharacterStats";
import { useCharacter } from "../../hooks/useCharacter";
import type { EditableCharacter } from "../../types";
import {
  formatCharacterBirthYear,
  formatCharacterGender,
  formatCharacterHeight,
  formatCharacterMass,
} from "../../utils/formatters";
import styles from "./CharacterDetailPage.module.css";

const CharacterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const {
    character,
    originalCharacter,
    isLoading,
    error,
    isError,
    hasLocalEdits,
    saveLocalEdit,
    clearLocalEdit,
  } = useCharacter(id || "");

  if (!id) {
    return <Navigate to="/" replace />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (formData: Partial<EditableCharacter>) => {
    saveLocalEdit(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleRestore = () => {
    clearLocalEdit();
  };

  if (isLoading) {
    return (
      <ErrorBoundary>
        <Box>
          <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Skeleton
                variant="circular"
                width={80}
                height={80}
                sx={{ mr: 3 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" height={40} width="60%" />
                <Skeleton variant="text" height={24} width="40%" />
              </Box>
            </Box>
            <Skeleton variant="rectangular" height={200} />
          </Paper>
        </Box>
      </ErrorBoundary>
    );
  }

  if (isError) {
    return (
      <ErrorBoundary>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error?.message ||
            "Failed to load character details. Please try again."}
        </Alert>
      </ErrorBoundary>
    );
  }

  if (!character) {
    return (
      <ErrorBoundary>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Character not found.
        </Alert>
      </ErrorBoundary>
    );
  }

  if (isEditing) {
    return (
      <ErrorBoundary>
        <CharacterForm
          character={character}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Box>
        {/* Character Header */}
        <Paper elevation={2} className={styles.header}>
          <Box className={styles.headerContent}>
            <Box className={styles.characterInfo}>
              <Avatar name={character.name} className={styles.avatar} />

              <Box className={styles.nameSection}>
                <Box className={styles.nameRow}>
                  <Typography variant="h2" component="h1" className={styles.name}>
                    {character.name}
                  </Typography>

                  {hasLocalEdits && (
                    <Badge
                      badgeContent="Edited"
                      color="primary"
                      className={styles.badge}
                    />
                  )}
                </Box>

                <Typography variant="h6" className={styles.characterId}>
                  Character ID: {id}
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <CharacterActions
              onEdit={handleEdit}
              onRestore={handleRestore}
              hasLocalEdits={hasLocalEdits}
            />
          </Box>

          {hasLocalEdits && (
            <Alert severity="info" className={styles.alert}>
              This character has been modified locally. Changes are not saved to
              the server.
            </Alert>
          )}
        </Paper>

        {/* Character Details */}
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={2} className={styles.card}>
              <CardContent className={styles.cardContent}>
                <Typography variant="h6" className={styles.cardTitle}>
                  Basic Information
                </Typography>
                <Divider className={styles.divider} />

                <Box>
                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Height:
                    </Typography>
                    <Typography className={styles.value}>
                      {formatCharacterHeight(character.height)}
                    </Typography>
                  </Box>

                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Mass:
                    </Typography>
                    <Typography className={styles.value}>
                      {formatCharacterMass(character.mass)}
                    </Typography>
                  </Box>

                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Birth Year:
                    </Typography>
                    <Typography className={styles.value}>
                      {formatCharacterBirthYear(character.birth_year)}
                    </Typography>
                  </Box>

                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Gender:
                    </Typography>
                    <Typography className={styles.value}>
                      {formatCharacterGender(character.gender)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Appearance */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={2} className={styles.card}>
              <CardContent className={styles.cardContent}>
                <Typography variant="h6" className={styles.cardTitle}>
                  Appearance
                </Typography>
                <Divider className={styles.divider} />

                <Box>
                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Hair Color:
                    </Typography>
                    <Chip
                      label={formatCharacterGender(character.hair_color)}
                      size="small"
                      variant="outlined"
                      className={styles.chip}
                    />
                  </Box>

                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Skin Color:
                    </Typography>
                    <Chip
                      label={formatCharacterGender(character.skin_color)}
                      size="small"
                      variant="outlined"
                      className={styles.chip}
                    />
                  </Box>

                  <Box className={styles.detailRow}>
                    <Typography className={styles.label}>
                      Eye Color:
                    </Typography>
                    <Chip
                      label={formatCharacterGender(character.eye_color)}
                      size="small"
                      variant="outlined"
                      className={styles.chip}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Additional Information */}
          <Grid size={12}>
            <CharacterStats
              character={character}
              originalCharacter={originalCharacter}
            />
          </Grid>
        </Grid>
      </Box>
    </ErrorBoundary>
  );
};

export default CharacterDetailPage; 