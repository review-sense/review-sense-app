interface ViewportDimensions {
  width: number;
  height: number;
}

enum ScreenWidthaBreakpoints {
  SMALL = 768,
  MEDIUM = 1024,
  LARGE = 1280,
}

const viewport = (): ViewportDimensions => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight),
});

export interface ViewportProps {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

const ViewportInitialPropsValue: ViewportProps = {
  isSmall: false,
  isMedium: false,
  isLarge: false,
};
