import { PaletteOptions, Palette } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      lightGray: string;
      assistantDivider: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      lightGray: string;
      assistantDivider: string;
    };
  }
}
