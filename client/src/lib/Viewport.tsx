import { Dispatch, createContext } from "react";

interface ViewportDimensions {
  height: number;
  width: number;
}

enum ViewportBreackpoints {
  Small = 770,
  Medium = 1024,
}

const viewport = (): ViewportDimensions => ({
  height: Math.max(document.documentElement.clientHeight, window.innerHeight),
  width: Math.max(document.documentElement.clientWidth, window.innerWidth),
});

export interface ViewportProps {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

const initialViewportProps: ViewportProps = {
  isSmall: false,
  isMedium: false,
  isLarge: false,
};

interface ViewportContextInterface extends ViewportProps {
  viewportDispatcher?: Dispatch<any>;
}

export const ViewportContext = createContext<ViewportContextInterface>({
  ...initialViewportProps,
  viewportDispatcher: () => null,
});

const calculateViewportSize = (currentState): ViewportProps => {
  const { width }: ViewportDimensions = viewport();
  return {
    ...currentState,
    isSmall: width < ViewportBreackpoints.Small,
    isMedium:
      width >= ViewportBreackpoints.Small &&
      width < ViewportBreackpoints.Medium,
    isLarge: width >= ViewportBreackpoints.Medium,
  };
};
