// src/components/ModelSelect.tsx
import { Select, MenuItem, Box } from "@mui/material";
import type {SelectChangeEvent} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export interface ModelDescriptor {
  value: string;
  label: string;
  /** optional tagline displayed under the label */
  description?: string;
}

export interface ModelSelectProps {
  value: string;
  onChange: (newValue: string) => void;
  options: ModelDescriptor[];
}

export default function SelectModel({
  value,
  onChange,
  options,
}: ModelSelectProps) {
  const handleChange = (e: SelectChangeEvent<string>) => {
    onChange(e.target.value);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      variant="standard"
      disableUnderline
      IconComponent={() => <ArrowDropDownIcon />}
      sx={{
        ml: 1,
        "& .MuiSelect-select": { py: 0.5, px: 1, cursor: "pointer" },
      }}
    >
      {options.map(({ value: v, label, description }) => (
        <MenuItem key={v} value={v} sx={{ display: "flex", flexDirection: "column" }}>
          <Box component="span" fontWeight={500}>
            {label}
          </Box>
          {description && (
            <Box component="span" fontSize="0.75rem" color="text.secondary">
              {description}
            </Box>
          )}
        </MenuItem>
      ))}
    </Select>
  );
}
