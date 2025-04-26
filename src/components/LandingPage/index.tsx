import { Container, Typography, Button, AppBar, Toolbar, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu'
import HyperspeedBackground from './HyperspeedBackground'; 
import styles from './index.module.css';

interface LandingPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LandingPage = ({ darkMode, toggleDarkMode }: LandingPageProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}>
      <HyperspeedBackground darkMode={darkMode} /> {/* PASS darkMode */}
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
              <Box component="div" className={styles.menuItem}>Use Cases</Box>
              <Box component="div" className={styles.menuItem}>Product</Box>
              <Box component="div" className={styles.menuItem}>About</Box>
              <Box component="div" className={styles.menuItem}>Resources</Box>
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

      <div className={styles.divider}></div>

      <Container className={styles.heroContainer}>
        <Box className={styles.heroContent}>
          <Typography variant="h3" className={styles.heroTitle}>
            <span className={styles.highlight}>
              <span className={styles.mainheadline}>AiDocify<br /> </span>
            </span> Upload PDFs to instantly AI-Powered Summaries,Notes, and Assignments
          </Typography>
          
          <Typography variant="h6" className={styles.heroSubtitle}>
            See how you can save 4+ hours on your next study session below.
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            className={styles.ctaButton}
          >
            GET STARTED <span className={styles.arrowIcon}>→</span>
          </Button>
          
          <Typography variant="body1" className={styles.testimonial}>
            Meet AiDocify - Your Study sidekick just leveled up!<br />
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default LandingPage;
