// src/components/ChatBubble.tsx
import { Paper, Typography, Box } from "@mui/material";

export interface ChatBubbleProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

export default function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      px={2}
    >
      <Paper
        elevation={0}
        sx={{
          p: 1.5,
          bgcolor: isUser ? "primary.main" : "grey.100",
          color: isUser ? "primary.contrastText" : "text.primary",
          borderRadius: 2,
          borderTopRightRadius: isUser ? 0 : 8,
          borderTopLeftRadius: isUser ? 8 : 0,
          maxWidth: "70%",
        }}
      >
        <Typography variant="body2">{children}</Typography>
      </Paper>
    </Box>
  );
}
