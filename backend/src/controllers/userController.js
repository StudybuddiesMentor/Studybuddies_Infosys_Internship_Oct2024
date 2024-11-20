import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../db/User.js";
import dotenv from "dotenv";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import cloudinary from 'cloudinary'; 

const cloudinaryV2 = cloudinary.v2;
dotenv.config();

const JWT_SECRET = "jwt_secret_key";

/**
 * @description User login function.
 * @param {Object} req - Request object containing email and password.
 * @param {Object} res - Response object to send the result.
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Ensure user is verified
        if (!user.is_verified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        // Generate JWT token with user details
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "10d" });

        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        });

        // Respond with success message
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @description Register a new user.
 * @param {Object} req - Request object containing user details like username, email, password.
 * @param {Object} res - Response object to send the result.
 */
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Hash password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in the database
        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "Account created successfully." });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @description Verify OTP for user registration.
 * @param {Object} req - Request object containing email and OTP.
 * @param {Object} res - Response object to send the result.
 */
export const verifyotp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if OTP is valid and not expired
        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.is_verified = true;
            user.otp = undefined; // Clear OTP
            user.otpExpires = undefined; // Clear expiration time
            await user.save();
            return res.status(200).json({ message: "User verified successfully!" });
        } else {
            return res.status(400).json({ message: "Invalid OTP or OTP expired." });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Verification failed." });
    }
};

/**
 * @description Send OTP for user email verification.
 * @param {Object} req - Request object containing email.
 * @param {Object} res - Response object to send the result.
 */
export const SendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Generate OTP
        function generateOtp() {
            return Math.floor(1000 + Math.random() * 9000);
        }
        const verifyotp = generateOtp();
        const otpExpire = Date.now() + 5 * 60 * 1000; // OTP expires in 5 minutes

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ID, // Your Gmail ID
                pass: process.env.GMAIL_PASS, // Your Gmail password or app-specific password
            },
            tls: {
                rejectUnauthorized: true,
            },
        });

        // Set mail options
        const mailOptions = {
            from: process.env.GMAIL_ID,
            to: user.email,
            subject: 'StudyBuddies - Verify with OTP',
            html: `<h3>Your One-Time Password (OTP): ${verifyotp}</h3>
                   <p>OTP is valid for 5 minutes. Do not share it with anyone.</p>`,
        };

        // Send OTP email
        await transporter.sendMail(mailOptions);

        // Save OTP and expiration time in the user document
        user.otp = verifyotp;
        user.otpExpires = otpExpire;
        await user.save();

        return res.status(200).json({ message: "OTP sent successfully!" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ message: "Failed to send OTP." });
    }
};

/**
 * @description Forgot password handler. Sends password reset link.
 * @param {Object} req - Request object containing email.
 * @param {Object} res - Response object to send the result.
 */
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found." });
        }

        // Generate password reset token (valid for 15 minutes)
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15min" });

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ID,
                pass: process.env.GMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });

        // Set mail options
        const mailOptions = {
            from: process.env.GMAIL_ID,
            to: user.email,
            subject: 'StudyBuddies - Reset Password',
            html: `<h3>Reset Your Password</h3>
                   <p>Click the link below to reset your password:</p>
                   <a href="http://localhost:5173/reset-password/${user._id}/${token}">Reset Password</a>
                   <p>This link is valid for only 15 minutes.</p>`,
        };

        // Send password reset email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email." });
            } else {
                return res.status(200).json({ message: "Password reset link sent successfully." });
            }
        });
    } catch (err) {
        console.error("Error in forgot-password:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @description Reset the user's password using a valid reset token.
 * @param {Object} req - Request object containing the user ID and reset token.
 * @param {Object} res - Response object to send the result.
 */
export const passwordReset = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        // Verify reset token
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid or expired reset token." });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Update the password in the database
            await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });

            return res.status(200).json({ message: "Password successfully updated." });
        });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "An error occurred while resetting the password." });
    }
};

/**
 * @description Update user profile information.
 * @param {Object} req - Request object containing updated profile details.
 * @param {Object} res - Response object to send the result.
 */
export const updateUserProfile = async (req, res) => {
    const { gender, email, fullName, username, professionalTitle, bio } = req.body;

    try {
        // Find user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Update user fields with provided data, use existing values if not provided
        user.gender = gender || user.gender;
        user.fullName = fullName || user.fullName;
        user.bio = bio || user.bio;
        user.professionalTitle = professionalTitle || user.professionalTitle;
        user.username = username || user.username;
        if (email) {
            user.email = email;
        }
        user.updatedAt = Date.now();

        // Save updated user information to database
        await user.save();

        return res.status(200).json({ message: "Personal information updated.", user });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

/**
 * @description Update user profile picture.
 * @param {Object} req - Request object containing uploaded file.
 * @param {Object} res - Response object to send the result.
 */
export const updateUserPic = async (req, res) => {
    const profilePic = req.file;

    try {
        // Find user by ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // If profile picture exists, delete the old one from cloudinary
        if (profilePic) {
            if (user.profilePic && user.profilePic.url) {
                const publicId = extractPublicIdFromUrl(user.profilePic.url);
                if (publicId) {
                    await cloudinaryV2.uploader.destroy(publicId);
                }
            }

            // Upload new profile picture to Cloudinary
            const url = profilePic.path; // Local file path
            const filename = profilePic.filename; // File name
            user.profilePic = { url, filename };
            await user.save();

            return res.status(200).json({ message: "Profile picture updated.", profilePicUrl: user.profilePic.url });
        }

        return res.status(400).json({ message: "No profile picture uploaded." });
    } catch (error) {
        console.error("Error updating profile picture:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

/**
 * @description Get the user's profile information.
 * @param {Object} req - Request object containing the user ID.
 * @param {Object} res - Response object to send the result.
 */
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ message: "User profile retrieved.", user });
    } catch (error) {
        console.error("Error retrieving user profile:", error);
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

/**
 * @description Logout user and clear the session cookie.
 * @param {Object} req - Request object containing the user's session.
 * @param {Object} res - Response object to send the result.
 */
export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.token; // Get token before clearing

        // If no token is found, user is not logged in
        if (!token) {
            return res.status(400).json({ message: "No token found, user not logged in." });
        }

        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        console.log(`User logged out successfully at ${new Date().toISOString()}`);

        return res.status(200).json({
            message: "User logged out successfully.",
            user: req.user ? { id: req.user.id, email: req.user.email } : null,
        });
    } catch (error) {
        console.error("Error logging out user:", error.message, { errorStack: error.stack });
        return res.status(500).json({
            message: "Error logging out user.",
            error: error.message,
        });
    }
};
