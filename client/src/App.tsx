// import { Box } from "@mui/material";
import React from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/MainPage";

const App = () => {
  const defaultQueryClientOptions: DefaultOptions = {
    queries: { staleTime: 600000 },
  };
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
    </QueryClientProvider>
  );
};
export default App;
