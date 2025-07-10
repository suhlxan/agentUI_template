import { Paper, Typography, Box, useTheme } from "@mui/material";

export interface ChatBubbleProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

export default function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      px={2}
      py={0.5}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[100],
          color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
          borderRadius: 3,
          borderTopRightRadius: isUser ? 4 : 12,
          borderTopLeftRadius: isUser ? 12 : 4,
          maxWidth: "80%",
          whiteSpace: "pre-wrap",
        }}
      >
        <Typography variant="body1">
          {children}
        </Typography>
      </Paper>
    </Box>
  );
}
