import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import _, { debounce } from "lodash";
import { ViewportContextType } from "./enums";

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

const viewportReducer = (
  state: ViewportProps,
  action: { type: ViewportContextType; data?: ViewportProps }
) => {
  switch (action.type) {
    case ViewportContextType.UpdateState:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const ViewportProvider = ({ children }) => {
  const [state, viewportDispatcher] = useReducer(
    viewportReducer,
    initialViewportProps
  );
  useEffect(() => {
    const myViewport = calculateViewportSize(state);
    if (!_.isEqual(myViewport, state)) {
      viewportDispatcher({
        type: ViewportContextType.UpdateState,
        data: myViewport,
      });
    }
  }, []);
  useEffect(() => {
    const handleViewportChange = debounce((): void => {
      const myViewport = calculateViewportSize(state);
      if (!_.isEqual(myViewport, state)) {
        viewportDispatcher({
          type: ViewportContextType.UpdateState,
          data: myViewport,
        });
      }
    }, 100);

    //on app mount set app Viewport size change handler
    window.addEventListener("resize", handleViewportChange);

    return () => {
      //remove handler on unpunt
      window.removeEventListener("resize", handleViewportChange);
    };
  });

  return (
    <ViewportContext.Provider value={{ ...state, viewportDispatcher }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewport = (): ViewportContextInterface => {
  return useContext<ViewportContextInterface>(ViewportContext);
};
export default ViewportContext;
