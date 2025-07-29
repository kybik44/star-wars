import { Box, Typography, Card, CardContent } from "@mui/material";
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { ErrorBoundary, ButtonsGroup } from "@/shared";
import type { ButtonConfig } from "@/shared";
import styles from "./NotFoundPage.module.css";
import fourOhFour from "@assets/svg/404.svg";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Go Home",
      onClick: handleGoHome,
      variant: "contained",
      startIcon: <HomeIcon />,
      className: styles.homeButton,
    },
    {
      label: "Go Back",
      onClick: handleGoBack,
      variant: "outlined",
      startIcon: <ArrowBackIcon />,
      className: styles.backButton,
    },
  ];

  return (
    <ErrorBoundary>
      <Box className={styles.container}>
        <Card className={styles.card}>
          <CardContent className={styles.content}>
            {/* 404 Image */}
            <Box className={styles.imageContainer}>
              <img 
                src={fourOhFour} 
                alt="404 - Page Not Found"
                className={styles.errorImage}
              />
            </Box>

            {/* Error Code */}
            <Typography variant="h1" component="h1" className={styles.errorCode}>
              404
            </Typography>

            {/* Error Title */}
            <Typography variant="h2" component="h2" className={styles.errorTitle}>
              Page Not Found
            </Typography>

            {/* Error Description */}
            <Typography variant="body1" className={styles.errorDescription}>
              The page you're looking for seems to have been lost in hyperspace. 
              It might have been destroyed by the Death Star or simply doesn't exist in this galaxy.
            </Typography>

            {/* Action Buttons */}
            <ButtonsGroup
              buttons={buttons}
              direction="horizontal"
              spacing="md"
              align="center"
              className={styles.buttonGroup}
            />

            {/* Additional Info */}
            <Typography variant="body2" className={styles.additionalInfo}>
              May the Force be with you on your journey back to safety.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </ErrorBoundary>
  );
};

export default NotFoundPage; 