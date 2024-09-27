import React, { useState } from "react";
import styles from "./styles.scss";
import Caption from "../../components/caption/Caption";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import Player from "../../components/player/Player";
import Transcript from '../../sections/transcript/Transcript';

const Podcast = () => {
  const [like, setLike] = useState(false);
  const [stop, setStop] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const handleLike = () => {
    setLike((prev) => !prev);
  };
  const handleShowTranscript = () => {
    setShowTranscript(true)
  };
  return (
    <div className={styles.podcastContainer}>
      <Caption content={"Now Playing."} />
      <PodcastDetails
        image={"assets/bear.svg"}
        title={"Bears, MMA & Global Warming."}
        topics={["Animals", "Sports", "Climate"]}
        handleLike={handleLike}
        liked={like}
      />

      <div className={styles.progress}>
        <Player
          onPlay={() => setStop(false)}
          onPause={() => setStop(true)}
          audio={
            "https://keycode-wetestinprod.s3.ap-south-1.amazonaws.com/podcasts/final_podcast_1727411669.mpga"
          }
        />
      </div>
      <div onClick={handleShowTranscript} className={styles.downIcon}>
        <img src="assets/down-icon.svg" />
      </div>
      <div className={`${styles.transcript} ${showTranscript && styles.show}`}>
        <Transcript stop={stop} closeTranscript={() => setShowTranscript(false)} />
      </div>
    </div>
  );
};

export default Podcast;
