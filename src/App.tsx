import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './ThemeProvider/theme';
import MainPage from "./app/MainPage"; 

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <MainPage />
    </ThemeProvider>
  );
}