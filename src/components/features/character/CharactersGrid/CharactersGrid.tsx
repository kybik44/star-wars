import { Grid } from "@mui/material";
import React from "react";

import CharacterCard from "../CharacterCard/CharacterCard";
import type { Character } from "../../../../types";
import styles from "./CharactersGrid.module.css";

interface CharactersGridProps {
  characters: Character[];
  onCharacterClick: (characterUrl: string) => void;
}

const CharactersGrid: React.FC<CharactersGridProps> = ({
  characters,
  onCharacterClick,
}) => {
  return (
    <Grid container spacing={3} className={styles.charactersGrid}>
      {characters.map((character) => (
        <Grid
          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
          key={character.url}
        >
          <CharacterCard
            character={character}
            onClick={() => onCharacterClick(character.url)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CharactersGrid; 