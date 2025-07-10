import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface SidebarItemProps {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  fullWidth?: boolean;
}

export default function SidebarItem({
  icon,
  label,
  onClick,
  fullWidth = false,
}: SidebarItemProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1,
        py: 0.75,
        width: fullWidth ? "100%" : "auto",
        borderRadius: 2,
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        "&:hover": { backgroundColor: "#e0e0e0" },
      }}
    >
      {icon}
      {label && <Typography variant="body2">{label}</Typography>}
    </Box>
  );
}
