import { sendToAgent } from '../api/api';
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
        title: "Untitled Chat",
        messages: [],
      };
      setChats([defaultChat]);
      setActiveChatId(defaultChat.id);
    }
  }, []);

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

//   const sendMessage = async (text: string) => {
//   if (!activeChatId) return;

//   const userMsg: Message = {
//     id: uuidv4(),
//     role: "user",
//     text,
//   };

//   const typingMsg: Message = {
//     id: uuidv4(),
//     role: "assistant",
//     text: "__typing__",
//   };

//   // Add user message and typing indicator
//   setChats((prevChats) =>
//     prevChats.map((chat) => {
//       if (chat.id !== activeChatId) return chat;

//       const isFirstMessage = chat.messages.length === 0;
//       const firstSentence = isFirstMessage
//         ? text.split(/[.?!]/)[0].trim()
//         : chat.title;

//       return {
//         ...chat,
//         title: isFirstMessage ? firstSentence || "New Chat" : chat.title,
//         messages: [...chat.messages, userMsg, typingMsg],
//       };
//     })
//   );

//   try {
//     const response = await sendToAgent(text);
//     const assistantMsg: Message = {
//       id: uuidv4(),
//       role: "assistant",
//       text: response.reply, // assuming backend returns { reply: "..." }
//     };

//     // Replace typing with actual agent response
//     setChats((prevChats) =>
//       prevChats.map((chat) => {
//         if (chat.id !== activeChatId) return chat;

//         const updatedMessages = chat.messages.map((m) =>
//           m.text === "__typing__" ? assistantMsg : m
//         );

//         return {
//           ...chat,
//           messages: updatedMessages,
//         };
//       })
//     );
//   } catch (err) {
//     console.error("Failed to fetch agent response", err);
//     // Optionally replace typing with an error message
//     setChats((prevChats) =>
//       prevChats.map((chat) => {
//         if (chat.id !== activeChatId) return chat;

//         const updatedMessages = chat.messages.map((m) =>
//           m.text === "__typing__"
//             ? { ...m, text: "Agent failed to respond." }
//             : m
//         );

//         return {
//           ...chat,
//           messages: updatedMessages,
//         };
//       })
//     );
//   }
// };

  // 4. Rename chat
  
  const renameChat = (updatedChat: ChatSession) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === updatedChat.id ? { ...chat, title: updatedChat.title } : chat
      )
    );
  };

  const deleteChat = (chatToDelete: ChatSession) => {
    setChats((prev) => prev.filter((c) => c.id !== chatToDelete.id));
    if (chatToDelete.id === activeChatId) {
      setActiveChatId((prev) => {
        const remaining = chats.filter((c) => c.id !== chatToDelete.id);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }
  };

  const currentChat = chats.find((chat) => chat.id === activeChatId) || null;

  return {
    chats,
    activeChatId,
    currentChat,
    newChat,
    sendMessage,
    setActiveChatId,
    renameChat,
    deleteChat
  };
}
