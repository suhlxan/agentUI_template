// styles.ts
import type { SxProps, Theme } from "@mui/material";

// Main header container
export const headerContainer: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  height: 64,
  px: 2,
  borderColor: "divider",
  bgcolor: "background.paper",
};

// Model switcher button
export const modelButton: SxProps<Theme> = {
  textTransform: "none",
  borderRadius: 1,
  minHeight: "auto",
  px: 2,
  py: 0.5,
  gap: 1,
  fontSize: "1rem",
  color: "text.primary",
  bgcolor: "transparent",
  "&:hover": {
    bgcolor: "action.hover",
  },
};

// Menu paper
export const modelMenu: SxProps<Theme> = {
  "& .MuiPaper-root": {
    borderRadius: 2,
  },
};

// Typography inside menu
export const menuHeader: SxProps<Theme> = {
  px: 2,
  pt: 1,
  pb: 0.5,
  color: "text.secondary",
};

// Avatar icon
export const avatarIcon: SxProps<Theme> = {
  p: 0.5,
};

export const avatarImage: SxProps<Theme> = {
  width: 32,
  height: 32,
};
