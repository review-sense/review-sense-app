import { CSSObject } from "@emotion/react";

export const textButtonStyle: CSSObject = {
  color: "white",
  height: "50px",
};

export const outlinedButtonStyle: CSSObject = {
  border: "2px solid white",
  borderRadius: "3px",
  color: "white",
  height: "50px",
  "&:hover": {
    border: "2px solid white",
    borderRadius: "3px",
  },
};
