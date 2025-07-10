// src/pages/MainPage.tsx
import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Sidebar from "../components/sidebar/SideBar";
import Header from "../components/Header";
import type {ModelDescriptor} from "../components/Header";
import InputBar from "../components/InputBar";

export default function MainPage() {
  const [model, setModel] = useState("xx-mini-high");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const models: ModelDescriptor[] = [
    { value: "DEMO-xx", label: "DEMO-xx", description: "Insert your model/agent purpose." },
    { value: "xx", label: "xx", description: "Insert your model/agent purpose." },
    { value: "xx-mini", label: "xx-mini", description: "Insert your model/agent purpose." },
    {
      value: "xx-mini-high",
      label: "xx-mini-high",
      description: "Insert your model/agent purpose.",
    },
  ];

  const handleUserSubmit = (msg: string) => {
    console.log("Send", msg, "using", model);
    setHasSubmitted(true); // ← Update state on submit
    // → plug into your LLM/API here
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
          onAvatarClick={() => {
            /* show account menu */
          }}
        />

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px={2}
          pt={4}
        >
          {!hasSubmitted && ( // ← Conditionally render
            <Typography variant="h5" mb={4}>
              What are you working on?
            </Typography>
          )}
          {hasSubmitted ? (
            <Box position="absolute" bottom={40} width="100%" display="flex" justifyContent="center">
              <InputBar onSubmit={handleUserSubmit} />
            </Box>
          ) : ( 
          <InputBar onSubmit={handleUserSubmit} />
          )}
        </Box>
      </Box>
    </Box>
  );
}
