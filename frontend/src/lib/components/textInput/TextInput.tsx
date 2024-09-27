import React, { FC, MouseEvent } from 'react';
import { TextInputPropType } from './types';
import styles from './styles.scss';

const TextInput: FC<TextInputPropType> = (props) => {
  const {
    height = '22px',
    placeholder = 'Enter',
    icon,
    width = '',
    type = 'text',
    fontSize,
    onClick,
    onChange = () => {},
    padding,
  } = props;

  return (
    <div
      className={styles.container}
      style={{ height, width, padding, fontSize }}
      onClick={onClick}
    >
      {type !== 'textarea' && (
        <input
          className={styles.textContent}
          placeholder={placeholder}
          type={type}
          onChange={(e: any) => onChange(e.target.value)}
        />
      )}
      {type === 'textarea' && (
        <textarea
          className={styles.textContent}
          placeholder={placeholder}
          onChange={(e: any) => onChange(e.target.value)}
        />
      )}
      {icon && <img src={icon} className={styles.iconWrapper} />}
    </div>
  );
};

export default TextInput;
