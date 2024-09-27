import React, { FC } from 'react';
import { TextInputPropType } from './types';
import styles from './styles.scss'

const TextInput: FC<TextInputPropType> = (props) => {
  const { height = '22px', placeholder = 'Enter', icon, width = '', type = "text", onClick} = props;

  return (
    <div className={styles.container} style={{ height, width }} onClick={onClick}>
      <input className={styles.textContent} placeholder={placeholder} type={type}/>
      {icon && <img src={icon} className={styles.iconWrapper} />}
    </div>
  )
}

export default TextInput;