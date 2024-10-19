import  { useState } from 'react';
import './MailVerification.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from './assets/fly.jpg';
import logo from './assets/logo.png';

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
            const response = await axios.post('http://localhost:8000/send-otp', {
                email, // Send email to server to generate and send OTP
            });
            console.log('OTP sent successfully:', response.data);
            setSuccess(response.data.message); // Set success message
            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(error.response ? error.response.data.message : 'Failed to send OTP'); // Handle error
            setSuccess(''); // Clear any previous success message
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission
        try {
            const response = await axios.post('http://localhost:8000/verify-otp', {
                email, // Sending the user's email
                otp,   // Sending the OTP entered by the user
            });
            console.log('OTP verification successful:', response.data);
            setSuccess(response.data.message); // Set success message
            navigate('/login');// Handle successful verification response
        } catch (error) {
            // Handle error response
            console.error('Error verifying OTP:', error);
            setError(error.response ? error.response.data.message : 'Verification failed'); // Handle error
            setSuccess(''); // Clear any previous success message
        }
    };
    

    return (
        <div className="page">
            {/* Logo container */}
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
                <span className='studybuddy'>StudyBuddy</span>
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
            <div className="fly-img">
                <img src={image} alt="Flying image" />
                <div className="quote-container">
                    <p className="quote-text">"Focus on the journey, not the destination. The learning is in the doing." <br />– StudyBuddy</p>
                </div>
            </div>
        </div>
    );

}

export default MailVerification;