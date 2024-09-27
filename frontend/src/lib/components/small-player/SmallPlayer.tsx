import React, { FC, useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.scss';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { removePodcast } from '../../../reducers/reducer';
import { PodState } from 'types';
import H5AudioPlayer from 'react-h5-audio-player';

const SmallPlayer: FC<{ audio?: string; title: string, muted: boolean }> = ({
  audio,
  title,
  muted
}) => {
  const dispatch = useDispatch();
  const player = useRef<null | H5AudioPlayer>(null);
  const { pause } = useSelector((state: { pod: PodState}) => state?.pod) || {};

  useEffect(() => {
    if (player?.current?.audio?.current) {
      if (pause) player.current.audio.current.pause();
      else player.current.audio.current.play();
    }
  }, [pause]);

  useEffect(() => {
    if (player?.current?.audio?.current) {
      // player.current.audio.current.muted = muted;
    }
  }, [muted])
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
            ref={player}
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
