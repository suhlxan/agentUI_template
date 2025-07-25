import { useState } from "react";
import type {MouseEvent }from "react";
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
import type { ModelDescriptor } from "../../types/models";

import * as styles from "./styles";

export interface HeaderProps {
  chatTitle: string;
  model: string;
  models: ModelDescriptor[];
  onModelChange: (value: string) => void;
  avatarSrc?: string;
  onAvatarClick?: () => void;
}

export default function Header({
  chatTitle,
  model,
  models,
  onModelChange,
  avatarSrc,
  onAvatarClick,
}: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleModelButtonClick = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleModelClose = () => setAnchorEl(null);

  return (
    <Box component="header" sx={styles.headerContainer}>
      <Button
        aria-label={`Agent selector, current model is ${model}`}
        id="model-switcher-button"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        onClick={handleModelButtonClick}
        endIcon={<ExpandMoreIcon fontSize="small" sx={{ color: "text.secondary" }} />}
        sx={styles.modelButton}
      >
        <Typography variant="h6" noWrap>
          {chatTitle}
        </Typography>
      </Button>

      <Menu
        id="model-switcher-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleModelClose}
        MenuListProps={{
          "aria-labelledby": "model-switcher-button",
        }}
        sx={styles.modelMenu}
      >
        <Typography variant="subtitle2" sx={styles.menuHeader}>
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
            // More models action
          }}
          sx={{ justifyContent: "center", pt: 1 }}
        >
          More models…
        </MenuItem>
      </Menu>

      <Box flexGrow={1} />

      {avatarSrc && (
        <IconButton onClick={onAvatarClick} aria-label="Account menu" sx={styles.avatarIcon}>
          <Avatar src={avatarSrc} sx={styles.avatarImage} />
        </IconButton>
      )}
    </Box>
  );
}
