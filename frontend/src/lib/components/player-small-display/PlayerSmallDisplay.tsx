import React, { FC } from 'react';
import styles from './styles.scss';

interface PlayerPropType {
  image?: string;
  title: string;
  duration: string;
  date: string;
  onClick?: () => void
}
const PlayerSmallDisplay: FC<PlayerPropType> = ({ title, duration, date, image, onClick}) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.image}>
        <img src={image || 'assets/bear.svg' } />
        <div className={styles.play}><img src="assets/playButton.svg" /></div>
      </div>
      <div className={styles.details}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.dateAndDuration}>
          <span>{date}</span>
          {' . '}
          <span>{duration}</span>
        </div>
      </div>
    </div>
  )
}

export default PlayerSmallDisplay;
