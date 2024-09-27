import React from 'react';
import styles from './styles.scss';
import TellUsInterestSection from '../../sections/tellUsInterest/TellUsInterest';
import Caption from '../../components/caption/Caption';

const Topics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.caption}><Caption content='Set Topics' /></div>
      <div className={styles.interestSection}>
        <TellUsInterestSection buttonText='Save' goTo='/app' />
      </div>
    </div>
  )
}

export default Topics;
