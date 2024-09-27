import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Caption from "../../components/caption/Caption";
import PlayerDisplay from "../../components/player-display/PlayerDisplay";
import PlayerSmallDisplay from "../../components/player-small-display/PlayerSmallDisplay";
import NothingHerePage from "../../sections/nothing-here/Nothing";

import styles from "./styles.scss";
import { useDispatch } from "react-redux";
import { removePodcast } from "../../../reducers/reducer";
import { useGetUserPodcastQuery } from '../../../api/appAPI';
import Loader from '../../components/loader/Loader';
import { months } from './dates';

const LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = localStorage.getItem("userName");
  const id = localStorage.getItem("userID");

  const { data, isLoading } = useGetUserPodcastQuery({ id});
  const onPodcastClick = () => {
    dispatch(removePodcast());
    navigate("/app/player/:id");
  };

  const getDate = (date: string) => {
    const dateVal = new Date(date);

    return `${dateVal.getDate()}  ${months[dateVal.getMonth()+1]}, ${dateVal.getFullYear()}`
  }

  const getTodayPodcast = useMemo(() => {
    const currentPodcast = data?.data[0];
    if ((new Date().getTime() - new Date(currentPodcast?.date).getTime())=== 0) {
      return currentPodcast;
    }
    return null;
  }, [data]);
  return (
    <>
    <div className={styles.container}>
      <Caption content={`Hi ${userName}`} />
      {data?.data?.length > 0 && (
        <div className={styles.listen}>
        {getTodayPodcast && (
          <div className={styles.listenNow}>
          <div className={styles.title}>Listen Now:</div>
          <div className={styles.divider} />
          <div className={styles.listenNowPlaylist} onClick={onPodcastClick}>
            <PlayerDisplay
              duration="1 min."
              title={getTodayPodcast?.title || `${getDate(getTodayPodcast?.date)} Podcast`}
              image="assets/bear.svg"
            />
          </div>
        </div>
        )}
        <div className={styles.listenAgain}>
          <div className={styles.title}>Listen Again:</div>
          <div className={styles.divider} />
          <div className={styles.listenAgainPlaylist}>
            {data?.data?.map((podcast: any) => (
              <PlayerSmallDisplay key={podcast.id} title={podcast.title || `${getDate(podcast.date)} Podcast`} date={getDate(podcast.date)} duration="1 min" />
            ))}
          </div>
        </div>
      </div>
      )}
      {data?.data?.length === 0 && <NothingHerePage />}
    </div>
    {isLoading && <Loader />}
    </>
  );
};

export default LandingPage;
