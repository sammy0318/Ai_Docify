import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  KeyboardArrowDown as ArrowDownIcon,
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';
import styles from './index.module.css';
import BlurText from './BlurText'; // Ensure this points to your BlurText component location

interface NavItem {
  label: string;
  items?: string[];
}

interface LandingPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ darkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [useCasesAnchor, setUseCasesAnchor] = useState<null | HTMLElement>(null);
  const [productAnchor, setProductAnchor] = useState<null | HTMLElement>(null);
  const [resourcesAnchor, setResourcesAnchor] = useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const navItems: Record<string, NavItem> = {
    useCases: {
      label: 'Use Cases',
      items: ['Students', 'Researchers', 'Professionals', 'Teams']
    },
    product: {
      label: 'Product',
      items: ['Features', 'Pricing', 'Integrations', 'API']
    },
    resources: {
      label: 'Resources',
      items: ['Guides', 'Blog', 'Webinars', 'Support']
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menuType: string) => {
    if (menuType === 'useCases') setUseCasesAnchor(event.currentTarget);
    else if (menuType === 'product') setProductAnchor(event.currentTarget);
    else if (menuType === 'resources') setResourcesAnchor(event.currentTarget);
    else if (menuType === 'mobile') setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = (menuType: string) => {
    if (menuType === 'useCases') setUseCasesAnchor(null);
    else if (menuType === 'product') setProductAnchor(null);
    else if (menuType === 'resources') setResourcesAnchor(null);
    else if (menuType === 'mobile') setMobileMenuAnchor(null);
    else {
      setUseCasesAnchor(null);
      setProductAnchor(null);
      setResourcesAnchor(null);
      setMobileMenuAnchor(null);
    }
  };

  const handleAnimationComplete = () => {
    console.log('Headline animation complete!');
  };

  return (
    <div className={styles.Wrapper}>
      <Box className={styles.pageContainer}>
        {/* Navigation */}
        <AppBar
          position="fixed"
          color="transparent"
          elevation={0}
          className={styles.appBar}
          sx={{
            py: 0,
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <Toolbar
              disableGutters
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                minHeight: '60px',
                padding: 0
              }}
            >
              {/* Logo */}
              <Box className={styles.logoContainer}>
                <Box
                  component="img"
                  src={darkMode ? "/logo-dark.svg" : "/logo-light.svg"}
                  alt="AI Docify Logo"
                  className={styles.logo}
                />
                <Typography
                  variant="h5"
                  component="div"
                  className={styles.logoText}
                  sx={{ color: theme.palette.text.primary }}
                >
                  AI Docify
                </Typography>
              </Box>

              {/* Desktop Navigation */}
              {!isMobile && (
                <Box className={styles.navContainer}>
                  {/* Use Cases */}
                  <Box className={styles.navItem}>
                    <Button
                      onClick={(e) => handleMenuOpen(e, 'useCases')}
                      endIcon={<ArrowDownIcon />}
                      className={styles.navButton}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {navItems.useCases.label}
                    </Button>
                    <Menu
                      anchorEl={useCasesAnchor}
                      open={Boolean(useCasesAnchor)}
                      onClose={() => handleMenuClose('useCases')}
                    >
                      {navItems.useCases.items?.map((item) => (
                        <MenuItem key={item} onClick={() => handleMenuClose('all')}>
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  {/* Product */}
                  <Box className={styles.navItem}>
                    <Button
                      onClick={(e) => handleMenuOpen(e, 'product')}
                      endIcon={<ArrowDownIcon />}
                      className={styles.navButton}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {navItems.product.label}
                    </Button>
                    <Menu
                      anchorEl={productAnchor}
                      open={Boolean(productAnchor)}
                      onClose={() => handleMenuClose('product')}
                    >
                      {navItems.product.items?.map((item) => (
                        <MenuItem key={item} onClick={() => handleMenuClose('all')}>
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  {/* About */}
                  <Button
                    className={styles.navButton}
                    sx={{ color: theme.palette.text.primary }}
                  >
                    About
                  </Button>

                  {/* Resources */}
                  <Box className={styles.navItem}>
                    <Button
                      onClick={(e) => handleMenuOpen(e, 'resources')}
                      endIcon={<ArrowDownIcon />}
                      className={styles.navButton}
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {navItems.resources.label}
                    </Button>
                    <Menu
                      anchorEl={resourcesAnchor}
                      open={Boolean(resourcesAnchor)}
                      onClose={() => handleMenuClose('resources')}
                    >
                      {navItems.resources.items?.map((item) => (
                        <MenuItem key={item} onClick={() => handleMenuClose('all')}>
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              <Box className={styles.actionContainer}>
                {/* Dark Mode Toggle */}
                <IconButton onClick={toggleDarkMode} className={styles.darkModeToggle}>
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>

                {/* Mobile Menu */}
                {isMobile && (
                  <>
                    <IconButton
                      edge="end"
                      color="inherit"
                      aria-label="menu"
                      onClick={(e) => handleMenuOpen(e, 'mobile')}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="mobile-menu"
                      anchorEl={mobileMenuAnchor}
                      open={Boolean(mobileMenuAnchor)}
                      onClose={() => handleMenuClose('mobile')}
                    >
                      <MenuItem>Use Cases</MenuItem>
                      <MenuItem>Product</MenuItem>
                      <MenuItem>About</MenuItem>
                      <MenuItem>Resources</MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Hero Section */}
        <Box component="main" className={styles.heroSection}>
          {/* Headline */}
          <Box className={styles.headline}>
            <Typography
              variant="h4"
              component="h2"
              className={styles.coloredText}
              sx={{ display: 'inline-block' }}
            >
              AiDocify
            </Typography>
            {/* BlurText Animation for the main headline */}
            <Box sx={{ mt: 2 }}>
              <BlurText
                text="Upload PDFs to Instantly Generate AI-Powered Summaries, Notes, and Assignments"
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="text-lg sm:text-xl md:text-2xl font-medium"
              />
            </Box>
          </Box>

          {/* Subheadline */}
          <Typography
            variant="h6"
            component="p"
            className={styles.subheadline}
            sx={{ color: theme.palette.text.secondary }}
          >
            See how you can save 4+ hours on your next study session below.
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowDownIcon />}
            className={styles.ctaButton}
          >
            Get Started - It's Free
          </Button>

          {/* Social Proof */}
          <Typography
            variant="body1"
            className={styles.socialProof}
            sx={{ color: theme.palette.text.secondary }}
          >
            Meet AiDocify — Your Study Sidekick Just Leveled Up.
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;