import { Container, Typography, Box, Paper } from '@mui/material';
import styles from './VideoPage.module.css';

interface VideoPageProps {
  darkMode: boolean;
  toggleDarkMode?: () => void;
}

const VideoPage = ({ darkMode, toggleDarkMode }: VideoPageProps) => {
  // YouTube embed URL
  const youtubeEmbedUrl = "https://www.youtube.com/embed/V0jHMoDHmZw";

  return (
    <div id="video-section" className={darkMode ? styles.darkMode : styles.lightMode}>
      <Container className={styles.pageContainer}>
        <Box className={styles.content}>
          <Typography variant="h3" className={styles.pageTitle}>
            <span className={styles.highlight}>See AiDocify In Action</span>
          </Typography>

          {/* YouTube Video Container */}
          <Paper className={styles.videoContainer}>
            <div className={styles.videoIframe}>
              <iframe
                src={youtubeEmbedUrl}
                title="AI for Education"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </Paper>

          {/* Quote Container */}
          <Paper className={styles.quoteContainer}>
            <Typography variant="h5" className={styles.quote}>
              "AI doesn't just transform how we learn; it expands what we can learn."
            </Typography>
            <Typography variant="subtitle1" className={styles.quoteAuthor}>
              - Future of Learning
            </Typography>
          </Paper>

          {/* Additional content about AI in education */}
          <Box className={styles.additionalContent}>
            <Typography variant="h4" className={styles.sectionTitle}>
              How AI is Transforming Education
            </Typography>
            <Typography variant="body1" className={styles.paragraph}>
              Artificial intelligence is revolutionizing the way we learn and teach. From personalized learning paths to intelligent tutoring systems, AI tools are making education more accessible, efficient, and effective for students of all backgrounds.
            </Typography>
            <Typography variant="body1" className={styles.paragraph}>
              The integration of AI in educational platforms enables adaptive learning experiences that respond to individual student needs, providing tailored resources and feedback in real-time.
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default VideoPage;