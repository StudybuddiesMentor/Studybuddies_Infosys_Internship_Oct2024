import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './ForgotPassword.css'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (email === '') {
      setError('Please enter your email');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/forgot-password', {
        email,
      });

      console.log(response.data); 
      setSuccess('Password reset link sent! Check your email.');
      setError('');
      setEmail('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setSuccess('');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex-center vh-100">
      <div className="container">
        <h3 className="title">Forgot Password</h3>
        {error && <p className="text-danger">{error}</p>}
        {success && <p className="text-success">{success}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Enter your email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Reset Link</button>
        </form>
        <p className="back-link" onClick={handleBackToLogin}>
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
