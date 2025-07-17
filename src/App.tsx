import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './ThemeProvider/theme';
import MainPage from "../src/pages/MainPage"; 

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* 👈 This sets consistent global styles */}
      <MainPage />
    </ThemeProvider>
  );
}