// import { Box } from "@mui/material";
import React from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/MainPage";
import { EngageSenseProviders } from "./lib/EngageSenseProviders";

const App = () => {
  return (
    <EngageSenseProviders additionalContext={[]}>
      <MainPage />
    </EngageSenseProviders>
  );
};
export default App;
