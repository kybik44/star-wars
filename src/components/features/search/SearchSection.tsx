import { Box, TextField } from "@mui/material";
import React from "react";

import styles from "./SearchSection.module.css";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  searchTerm,
  onSearchChange,
  placeholder = "Search characters...",
}) => {
  return (
    <Box className={styles.searchSection}>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
        variant="outlined"
        size="medium"
        className={styles.searchField}
      />
    </Box>
  );
};

export default SearchSection; 