import type { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const iconStyle = { fontSize: 24, color: "#444" };

export interface SidebarTopItem {
  key: "menu" | "search";
  render: ReactNode;
}

export interface SidebarActionItem {
  key: "newChat";
  label: string;
  render: ReactNode;
}

export const sidebarTopItems: SidebarTopItem[] = [
  {
    key: "menu",
    render: <MenuIcon sx={iconStyle} />,
  },
  {
    key: "search",
    render: <SearchIcon sx={iconStyle} />,
  },
];

export const sidebarActions: SidebarActionItem[] = [
  {
    key: "newChat",
    label: "New chat",
    render: (
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 22, color: "#444", verticalAlign: "middle" }}
      >
        edit_square
      </span>
    ),
  },
];
