import React, { FC } from "react";
import styles from "./styles.scss";
import LikeButton from "../like-button/LikeButton";
import { useLikePodcastMutation } from '../../../api/appAPI';

const PodcastDetails: FC<{
  image: string;
  title: string;
  topics: string[];
  liked: boolean;
  id: string
}> = ({ image, title, topics, liked, id }) => {
  const [like] = useLikePodcastMutation();
  const handleClick = () => {
    like({ id })
  };
  return (
    <div className={styles.podcastDetailsContainer}>
      <div className={styles.podcastImageContainer}>
        <img src={image} className={styles.plImage} />
      </div>
      <div className={styles.title}>
        <div>{title}</div>
        <LikeButton handleClick={handleClick} liked={liked} />
      </div>
      <div className={styles.topicsContainer}>
        {topics.map((topic, index) => {
          return (
            <div className={styles.topics}>
              {topic}
              {index !== topics.length - 1 && (
                <div className={styles.dots}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastDetails;
