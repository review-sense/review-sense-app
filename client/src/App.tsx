// import { Box } from "@mui/material";
import React from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const defaultQueryClientOptions: DefaultOptions = {
    queries: { staleTime: 600000 },
  };
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage />
    </QueryClientProvider>
  );
};
export default App;
