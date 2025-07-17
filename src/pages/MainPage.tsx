import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/Header";
import type { ModelDescriptor } from "../components/Header";
import InputBar from "../components/InputBar";
import ChatArea from "../components/ChatArea"; 
import type { Message } from "../components/ChatArea"; 

import GreetingMessage from "../components/Greetings";

export default function MainPage() {
  const [model, setModel] = useState("xx-mini-high");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]); 

  const models: ModelDescriptor[] = [
    { value: "test1", label: "test1", description: "Insert your model/agent purpose." },
    { value: "test2", label: "test2", description: "Insert your model/agent purpose." },
    { value: "test3", label: "test3", description: "Insert your model/agent purpose." },
    { value: "test4", label: "test4", description: "Insert your model/agent purpose." },
  ];

  const selectedModel = models.find((m) => m.value === model);

  const handleUserSubmit = (msg: string) => {
    console.log("Send", msg, "using", model);
    setHasSubmitted(true);
    const newMessage: Message = {
      id: uuidv4(),
      role: "user",
      text: msg,
    };
    setMessages((prev) => [...prev, newMessage]);

    // Optional: fake assistant response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          text: `You said: ${msg}`,
        },
      ]);
    }, 500);
  };

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Sidebar />

      <Box flex={1} display="flex" flexDirection="column">
        <Header
          title={selectedModel?.label || "Model"}
          model={model}
          models={models}
          onModelChange={setModel}
          avatarSrc="/path/to/avatar.png"
          onAvatarClick={() => {}}
        />

        <Box flex={1} display="flex" flexDirection="column" overflow="hidden" px={2} pt={4}>
          {!hasSubmitted && (
            <Box
              flex={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <GreetingMessage userName="Balaji" />
              <InputBar onSubmit={handleUserSubmit} />
            </Box>
          )}

          {hasSubmitted && (
            <Box display="flex" flexDirection="column" flex={1} height="100%" overflow="hidden">
              {/* Scrollable chat area */}
              <Box
                flex={1}
                overflow="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
                px={2}
                pt={2}
                className="hide-scrollbar"
              >
                <Box width="100%" maxWidth={700}>
                  <ChatArea messages={messages} />
                </Box>
              </Box>

              {/* Locked input bar */}
              <Box
                width="100%"
                display="flex"
                justifyContent="center"
                py={2}
                px={2}
                sx={{
                  borderTop: "1px solid rgba(0,0,0,0.05)",
                  backgroundColor: "background.paper",
                }}
              >
                <Box width="100%" maxWidth={700}>
                  <InputBar onSubmit={handleUserSubmit} />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
