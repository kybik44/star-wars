import { Box, Typography } from "@mui/material";
import React from "react";

import { formatAttribute } from "@utils/formatters";
import type { Character } from "../../../../types";
import styles from "./CharacterCard.module.css";

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <Box className={styles.details}>
      <Box className={styles.detailRow}>
        <Typography className={styles.label}>Height:</Typography>
        <Typography className={styles.value}>
          {formatAttribute(character.height)}{" "}
          {character.height !== "unknown" && character.height !== "n/a"
            ? "cm"
            : ""}
        </Typography>
      </Box>

      <Box className={styles.detailRow}>
        <Typography className={styles.label}>Mass:</Typography>
        <Typography className={styles.value}>
          {formatAttribute(character.mass)}{" "}
          {character.mass !== "unknown" && character.mass !== "n/a" ? "kg" : ""}
        </Typography>
      </Box>

      <Box className={styles.detailRow}>
        <Typography className={styles.label}>Birth Year:</Typography>
        <Typography className={styles.value}>
          {formatAttribute(character.birth_year)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CharacterDetails;
