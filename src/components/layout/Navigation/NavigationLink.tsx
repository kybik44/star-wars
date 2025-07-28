import { Box, Link, Typography } from "@mui/material";
import React from "react";

import styles from "./NavigationHeader.module.css";

interface NavigationLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  label,
  href,
  icon,
  isActive = false,
}) => (
  <Link href={href} className={styles.navigationLink}>
    <Box className={styles.navigationIcon}>{icon}</Box>
    <Typography
      className={`${styles.navigationLabel} ${isActive ? styles.active : ""}`}
      variant="h2"
    >
      {label}
    </Typography>
  </Link>
);

export default NavigationLink; 