import { Box, Stack } from "@mui/material";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import {
  sidebarTopItems,
  sidebarActions,
} from "./SidebarConfig";
import type {
  SidebarTopItem,
  SidebarActionItem,
} from "./SidebarConfig";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  // pull your two top‐row items
  const menuItem   = sidebarTopItems .find((i) => i.key === "menu")!   as SidebarTopItem;
  const searchItem = sidebarTopItems .find((i) => i.key === "search")! as SidebarTopItem;

  // pull your single action
  const newChat    = sidebarActions  .find((a) => a.key === "newChat")! as SidebarActionItem;

  return (
    <Box
      width={collapsed ? 40 : 220}
      height="100vh"
      bgcolor="#f5f5f5"
      borderRight="1px solid #ddd"
      display="flex"
      flexDirection="column"
      alignItems={collapsed ? "center" : "flex-start"}
      p={1}
      sx={{ transition: "width 0.3s ease" }}
    >
      {/* Top row: menu toggle + optional search */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <SidebarItem icon={menuItem.render} onClick={toggle} />
        {!collapsed && <SidebarItem icon={searchItem.render} />}
      </Stack>

      {/* Body */}
      {collapsed ? (
        <Stack spacing={2} alignItems="center" mt={1}>
          <SidebarItem icon={searchItem.render} />
          <SidebarItem icon={newChat.render} />
        </Stack>
      ) : (
        <Box mt={3} width="100%">
          <SidebarItem icon={newChat.render} label={newChat.label} fullWidth />
        </Box>
      )}
    </Box>
  );
}
