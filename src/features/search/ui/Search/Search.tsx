import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import styles from "./Search.module.css";

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
    <Box className={styles.searchSection} id="search">
      <TextField
        fullWidth
        placeholder={placeholder}
        value={searchTerm}
        onChange={onSearchChange}
        variant="outlined"
        size="medium"
        className={styles.searchField}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default SearchSection;
