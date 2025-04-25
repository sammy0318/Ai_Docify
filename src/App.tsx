import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import LandingPage from './components/LandingPage';
import './App.css';
function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#7146FF',
      },
      secondary: {
        main: '#23D18B',
      },
      background: {
        default: darkMode ? '#121212' : '#FFFFFF',
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
      },
      text: {
        primary: darkMode ? '#F5F5F5' : '#333333',
        secondary: darkMode ? '#AAAAAA' : '#666666',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 800 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 500 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      setDarkMode(savedDarkMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </ThemeProvider>
  );
}

export default App;
