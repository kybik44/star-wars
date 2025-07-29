import React, { useCallback, useEffect, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Box, CircularProgress } from "@mui/material";
import loadingAnimation from "@assets/json/loading.json";
import styles from "./GlobalLoader.module.css";

interface GlobalLoaderProps {
  isLoading: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isLoading }) => {
  const [animationReady, setAnimationReady] = useState(false);

  const setAnimationReadyCallback = useCallback(() => {
    setAnimationReady(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(setAnimationReadyCallback, 50);

    return () => clearTimeout(timer);
  }, [setAnimationReadyCallback]);

  return (
    <Box
      className={`${styles.loadingContainer} ${
        isLoading ? styles.visible : styles.hidden
      }`}
    >
      {animationReady ? (
        <Player
          autoplay={isLoading}
          loop
          src={loadingAnimation}
          className={styles.loadingAnimationBox}
          keepLastFrame={false}
          speed={1}
        />
      ) : (
        // Fast CSS fallback while Lottie loads
        <div className={styles.fallbackSpinner}>
          <CircularProgress
            size={80}
            thickness={2}
            sx={{
              color: "var(--color-primary-gold)",
              "& .MuiCircularProgress-circle": {
                strokeLinecap: "round",
              },
            }}
          />
        </div>
      )}
    </Box>
  );
};

export default GlobalLoader;
