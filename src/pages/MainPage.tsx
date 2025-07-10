import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/Header";
import type { ModelDescriptor } from "../components/Header";
import InputBar from "../components/InputBar";
import ChatArea from "../components/ChatArea"; 
import type { Message } from "../components/ChatArea"; 

export default function MainPage() {
  const [model, setModel] = useState("xx-mini-high");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]); // ⬅️ Messages state

  const models: ModelDescriptor[] = [
    { value: "DEMO-xx", label: "DEMO-xx", description: "Insert your model/agent purpose." },
    { value: "xx", label: "xx", description: "Insert your model/agent purpose." },
    { value: "xx-mini", label: "xx-mini", description: "Insert your model/agent purpose." },
    { value: "xx-mini-high", label: "xx-mini-high", description: "Insert your model/agent purpose." },
  ];

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
      title="Your Agent Name"
      model={model}
      models={models}
      onModelChange={setModel}
      avatarSrc="/path/to/avatar.png"
      onAvatarClick={() => {}}
    />

    <Box
      flex={1}
      display="flex"
      flexDirection="column"
      position="relative"
      px={2}
      pt={4}
    >
      {!hasSubmitted && (
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" mb={4}>
            What are you working on?
          </Typography>
          <InputBar onSubmit={handleUserSubmit} />
        </Box>
      )}

      {hasSubmitted && (
        <>
          {/* SCROLLABLE MESSAGE AREA */}
          <Box
            flex={1}
            overflow="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            pb={10} // Enough padding so chat never hides under input
          >
            <Box width="100%" maxWidth={700}>
              <ChatArea messages={messages} />
            </Box>
          </Box>

          {/* FIXED INPUT BAR */}
          <Box
            position="absolute"
            bottom={40}
            width="100%"
            display="flex"
            justifyContent="center"
          >
            <InputBar onSubmit={handleUserSubmit} />
          </Box>
        </>
      )}
    </Box>
  </Box>
</Box>
  );
}
