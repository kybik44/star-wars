import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
  formatFieldValueWithUnit,
  buildEntityDetailUrl,
  extractEntityId,
} from "@/shared";
import { getEntityConfig } from "@constants/entityConfigs";
import { localStorageService } from "@services/localStorage";
import type { Entity, EntityType } from "@/types";
import styles from "./EntityCard.module.css";
import EntityCardHeader from "./EntityCardHeader";

interface EntityCardProps {
  entity: Entity;
  entityType: EntityType;
  onClick?: () => void;
}

const EntityCard: React.FC<EntityCardProps> = React.memo(
  ({ entity, entityType, onClick }) => {
    const navigate = useNavigate();

    const config = useMemo(() => getEntityConfig(entityType), [entityType]);

    // Check if entity has local edits
    const hasLocalEdits = useMemo(() => {
      if (!entity) return false;
      const entityId = extractEntityId(entity.url);
      const localEdit = localStorageService.getEntityEdit(entityType, entityId);
      return !!localEdit;
    }, [entity?.url, entityType]);

    const handleClick = useCallback(() => {
      if (!entity) return;
      if (onClick) {
        onClick();
      } else {
        const entityId = extractEntityId(entity.url);
        const detailUrl = buildEntityDetailUrl(entityType, entityId);

        navigate(detailUrl);
      }
    }, [onClick, entity?.url, entityType, navigate]);

    // Early return for null/undefined entity
    if (!entity) {
      return (
        <Card className={styles.card}>
          <CardContent className={styles.content}>
            <div>Entity not found</div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className={styles.card} onClick={handleClick}>
        <CardContent className={styles.content}>
          <EntityCardHeader icon={config.icon} entityType={entityType} />
          <Box className={styles.detailsContainer}>
            <Box className={styles.details}>
              {config.cardFields.map((field) => {
                const value = entity[field.key as keyof Entity];
                const formattedValue = formatFieldValueWithUnit(value, field);

                return (
                  <Box key={field.key} className={styles.detailRow}>
                    <Typography variant="body2" className={styles.label}>
                      {field.label}:
                    </Typography>
                    <Typography variant="body2" className={styles.value}>
                      {formattedValue}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
            <Box className={styles.typeChip}>
              <Chip
                label={config.name}
                size="small"
                color="primary"
                variant="outlined"
              />
              {hasLocalEdits && (
                <Chip
                  label="Edited"
                  size="small"
                  color="warning"
                  variant="filled"
                  sx={{ ml: 1 }}
                />
              )}
            </Box>
            <Button
              onClick={handleClick}
              className={styles.button}
              variant="contained"
            >
              <Typography variant="body2">View Details</Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

EntityCard.displayName = "EntityCard";

export default EntityCard;
