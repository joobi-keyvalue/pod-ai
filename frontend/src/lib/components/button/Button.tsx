import React, { FC } from 'react';
import styles from './styles.scss';

const Button:FC<{text: string, disabled?: boolean, onClick?: () => void,margin?: string }> = ({text, disabled, onClick, margin}) => {
  return (
    <button className={styles.button} disabled={disabled} style={{ margin }} onClick={onClick}>{text}</button>
  )
};

export default Button;