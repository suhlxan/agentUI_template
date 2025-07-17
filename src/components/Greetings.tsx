import { Typography } from "@mui/material";
import { useMemo } from "react";

interface GreetingMessageProps {
  userName?: string;
}

export default function GreetingMessage({ userName = "friend" }: GreetingMessageProps) {
  const greetings = useMemo(() => [
    "Where should we begin?",
    "Ready when you are.",
    "What's on the agenda today?",
    "What's on your mind today?",
    `How can I help, ${userName}?`,
  ], [userName]);

  const message = useMemo(() => {
    const index = Math.floor(Math.random() * greetings.length);
    return greetings[index];
  }, [greetings]);

  return (
    <Typography
      variant="h4"
      mb={4}
      sx={{
        background: 'linear-gradient(270deg, #4adede, #3cb0d8, #4adede)',
        backgroundSize: '400% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'gradientFlash 4s ease infinite',
        fontWeight: 600,
        textAlign: 'center',
      }}
    >
      {message}
    </Typography>
  );
}
