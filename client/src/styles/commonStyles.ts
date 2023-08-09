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

export const filledButtonStyle: CSSObject = {
  backgroundColor: "#488afa",
  "&:hover": {
    backgroundColor: "#488afa",
  },
  mt: "15px",
};

export const textFieldStyle: CSSObject = {
  backgroundColor: "white",
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderWidth: 3,
    borderColor: "#488afa",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#488afa",
  },
  "& .MuiInputLabel-root.Mui-focused ": { color: "#488afa" },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#488afa",
  },
};
