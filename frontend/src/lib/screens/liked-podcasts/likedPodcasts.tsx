import React from "react";
import styles from "./styles.scss";
import Caption from "../../components/caption/Caption";
import PlayerDisplay from "../../components/player-display/PlayerDisplay";

const podcastData = [
  {
    image: "assets/bear.svg",
    title: "Bears, MMA & Global Warming",
    duration: "30 min",
  },
  {
    image: "assets/bear.svg",
    title: "Golang, Elections & GOT",
    duration: "25 min",
  },
  {
    image: "assets/bear.svg",
    title: "Theism, Kanye & Indian Folk",
    duration: "35 min",
  },
];

const LikedPodcasts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.caption}>
        <Caption content="Liked Podcasts." />
      </div>
      <div className={styles.likedSection}>
      {podcastData.map((podcast, index) => (
          <PlayerDisplay
            key={index}
            image={podcast.image}
            title={podcast.title}
            duration={podcast.duration}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedPodcasts;
