import React, { FC } from "react";
import styles from "./styles.scss";
import LikeButton from "../like-button/LikeButton";

const PodcastDetails: FC<{
  image: string;
  title: string;
  topics: string[];
  handleLike: any;
  liked: boolean;
}> = ({ image, title, topics, handleLike, liked }) => {
  const handleClick = () => {
    console.log("clicked");
    handleLike(!liked);
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
