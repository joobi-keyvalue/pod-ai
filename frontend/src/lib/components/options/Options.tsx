import React, { FC, useEffect, useState } from 'react';
import styles from './styles.scss';

interface OptionsPropType {
  optionValues: { value: string; label: string }[];
}
const Options: FC<OptionsPropType> = ({ optionValues = [] }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(optionValues[0].value);
  }, [optionValues]);
  return (
    <div className={styles.options}>
      {optionValues?.map((option) => (
        <div
          className={`${styles.eachOption} ${
            selected === option.value && styles.selectedOption
          }`}
          onClick={() => setSelected(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default Options;
