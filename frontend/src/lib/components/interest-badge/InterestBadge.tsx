import React, { FC } from "react";
import styles from "./styles.scss";

const InterestBadge: FC<{ image: string, text: string, onSelect: any }> = ({ image, text, onSelect }) => {
  const handleSelect = () => {
    onSelect(text);
  }

  return (
    <div className={styles.badge} role="presentation" onClick={handleSelect}>
      <div className={styles.iconContainer}>
        <img src={image} alt="interest" className={styles.icon}/>
      </div>
      <div className={styles.title}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default InterestBadge;
