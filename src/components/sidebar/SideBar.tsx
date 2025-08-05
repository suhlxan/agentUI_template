// src/components/sidebar/Sidebar.tsx
import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ChatSidebarItem from "./ChatSidebarItem";
import SidebarItem from "./SidebarItem";
import { sidebarTopItems, sidebarActions } from "./SidebarConfig";
import type { SidebarTopItem, SidebarActionItem } from "./SidebarConfig";
import type { ChatSession } from "../../types/chat";

// Modular search imports
import { useSidebarSearch } from "../../hooks/useSidebarSearch";
import { SidebarSearch } from "./SidebarSearch";

import {
  sidebarContainer,
  sidebarToggleWrapper,
  sidebarHeaderStack,
  sidebarFullWidthWrapper,
  sectionHeaderWrapper,
  sectionCaption,
  chatListWrapper,
} from "./styles";

interface SidebarProps {
  chats: ChatSession[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  onRenameChat: (chat: ChatSession) => void;
  onDeleteChat: (chat: ChatSession) => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onRenameChat,
  onDeleteChat,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  // Pull menu & new-chat items from config
  const menuItem = sidebarTopItems.find((i) => i.key === "menu")! as SidebarTopItem;
  const newChatAction = sidebarActions.find((a) => a.key === "newChat")! as SidebarActionItem;

  // Set up inline search (state + filter logic)
  const {
    active: searchActive,
    query: searchQuery,
    setQuery: setSearchQuery,
    start: activateSearch,
    cancel: cancelSearch,
    filtered: filteredChats,
  } = useSidebarSearch(chats);

  // Optional handlers for share/archive
  const handleShareChat = (chat: ChatSession) => console.log("Share chat:", chat);
  const handleArchiveChat = (chat: ChatSession) => console.log("Archived chat:", chat);

  return (
    <Box
      sx={{
        ...sidebarContainer,
        width: collapsed ? 60 : 260,
        alignItems: collapsed ? "center" : "flex-start",
      }}
    >
      {/* top toggle */}
      {collapsed ? (
        <Box sx={sidebarToggleWrapper}>
          <SidebarItem icon={menuItem.render} onClick={toggle} />
        </Box>
      ) : (
        <Stack sx={sidebarHeaderStack} spacing={1}>
          <SidebarItem icon={menuItem.render} onClick={toggle} />
        </Stack>
      )}

      {/* new chat */}
      <Box sx={{ ...sidebarFullWidthWrapper, mt: collapsed ? 2 : 3 }}>
        <SidebarItem
          icon={newChatAction.render}
          label={collapsed ? undefined : newChatAction.label}
          fullWidth
          onClick={onNewChat}
        />
      </Box>

      {/* inline search */}
      <SidebarSearch
        active={searchActive}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onActivate={activateSearch}
        onCancel={cancelSearch}
        collapsed={collapsed}
      />

      {/* section header */}
      <Box
        sx={{
          ...sectionHeaderWrapper,
          mt: collapsed ? 3 : 4,
          px: collapsed ? 0 : 1.5,
        }}
      >
        {!collapsed && (
          <Typography variant="caption" sx={sectionCaption}>
            Chats
          </Typography>
        )}
      </Box>

      {/* chat list (filtered when searching) */}
      <Box sx={{ ...chatListWrapper, mt: 0.5 }}>
        {!collapsed &&
          filteredChats.map((chat) => (
            <ChatSidebarItem
              key={chat.id}
              chat={chat}
              selected={chat.id === activeChatId}
              onClick={() => onSelectChat(chat.id)}
              onShare={handleShareChat}
              onRename={onRenameChat}
              onArchive={handleArchiveChat}
              onDelete={onDeleteChat}
            />
          ))}
      </Box>
    </Box>
  );
}
