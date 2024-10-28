import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile, 
  sendOtp, 
  forgotPassword,
  verifyOtp, 
  passwordReset 
} from '../controllers/userController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Register a new user
 * @access Public
 */
router.post('/register', registerUser);

/**
 * @route POST /api/users/login
 * @desc Login user and return a JWT token
 * @access Public
 */
router.post('/login', loginUser);

/**
 * @route GET /api/users/profile
 * @desc Get user profile
 * @access Private (User Auth)
 */
router.get('/profile', userAuthMiddleware, getUserProfile);

/**
 * @route PUT /api/users/profile
 * @desc Update user profile
 * @access Private (User Auth)
 */
router.put('/profile', userAuthMiddleware, updateUserProfile);

/**
 * @route POST /api/users/send-otp
 * @desc Send OTP for account verification or password reset
 * @access Public
 */
router.post('/send-otp', sendOtp);

/**
 * @route POST /api/users/verify-otp
 * @desc Verify the OTP for user verification
 * @access Public
 */
router.post('/verify-otp', verifyOtp);


/**
 * @route POST /api/users/forgot-password
 * @desc Send a password reset link to the user's email
 * @access Public
 */
router.post('/forgot-password', forgotPassword);

/**
 * @route POST /api/users/reset-password/:id/:token
 * @desc Reset password using the reset token
 * @access Public
 */
router.post('/reset-password/:id/:token', passwordReset);

export default router;
