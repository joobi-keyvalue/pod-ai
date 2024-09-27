import React from "react";
import styles from "./styles.scss";
import Caption from "../../components/caption/Caption";
import PlayerDisplay from "../../components/player-display/PlayerDisplay";
import { useGetLikedPodcastQuery } from '../../../api/appAPI';
import { getDate } from '../../utils/date';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { removePodcast } from '../../../reducers/reducer';
import { useDispatch } from 'react-redux';


const LikedPodcasts = () => {
  const id = localStorage.getItem('userID');
  const dispatch = useDispatch();
  const { data, isLoading } = useGetLikedPodcastQuery({ id });
  const navigate = useNavigate();
  const onPodcastClick = (id: string) => {
    dispatch(removePodcast());
    navigate(`/app/player/${id}`);
  };
  return (
    <>
    <div className={styles.container}>
      <div className={styles.caption}>
        <Caption content="Liked Podcasts." />
      </div>
      <div className={styles.likedSection}>
      {data?.data?.map((podcast: any) => (
          <PlayerDisplay
            key={podcast.id}
            image={"assets/bear.svg"}
            title={`${getDate(podcast?.date)} Podcast`}
            duration={'1 min'}
            onClick={() => onPodcastClick(podcast.id)}
          />
        ))}
      </div>
    </div>
    {isLoading && <Loader />}
    </>
  );
};

export default LikedPodcasts;
