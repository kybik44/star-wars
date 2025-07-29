import { Box, Pagination } from "@mui/material";
import React from "react";

import { useResponsive } from "@hooks/useResponsive";
import type { PaginationInfo } from "../../../../types";
import styles from "./Pagination.module.css";

interface PaginationSectionProps {
  paginationInfo: PaginationInfo;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({
  paginationInfo,
  currentPage,
  onPageChange,
}) => {
  const { isMobile, isTablet } = useResponsive();

  if (paginationInfo.totalPages <= 1) {
    return null;
  }

  const getPaginationProps = () => {
    if (isMobile) {
      return {
        size: "small" as const,
        showFirstButton: false,
        showLastButton: false,
        siblingCount: 0,
        boundaryCount: 1,
      };
    }

    if (isTablet) {
      return {
        size: "medium" as const,
        showFirstButton: true,
        showLastButton: true,
        siblingCount: 1,
        boundaryCount: 1,
      };
    }

    return {
      size: "large" as const,
      showFirstButton: true,
      showLastButton: true,
      siblingCount: 2,
      boundaryCount: 2,
    };
  };

  return (
    <Box className={styles.pagination}>
      <Pagination
        count={paginationInfo.totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        {...getPaginationProps()}
      />
    </Box>
  );
};

export default PaginationSection;
