import { Box } from "@mui/material";
import React from "react";

import type { EntityType } from "../../../../types";
import styles from "./EntityCard.module.css";

interface EntityCardHeaderProps {
  icon: string;
  entityType: EntityType;
}

const EntityCardHeader: React.FC<EntityCardHeaderProps> = React.memo(
  ({ icon, entityType }) => {
    return (
      <Box className={styles.header}>
        <img src={icon} alt={entityType} className={styles.icon} />
      </Box>
    );
  }
);

EntityCardHeader.displayName = "EntityCardHeader";

export default EntityCardHeader;
