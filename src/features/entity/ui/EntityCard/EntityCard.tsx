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

import { getEntityConfig } from "@constants/entityConfigs";
import { swapiService } from "@services/swapiService";
import type { Entity, EntityType } from "../../../../types";
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

    const handleClick = useCallback(() => {
      if (onClick) {
        onClick();
      } else {
        const entityId = swapiService.extractEntityId(entity.url, entityType);
        const detailRoute = swapiService.getEntityRoute(entityType);
        navigate(`${detailRoute}/${entityId}`);
      }
    }, [onClick, entity.url, entityType, navigate]);

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
                const formattedValue = field.format
                  ? field.format(value)
                  : String(value);

                return (
                  <Box key={field.key} className={styles.detailRow}>
                    <Typography variant="body2" className={styles.label}>
                      {field.label}:
                    </Typography>
                    <Typography variant="body2" className={styles.value}>
                      {formattedValue}
                      {field.unit &&
                        value !== "unknown" &&
                        value !== "n/a" &&
                        ` ${field.unit}`}
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
