// components/InputBar.tsx
import { IconButton, InputBase, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Tune";
import SendIcon from "@mui/icons-material/Send";
import { useState, type ReactNode } from "react";

export interface InputBarProps {
  placeholder?: string;
  hideIcons?: boolean;
  onSubmit?: (value: string) => void;
  submitIcon?: ReactNode;
}

export default function InputBar({
  placeholder = "Ask anything",
  hideIcons = false,
  onSubmit,
  submitIcon = <SendIcon />,
}: InputBarProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && onSubmit) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        px: 2,
        display: "flex",
        alignItems: "center",
        borderRadius: "28px",
        width: "100%",
        maxWidth: 700,
        boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      }}
    >
      {!hideIcons && (
        <>
          <IconButton><AddIcon /></IconButton>
          <IconButton><SettingsIcon /></IconButton>
        </>
      )}
      <InputBase
        placeholder={placeholder}
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        sx={{ ml: hideIcons ? 0 : 2 }}
      />
      <IconButton onClick={handleSubmit} color="primary">
        {submitIcon}
      </IconButton>
    </Paper>
  );
}
