import  { useState } from 'react';
import './MailVerification.css';

const MailVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleOtpChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 4) { 
            setOtp(value);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Entered OTP:', otp);
        
    };

    return (
        <form className="otp-form" onSubmit={handleSubmit}>
            <span className="mainHeading">Email Verification</span>
            <p className="otpSubheading">
                We will send a verification code to your email address
            </p>

            {/* Email Input Field */}
            <div className="inputContainer emailContainer">
                <input
                    required
                    type="email"
                    className="email-input"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </div>
            <button type="button" className="otp-btn">Send OTP</button>

            {/* OTP Input Field */}
            <div className="form-card-input-wrapper">
                <input
                    className="form-card-input"
                    placeholder="_  _  _  _"
                    maxLength="4"
                    type="text" 
                    value={otp}
                    onChange={handleOtpChange}
                />
                <div className="form-card-input-bg"></div>
            </div>

            {/* Verify Button */}
            <button className="verifyButton" type="submit">
                Verify
            </button>

            {/* Resend Code Section */}
            <p className="resendNote">
                Didn't receive the code? <button type="button" className="resend-Btn">Resend Code</button>
            </p>
        </form>
    );
};

export default MailVerification;
