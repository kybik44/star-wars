import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

import styles from "./LoadingSkeleton.module.css";

interface LoadingSkeletonProps {
  count?: number;
  gridSize?: { xs: number; sm: number; md: number; lg: number };
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 10,
  gridSize = { xs: 12, sm: 6, md: 4, lg: 3 },
}) => {
  return (
    <Grid container spacing={3} className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid size={gridSize} key={index}>
          <Paper elevation={2} className={styles.skeletonCard}>
            <Skeleton variant="text" height={32} width="80%" />
            <Skeleton variant="text" height={24} width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" height={24} width="70%" />
            <Skeleton variant="text" height={24} width="50%" />
            <Skeleton variant="rectangular" height={36} sx={{ mt: 2 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingSkeleton; 