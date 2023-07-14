// import { Box } from "@mui/material";
import React from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const defaultQueryClientOptions: DefaultOptions = {
    queries: { staleTime: 600000 },
  };
  const queryClient = new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
};
export default App;
