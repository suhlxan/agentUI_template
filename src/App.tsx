import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from './theme/theme';
import MainPage from "./app/MainPage"; 
import LoginPage from "./app/LoginPage";

export function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loggedIn ? (
        <MainPage />
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)} />
      )}
    </ThemeProvider>
  );
}