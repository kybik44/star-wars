import { Box, Typography } from "@mui/material";
import React from "react";

import { useResponsive } from "@hooks/useResponsive";
import Logo from "@assets/images/LogoStarWars.png";
import styles from "./Navigation.module.css";

const NavigationLogo: React.FC = () => {
  const { getLogoSize, getTitleSize } = useResponsive();

  return (
    <Box className={styles.logoSection}>
      <Box className={styles.divider} />
      <Box className={styles.logoContainer}>
        <img
          src={Logo}
          alt="Star Wars Logo"
          className={styles.logo}
          style={{ height: getLogoSize() }}
        />
      </Box>

      <Typography
        variant="subtitle1"
        className={styles.title}
        style={{ fontSize: getTitleSize() }}
      >
        Discovery
      </Typography>
      <Box className={styles.divider} />
    </Box>
  );
};

export default NavigationLogo;
