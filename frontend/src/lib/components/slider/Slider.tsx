import React, { FC, useEffect, useState } from 'react';
import styles from './styles.scss';

interface SliderPropType {
  step?: number,
  min?: number,
  max?: number,
  list?: string,
  steps?: {label: string, value: number}[]
}
const Slider:FC<SliderPropType> = ({ step = 1, min, max, list, steps = [] }) => {
  const [value , setValue] = useState('1');
  const [left, setLeft] = useState('0');

  useEffect(() => {
    const index = steps.findIndex((e) => String(e.value) === (value));
    console.log(index);
    setLeft(`${(271 * (index) / (steps.length - 1) - 10)}px`);
  }, [value]);
  return (
    <div className={styles.slider}>
      <input className={styles.inputSlider} type="range" min={min} max={max} list={list} step={step} onChange={(e) => {
        setValue(e.target.value)
      }} />
      <datalist id={list} className={styles.dataListWrapper}>
        {steps?.map((eachStep) => (
          <option value={eachStep.value} label={eachStep.label} className={styles.eachOption}></option>
        ))}
      </datalist>
      <img className={styles.displaySection} src="assets/slider.svg" />
      <div style={{ left }}className={styles.thumb}>
        <div className={styles.innerThumb}>{Number(value) === 1 ? Number(value) : Number(value) - 1}</div>
      </div>
    </div>
  )
}

export default Slider;
