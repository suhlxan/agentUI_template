import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import type { ChatSession } from "../../types/chat";

import {
  sidebarItemBox,
  chatTitleText,
  iconButton,
  menuPaper,
  menuItemContent,
  iconSize,
  deleteMenuItem,
} from "./styles";

interface ChatSidebarItemProps {
  chat: ChatSession;
  selected: boolean;
  onClick: () => void;
  onShare?: (chat: ChatSession) => void;
  onRename?: (chat: ChatSession) => void;
  onArchive?: (chat: ChatSession) => void;
  onDelete?: (chat: ChatSession) => void;
}

export default function ChatSidebarItem({
  chat,
  selected,
  onClick,
  onShare,
  onRename,
  onArchive,
  onDelete,
}: ChatSidebarItemProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [tempTitle, setTempTitle] = useState(chat.title || "");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Box
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        ...sidebarItemBox,
        backgroundColor: hovered ? "#eeeeee" : "transparent",
        boxShadow: hovered ? "0px 1px 3px rgba(0, 0, 0, 0.06)" : "none",
      }}
    >
      {isRenaming ? (
        <input
          type="text"
          value={tempTitle}
          onChange={(e) => setTempTitle(e.target.value)}
          onBlur={() => {
            setIsRenaming(false);
            if (tempTitle.trim() && tempTitle !== chat.title) {
              onRename?.({ ...chat, title: tempTitle });
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).blur();
            } else if (e.key === "Escape") {
              setIsRenaming(false);
              setTempTitle(chat.title || "");
            }
          }}
          autoFocus
          style={{
            fontSize: "0.875rem",
            width: "100%",
            border: "none",
            background: "transparent",
            outline: "none",
          }}
        />
      ) : (
        <Typography variant="body2" noWrap sx={chatTitleText}>
          {chat.title || "Untitled Chat"}
        </Typography>
      )}

      <Box
        sx={{
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton size="small" onClick={handleMenuOpen} sx={iconButton}>
          <MoreHorizIcon sx={{ fontSize: iconSize }} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{ sx: menuPaper }}
        >
          <MenuItem onClick={() => { handleMenuClose(); onShare?.(chat); }}>
            <Box sx={menuItemContent}>
              <IosShareIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Share</Typography>
            </Box>
          </MenuItem>

          <MenuItem onClick={() => { handleMenuClose(); setIsRenaming(true); }}>
            <Box sx={menuItemContent}>
              <EditOutlinedIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Rename</Typography>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem onClick={() => { handleMenuClose(); onArchive?.(chat); }}>
            <Box sx={menuItemContent}>
              <Inventory2OutlinedIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Archive</Typography>
            </Box>
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleMenuClose();
              setShowConfirmDelete(true);
            }}
            sx={deleteMenuItem}
          >
            <Box sx={menuItemContent}>
              <DeleteOutlineIcon sx={{ fontSize: iconSize }} />
              <Typography variant="body2">Delete</Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        PaperProps={{
            sx: {
            borderRadius: 3, 
            boxShadow: 6,    
            p: 1.5,          
            },
        }}
        BackdropProps={{
            sx: {
            backdropFilter: "blur(2px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)", 
            },
        }}
        >
        <DialogTitle>Delete Chat</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete this chat?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setShowConfirmDelete(false)}>Cancel</Button>
            <Button
            onClick={() => {
                setShowConfirmDelete(false);
                onDelete?.(chat);
            }}
            sx={{
                backgroundColor: 'red',
                color: 'white',
                borderRadius: 2, 
                px: 2.5,
                '&:hover': { backgroundColor: '#c62828' },
                }}
            >
            Delete
            </Button>
        </DialogActions>
        </Dialog>
    </Box>
  );
}
