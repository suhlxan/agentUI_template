import { Box, Typography } from "@mui/material";
import ChatBubble from "./ChatBubble";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  return (
    <Box
      flex={1}
      overflow="auto"
      display="flex"
      flexDirection="column"
      py={1}
    >
      {messages.map((m) =>
        m.role === "user" ? (
          <ChatBubble key={m.id} role="user">
            {m.text}
          </ChatBubble>
        ) : (
          <Box key={m.id} px={2} py={0.5}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {m.text}
            </Typography>
            <Box
              sx={{
                height: "1px",
                backgroundColor: "#000",
                opacity: 0.03,
                my: 1.5,
              }}
            />
          </Box>
        )
      )}
    </Box>
  );
}
