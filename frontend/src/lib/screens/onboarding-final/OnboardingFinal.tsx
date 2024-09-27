import React from "react";
import styles from "./styles.scss";
import Button from "../../components/button/Button";
import { useLocation, useNavigate } from "react-router-dom";

const OnBoardingFinal = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log("state", state);
  return (
    <div className={styles.container}>
      <img src="assets/final-step.svg" className={styles.image} />
      <img src="assets/all-set.svg" />
      <div className={styles.buttonNext} onClick={()=>navigate('/app/')}>
        <Button text="Let's Listen" icon="assets/right-arrow.svg" />
      </div>
    </div>
  );
};

export default OnBoardingFinal;
