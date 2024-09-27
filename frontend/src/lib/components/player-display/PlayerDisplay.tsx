import React, { FC } from 'react';
import styles from './styles.scss';

interface PlayerDisplayProType {
  image?: string;
  title: string;
  duration: string;
}
const PlayerDisplay: FC<PlayerDisplayProType> = ({ image, title, duration}) => {

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={image} />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{title}</div>
        <div className={styles.duration}>{duration}</div>
      </div>
      <div className={styles.play}>
        <img src="assets/player-icon.svg" />
      </div>
    </div>
  )
}

export default PlayerDisplay;
