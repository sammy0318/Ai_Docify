import { useState } from 'react';
import styles from './index.module.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useTheme } from '@mui/material/styles';

const VideoPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const theme = useTheme();

  const features = [
    {
      title: 'PDF to Summary',
      description: 'Transform any PDF into concise, easy-to-understand summaries'
    },
    {
      title: 'Study Notes',
      description: 'Generate comprehensive study notes with key concepts highlighted'
    },
    {
      title: 'Practice Questions',
      description: 'Create practice questions and assignments from your materials'
    },
    {
      title: 'Save Time',
      description: 'Reduce study prep time by 75% with AI-powered document analysis'
    }
  ];

  // Apply theme-based class names instead of inline styles
  const themeMode = theme.palette.mode === 'dark' ? styles.darkMode : styles.lightMode;

  return (
    <section className={`${styles.videoSection} ${themeMode}`}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          {/* Left side: Video */}
          <div className={styles.videoWrapper}>
            <div className={styles.videoContainer}>
              <div className={styles.videoPaper}>
              <iframe
                className={styles.video}
                src={`https://www.youtube.com/embed/ou-litQ9hWQ?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&controls=0`}
                title="AiDocify Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>


                {/* Custom video controls */}
                <div className={styles.videoControls}>
                  <button 
                    className={styles.controlButton}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                  </button>

                  <button
                    className={styles.controlButton}
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Description + Features */}
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>
              See AiDocify in Action
            </h2>

            <p className={styles.description}>
              Watch how AiDocify transforms dense academic papers into clear,
              actionable study materials. Our AI-powered platform analyzes your
              PDFs and extracts the most important information.
            </p>

            <div className={styles.featuresList}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureNumber}>
                    {index + 1}
                  </div>
                  <div className={styles.featureContent}>
                    <h3 className={styles.featureTitle}>
                      {feature.title}
                    </h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.ctaButton}>
              Try It Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPage;