import { Container, Typography, Button, Box } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import HyperspeedBackground from '../LandingPage/HyperspeedBackground';
import Navbar from '../Navbar/Navbar';
import styles from './index.module.css';

interface LandingPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LandingPage = ({ darkMode, toggleDarkMode }: LandingPageProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  // Handle scroll to show video section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show video after scrolling down 300px (adjust this value as needed)
      if (scrollPosition > 300) {
        setShowVideo(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to video section
  const scrollToVideo = () => {
    if (videoSectionRef.current) {
      videoSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setShowVideo(true);
    }
  };

  return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}>
      <HyperspeedBackground darkMode={darkMode} />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Container className={styles.heroContainer}>
        <Box className={styles.heroContent}>
          <Typography variant="h3" className={styles.heroTitle}>
            <span className={styles.highlight}>
              <span className={styles.mainheadline}>AiDocify<br /> </span>
            </span> Upload PDFs to instantly AI-Powered Summaries, Notes, and Assignments
          </Typography>
          
          <Typography variant="h6" className={styles.heroSubtitle}>
            See how you can save 4+ hours on your next study session below.
          </Typography>
          
          <Button 
            variant="contained" 
            size="large" 
            className={styles.ctaButton}
            onClick={scrollToVideo}
          >
            GET STARTED <span className={styles.arrowIcon}>→</span>
          </Button>
          
          <Typography variant="body1" className={styles.testimonial}>
            Meet AiDocify - Your Study sidekick just leveled up!<br />
          </Typography>
        </Box>
      </Container>

      {/* Spacer to create scroll distance */}
      <div className={styles.spacer}></div>

      
    </div>
  );
};

export default LandingPage;