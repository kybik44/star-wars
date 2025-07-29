import { Box } from "@mui/material";
import React from "react";

import styles from "./Navigation.module.css";
import NavigationLogo from "./NavigationLogo";
import NavigationMenu from "./NavigationMenu";

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage = "characters",
}) => {
  return (
    <>
      <Box className={styles.headSection}>
        <NavigationLogo />
        <NavigationMenu currentPage={currentPage} />
      </Box>
    </>
  );
};

export default Navigation;
