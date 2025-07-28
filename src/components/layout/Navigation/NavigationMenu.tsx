import { Box } from "@mui/material";
import React from "react";

import Characters from "@assets/characters.png";
import Films from "@assets/films.png";
import Planets from "@assets/planets.png";
import Species from "@assets/species.png";
import Starships from "@assets/starships.png";
import Vehicles from "@assets/vehicles.png";
import styles from "./NavigationHeader.module.css";
import NavigationLink from "./NavigationLink";

interface NavigationMenuProps {
  currentPage?: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  currentPage = "characters",
}) => {
  const links = [
    {
      label: "Characters",
      href: "/",
      icon: <img src={Characters} alt="characters" />,
      isActive: currentPage === "characters",
    },
    {
      label: "Films",
      href: "/films",
      icon: <img src={Films} alt="films" />,
      isActive: currentPage === "films",
    },
    {
      label: "Planets",
      href: "/planets",
      icon: <img src={Planets} alt="planets" />,
      isActive: currentPage === "planets",
    },
    {
      label: "Species",
      href: "/species",
      icon: <img src={Species} alt="species" />,
      isActive: currentPage === "species",
    },
    {
      label: "Starships",
      href: "/starships",
      icon: <img src={Starships} alt="starships" />,
      isActive: currentPage === "starships",
    },
    {
      label: "Vehicles",
      href: "/vehicles",
      icon: <img src={Vehicles} alt="vehicles" />,
      isActive: currentPage === "vehicles",
    },
  ];

  return (
    <Box className={styles.navigation}>
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
