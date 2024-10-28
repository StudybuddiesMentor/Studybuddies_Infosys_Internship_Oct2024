import { useState } from 'react';
import './MailVerification.css';
// import image from './assets/loginani.png';
import logo from '@/assets/logo1.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MailVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleOtpChange = (e) => {
        const { value } = e.target;
        if (/^\d*$/.test(value) && value.length <= 4) {
            setOtp(value);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/send-otp', { email });
            console.log('OTP sent successfully:', response.data);
            setSuccess(response.data.message);
            setError('');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(error.response?.data?.message || 'Failed to send OTP');
            setSuccess('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/verify-otp', { email, otp });
            console.log('OTP verification successful:', response.data);
            setSuccess(response.data.message);
            setError('');
            navigate('/login'); // Redirect on success
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.response?.data?.message || 'Verification failed');
            setOtp(''); // Clear the OTP field on error
            setSuccess('');
        }
    };

    return (
        <div className="page">
            {/* Logo container */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
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
                <button type="button" className="otp-btn" onClick={handleSendOtp}>Send OTP</button>
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
                    Didn't receive the code? <button type="button" className="resend-Btn" onClick={handleSendOtp}>Resend Code</button>
                </p>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default MailVerification;
