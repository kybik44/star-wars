import { Person as PersonIcon } from "@mui/icons-material";
import { Box, Chip } from "@mui/material";
import React from "react";

import { formatAttribute, getGenderColor } from "@utils/formatters";
import styles from "./CharacterCard.module.css";

interface CharacterGenderChipProps {
  gender: string;
}

const CharacterGenderChip: React.FC<CharacterGenderChipProps> = ({
  gender,
}) => {
  return (
    <Box className={styles.genderChip}>
      <Chip
        label={formatAttribute(gender)}
        size="small"
        color={getGenderColor(gender) as "primary" | "secondary" | "default"}
        icon={<PersonIcon />}
      />
    </Box>
  );
};

export default CharacterGenderChip;
