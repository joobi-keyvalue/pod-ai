import React, { FC } from "react";
import { useDispatch } from 'react-redux';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./styles.scss";
import "./styles.css";
import { addPodcast } from '../../../reducers/reducer';

const Player: FC<{audio: string, onPause: () => void, onPlay: () => void}> = ({audio, onPlay, onPause}) => {
  const dispatch = useDispatch();
  const onPlayPlayer = () => {
    dispatch(addPodcast(audio));
    onPlay();
  }
  const onPausePlayer = () => {
    onPause();
  }
  return (
    <div className={styles.playerContainer}>
      <AudioPlayer
        autoPlay={false}
        loop={false}
        src={audio}
        muted
        onPlay={onPlayPlayer}
        onPause={onPausePlayer}
        onPlaying={(e) => console.log(e)}
        customVolumeControls={[]}
        customAdditionalControls={[]}

      />
    </div>
  );
};

export default Player;
