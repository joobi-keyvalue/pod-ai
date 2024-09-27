import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/TextInput";
import styles from "./styles.scss";
import Button from "../../components/button/Button";
import BottomCallout from "../../components/bottom-callout/BottomCallout";
import PhoneInput from "../../components/phone-input/PhoneInput";
import { useVerifyOtpMutation } from "../../../api/verifyOtpAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const OTP = () => {
  const [open, setOpen] = useState(false);
  const [otp, setOTP] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { phoneNumber = "1234567890", userDetails = {} } = state || {};
  const [verifyOtp, { isSuccess, status, data }] = useVerifyOtpMutation();

  useEffect(() => {
    if (isSuccess) {
      userDetails?.data?.is_existing_user
        ? navigate("/app", {
            state: {
              data,
            },
          })
        : navigate("/onboarding/profile", {
            state: {
              phoneNumber,
            },
          });
    } else {
      if (status == "rejected") {
        toast("Invalid OTP");
      }
    }
  }, [isSuccess, status, data]);

  const handleVerify = () => {
    verifyOtp({ otp: otp });
    setOpen(false);
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.back}
        onClick={() => navigate("/onboarding/signup")}
      >
        <img src="assets/back.svg" />
      </div>
      <div className={styles.title}>Enter OTP</div>
      <div className={styles.divider} />
      <div className={styles.info}>
        We have sent a code to your phone <span>{phoneNumber.slice(0, 2)}</span>
        ****<span>{phoneNumber.slice(6, 10)}</span>.
      </div>
      <div className={styles.text}>
        <TextInput
          placeholder="Enter your code here"
          onClick={() => setOpen(!open)}
          onChange={setOTP}
        />
      </div>
      <i className={styles.noOTP}>Didn’t Receive OTP?</i>

      <div className={`${styles.bottomButton} ${open && styles.open}`}>
        <Button
          text="Verify"
          disabled={otp?.length !== 4}
          onClick={handleVerify}
        />
      </div>
      <BottomCallout open={open}>
        <PhoneInput />
      </BottomCallout>
      <div className={styles.toast}>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default OTP;
