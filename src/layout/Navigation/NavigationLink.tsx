import { Box, Link, Typography } from "@mui/material";
import React from "react";

import { useResponsive } from "@hooks/useResponsive";
import styles from "./Navigation.module.css";

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
}) => {
  const { getNavigationLinkWidth, getNavigationIconSize, getLabelSize } =
    useResponsive();

  return (
    <Link
      href={href}
      className={styles.navigationLink}
      style={{ minWidth: getNavigationLinkWidth() }}
      sx={{
        textDecoration: "none !important",
        "&:hover": {
          textDecoration: "none !important",
        },
        "&:focus": {
          textDecoration: "none !important",
        },
        "&:visited": {
          textDecoration: "none !important",
        },
      }}
    >
      <span>
        <Box
          className={styles.navigationIcon}
          style={{
            width: getNavigationIconSize(),
            height: getNavigationIconSize(),
          }}
        >
          {icon}
        </Box>
        <Typography
          className={`${styles.navigationLabel} ${
            isActive ? styles.active : ""
          }`}
          variant="h3"
          style={{ fontSize: getLabelSize() }}
        >
          {label}
        </Typography>
      </span>
    </Link>
  );
};

export default NavigationLink;
