// src/hooks/useChatManager.ts
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChatSession, Message } from "../types/chat";

export function useChatManager() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Create a new chat session
  const newChat = () => {
    const chat: ChatSession = {
      id: uuidv4(),
      title: "New chat",
      messages: [],
    };
    setChats((prev) => [chat, ...prev]);
    setActiveChatId(chat.id);
    return chat.id;
  };

  // Send a message within the active chat
  const sendMessage = (text: string) => {
    if (!activeChatId) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: "user",
      text,
    };

    const assistantMsg: Message = {
      id: uuidv4(),
      role: "assistant",
      text: `You said: ${text}`, // can be replaced with API call result
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMsg, assistantMsg],
            }
          : chat
      )
    );
  };

  // Get the current chat session
  const currentChat = chats.find((chat) => chat.id === activeChatId) || null;

  return {
    chats,
    activeChatId,
    currentChat,
    newChat,
    sendMessage,
    setActiveChatId,
  };
}
