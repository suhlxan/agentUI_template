import type { SxProps, Theme } from "@mui/material";

// ChatArea Styles

export const chatAreaContainer: SxProps<Theme> = (theme) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  overflowY: "auto",
  scrollbarWidth: "none", // Firefox
  "&::-webkit-scrollbar": {
    display: "none", // Chrome/Safari
  },
});

export const assistantMessageContainer = (
  isAfterUser: boolean
): SxProps<Theme> => (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  marginTop: theme.spacing(isAfterUser ? 3 : 0.5),
});

export const assistantMessageDivider: SxProps<Theme> = (theme) => ({
  height: "1px",
  backgroundColor: theme.palette.divider,
  opacity: 0.03,
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
});

// ChatBubble Styles

export const chatBubbleWrapper = (isUser: boolean): SxProps<Theme> => (
  theme
) => ({
  display: "flex",
  justifyContent: isUser ? "flex-end" : "flex-start",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
});

export const chatBubblePaper = (isUser: boolean, theme: Theme): SxProps<Theme> => ({
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  backgroundColor: isUser ? theme.palette.grey[50] : theme.palette.grey[100],
  color: theme.palette.text.primary,
  borderRadius: theme.spacing(3),
  maxWidth: "80%",
  whiteSpace: "pre-wrap",
});

