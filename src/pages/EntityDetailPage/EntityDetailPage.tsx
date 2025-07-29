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

import { ErrorBoundary, ButtonsGroup } from "@/shared";
import type { ButtonConfig } from "@/shared";
import { EntityForm } from "@/features/entity";
import { getEntityConfig } from "@constants/entityConfigs";
import { useEntity } from "@hooks/useEntity";
import { useResponsive } from "@hooks/useResponsive";
import { Edit as EditIcon, Restore as RestoreIcon } from "@mui/icons-material";
import type { EntityType } from "../../types";
import styles from "./EntityDetailPage.module.css";

interface EntityDetailPageProps {
  entityType: EntityType;
}

const EntityDetailPage: React.FC<EntityDetailPageProps> = ({ entityType }) => {
  const { id } = useParams<{ id: string }>();
  const { isMobile } = useResponsive();
  const [isEditing, setIsEditing] = useState(false);

  const {
    entity,
    isLoading,
    error,
    isError,
    hasLocalEdits,
    saveLocalEdit,
    clearLocalEdit,
  } = useEntity(entityType, id || "");

  const config = getEntityConfig(entityType);

  if (!id) {
    return <Navigate to={`/${entityType}`} replace />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (formData: Record<string, unknown>) => {
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
            `Failed to load ${config.name.toLowerCase()} details. Please try again.`}
        </Alert>
      </ErrorBoundary>
    );
  }

  if (!entity) {
    return (
      <ErrorBoundary>
        <Alert severity="warning" sx={{ mb: 3 }}>
          {config.name} not found.
        </Alert>
      </ErrorBoundary>
    );
  }

  if (isEditing) {
    return (
      <ErrorBoundary>
        <EntityForm
          entityType={entityType}
          entity={entity as unknown as Record<string, unknown>}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </ErrorBoundary>
    );
  }

  const displayName = entity[
    config.primaryField as keyof typeof entity
  ] as string;

  return (
    <ErrorBoundary>
      <Box>
        {/* Entity Header */}
        <Paper elevation={2} className={styles.header}>
          <Box className={styles.headerContent}>
            <Box className={styles.entityInfo}>
              <Box className={styles.iconContainer}>
                <img
                  src={config.icon}
                  alt={config.name}
                  className={styles.entityIcon}
                />
              </Box>

              <Box className={styles.nameSection}>
                <Box className={styles.nameRow}>
                  <Typography
                    variant={isMobile ? "h4" : "h2"}
                    component="h1"
                    className={styles.name}
                  >
                    {displayName}
                  </Typography>

                  {hasLocalEdits && (
                    <Badge
                      badgeContent="Edited"
                      color="primary"
                      className={styles.badge}
                    />
                  )}
                </Box>

                <Typography
                  variant={isMobile ? "body2" : "h6"}
                  className={styles.entityId}
                >
                  {config.name} ID: {id}
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <ButtonsGroup
              buttons={
                [
                  {
                    label: "Edit",
                    onClick: handleEdit,
                    variant: "contained",
                    startIcon: <EditIcon />,
                  },
                  hasLocalEdits
                    ? {
                        label: "Restore",
                        onClick: handleRestore,
                        variant: "outlined",
                        startIcon: <RestoreIcon />,
                      }
                    : null,
                ] as ButtonConfig[]
              }
              direction="horizontal"
              spacing="sm"
              align="end"
              responsive
              className={styles.actions}
            />
          </Box>

          {hasLocalEdits && (
            <Alert severity="info" className={styles.alert}>
              This {config.name.toLowerCase()} has been modified locally.
              Changes are not saved to the server.
            </Alert>
          )}
        </Paper>

        {/* Entity Details */}
        <Grid container spacing={3}>
          {config.detailSections.map((section, sectionIndex) => (
            <Grid key={sectionIndex} size={{ xs: 12, md: 6 }}>
              <Card elevation={2} className={styles.card}>
                <CardContent className={styles.cardContent}>
                  <Typography variant="h6" className={styles.cardTitle}>
                    {section.title}
                  </Typography>
                  <Divider className={styles.divider} />

                  <Box>
                    {section.fields.map((field) => {
                      const value = entity[field.key as keyof typeof entity];
                      const formattedValue = field.format
                        ? field.format(value)
                        : String(value);

                      return (
                        <Box key={field.key} className={styles.detailRow}>
                          <Typography className={styles.label}>
                            {field.label}:
                          </Typography>
                          <Typography className={styles.value}>
                            {field.type === "array" ? (
                              <Chip
                                label={formattedValue}
                                size="small"
                                variant="outlined"
                                className={styles.chip}
                              />
                            ) : (
                              <>
                                {formattedValue}
                                {field.unit &&
                                  value !== "unknown" &&
                                  value !== "n/a" &&
                                  ` ${field.unit}`}
                              </>
                            )}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ErrorBoundary>
  );
};

export default EntityDetailPage;
