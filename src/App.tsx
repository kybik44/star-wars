import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Layout } from "@/layout";
import { ErrorBoundary, GlobalLoader } from "@/shared";

import EntityDetailPage from "@/pages/EntityDetailPage/EntityDetailPage";
import EntityListPage from "@/pages/EntityListPage/EntityListPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

import { Routes as AppRoutes, EntityType } from "@constants/routes";
import { useSmartGlobalLoaderSmooth } from "@hooks/useSmartGlobalLoader";
import "@styles/globals.css";
import { theme } from "@theme/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

const AppContent: React.FC = () => {
  const { isLoading } = useSmartGlobalLoaderSmooth();

  return (
    <>
      <GlobalLoader isLoading={isLoading} />
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={<EntityListPage entityType={EntityType.characters} />}
            />

            <Route
              path={AppRoutes.characters}
              element={<EntityListPage entityType={EntityType.characters} />}
            />
            <Route
              path={`${AppRoutes.characters}/:id`}
              element={<EntityDetailPage entityType={EntityType.characters} />}
            />

            <Route
              path={AppRoutes.films}
              element={<EntityListPage entityType={EntityType.films} />}
            />
            <Route
              path={`${AppRoutes.films}/:id`}
              element={<EntityDetailPage entityType={EntityType.films} />}
            />

            <Route
              path={AppRoutes.planets}
              element={<EntityListPage entityType={EntityType.planets} />}
            />
            <Route
              path={`${AppRoutes.planets}/:id`}
              element={<EntityDetailPage entityType={EntityType.planets} />}
            />

            <Route
              path={AppRoutes.starships}
              element={<EntityListPage entityType={EntityType.starships} />}
            />
            <Route
              path={`${AppRoutes.starships}/:id`}
              element={<EntityDetailPage entityType={EntityType.starships} />}
            />

            <Route path={AppRoutes.species} element={<NotFoundPage />} />
            <Route path={AppRoutes.vehicles} element={<NotFoundPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
