import React, { FC } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.scss';
import './styles.css';
import { useDispatch } from 'react-redux';
import { removePodcast } from '../../../reducers/reducer';

const SmallPlayer: FC<{ audio?: string; title: string, muted: boolean }> = ({
  audio,
  title,
  muted
}) => {
  const dispatch = useDispatch();
  return (
    <div className={`container ${styles.wrapper} ${muted && styles.hidePlayer}`}>
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.player}>
        <div className={styles.hide}>
          <AudioPlayer
            autoPlay
            loop={false}
            src={audio}
            customVolumeControls={[]}
            customAdditionalControls={[]}
          />
        </div>
        <div className={styles.close} onClick={() => dispatch(removePodcast())}>X</div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default SmallPlayer;
