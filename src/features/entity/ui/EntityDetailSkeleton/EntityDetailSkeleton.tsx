import {
  Box,
  Paper,
  Skeleton,
} from "@mui/material";
import React from "react";

const EntityDetailSkeleton: React.FC = () => {
  return (
    <Box>
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Skeleton
            variant="circular"
            width={80}
            height={80}
            sx={{ mr: 3 }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" height={40} width="60%" />
            <Skeleton variant="text" height={24} width="40%" />
          </Box>
        </Box>
        <Skeleton variant="rectangular" height={200} />
      </Paper>
    </Box>
  );
};

export default EntityDetailSkeleton; 