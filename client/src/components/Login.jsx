import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "@/assets/loginani.png";
import logo from "@/assets/logo1.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      setSuccess("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/api/users/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);

      setSuccess("Login successful! Redirecting...");
      setError("");
      setTimeout(() => {
        navigate("/main-page");
      }, 2000);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
      setSuccess("");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };
  const handleMailVerification = () => {
    navigate("/mail-verification");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="page">
      {/* Logo container */}
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="login-right">
        <div className="login-container">
          <h3 className="login-header">Sign in to Your Account</h3>

          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login-links">
              <button
                type="button"
                className="btn-links"
                onClick={handleForgotPassword}
              >
                Forgot Your Password?
              </button>
              <button
                type="button"
                className="btn-links"
                onClick={handleRegister}
              >
                Need an Account?
              </button>
            </div>
            <button type="submit" className="btn-submit">
              Sign In
            </button>
            <button
              type="button"
              className="btn-links p-5"
              onClick={handleMailVerification}
            >
              Registered not verified ?
            </button>
          </form>
        </div>
      </div>
      <div className="fly-img">
        <img src={image} alt="Flying image" />
        <div className="quote-container">
          <p className="quote-text">
            "Dream big, work hard, stay focused, and surround yourself with good
            people." <br />– StudyBuddy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
