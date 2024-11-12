import express from 'express';
import { 
   
  getUserProfile, 
  updateUserProfile,loginUser,registerUser,logoutUser,updateUserPic,
  verifyotp,forgotPassword,passwordReset,SendOtp
   
} from '../controllers/userController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';
import {upload,checkMinFileSize} from '../middlewares/ImageValidate.js'


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
 * @desc Update user additional information
 * @access Private (User Auth)
 */
router.put('/profile', userAuthMiddleware, updateUserProfile);

/**
 * @route PUT /api/users/profile-pic
 * @desc Update user profilepic 
 * @access Private (User Auth)
 */
router.put('/profile-bio', userAuthMiddleware, upload.single('profilePic'),checkMinFileSize, updateUserPic);

/**
 * @route POST /api/users/send-otp
 * @desc Send OTP for account verification or password reset
 * @access Public
 */
router.post('/send-otp', SendOtp);

/**
 * @route POST /api/users/verify-otp
 * @desc Verify the OTP for user verification
 * @access Public
 */
router.post('/verify-otp', verifyotp);


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

/**
 * @route GET /api/users/logout
 * @desc Logout user with release of token
 * @access Public
 */


router.get('/logout',logoutUser);

export default router;
