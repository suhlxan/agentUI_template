// src/utils/filterChats.ts
import type { ChatSession } from "../types/chat";

export function filterChats(chats: ChatSession[], query: string): ChatSession[] {
  if (!query) return chats;
  const lower = query.toLowerCase();
  return chats.filter(chat =>
    (chat.title ?? "").toLowerCase().includes(lower)
    ||
    chat.messages?.some(msg =>
      msg.text.toLowerCase().includes(lower)
    )
  );
}
