import { Box } from "@mui/material";
import React from "react";

import NavigationHeader from "../Navigation/NavigationHeader";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box className={styles.container}>
      <NavigationHeader />
      <Box className={styles.content}>{children}</Box>
    </Box>
  );
};

export default Layout;
