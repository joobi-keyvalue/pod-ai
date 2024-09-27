import React from 'react';
import styles from './styles.scss';
import Caption from '../../components/caption/Caption';

const NothingHerePage = () => {
  return (
    <div className={styles.container}>
      <Caption content="Hi Sruthy" />
      <div className={styles.nothingHereImage}>
        <img src="assets/nothing-here.svg" />
      </div>
      <div className={styles.nothingHereText}>
        We’re working our magic. <br></br>
        Please check back in later...
      </div>
    </div>
  )
}

export default NothingHerePage;
