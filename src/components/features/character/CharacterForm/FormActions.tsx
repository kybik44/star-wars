import { Cancel as CancelIcon, Save as SaveIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
} from "@mui/material";
import React from "react";

import styles from "./CharacterForm.module.css";

interface FormActionsProps {
  isSubmitting: boolean;
  isDirty: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({
  isSubmitting,
  isDirty,
  onCancel,
}) => {
  return (
    <Box className={styles.actions}>
      <Divider className={styles.divider} />

      {!isDirty && (
        <Alert severity="info" className={styles.infoAlert}>
          No changes have been made to the character data.
        </Alert>
      )}

      <Box className={styles.buttons}>
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isSubmitting}
          startIcon={<CancelIcon />}
          className={styles.button}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitting || !isDirty}
          startIcon={<SaveIcon />}
          className={styles.button}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
};

export default FormActions; 