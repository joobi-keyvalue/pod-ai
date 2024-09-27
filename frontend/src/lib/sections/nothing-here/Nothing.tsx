import React from 'react';
import styles from './styles.scss';

const NothingHerePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nothingHereImage}>
        <img src='assets/nothing-here.svg' />
      </div>
      <div className={styles.dots}>
        <img src='assets/dot.svg' className={styles.dot1} />
        <img src='assets/dot.svg' className={styles.dot2} />
        <img src='assets/dot.svg' className={styles.dot3} />
        <img src='assets/dot.svg' className={styles.dot4} />
      </div>
      <div className={styles.nothingHereText}>
        We’re working our magic. <br></br>
        Please check back in later...
      </div>
    </div>
  );
};

export default NothingHerePage;
