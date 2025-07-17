import { useState } from "react";
import { Box, Stack } from "@mui/material";
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
}

export default function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  const menuItem = sidebarTopItems.find((i) => i.key === "menu")! as SidebarTopItem;
  const searchItem = sidebarTopItems.find((i) => i.key === "search")! as SidebarTopItem;
  const newChatAction = sidebarActions.find((a) => a.key === "newChat")! as SidebarActionItem;

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
      {/* Top row */}
      {collapsed ? (
        <Box width="100%">
          {/* Menu Button */}
          <SidebarItem icon={menuItem.render} onClick={toggle} />

          {/* Search Icon directly underneath */}
          <Box mt={2}>
            <SidebarItem icon={searchItem.render} />
          </Box>
        </Box>
      ) : (
        <Stack
          direction="row"
          alignItems="center"
          spacing={16}
          width="100%"
        >
          <SidebarItem icon={menuItem.render} onClick={toggle} />
          <SidebarItem icon={searchItem.render} />
        </Stack>
      )}

      {/* New Chat Button — icon always shown */}
      <Box mt={collapsed ? 2 : 3} width="100%">
        <SidebarItem
          icon={newChatAction.render}
          label={collapsed ? undefined : newChatAction.label}
          fullWidth
          onClick={onNewChat}
        />
      </Box>

      {/* Chat list — NO icons */}
      <Box mt={collapsed ? 2 : 4} width="100%">
        {chats.map((chat) => (
          <SidebarItem
            key={chat.id}
            label={collapsed ? undefined : chat.title}
            fullWidth
            selected={chat.id === activeChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
