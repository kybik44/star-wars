import { Box, Typography } from "@mui/material";
import React from "react";

import Logo from "@assets/LogoStarWars.png";
import styles from "./NavigationHeader.module.css";

const NavigationLogo: React.FC = () => {
  return (
    <Box className={styles.logoSection}>
      <Box className={styles.divider} />
      <Box className={styles.logoContainer}>
        <img src={Logo} alt="Star Wars Logo" className={styles.logo} />
      </Box>

      <Typography variant="subtitle1" className={styles.title}>
        Discovery
      </Typography>
      <Box className={styles.divider} />
    </Box>
  );
};

export default NavigationLogo;
