import React from 'react';
import styles from './styles.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <img src="assets/loader/circle-1.svg" className={styles.circle1} />
        <img src="assets/loader/circle-2.svg" className={styles.circle2} />
        <img src="assets/loader/circle-3-star.svg" className={styles.circle3} />
        <img src="assets/loader/mic.svg" className={styles.mic} />
      </div>
    </div>
  )
}

export default Loader;