import { Grid } from "@mui/material";
import React from "react";

import EntityCard from "../EntityCard";
import type { Entity, EntityType } from "../../../../types";
import styles from "./EntityGrid.module.css";

interface EntityGridProps {
  entities: Entity[];
  entityType: EntityType;
  onEntityClick: (entityUrl: string) => void;
  id: string;
}

const EntityGrid: React.FC<EntityGridProps> = ({
  entities,
  entityType,
  onEntityClick,
  id,
}) => {
  return (
    <Grid container spacing={3} className={styles.entityGrid} id={id}>
      {entities.map((entity) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={entity.url}>
          <EntityCard
            entity={entity}
            entityType={entityType}
            onClick={() => onEntityClick(entity.url)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default EntityGrid;
