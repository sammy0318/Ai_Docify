import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import VideoPage from './components/VideoPage';
import PdfUpload from './components/PdfUpload'; // Importing the actual PdfUpload component
import './App.css';

// You could add these new components
const Dashboard = () => <div>Dashboard Coming Soon</div>;
const NotFound = () => <div>Page Not Found</div>;

function App() {
  // Check for the saved theme preference from localStorage
  const savedTheme = localStorage.getItem('theme');
  const initialDarkMode = savedTheme === 'light' ? false : true;

  const [darkMode, setDarkMode] = useState(initialDarkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#7c4dff',
      },
      background: {
        default: darkMode ? '#121212' : '#ffffff',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'uppercase',
            boxShadow: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    // Save the new theme preference to localStorage
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LandingPage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/upload" element={<PdfUpload />} /> {/* Using the actual PdfUpload component */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
