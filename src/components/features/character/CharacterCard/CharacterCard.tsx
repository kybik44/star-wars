import { Card, CardContent } from "@mui/material";
import React from "react";

import CharacterCardActions from "./CharacterCardActions";
import CharacterCardHeader from "./CharacterCardHeader";
import CharacterDetails from "./CharacterDetails";
import CharacterGenderChip from "./CharacterGenderChip";
import type { Character } from "../../../../types";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = React.memo(({
  character,
  onClick,
}) => {
  // Error handling for null/undefined character
  if (!character) {
    return (
      <Card className={styles.card}>
        <CardContent className={styles.content}>
          <div>Character not found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={styles.card} onClick={onClick}>
      <CardContent className={styles.content}>
        <CharacterCardHeader name={character.name} />
        <CharacterDetails character={character} />
        <CharacterGenderChip gender={character.gender} />
      </CardContent>

      <CharacterCardActions onViewDetails={onClick} />
    </Card>
  );
});

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;
