import React, { FC } from 'react';
import styles from './styles.scss';

interface BottomCalloutPropType {
  open?: boolean;
  children: JSX.Element;
}
const BottomCallout: FC<BottomCalloutPropType> = ({ open, children }) => {
  return (
    <div className={`${styles.container} ${open && styles.open}`}>
      <div className={styles.wrapper}>
      {children}
      <div  className={styles.bottomLine}>
        <img src='assets/bottom-line.svg' />
      </div>
      </div>
    </div>
  );
};

export default BottomCallout;
