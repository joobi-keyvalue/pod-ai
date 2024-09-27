import React, { FC } from 'react';
import styles from './styles.scss';

const Button:FC<{text: string, disabled?: boolean }> = ({text, disabled}) => {
  return (
    <button className={styles.button} disabled={disabled}>{text}</button>
  )
};

export default Button;