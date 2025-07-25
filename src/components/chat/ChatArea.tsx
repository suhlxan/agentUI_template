import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import Spinner from "../Spinner";
import ChatBubble from "./ChatBubble";
import * as styles from "./styles";

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
    <Box sx={styles.chatAreaContainer}>
      {messages.map((m, i) => {
        const prev = messages[i - 1];
        const isAfterUser = prev?.role === "user";

        if (m.role === "assistant" && m.text === "__typing__") {
          return <Spinner key={m.id} />;
        }

        if (m.role === "user") {
          return (
            <ChatBubble key={m.id} role="user">
              {m.text}
            </ChatBubble>
          );
        }

        return (
          <Box key={m.id} sx={styles.assistantMessageContainer(isAfterUser)}>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {m.text}
            </Typography>
            <Box sx={styles.assistantMessageDivider} />
          </Box>
        );
      })}
      <div ref={scrollRef} />
    </Box>
  );
}
