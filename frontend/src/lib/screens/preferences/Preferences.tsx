import React from 'react';
import styles from './styles.scss';
import Caption from '../../components/caption/Caption';
import CustomizeSection from '../../sections/customize/Customize';

const Preferences = () => {
  return (
    <div className={styles.container}>
      <div className={styles.caption}><Caption content='Preferences' /></div>
      <div className={styles.interestSection}>
        <CustomizeSection buttonText='Save' />
      </div>
    </div>
  )
}

export default Preferences;
