import React, { useState } from "react";
import styles from "./styles.scss";
import Caption from "../../components/caption/Caption";
import PodcastDetails from "../../components/podcast-details/PodcastDetails";
import Player from "../../components/player/Player";

const Podcast = () => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike((prev) => !prev);
  };
  const handleShowTranscript = () => {
    console.log("show transcript");
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
          audio={
            "https://keycode-wetestinprod.s3.ap-south-1.amazonaws.com/podcasts/final_podcast_1727411669.mpga?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiAGzRHL%2BnSyDcDTgq7woOok0TPOahlSC32K76tUHqSPOQIhAK2HBSZJSatWDh8BAbihW5TPSkwamjpq3lH%2FmSzPg9wGKqwCCCYQAhoMNDAyMzM4MTg3MzQ0IgzAqHpUnhYmAS2%2BmhIqiQJhaqpIDJNOp01SLJLXob5p%2BwPtTt3hN8TBXh%2F8csXlHuhh5MemgPuNJXVQ7iCbJ9CVRW9No2rzLF%2FwTpEpmomkSIbZzWRRSkN0bKX%2Fi64wqUbqEi37eUjyRP8P8XCkqy2sjmzsD51pE0W8Gdsih6Vy8ULKtkyYHWDofv5pBbTgog33B1ZQ0%2BsTC92V5y7uf0psvChgXAzXRgYI5Kd1fCHvPGehxBpBe8EeBkr%2BlJSgt506hsAHW2SnJHFPkkQX9EJDHAw8Oe%2Fo0XK6DiNXJOMIjpBesd%2FYuAMGSowgaUhWg%2BexAy7TlKuTLYUFjgamIzNq8lTc9cFB7o9ueCtTghcYERNDOSXh5r7zMKX82LcGOt8BpbkGLPQ077JG%2FhUGcEXj3hMih2tIY7BcLRZZ9kKjrZvwRrCorA7Dl71htkwI0eG8AUt%2FHqcVuGjMK15q7TF%2BivT7nXUoM2HgyHb%2FQBLGoaW7P%2FRs%2BQ7%2F2398CfaiCmht0ru2KOCNv0q95E8mDKJPP4Zt8QKKJ9sHkTFftOIV4KgxbW30j0Ysj9j37Q6KxzlJgk46SS0hIWcslbrRmG8NK8eGGSk2JlY53snvHzKP1QQBzXSdzSNaCRYS3F%2BIHoY5mzI68fYl4xI5kkac9jWYtqwVGwhUZ%2BtKYtVyRfaRiA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240927T082048Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAV3LJZRBIH3PSQZLU%2F20240927%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=0a1c8c0bb4ef609aeccf87cd5dd6caaa670ca9fe4508248c73bf7206f30d5cb3"
          }
        />
      </div>
      <div onClick={handleShowTranscript}>
        <img src="assets/down-icon.svg" />
      </div>
    </div>
  );
};

export default Podcast;
