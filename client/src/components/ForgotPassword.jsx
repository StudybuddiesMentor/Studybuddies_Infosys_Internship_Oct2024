import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      const response = await axios.post('http://localhost:9000/forgot-password', {
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg transform transition duration-500 hover:scale-105">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Forgot Password</h3>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-shadow"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
        <p
          className="text-center text-green-600 cursor-pointer mt-6 hover:underline transition duration-150"
          onClick={handleBackToLogin}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
