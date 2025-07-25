// Chat/styles.ts
import type { SxProps, Theme } from "@mui/material";

// ChatArea Styles 

export const chatAreaContainer: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  py: 1,
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome/Safari
  },
};

export const assistantMessageContainer = (isAfterUser: boolean): SxProps<Theme> => ({
  px: 2,
  py: 0.5,
  mt: isAfterUser ? 3 : 0.5,
});

export const assistantMessageDivider: SxProps<Theme> = {
  height: "1px",
  backgroundColor: "#000",
  opacity: 0.03,
  my: 1.5,
};

// ChatBubble Styles 

export const chatBubbleWrapper = (isUser: boolean): SxProps<Theme> => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
  px: 2,
  py: 0.5,
});

export const chatBubblePaper = (isUser: boolean, theme: Theme): SxProps<Theme> => ({
  p: 2,
  px: 3,
  backgroundColor: isUser ? "#f8f9fa" : theme.palette.grey[100],
  color: "#000",
  borderRadius: "24px",
  maxWidth: "80%",
  whiteSpace: "pre-wrap",
});
