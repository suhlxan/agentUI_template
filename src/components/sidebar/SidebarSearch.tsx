// src/components/sidebar/SidebarSearch.tsx
import React, { useRef, useEffect } from "react";
import { Box, InputBase } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { searchItem } from "./SidebarConfig";
import { sidebarFullWidthWrapper } from "./styles";

export interface SidebarSearchProps {
  active: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onActivate: () => void;
  onCancel: () => void;
  collapsed: boolean;
}

export const SidebarSearch: React.FC<SidebarSearchProps> = ({
  active,
  query,
  onQueryChange,
  onActivate,
  onCancel,
  collapsed,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [active]);

  return (
    <Box sx={sidebarFullWidthWrapper}>
      {active ? (
        <Box
          onPointerDownCapture={(e) => e.stopPropagation()}
          onMouseDownCapture={(e) => e.stopPropagation()}
          onTouchStartCapture={(e) => e.stopPropagation()}
          sx={{
            width: "100%",
            borderRadius: 2,
            px: 1.5,
            py: 1,
            backgroundColor: "#f5f5f5",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <InputBase
            inputRef={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onCancel();
            }}
            onBlur={() => {
              if (!query.trim()) onCancel();
            }}
            placeholder="Search chats"
            fullWidth
            sx={{
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              px: 0.5,
            }}
          />
        </Box>
      ) : (
        <SidebarItem
          icon={searchItem.render}
          label={collapsed ? undefined : "Search chats"}
          fullWidth
          onClick={onActivate}
        />
      )}
    </Box>
  );
};
