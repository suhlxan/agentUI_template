import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ChatSession, Message } from "../types/chat";

export function useChatManager() {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // 1. Initialize a default chat on first mount
  useEffect(() => {
    if (chats.length === 0) {
      const defaultChat: ChatSession = {
        id: uuidv4(),
        title: "New Chat",
        messages: [],
      };
      setChats([defaultChat]);
      setActiveChatId(defaultChat.id);
    }
  }, [chats]);

  // 2. New chat
  const newChat = () => {
    const chat: ChatSession = {
      id: uuidv4(),
      title: "New Chat",
      messages: [],
    };
    setChats((prev) => [chat, ...prev]);
    setActiveChatId(chat.id);
    return chat.id;
  };

  // 3. Handle message sending and title updating
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
      text: "__typing__",
    };

    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id !== activeChatId) return chat;

        const isFirstMessage = chat.messages.length === 0;
        const firstSentence = isFirstMessage
          ? text.split(/[.?!]/)[0].trim()
          : chat.title;

        return {
          ...chat,
          title: isFirstMessage ? firstSentence || "New Chat" : chat.title,
          messages: [...chat.messages, userMsg, assistantMsg],
        };
      })
    );

    // Simulate delayed assistant response
    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: chat.messages.map((m) =>
                  m.text === "__typing__"
                    ? { ...m, text: `You said: ${text}` }
                    : m
                ),
              }
            : chat
        )
      );
    }, 1000);
  };

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
