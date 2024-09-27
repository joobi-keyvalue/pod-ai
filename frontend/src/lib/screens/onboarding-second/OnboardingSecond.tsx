import React from 'react';
import styles from './styles.scss';
import Button from '../../components/button/Button';

const OnBoardingSecond = () => {
  return (
    <div className={styles.container}>
      <img src="assets/logo.svg" className={styles.logo} />
      <img src="assets/onboarding-second.svg" className={styles.second} />
      <div className={styles.bottom}>
      <div className={styles.text}>
        <div className={styles.title}>News, Insights, and Stories. Just for You.</div>
        <div className={styles.subTitle}>Customize your podcast length, tone, and style. Stay informed on the go.</div>
      </div>
      <Button text='Get Started' />
      </div>
    </div>
  )
}

export default OnBoardingSecond;