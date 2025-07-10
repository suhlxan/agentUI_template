import { Box } from "@mui/material";
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
      {messages.map((m) => (
        <ChatBubble key={m.id} role={m.role}>
          {m.text}
        </ChatBubble>
      ))}
    </Box>
  );
}
