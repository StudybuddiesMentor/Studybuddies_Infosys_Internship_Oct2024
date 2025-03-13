import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as dotenv from 'dotenv';
dotenv.config();
const backendUrl = process.env.backendUrl;

function Modal({ message, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md p-8 transform transition-transform duration-300 scale-95 animate-pop-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m1 9a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-center text-lg font-medium text-gray-800 mb-6">
          {message}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-xl font-semibold hover:from-green-500 hover:to-blue-600 shadow-md transition-transform transform hover:scale-105"
        >
          OK
        </button>
      </div>
      <style>{`
        .animate-pop-up {
          animation: pop-up 0.4s ease-out;
        }

        @keyframes pop-up {
          0% {
            transform: scale(0.9);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter your email");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(`${backendUrl}/api/users/forgot-password`, {
        email,
      });
      setShowModal(true);
      setError("");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="page">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
        {/* Image section with overlay */}
        <div className="relative w-full md:w-1/2 flex justify-center items-center mb-8 md:mb-0 z-0">
          <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
          <img
            src="https://raw.githubusercontent.com/StudybuddiesMentor/Studybuddies_Infosys_Internship_Oct2024/refs/heads/main/client/src/assets/background_images/confuse.jpg"
            alt="Confused person with a lock"
            className="w-full h-auto object-cover object-center z-0"
          />
        </div>

        {/* Forgot Password Box */}
        <div className="login-container">
          <h3 className="login-header">Forgot Password</h3>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Enter your email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`btn-submit ${isLoading ? "bg-gray-400 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center items-center space-x-2">
                  <span className="loader animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
          <p
            className="text-center text-blue-600 mt-6 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </p>
        </div>
      </div>

      {showModal && (
        <Modal
          message="We sent an email to your registered address with a link to get back into your account."
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default ForgotPassword;
