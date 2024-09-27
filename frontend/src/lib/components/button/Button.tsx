import React, { FC } from 'react';
import styles from './styles.scss';

const Button: FC<{
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  margin?: string;
  icon?: string;
}> = ({ text, disabled, onClick, margin, icon }) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      style={{ margin }}
      onClick={onClick}
    >
      <span>{text}</span>
      {icon && (
        <img src={icon} />
      )}
    </button>
  );
};

export default Button;
