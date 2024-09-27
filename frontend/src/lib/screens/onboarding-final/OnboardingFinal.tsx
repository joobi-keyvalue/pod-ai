import React from 'react';
import styles from './styles.scss';
import Button from '../../components/button/Button';

const OnBoardingFinal = () => {
  return (
    <div className={styles.container}>
      <img src="assets/final-step.svg" className={styles.image} />
      <img src="assets/all-set.svg" />
      <Button text="Let's Listen" icon="assets/right-arrow.svg" />
    </div>
  )
}

export default OnBoardingFinal;
