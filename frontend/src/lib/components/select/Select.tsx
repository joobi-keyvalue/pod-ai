import React, { FC } from 'react';
import styles from './styles.scss';

interface SelectPropType {
  options: { value: string, label: string }[]
}
const Select:FC<SelectPropType> = ({ options }) => {
  return (
    <div className={styles.selectWrapper}>
      <select>
        {options?.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;