import type { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import edit_square from "../../assets/edit_square.svg"; 

const iconStyle = { fontSize: 24, color: "#616161" }; //text.secondary in MUI's default light theme

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
      <img
        src={edit_square}
        alt="New chat"
        style={{
          width: 22,
          height: 22,
          objectFit: "contain",
          verticalAlign: "middle",
        }}
      />
    ),
  },
];
