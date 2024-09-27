import React, { FC } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.scss';
import './styles.css';

const SmallPlayer: FC<{ audio?: string; title: string }> = ({
  audio,
  title,
}) => {
  return (
    <div className={`container ${styles.wrapper}`}>
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.player}>
        <div className={styles.hide}>
          <AudioPlayer
            autoPlay={false}
            loop={false}
            // src={audio}
            onPlay={(e) => console.log('onPlay')}
            customVolumeControls={[]}
            customAdditionalControls={[]}
          />
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default SmallPlayer;
