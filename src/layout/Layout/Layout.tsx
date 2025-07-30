import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

import { StarsBackground, getCurrentEntityType } from "@/shared";
import Breadcrumbs from "../Breadcrumbs";
import Navigation from "../Navigation";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const currentPage = getCurrentEntityType(location.pathname);

  return (
    <Box className={styles.container}>
      <StarsBackground />
      <Navigation currentPage={currentPage} />

      <Box className={styles.content}>
        <Breadcrumbs />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
