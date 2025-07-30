import {
  Alert,
  Badge,
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Restore as RestoreIcon,
} from "@mui/icons-material";

import { ButtonsGroup } from "@/shared";
import type { ButtonConfig } from "@/shared";
import { useResponsive } from "@hooks/useResponsive";
import { getEntityRoute } from "@/shared/lib/routing/entityRouting";
import type { Entity, EntityConfig, EntityType } from "@/types";
import styles from "./EntityDetailHeader.module.css";

interface EntityDetailHeaderProps {
  entity: Entity;
  config: EntityConfig;
  entityId: string;
  entityType: EntityType;
  hasLocalEdits: boolean;
  onEdit: () => void;
  onRestore: () => void;
  onBack?: () => void;
}

const EntityDetailHeader: React.FC<EntityDetailHeaderProps> = ({
  entity,
  config,
  entityId,
  entityType,
  hasLocalEdits,
  onEdit,
  onRestore,
  onBack,
}) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const displayName = entity[
    config.primaryField as keyof typeof entity
  ] as string;

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        const entityRoute = getEntityRoute(entityType);
        navigate(entityRoute);
      }
    }
  };

  return (
    <Paper elevation={2} className={styles.header}>
      <IconButton onClick={handleGoBack} className={styles.backButton}>
        <ArrowBackIcon />
      </IconButton>
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
              {config.name} ID: {entityId}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <ButtonsGroup
          buttons={
            [
              {
                label: "Edit",
                onClick: onEdit,
                variant: "contained",
                startIcon: <EditIcon />,
              },
              hasLocalEdits
                ? {
                    label: "Restore",
                    onClick: onRestore,
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
          This {config.name.toLowerCase()} has been modified locally. Changes
          are not saved to the server.
        </Alert>
      )}
    </Paper>
  );
};

export default EntityDetailHeader;
