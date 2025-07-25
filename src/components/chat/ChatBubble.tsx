import { Paper, Typography, Box, useTheme } from "@mui/material";
import * as styles from "./styles";

export interface ChatBubbleProps {
  role: "user" | "assistant";
  children: React.ReactNode;
}

export default function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  const theme = useTheme();

  return (
    <Box sx={styles.chatBubbleWrapper(isUser)}>
      <Paper elevation={0} sx={styles.chatBubblePaper(isUser, theme)}>
        <Typography variant="body1">{children}</Typography>
      </Paper>
    </Box>
  );
}
