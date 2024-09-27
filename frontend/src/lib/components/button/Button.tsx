import React, { FC } from 'react';
import styles from './styles.scss';

const Button:FC<{text: string, disabled?: boolean, onClick?: () => void }> = ({text, disabled, onClick}) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>{text}</button>
  )
};

export default Button;