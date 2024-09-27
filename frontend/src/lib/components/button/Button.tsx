import React, { FC } from 'react';
import styles from './styles.scss';

const Button: FC<{
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: string;
}> = ({ text, disabled, onClick, icon }) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
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
