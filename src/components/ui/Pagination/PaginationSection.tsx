import { Box, Pagination } from "@mui/material";
import React from "react";

import type { PaginationInfo } from "../../../types";
import styles from "./PaginationSection.module.css";

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
  if (paginationInfo.totalPages <= 1) {
    return null;
  }

  return (
    <Box className={styles.pagination}>
      <Pagination
        count={paginationInfo.totalPages}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default PaginationSection;
