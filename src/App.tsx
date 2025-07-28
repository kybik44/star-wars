import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Layout from "@components/layout/Layout/Layout";
import CharacterDetailPage from "@pages/CharacterDetailPage/CharacterDetailPage";
import CharactersListPage from "@pages/CharactersListPage/CharactersListPage";
import theme from "@theme/index";
import "@styles/globals.css";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<CharactersListPage />} />
              <Route path="/character/:id" element={<CharacterDetailPage />} />
            </Routes>
          </Layout>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
