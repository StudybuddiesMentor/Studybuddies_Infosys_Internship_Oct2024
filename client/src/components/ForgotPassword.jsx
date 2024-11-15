import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// ForgotPassword component to handle password reset requests
function ForgotPassword() {
   // State for storing email, error, and success messages
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Function to handle password reset form submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Check if email is empty
    if (email === '') {
      setError('Please enter your email');
      setSuccess('');
      return;
    }

    try {
      // Send POST request to reset password
      const response = await axios.post('http://localhost:9000/api/users/forgot-password', {
        email,
      });

      console.log(response.data);
      // Show success message and clear form
      setSuccess('Password reset link sent! Check your email.');
      setError('');
      setEmail('');
    } catch (err) {
      console.error(err);
      // Show error message if request fails
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      setSuccess('');
    }
  };
   // Function to navigate back to the login page
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
       {/* Card for forgot password form */}
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg transform transition duration-500 hover:scale-105">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Forgot Password</h3>
         {/* Display error message if there's an error */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {/* Display success message if request is successful */}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email
            </label>
            {/* Email input field */}
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
          {/* Submit button for sending reset link */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition duration-200"
          >
            Send Reset Link
          </button>
        </form>
        {/* Link to navigate back to login page */}
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
