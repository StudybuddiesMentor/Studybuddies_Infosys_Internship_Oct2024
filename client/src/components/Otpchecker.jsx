import { useState, useEffect } from "react";
import "./MailVerification.css";
import logo from "@/assets/logo1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Otpchecker = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleOtpChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 4) {
      setOtp(value);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!isValidEmail(value)) {
      setError("Invalid email address");
    } else {
      setError("");
    }
    if (isOtpSent) {
      setIsOtpSent(false);
      setResendTimer(30);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsSendingOtp(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/send-otp",
        { email }
      );
      setSuccess(response.data.message);
      setError("");
      setIsOtpSent(true);
      setResendTimer(30);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to send OTP");
      setSuccess("");
      setIsOtpSent(false);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/verify-otp",
        { email, otp }
      );
      setSuccess(response.data.message);
      setError("");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
      setOtp("");
      setSuccess("");
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0 && isOtpSent) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer, isOtpSent]);

  return (
    <div className="page">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <form className="otp-form" onSubmit={handleSubmit}>
        <span className="mainHeading">Email Verification</span>
        <p className="otpSubheading">
          We will send a verification code to your email address
        </p>
        <button
          type="button"
          className="otp-btn"
          style={{ backgroundColor: isOtpSent ? "blue" : "green" }}
          onClick={handleSendOtp}
          disabled={isSendingOtp || isOtpSent}
        >
          {isSendingOtp
            ? "Sending..."
            : isOtpSent
            ? "OTP Sent"
            : "Send OTP"}
        </button>
        <div className="form-card-input-wrapper">
          <input
            className={`form-card-input ${error ? "input-error" : "input-success"}`}
            placeholder="_  _  _  _"
            maxLength="4"
            type="password"
            value={otp}
            onChange={handleOtpChange}
            autoComplete="off"
          />
          <div className="form-card-input-bg"></div>
        </div>
        <button
          className={`verifyButton ${isVerifying ? "verifying" : ""}`}
          type="submit"
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
        <p className="resendNote">
          Didn't receive the code?{" "}
          <button
            type="button"
            className="resend-Btn"
            onClick={handleSendOtp}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend Code in ${resendTimer}s` : "Resend Code"}
          </button>
        </p>
        {success && (
          <div className="success-message">
            {success}{" "}
            <button onClick={() => setSuccess("")}>x</button>
          </div>
        )}
        {error && (
          <div className="error-message">
            {error}{" "}
            <button onClick={() => setError("")}>x</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Otpchecker;
