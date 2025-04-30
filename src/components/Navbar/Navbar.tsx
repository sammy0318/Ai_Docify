import { AppBar, Toolbar, Container, Typography, Box, IconButton, useMediaQuery, useTheme, Drawer, List, ListItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const menuItems = [
    {
      title: 'Use Cases',
      id: 'useCases',
      items: ['For Students', 'For Working Professionals', 'For Scholars & Researchers', 'For Educators', 'For Self-Learners']
    },
    {
      title: 'Product',
      id: 'product',
      items: ['Features', 'Pricing', 'Documentation', 'API']
    },
    {
      title: 'About',
      id: 'about',
      items: ['Our Story', 'Team', 'Careers', 'Contact']
    },
    {
      title: 'Resources',
      id: 'resources',
      items: ['Blog', 'Tutorials', 'Guides', 'Webinars', 'Case Studies']
    }
  ];

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
            
            {/* Desktop Menu */}
            {!isMobile && (
              <Box className={styles.menuItems}>
                {menuItems.map((menu) => (
                  <Box 
                    key={menu.id}
                    component="div" 
                    className={`${styles.menuItem} ${styles.menuItemWithDropdown}`}
                    onMouseEnter={() => handleMouseEnter(menu.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {menu.title}
                    {activeDropdown === menu.id && (
                      <Box className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}>
                        {menu.items.map((item, index) => (
                          <Box key={index} component="div" className={styles.dropdownItem}>{item}</Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
            
            <Box className={styles.actions}>
              <IconButton onClick={toggleDarkMode} color="inherit" className={styles.themeToggle}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              {isMobile && (
                <IconButton 
                  className={styles.menuButton} 
                  color="inherit" 
                  onClick={toggleMobileMenu}
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={`${styles.divider} ${darkMode ? styles.darkDivider : styles.lightDivider}`}></div>
      
      {/* Mobile Menu Drawer */}
      <Drawer 
        anchor="right"
        open={mobileMenuOpen && isMobile}
        onClose={toggleMobileMenu}
        className={`${styles.mobileDrawer} ${darkMode ? styles.darkDrawer : ''}`}
      >
        <Box 
          className={`${styles.mobileMenuContainer} ${darkMode ? styles.darkMobileMenu : ''}`}
          role="presentation"
        >
          <Box className={styles.mobileMenuHeader}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List className={styles.mobileMenuList}>
            {menuItems.map((menu) => (
              <div key={menu.id} className={styles.mobileMenuSection}>
                <ListItem className={styles.mobileMenuTitle}>
                  {menu.title}
                </ListItem>
                <List className={styles.mobileSubmenuList}>
                  {menu.items.map((item, index) => (
                    <ListItem key={index} className={styles.mobileMenuItem}>
                      {item}
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;