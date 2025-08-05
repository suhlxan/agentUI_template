// src/hooks/useSidebarSearch.ts
import { useState, useMemo } from "react";
import type { ChatSession } from "../types/chat";
import { filterChats } from "../utils/filterChats";

export function useSidebarSearch(chats: ChatSession[]) {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => active ? filterChats(chats, query) : chats,
    [active, query, chats]
  );

  const start   = () => setActive(true);
  const cancel  = () => { setActive(false); setQuery(""); };

  return { active, query, setQuery, start, cancel, filtered };
}
