import { AppBar, Toolbar, Container, Typography, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0} className={styles.appBar}>
        <Container>
          <Toolbar disableGutters className={styles.toolbar}>
            <Box className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                {darkMode ? (
                  <div className={styles.moonLogo}>
                    <div className={styles.moonCrater1}></div>
                    <div className={styles.moonCrater2}></div>
                    <div className={styles.moonCrater3}></div>
                  </div>
                ) : (
                  <div className={styles.sunLogo}>
                    <div className={styles.sunRays}></div>
                  </div>
                )}
              </div>
              <Typography variant="h6" component="div" className={styles.logoText}>
                AiDocify
              </Typography>
            </Box>
            <Box className={styles.menuItems}>
              {/* Use Cases Dropdown */}
              <Box 
                component="div" 
                className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}
                onMouseEnter={() => handleMouseEnter('useCases')}
                onMouseLeave={handleMouseLeave}
              >
                Use Cases
                {activeDropdown === 'useCases' && (
                  <Box className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}>
                    <Box component="div" className={styles.dropdownItem}>For Students</Box>
                    <Box component="div" className={styles.dropdownItem}>For Working Professionals</Box>
                    <Box component="div" className={styles.dropdownItem}>For Scholars & Researchers</Box>
                    <Box component="div" className={styles.dropdownItem}>For Educators</Box>
                    <Box component="div" className={styles.dropdownItem}>For Self-Learners</Box>
                  </Box>
                )}
              </Box>
              
              {/* Product Dropdown */}
              <Box 
                component="div" 
                className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}
                onMouseEnter={() => handleMouseEnter('product')}
                onMouseLeave={handleMouseLeave}
              >
                Product
                {activeDropdown === 'product' && (
                  <Box className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}>
                    <Box component="div" className={styles.dropdownItem}>Features</Box>
                    <Box component="div" className={styles.dropdownItem}>Pricing</Box>
                    <Box component="div" className={styles.dropdownItem}>Documentation</Box>
                    <Box component="div" className={styles.dropdownItem}>API</Box>
                  </Box>
                )}
              </Box>
              
              {/* About Dropdown */}
              <Box 
                component="div" 
                className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
              >
                About
                {activeDropdown === 'about' && (
                  <Box className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}>
                    <Box component="div" className={styles.dropdownItem}>Our Story</Box>
                    <Box component="div" className={styles.dropdownItem}>Team</Box>
                    <Box component="div" className={styles.dropdownItem}>Careers</Box>
                    <Box component="div" className={styles.dropdownItem}>Contact</Box>
                  </Box>
                )}
              </Box>
              
              {/* Resources Dropdown */}
              <Box 
                component="div" 
                className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                Resources
                {activeDropdown === 'resources' && (
                  <Box className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}>
                    <Box component="div" className={styles.dropdownItem}>Blog</Box>
                    <Box component="div" className={styles.dropdownItem}>Tutorials</Box>
                    <Box component="div" className={styles.dropdownItem}>Guides</Box>
                    <Box component="div" className={styles.dropdownItem}>Webinars</Box>
                    <Box component="div" className={styles.dropdownItem}>Case Studies</Box>
                  </Box>
                )}
              </Box>
            </Box>
            <Box className={styles.actions}>
              <IconButton onClick={toggleDarkMode} color="inherit" className={styles.themeToggle}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {isMobile && (
                <IconButton className={styles.menuButton} color="inherit">
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={`${styles.divider} ${darkMode ? styles.darkDivider : styles.lightDivider}`}></div>
    </div>
  );
};

export default Navbar;