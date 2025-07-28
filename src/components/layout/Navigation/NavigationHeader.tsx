import { Box } from "@mui/material";
import React from "react";

import NavigationLogo from "./NavigationLogo";
import NavigationMenu from "./NavigationMenu";
import styles from "./NavigationHeader.module.css";

interface NavigationHeaderProps {
  currentPage?: string;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ 
  currentPage = "characters" 
}) => {
  return (
    <Box className={styles.headSection}>
      <NavigationLogo />
      <NavigationMenu currentPage={currentPage} />
    </Box>
  );
};

export default NavigationHeader; 