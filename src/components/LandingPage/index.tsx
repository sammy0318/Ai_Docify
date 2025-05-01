import { Container, Typography, Button, Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import VideoPage from '../VideoPage';
import UploadPage from '../PdfUpload/index';
import styles from './index.module.css';
import { useRef } from 'react';

interface LandingPageProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LandingPage = ({ darkMode, toggleDarkMode }: LandingPageProps) => {
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const scrollToUploadSection = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={darkMode ? styles.darkMode : styles.lightMode}>
      <div className={styles.wrapper}>

        {/* Section 1: Hero */}
        <div className={styles.snapSection}>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Container className={styles.heroContainer}>
            <Box className={styles.heroContent}>
              <Typography variant="h3" className={styles.heroTitle}>
                <span className={styles.highlight}>
                  <span className={styles.mainheadline}>AiDocify<br /></span>
                </span>
                Upload PDFs to instantly get AI-Powered Summaries, Notes, and Assignments
              </Typography>

              <Typography variant="h6" className={styles.heroSubtitle}>
                See how you can save 4+ hours on your next study session below.
              </Typography>

              <Button
                variant="contained"
                size="large"
                className={styles.ctaButton}
                onClick={scrollToUploadSection}
              >
                GET STARTED <span className={styles.arrowIcon}>→</span>
              </Button>

              <Typography variant="body1" className={styles.testimonial}>
                Meet AiDocify - Your Study sidekick just leveled up!
              </Typography>
            </Box>
          </Container>
        </div>

        {/* Section 2: Video Page */}
        <div className={styles.snapSection}>
          <VideoPage />
        </div>

        {/* Section 3: Upload Page */}
        <div className={styles.snapSection} ref={uploadSectionRef} id="uploadSection">
          <UploadPage />
        </div>

      </div>
    </div>
  );
};

export default LandingPage;