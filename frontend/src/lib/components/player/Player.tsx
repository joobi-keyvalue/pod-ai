import React, { FC } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./styles.scss";
import "./styles.css";

const Player: FC<{audio: string}> = ({audio}) => {
  return (
    <div className={styles.playerContainer}>
      <AudioPlayer
        autoPlay={false}
        loop={false}
        src={audio}
        onPlay={(e) => console.log("onPlay")}
        customVolumeControls={[]}
        customAdditionalControls={[]}
      />
    </div>
  );
};

export default Player;
