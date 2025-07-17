import { useState } from "react";
import { Box } from "@mui/material";
import { useChatManager } from "../hooks/useChatManager";

import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/navbar/Header";
import type { ModelDescriptor } from "../components/navbar/Header";
import InputBar from "../components/InputBar";
import ChatArea from "../components/chat/ChatArea";
import GreetingMessage from "../components/Greetings";

export default function MainPage() {
  const {
    chats,
    activeChatId,
    currentChat,
    newChat,
    sendMessage,
    setActiveChatId,
  } = useChatManager();

  const hasSubmitted = !!currentChat && currentChat.messages.length > 0;

  const models: ModelDescriptor[] = [
    { value: "test1", label: "test1", description: "Insert your model/agent purpose." },
    { value: "test2", label: "test2", description: "Insert your model/agent purpose." },
    { value: "test3", label: "test3", description: "Insert your model/agent purpose." },
    { value: "test4", label: "test4", description: "Insert your model/agent purpose." },
  ];

 const [selectedModel, setSelectedModel] = useState<string | null>(null);
 
 const chatTitle = selectedModel
  ? models.find((m) => m.value === selectedModel)?.label ?? "Model Name"
  : "Model Name";

  const handleUserSubmit = (msg: string) => {
    sendMessage(msg);
  };

  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={newChat}
      />

      <Box flex={1} display="flex" flexDirection="column">
       <Header
          chatTitle={chatTitle}
          model={selectedModel ?? ""}
          models={models}
          onModelChange={setSelectedModel}
          avatarSrc="/path/to/avatar.png"
          onAvatarClick={() => {}}
        />
        <Box flex={1} display="flex" flexDirection="column" overflow="hidden" px={2} pt={4}>
          {!hasSubmitted ? (
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
          ) : (
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
                  <ChatArea messages={currentChat?.messages ?? []} />
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
