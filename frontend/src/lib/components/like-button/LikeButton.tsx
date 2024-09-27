import React, { FC } from "react";
import styles from "./styles.scss";
const LikeButton: FC<{ handleClick: any; liked: boolean }> = ({
  handleClick,
  liked,
}) => {
  return (
    <div role="presentation" onClick={handleClick} className={styles.icon} >
      {liked ? (
        <img src="assets/filled-heart-icon.svg"/>
      ) : (
        <img src="assets/heart-icon.svg" />
      )}
    </div>
  );
};

export default LikeButton;
