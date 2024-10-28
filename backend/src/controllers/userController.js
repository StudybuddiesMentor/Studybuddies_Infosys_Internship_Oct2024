import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../db/User.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const GMAIL_ID = process.env.GMAIL_ID;
const GMAIL_PASS = process.env.GMAIL_PASS;

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_ID,
    pass: GMAIL_PASS,
  },
});

// Utility to generate OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};



// Login user and return JWT token
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true });
    
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Send OTP for email verification
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: "User not found." });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
    await user.save();

    console.log("Sending OTP to:", email, "with OTP:", otp);

    await transporter.sendMail({
      from: process.env.GMAIL_ID,  // Using environment variable
      to: email,
      subject: "Your OTP for Account Verification",
      html: `<h3>Your OTP: ${otp}</h3><p>This OTP is valid for 5 minutes.</p>`,
    });

    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Error in sending OTP:", error);
    res.status(500).json({ message: "Server error. Could not send OTP." });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if OTP is correct and not expired
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // OTP is valid, mark the user as verified (you could set a flag or take any other action)
    user.isVerified = true;
    user.otp = undefined; // Clear OTP after verification
    user.otpExpires = undefined; // Clear OTP expiry after verification
    await user.save();

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error in OTP verification:", error);
    res.status(500).json({ message: "Server error. Could not verify OTP." });
  }
};


// Forgot password functionality
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).json({ message: "User not found." });

    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:5173/reset-password/${user._id}/${resetToken}`;
    
    await transporter.sendMail({
      from: GMAIL_ID,
      to: email,
      subject: "Password Reset Request",
      html: `<h3>Password Reset Request</h3><p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`,
    });

    res.status(200).json({ message: "Password reset link sent successfully." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server error. Could not send password reset link." });
  }
};

// Reset password functionality
export const passwordReset = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    jwt.verify(token, JWT_SECRET, async (err) => {
      if (err) return res.status(400).json({ message: "Invalid or expired token." });

      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found." });

      user.password = await bcrypt.hash(password, 10);
      await user.save();

      res.status(200).json({ message: "Password reset successfully." });
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Server error. Could not reset password." });
  }
};

// Get authenticated user's profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update authenticated user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found." });

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
