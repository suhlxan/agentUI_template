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
          px: 3, 
          backgroundColor: isUser ? "#f8f9fa" : theme.palette.grey[100],
          color: "#000",
          borderRadius: "24px", 
          maxWidth: "80%",
          whiteSpace: "pre-wrap",
        }}
      >
        <Typography variant="body1">{children}</Typography>
      </Paper>
    </Box>
  );
}
