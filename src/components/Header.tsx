// src/components/Header.tsx
import { useState } from "react";
import type { MouseEvent } from "react";
import {
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface ModelDescriptor {
  value: string;
  label: string;
  description?: string;
}

export interface HeaderProps {
  title: string;
  model: string;
  models: ModelDescriptor[];
  onModelChange: (value: string) => void;
  avatarSrc?: string;
  onAvatarClick?: () => void;
  menuItems?: { label: string; onClick: () => void }[];
}

export default function Header({
  title,
  model,
  models,
  onModelChange,
  avatarSrc,
  onAvatarClick,
}: HeaderProps) {
  // state for the model‐picker popover
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleModelButtonClick = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleModelClose = () => setAnchorEl(null);

  return (
    <Box
      component="header"
      display="flex"
      alignItems="center"
      height={64}
      px={2}
      borderColor="divider"
      bgcolor="background.paper"
    >

      {/* Title + Model selector button */}
       <Button
        aria-label={`Agent selector, current model is ${model}`}
        id="model-switcher-button"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        onClick={handleModelButtonClick}
        endIcon={<ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />}
        sx={{
          textTransform: "none",
          borderRadius: 1,
          minHeight: 'auto',
          px: 2,
          py: 0.5,
          gap: 1,
          fontSize: "1rem",
          color: "text.primary",
         bgcolor: "transparent",
          "&:hover": { bgcolor: "action.hover" },
        }}
      >
        <Typography variant="h6" noWrap>
          {title}
        </Typography>
      </Button>

      {/* The popover menu for models */}
      <Menu
        id="model-switcher-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleModelClose}
        MenuListProps={{
          "aria-labelledby": "model-switcher-button",
        }}
        sx={{
          "& .MuiPaper-root": { borderRadius: 2 },
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ px: 2, pt: 1, pb: 0.5, color: "text.secondary" }}
        >
          Models
        </Typography>
        {models.map((m) => (
          <MenuItem
            key={m.value}
            selected={m.value === model}
            onClick={() => {
              onModelChange(m.value);
              handleModelClose();
            }}
          >
            <ListItemText
              primary={m.label}
              secondary={m.description}
              primaryTypographyProps={{ fontWeight: 500 }}
            />
          </MenuItem>
        ))}
        <MenuItem
          onClick={() => {
            /* e.g. “More models” handler */
          }}
          sx={{ justifyContent: "center", pt: 1 }}
        >
          More models…
        </MenuItem>
      </Menu>

      {/* Push everything to the right */}
      <Box flexGrow={1} />

      {/* Avatar + dropdown */}
      {avatarSrc && (
        <IconButton onClick={onAvatarClick} aria-label="Account menu">
          <Avatar src={avatarSrc} />
        </IconButton>
      )}
    </Box>
  );
}
