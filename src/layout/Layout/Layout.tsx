import { Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

import { StarsBackground } from "@/shared";
import { EntityType, Routes } from "@constants/routes";
import Breadcrumbs from "../Breadcrumbs";
import Navigation from "../Navigation";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const getCurrentPage = (pathname: string): string => {
    if (
      pathname === Routes.characters ||
      pathname.startsWith(`${Routes.characters}/`)
    ) {
      return EntityType.characters;
    }
    if (
      pathname.startsWith(Routes.films) ||
      pathname.startsWith(`${Routes.films}/`)
    ) {
      return EntityType.films;
    }
    if (
      pathname.startsWith(Routes.planets) ||
      pathname.startsWith(`${Routes.planets}/`)
    ) {
      return EntityType.planets;
    }
    if (
      pathname.startsWith(Routes.starships) ||
      pathname.startsWith(`${Routes.starships}/`)
    ) {
      return EntityType.starships;
    }
    if (
      pathname.startsWith(Routes.species) ||
      pathname.startsWith(`${Routes.species}/`)
    ) {
      return EntityType.species;
    }
    if (
      pathname.startsWith(Routes.vehicles) ||
      pathname.startsWith(`${Routes.vehicles}/`)
    ) {
      return EntityType.vehicles;
    }
    return EntityType.characters;
  };

  const currentPage = getCurrentPage(location.pathname);

  return (
    <Box className={styles.container}>
      <StarsBackground />
      <Navigation currentPage={currentPage} />

      <Box className={styles.content}>
        {" "}
        <Breadcrumbs />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
