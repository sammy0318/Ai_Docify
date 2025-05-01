import { AppBar, Toolbar, Container, Typography, Box, IconButton, useMediaQuery, useTheme, Drawer, List, ListItem, Button } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
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

  const goToUpload = () => {
    navigate('/upload');
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const menuItems = [
    {
      title: 'Use Cases',
      id: 'useCases',
      items: [
        { label: 'For Students', path: '/use-cases/students' },
        { label: 'For Working Professionals', path: '/use-cases/professionals' }, 
        { label: 'For Scholars & Researchers', path: '/use-cases/researchers' }, 
        { label: 'For Educators', path: '/use-cases/educators' }, 
        { label: 'For Self-Learners', path: '/use-cases/self-learners' }
      ]
    },
    {
      title: 'Product',
      id: 'product',
      items: [
        { label: 'Features', path: '/features' },
        { label: 'Pricing', path: '/pricing' }, 
        { label: 'Documentation', path: '/docs' }, 
        { label: 'API', path: '/api' }
      ]
    },
    {
      title: 'About',
      id: 'about',
      items: [
        { label: 'Our Story', path: '/about' },
        { label: 'Team', path: '/team' }, 
        { label: 'Careers', path: '/careers' }, 
        { label: 'Contact', path: '/contact' }
      ]
    },
    {
      title: 'Resources',
      id: 'resources',
      items: [
        { label: 'Blog', path: '/blog' },
        { label: 'Tutorials', path: '/tutorials' }, 
        { label: 'Guides', path: '/guides' }, 
        { label: 'Webinars', path: '/webinars' }, 
        { label: 'Case Studies', path: '/case-studies' }
      ]
    }
  ];

  return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}>
      <AppBar position="static" color="transparent" elevation={0} className={styles.appBar}>
        <Container>
          <Toolbar disableGutters className={styles.toolbar}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
            </Link>
            
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
                    sx={{ 
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: activeDropdown === menu.id ? '100%' : '0%',
                        height: '2px',
                        bottom: '-3px',
                        left: '0',
                        backgroundColor: '#7c4dff',
                        transition: 'width 0.3s ease-in-out'
                      }
                    }}
                  >
                    {menu.title}
                    {activeDropdown === menu.id && (
                      <Box 
                        className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          minWidth: '200px',
                          backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                          borderRadius: '8px',
                          padding: '12px 0',
                          zIndex: 100,
                          mt: 1,
                          overflow: 'hidden',
                          animation: 'fadeIn 0.2s ease-in-out',
                          '@keyframes fadeIn': {
                            '0%': {
                              opacity: 0,
                              transform: 'translateY(-10px)'
                            },
                            '100%': {
                              opacity: 1,
                              transform: 'translateY(0)'
                            }
                          }
                        }}
                      >
                        {menu.items.map((item, index) => (
                          <Box 
                            key={index} 
                            component={Link} 
                            to={item.path}
                            className={styles.dropdownItem}
                            sx={{
                              display: 'block',
                              padding: '10px 16px',
                              color: 'inherit',
                              textDecoration: 'none',
                              transition: 'all 0.2s',
                              '&:hover': {
                                backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                color: '#7c4dff'
                              }
                            }}
                          >
                            {item.label}
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}
            
            <Box className={styles.actions}>
              <IconButton 
                onClick={toggleDarkMode} 
                color="inherit" 
                className={styles.themeToggle}
                sx={{ mr: 2 }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>

              <Button 
                variant="contained" 
                onClick={goToUpload}
                size="small"
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  bgcolor: '#7c4dff',
                  '&:hover': {
                    bgcolor: '#6a3dd2',
                  },
                  textTransform: 'none',
                  borderRadius: '6px',
                  px: 2,
                  py: 0.75
                }}
              >
                Upload PDF
              </Button>

              {isMobile && (
                <IconButton 
                  className={styles.menuButton} 
                  color="inherit" 
                  onClick={toggleMobileMenu}
                  aria-label="menu"
                  sx={{ ml: 1 }}
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
        PaperProps={{
          sx: { 
            width: '80%', 
            maxWidth: '360px',
            backgroundColor: darkMode ? '#121212' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000'
          }
        }}
      >
        <Box 
          className={`${styles.mobileMenuContainer} ${darkMode ? styles.darkMobileMenu : ''}`}
          role="presentation"
          sx={{ p: 0 }}
        >
          <Box 
            className={styles.mobileMenuHeader}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Menu</Typography>
            <IconButton onClick={toggleMobileMenu} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          
          <List className={styles.mobileMenuList} sx={{ py: 0 }}>
            {menuItems.map((menu) => (
              <div key={menu.id} className={styles.mobileMenuSection}>
                <ListItem 
                  className={styles.mobileMenuTitle}
                  sx={{ 
                    py: 1.5, 
                    fontWeight: 600,
                    color: '#7c4dff',
                    borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                  }}
                >
                  {menu.title}
                </ListItem>
                <List className={styles.mobileSubmenuList} sx={{ py: 0 }}>
                  {menu.items.map((item, index) => (
                    <ListItem 
                      key={index} 
                      className={styles.mobileMenuItem}
                      component={Link}
                      to={item.path}
                      onClick={toggleMobileMenu}
                      sx={{ 
                        py: 1.25, 
                        px: 3,
                        color: 'inherit',
                        textDecoration: 'none',
                        '&:hover': {
                          backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                        }
                      }}
                    >
                      {item.label}
                    </ListItem>
                  ))}
                </List>
              </div>
            ))}

            <Box sx={{ p: 2, mt: 2 }}>
              <Button 
                variant="contained" 
                fullWidth
                onClick={goToUpload}
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  bgcolor: '#7c4dff',
                  '&:hover': {
                    bgcolor: '#6a3dd2',
                  },
                  py: 1.5
                }}
              >
                Upload PDF
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;