import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  NavigateNext as NavigateNextIcon,
  Public as PublicIcon,
} from "@mui/icons-material";
import React, { useMemo } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

import { Routes, EntityType } from "@constants/routes";
import { getEntityConfig } from "@constants/entityConfigs";
import { useEntity } from "@hooks/useEntity";
import styles from "./Breadcrumbs.module.css";
import theme from "@/theme";

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface EntityBreadcrumbItem extends BreadcrumbItem {
  entityType: EntityType;
  entityId: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const breadcrumbs = useMemo(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbs: (BreadcrumbItem | EntityBreadcrumbItem)[] = [];

    breadcrumbs.push({
      label: "Galaxy",
      href: "/",
    });

    if (pathnames.length === 0) {
      breadcrumbs.push({
        label: "Characters",
        href: Routes.characters,
      });
      return breadcrumbs;
    }

    let currentPath = "";
    pathnames.forEach((pathname, index) => {
      currentPath += `/${pathname}`;
      const isLast = index === pathnames.length - 1;

      const entityType = Object.values(EntityType).find(
        (type) => type === pathname
      );

      if (entityType) {
        const config = getEntityConfig(entityType);
        breadcrumbs.push({
          label: config.pluralName,
          href: isLast ? undefined : currentPath,
          isActive: isLast,
        });
      } else if (pathname.match(/^\d+$/)) {
        const parentEntity = pathnames[index - 1];
        const entityType = Object.values(EntityType).find(
          (type) => type === parentEntity
        );

        if (entityType) {
          breadcrumbs.push({
            label: "Loading...",
            href: undefined,
            isActive: true,
            entityType,
            entityId: pathname,
          });
        } else {
          breadcrumbs.push({
            label: "Details",
            href: undefined,
            isActive: true,
          });
        }
      } else {
        breadcrumbs.push({
          label: pathname.charAt(0).toUpperCase() + pathname.slice(1),
          href: isLast ? undefined : currentPath,
          isActive: isLast,
        });
      }
    });

    return breadcrumbs;
  }, [location.pathname]);

  return (
    <Box className={styles.container}>
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        maxItems={4}
        itemsBeforeCollapse={2}
        itemsAfterCollapse={1}
      >
        {breadcrumbs.map((item, index) => {
          if (item.isActive && "entityType" in item && "entityId" in item) {
            return (
              <EntityBreadcrumbItem
                key={index}
                entityType={item.entityType}
                entityId={item.entityId}
              />
            );
          }

          if (item.isActive || !item.href) {
            return (
              <Typography
                key={index}
                color="text.primary"
                variant={isMobile ? "body2" : "subtitle2"}
                className={styles.breadcrumbItem}
              >
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              component={RouterLink}
              to={item.href}
              underline="hover"
              color="inherit"
              className={styles.breadcrumbLink}
            >
              {index === 0 && <PublicIcon sx={{ mr: 0.5 }} fontSize="small" />}
              {item.label}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

interface EntityBreadcrumbItemProps {
  entityType: EntityType;
  entityId: string;
}

const EntityBreadcrumbItem: React.FC<EntityBreadcrumbItemProps> = ({
  entityType,
  entityId,
}) => {
  const { entity, isLoading, error } = useEntity(entityType, entityId);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const config = getEntityConfig(entityType);

  if (isLoading) {
    return (
      <Typography
        color="text.primary"
        variant={isMobile ? "body2" : "subtitle2"}
        className={styles.breadcrumbItem}
      >
        Loading...
      </Typography>
    );
  }

  if (error || !entity) {
    return (
      <Typography
        color="text.primary"
        variant={isMobile ? "body2" : "subtitle2"}
        className={styles.breadcrumbItem}
      >
        {config.name} Details
      </Typography>
    );
  }

  const primaryValue = entity[
    config.primaryField as keyof typeof entity
  ] as string;

  return (
    <Typography
      color="text.primary"
      variant={isMobile ? "body2" : "subtitle2"}
      className={styles.breadcrumbItem}
    >
      {primaryValue || `${config.name} Details`}
    </Typography>
  );
};

export default Breadcrumbs;
