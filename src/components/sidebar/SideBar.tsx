import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ChatSidebarItem from "./ChatSidebarItem";
import SidebarItem from "./SidebarItem";
import {
  sidebarTopItems,
  sidebarActions,
} from "./SidebarConfig";
import type {
  SidebarTopItem,
  SidebarActionItem,
} from "./SidebarConfig";
import type { ChatSession } from "../../types/chat";

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

  const menuItem = sidebarTopItems.find((i) => i.key === "menu")! as SidebarTopItem;
  const searchItem = sidebarTopItems.find((i) => i.key === "search")! as SidebarTopItem;
  const newChatAction = sidebarActions.find((a) => a.key === "newChat")! as SidebarActionItem;

  const handleShareChat = (chat: ChatSession) => {
    console.log("Share chat:", chat);
  };

  const handleArchiveChat = (chat: ChatSession) => {
    console.log("Archived chat:", chat);
  };

  return (
    <Box
      width={collapsed ? 60 : 220}
      height="100vh"
      bgcolor="#f5f5f5"
      borderRight="1px solid #ddd"
      display="flex"
      flexDirection="column"
      alignItems={collapsed ? "center" : "flex-start"}
      p={1}
      sx={{ transition: "width 0.3s ease" }}
    >
      {collapsed ? (
        <Box width="100%">
          <SidebarItem icon={menuItem.render} onClick={toggle} />
        </Box>
      ) : (
        <Stack direction="row" alignItems="center" spacing={15} width="100%">
          <SidebarItem icon={menuItem.render} onClick={toggle} />
        </Stack>
      )}

      <Box mt={collapsed ? 2 : 3} width="100%">
        <SidebarItem
          icon={newChatAction.render}
          label={collapsed ? undefined : newChatAction.label}
          fullWidth
          onClick={onNewChat}
        />
      </Box>

      <Box width="100%">
        <SidebarItem
          icon={searchItem.render}
          label={collapsed ? undefined : "Search chats"}
          fullWidth
          onClick={() => {/* search action */}}
        />
      </Box>

      <Box width="100%" mt={collapsed ? 3 : 4} mb={1} px={collapsed ? 0 : 1}>
        {!collapsed && (
          <Typography
            variant="caption"
            sx={{
              color: "#888",
              fontWeight: 500,
              textTransform: "uppercase",
              fontSize: "0.65rem",
            }}
          >
            Chats
          </Typography>
        )}
      </Box>

      <Box
        width="100%"
        mt={0.5}
        sx={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}
      >
        {chats.map((chat) =>
          collapsed ? null : (
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
          )
        )}
      </Box>
    </Box>
  );
}