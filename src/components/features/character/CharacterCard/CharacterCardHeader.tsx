import { Box, Typography } from "@mui/material";
import React from "react";

import Avatar from "../Avatar/Avatar";
import styles from "./CharacterCard.module.css";

interface CharacterCardHeaderProps {
  name: string;
  avatarSize?: "small" | "medium" | "large";
}

const CharacterCardHeader: React.FC<CharacterCardHeaderProps> = React.memo(({ 
  name, 
  avatarSize = "medium" 
}) => {
  return (
    <Box className={styles.header}>
              <Avatar name={name} size={avatarSize} />
      <Box className="flex-grow">
        <Typography variant="h6" component="h3" className={styles.name}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
});

CharacterCardHeader.displayName = 'CharacterCardHeader';

export default CharacterCardHeader; 