import { Edit as EditIcon, Restore as RestoreIcon } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import styles from "./CharacterActions.module.css";

interface CharacterActionsProps {
  onEdit: () => void;
  onRestore: () => void;
  hasLocalEdits: boolean;
}

const CharacterActions: React.FC<CharacterActionsProps> = React.memo(({
  onEdit,
  onRestore,
  hasLocalEdits,
}) => {
  return (
    <Box className={styles.container}>
      <Button
        variant="contained"
        onClick={onEdit}
        startIcon={<EditIcon />}
        className={`${styles.button} ${styles.editButton}`}
      >
        Edit
      </Button>

      {hasLocalEdits && (
        <Button
          variant="outlined"
          onClick={onRestore}
          startIcon={<RestoreIcon />}
          className={`${styles.button} ${styles.restoreButton}`}
        >
          Restore
        </Button>
      )}
    </Box>
  );
});

CharacterActions.displayName = 'CharacterActions';

export default CharacterActions; 