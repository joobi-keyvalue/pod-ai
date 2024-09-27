import React from 'react';
import styles from './styles.scss';
import { OPTIONS } from './constants';


const PhoneInput = () => {

  return (
    <div className={styles.container}>
      {OPTIONS.map((option) => (
        <div className={`${styles.item} ${option.second === 'special' && styles.special}`}>
          <div>{(option.first !== 'back' && option.first) || <img src="assets/delete.svg" className={styles.deleteIcon} />}</div>
          
          {(option.second !== '' && option.second !== 'special') && (
            <div className={styles.second}>{option.second !== '.' && option.second}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default PhoneInput;