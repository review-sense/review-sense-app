import React, { useEffect, useState } from "react";
import { DefaultOptions, QueryClient, QueryClientProvider } from "react-query";
import { ProviderType } from "./enums";
import { ViewportProvider } from "./Viewport";

const defaultQueryClientOptions: DefaultOptions = {
  queries: { staleTime: 500000 },
};

interface ContextProps {
  provider: React.ElementType;
  props?: any;
  type: ProviderType;
}

interface ProviderProps {
  additionalContext: ContextProps[];
  children: React.ReactNode;
}

export const EngageSenseProviders = ({
  additionalContext,
  children,
}: ProviderProps) => {
  const [contextProviders, setContextProviders] = useState([]);

  useEffect(() => {
    const initialContext: ContextProps[] = [
      { provider: ViewportProvider, type: ProviderType.ViewportProvider },
      {
        provider: QueryClientProvider,
        type: ProviderType.QueryClientProvider,
        props: {
          client: new QueryClient({
            defaultOptions: defaultQueryClientOptions,
          }),
        },
      },
    ];

    setContextProviders([...initialContext, ...additionalContext]);
  }, []);

  return (
    <React.Fragment>
      {contextProviders.length > 0 &&
        contextProviders.reduceRight(
          (access, { provider: Provider, props }) => (
            <Provider {...props}> {access}</Provider>
          ),
          children
        )}
    </React.Fragment>
  );
};
