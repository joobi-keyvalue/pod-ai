import React, { useState } from "react";
import styles from "./styles.scss";
import Caption from "../../components/caption/Caption";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import Player from "../../components/player/Player";
import Transcript from '../../sections/transcript/Transcript';
import { useParams } from 'react-router-dom';
import { useGetPodcastByIdQuery } from '../../../api/appAPI';
import { getDate } from '../../utils/date';
import Loader from '../../components/loader/Loader';

const Podcast = () => {
  const [stop, setStop] = useState(true);
  const { id } = useParams();
  const { data } = useGetPodcastByIdQuery({ id});
  const [showTranscript, setShowTranscript] = useState(false);
  const handleShowTranscript = () => {
    setShowTranscript(true)
  };
  return (
    data?.data && (
      <div className={styles.podcastContainer}>
      <Caption content={"Now Playing."} />
      <PodcastDetails
        image={"assets/bear.svg"}
        title={`${getDate(data?.data?.date)} Podcast`}
        topics={["Animals", "Sports", "Climate"]}
        liked={data?.data?.is_liked}
        id={data?.data?.id}
      />

      <div className={styles.progress}>
        <Player
          onPlay={() => setStop(false)}
          onPause={() => setStop(true)}
          audio={data?.data?.audio_link}
        />
      </div>
      <div onClick={handleShowTranscript} className={styles.downIcon}>
        <img src="assets/down-icon.svg" />
      </div>
      <div className={`${styles.transcript} ${showTranscript && styles.show}`}>
        <Transcript stop={stop} closeTranscript={() => setShowTranscript(false)} transcript={data?.data?.transcript} />
      </div>
    </div>
    ) || <Loader />
  );
};

export default Podcast;
