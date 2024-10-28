import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/User.js"

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
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

// Log in an existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get the authenticated user's profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update the authenticated user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update username and email if provided
    if (username) user.username = username;
    if (email) user.email = email;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();
    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};