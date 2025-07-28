import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import type { Character, EditableCharacter } from "../../../../types";
import {
  formatFilmCount,
  formatSpeciesCount,
  formatVehiclesCount,
  formatStarshipsCount,
} from "../../../../utils/formatters";
import styles from "./CharacterStats.module.css";

interface CharacterStatsProps {
  character: Character | EditableCharacter;
  originalCharacter?: Character;
}

const CharacterStats: React.FC<CharacterStatsProps> = React.memo(
  ({ character, originalCharacter }) => {
    const filmsCount = character.films?.length || 0;
    const speciesCount = character.species?.length || 0;
    const vehiclesCount = character.vehicles?.length || 0;
    const starshipsCount = character.starships?.length || 0;

    const hasChanges =
      originalCharacter &&
      (filmsCount !== (originalCharacter.films?.length || 0) ||
        speciesCount !== (originalCharacter.species?.length || 0) ||
        vehiclesCount !== (originalCharacter.vehicles?.length || 0) ||
        starshipsCount !== (originalCharacter.starships?.length || 0));

    return (
      <Card elevation={2} className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Typography variant="h6" className={styles.title}>
            Additional Information
            {hasChanges && " (Modified)"}
          </Typography>
          <Divider className={styles.divider} />

          <Box className={styles.statsGrid}>
            <Box className={styles.statItem}>
              <Typography className={styles.label}>Films</Typography>
              <Chip
                label={formatFilmCount(filmsCount)}
                size="small"
                className={`${styles.chip} ${styles.films}`}
              />
            </Box>

            <Box className={styles.statItem}>
              <Typography className={styles.label}>Species</Typography>
              <Chip
                label={formatSpeciesCount(speciesCount)}
                size="small"
                className={`${styles.chip} ${styles.species}`}
              />
            </Box>

            <Box className={styles.statItem}>
              <Typography className={styles.label}>Vehicles</Typography>
              <Chip
                label={formatVehiclesCount(vehiclesCount)}
                size="small"
                className={`${styles.chip} ${styles.vehicles}`}
              />
            </Box>

            <Box className={styles.statItem}>
              <Typography className={styles.label}>Starships</Typography>
              <Chip
                label={formatStarshipsCount(starshipsCount)}
                size="small"
                className={`${styles.chip} ${styles.starships}`}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }
);

CharacterStats.displayName = "CharacterStats";

export default CharacterStats;
