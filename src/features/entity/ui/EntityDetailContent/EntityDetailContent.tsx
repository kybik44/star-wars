import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

import type { Entity, EntityConfig } from "@/types";
import styles from "./EntityDetailContent.module.css";

interface EntityDetailContentProps {
  entity: Entity;
  config: EntityConfig;
}

const EntityDetailContent: React.FC<EntityDetailContentProps> = ({
  entity,
  config,
}) => {
  return (
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
  );
};

export default EntityDetailContent; 