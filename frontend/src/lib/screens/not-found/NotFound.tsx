import React from "react";
import styles from "./styles.scss"

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
        <img src="assets/not-found.svg" className={styles.image}/>
        <img src="assets/not-found-content.svg" className={styles.content}/>
    </div>
  );
};

export default NotFound;
