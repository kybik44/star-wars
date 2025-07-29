import { Box } from "@mui/material";
import React, { useMemo } from "react";

import Characters from "@assets/images/characters.png";
import Films from "@assets/images/films.png";
import Planets from "@assets/images/planets.png";
import Species from "@assets/images/species.png";
import Starships from "@assets/images/starships.png";
import Vehicles from "@assets/images/vehicles.png";
import { EntityType, Routes as AppRoutes } from "@constants/routes";
import { useResponsive } from "@hooks/useResponsive";
import styles from "./Navigation.module.css";
import NavigationLink from "./NavigationLink";

interface NavigationMenuProps {
  currentPage?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  currentPage = "characters",
}) => {
  const { getNavigationGap } = useResponsive();

  const links = useMemo(
    () => [
      {
        label: "Characters",
        href: AppRoutes.characters,
        icon: <img src={Characters} alt="characters" />,
        isActive: currentPage === EntityType.characters,
      },
      {
        label: "Films",
        href: AppRoutes.films,
        icon: <img src={Films} alt="films" />,
        isActive: currentPage === EntityType.films,
      },
      {
        label: "Planets",
        href: AppRoutes.planets,
        icon: <img src={Planets} alt="planets" />,
        isActive: currentPage === EntityType.planets,
      },
      {
        label: "Species",
        href: AppRoutes.species,
        icon: <img src={Species} alt="species" />,
        isActive: currentPage === EntityType.species,
      },
      {
        label: "Starships",
        href: AppRoutes.starships,
        icon: <img src={Starships} alt="starships" />,
        isActive: currentPage === EntityType.starships,
      },
      {
        label: "Vehicles",
        href: AppRoutes.vehicles,
        icon: <img src={Vehicles} alt="vehicles" />,
        isActive: currentPage === EntityType.vehicles,
      },
    ],
    [currentPage]
  );

  return (
    <Box className={styles.navigation} style={{ gap: getNavigationGap() }}>
      {links.map((link) => (
        <NavigationLink
          key={link.label}
          label={link.label}
          href={link.href}
          icon={link.icon}
          isActive={link.isActive}
        />
      ))}
    </Box>
  );
};

export default NavigationMenu;
