import React, { FC, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./styles.scss";
import "./styles.css";
import { addPodcast, pausePodcast, playPodcast, removePodcast } from '../../../reducers/reducer';
import H5AudioPlayer from 'react-h5-audio-player';

const Player: FC<{audio: string, onPause: () => void, onPlay: () => void}> = ({audio, onPlay, onPause}) => {
  const dispatch = useDispatch();
  const player = useRef<null | H5AudioPlayer>(null);
  
  const onPausePlayer = (e: any) => {
    console.log('onpauseplayer', e);
    onPause();
    dispatch(pausePodcast());
    if (player?.current?.audio.current) player.current.audio.current.pause();
  }
  useEffect(() => {
    const pauseButton = document.querySelector('[aria-label="Play"]');
    pauseButton?.addEventListener('click', onPausePlayer);
    dispatch(removePodcast());
  }, [])
  const onPlayPlayer = () => {
    dispatch(addPodcast(audio));
    dispatch(playPodcast());
    if (player?.current?.audio.current) player.current.audio.current.play();
    onPlay();
  }
  return (
    <div className={styles.playerContainer}>
      <AudioPlayer
        autoPlay={false}
        loop={false}
        src={audio}
        ref={player}
        muted
        onPlay={onPlayPlayer}
        customVolumeControls={[]}
        customAdditionalControls={[]}

      />
    </div>
  );
};

export default Player;
