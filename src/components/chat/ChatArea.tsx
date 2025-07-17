import Spinner from "../Spinner"; 
import { Box, Typography } from "@mui/material";
import ChatBubble from "./ChatBubble";
import { useEffect, useRef } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ChatAreaProps {
  messages: Message[];
}

export default function ChatArea({ messages }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      py={1}
      sx={{
        overflowY: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const isAfterUser = prev?.role === "user";

        // Typing indicator
        if (m.role === "assistant" && m.text === "__typing__") {
          return <Spinner key={m.id} />;
        }

        // User bubble
        if (m.role === "user") {
          return (
            <ChatBubble key={m.id} role="user">
              {m.text}
            </ChatBubble>
          );
        }

        // Assistant message (not typing)
        return (
          <Box key={m.id} px={2} py={0.5} mt={isAfterUser ? 3 : 0.5}>
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
        );
      })}

      {/* Auto-scroll anchor */}
      <div ref={scrollRef} />
    </Box>
  );
}
