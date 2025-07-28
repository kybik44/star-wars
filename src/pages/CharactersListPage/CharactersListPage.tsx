import { Alert, Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorBoundary from "@components/common/ErrorBoundary/ErrorBoundary";
import CharactersGrid from "@components/features/character/CharactersGrid/CharactersGrid";
import SearchSection from "@components/features/search/SearchSection";
import LoadingSkeleton from "@components/ui/LoadingSkeleton/LoadingSkeleton";
import Pagination from "@components/ui/Pagination/PaginationSection";
import { useCharacters } from "@hooks/useCharacters";
import { useDebounce } from "@hooks/useDebounce";
import styles from "./CharactersListPage.module.css";

const CharactersListPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Reset page when search changes
  const searchParams = useMemo(
    () => ({
      search: debouncedSearchTerm || undefined,
      page: debouncedSearchTerm !== searchTerm ? 1 : currentPage,
    }),
    [debouncedSearchTerm, searchTerm, currentPage]
  );

  const { characters, paginationInfo, isLoading, error, isError, refetch } =
    useCharacters(searchParams);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCharacterClick = (characterUrl: string) => {
    // Extract ID from SWAPI URL
    const match = characterUrl.match(/\/people\/(\d+)\//);
    if (match) {
      navigate(`/character/${match[1]}`);
    }
  };

  return (
    <ErrorBoundary>
      {/* Main Content Container */}
      <Box className={styles.mainContent}>
        {/* Search Section */}
        <SearchSection
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* Content Section */}
        <Box className={styles.contentSection}>
          {/* Error State */}
          {isError && (
            <Alert
              severity="error"
              action={<button onClick={() => refetch()}>Retry</button>}
              sx={{ mb: 3 }}
            >
              {error?.message || "Failed to load characters. Please try again."}
            </Alert>
          )}

          {/* Results Summary */}
          {paginationInfo && !isLoading && (
            <Box className={styles.resultsSummary}>
              <Typography variant="body2" color="text.secondary">
                {searchTerm ? (
                  <>
                    Showing {characters.length} result
                    {characters.length !== 1 ? "s" : ""} for "{searchTerm}"
                  </>
                ) : (
                  <>
                    Showing {characters.length} of {paginationInfo.totalCount}{" "}
                    characters
                  </>
                )}
              </Typography>
            </Box>
          )}

          {/* Characters Grid or Loading */}
          {isLoading ? (
            <LoadingSkeleton />
          ) : characters.length > 0 ? (
            <CharactersGrid
              characters={characters}
              onCharacterClick={handleCharacterClick}
            />
          ) : !isError ? (
            <Box className={styles.noResults}>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No characters found
              </Typography>
              {searchTerm && (
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search terms
                </Typography>
              )}
            </Box>
          ) : null}

          {/* Pagination */}
          {paginationInfo && (
            <Pagination
              paginationInfo={paginationInfo}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

export default CharactersListPage;
