import { Alert, Box, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ErrorBoundary } from "@/shared";
import { EntityGrid, LoadingSkeleton, Pagination } from "@/features/entity";
import { Search } from "@/features/search";
import { useEntities } from "@hooks/useEntities";
import { useDebounce } from "@hooks/useDebounce";
import { extractEntityId, buildEntityDetailUrl } from "@/shared";
import { getEntityConfig } from "@constants/entityConfigs";
import type { EntityType, Entity } from "@/types";
import styles from "./EntityListPage.module.css";

interface EntityListPageProps {
  entityType: EntityType;
}

const EntityListPage: React.FC<EntityListPageProps> = ({ entityType }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const config = getEntityConfig(entityType);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchParams = useMemo(
    () => ({
      search: debouncedSearchTerm || undefined,
      page: debouncedSearchTerm !== searchTerm ? 1 : currentPage,
    }),
    [debouncedSearchTerm, searchTerm, currentPage]
  );

  const { entities, paginationInfo, isLoading, error, isError, refetch } =
    useEntities<Entity>(entityType, searchParams);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handlePageChange = useCallback(
    (_event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
      const element = document.getElementById("search");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [entityType]
  );

  const handleEntityClick = useCallback(
    (entityUrl: string) => {
      const id = extractEntityId(entityUrl);
      if (id) {
        const url = buildEntityDetailUrl(entityType, id);
        navigate(url);
      }
    },
    [entityType, navigate]
  );

  return (
    <ErrorBoundary>
      {/* Search Section */}
      {config.searchable && (
        <Search
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          placeholder={`Search ${config.pluralName.toLowerCase()}...`}
        />
      )}

      {/* Content Section */}
      <Box className={styles.contentSection} id={entityType}>
        {/* Error State */}
        {isError && (
          <Alert
            severity="error"
            action={<button onClick={() => refetch()}>Retry</button>}
            sx={{ mb: 3 }}
          >
            {error?.message ||
              `Failed to load ${config.pluralName.toLowerCase()}. Please try again.`}
          </Alert>
        )}

        {/* Results Summary */}
        {paginationInfo && !isLoading && (
          <Box className={styles.resultsSummary}>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? (
                <>
                  Showing {entities.length} result
                  {entities.length !== 1 ? "s" : ""} for "{searchTerm}"
                </>
              ) : (
                <>
                  Showing {entities.length} of {paginationInfo.totalCount}{" "}
                  {config.pluralName.toLowerCase()}
                </>
              )}
            </Typography>
          </Box>
        )}

        {/* Entities Grid or Loading */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : entities.length > 0 ? (
          <EntityGrid
            entities={entities}
            entityType={entityType}
            onEntityClick={handleEntityClick}
          />
        ) : !isError ? (
          <Box className={styles.noResults}>
            <Typography variant="h4" color="text.secondary" gutterBottom>
              No {config.pluralName.toLowerCase()} found
            </Typography>
            {searchTerm && (
              <Typography variant="body1" color="text.secondary">
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
    </ErrorBoundary>
  );
};

export default EntityListPage;
