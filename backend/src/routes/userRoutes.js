import express from 'express';
<<<<<<< HEAD
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';
=======
import { 
   
  getUserProfile, 
  updateUserProfile,loginUser,registerUser,logoutUser,updateUserBio,
  verifyotp,forgotPassword,passwordReset,SendOtp
   
} from '../controllers/userController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';
import ValidateSize from '../middlewares/ImageValidate.js'

import multer from 'multer'
import { storage } from '../cloudConfig.js'

const MAX_SIZE = 5 * 1024 * 1024;
const upload = multer({ storage:storage,
  limits: {
    fileSize: MAX_SIZE, // Maximum file size in bytes //
    }
  });
>>>>>>> origin/main

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
<<<<<<< HEAD
 * @desc Update user profile
=======
 * @desc Update user additional information
>>>>>>> origin/main
 * @access Private (User Auth)
 */
router.put('/profile', userAuthMiddleware, updateUserProfile);

<<<<<<< HEAD
=======
/**
 * @route PUT /api/users/profile-pic
 * @desc Update user profilepic 
 * @access Private (User Auth)
 */
router.put('/profile-bio', userAuthMiddleware, upload.single('profilePic'),ValidateSize, updateUserBio);

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

>>>>>>> origin/main
export default router;
