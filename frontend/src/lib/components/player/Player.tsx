import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import styles from "./styles.scss";
import "./styles.css";

const Player = () => {
  return (
    <div className={styles.playerContainer}>
      <AudioPlayer
        autoPlay={false}
        loop={false}
        src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3"
        onPlay={(e) => console.log("onPlay")}
        customVolumeControls={[]}
        customAdditionalControls={[]}
      />
    </div>
  );
};

export default Player;
