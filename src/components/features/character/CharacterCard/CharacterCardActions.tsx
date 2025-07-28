import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { Button, CardActions } from "@mui/material";
import React from "react";

import styles from "./CharacterCard.module.css";

interface CharacterCardActionsProps {
  onViewDetails: () => void;
  buttonText?: string;
}

const CharacterCardActions: React.FC<CharacterCardActionsProps> = ({ 
  onViewDetails, 
  buttonText = "View Details" 
}) => {
  return (
    <CardActions className={styles.actions}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<VisibilityIcon />}
        className={styles.button}
        onClick={onViewDetails}
      >
        {buttonText}
      </Button>
    </CardActions>
  );
};

export default CharacterCardActions; 