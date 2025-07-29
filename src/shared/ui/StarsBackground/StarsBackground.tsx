import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Box } from '@mui/material';
import starsAnimation from '../../../assets/json/Stars2.json';
import styles from './StarsBackground.module.css';

const StarsBackground: React.FC = () => {
  return (
    <Box className={styles.starsContainer}>
      <Player
        autoplay
        loop
        src={starsAnimation}
        className={styles.starsAnimation}
      />
    </Box>
  );
};

export default StarsBackground;