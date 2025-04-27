import { Container, Typography, Button, Box } from '@mui/material';
import HyperspeedBackground from './HyperspeedBackground';
import Navbar from './Navbar/Navbar';
import styles from './index.module.css';

interface LandingPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LandingPage = ({ darkMode, toggleDarkMode }: LandingPageProps) => {
  return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}>
      <HyperspeedBackground darkMode={darkMode} />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

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