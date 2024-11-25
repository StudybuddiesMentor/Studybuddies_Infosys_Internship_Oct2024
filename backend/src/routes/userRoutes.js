import express from 'express';
import { 
   
  getUserProfile, 
  updateUserProfile,loginUser,registerUser,logoutUser,updateUserPic,
  verifyotp,forgotPassword,passwordReset,sendOtp,switchRole,addFavorites,removeFavorites,getFavorites
   
} from '../controllers/userController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';
import {upload,checkMinFileSize} from '../middlewares/ImageValidate.js'


const router = express.Router();

/**
 * @route POST /api/users/register
 * @desc Register a new user with OTP
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
router.put('/profile-pic', userAuthMiddleware, upload.single('profilePic'),checkMinFileSize, updateUserPic);

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


router.post('/logout',logoutUser);



/**
 * @route PUT /api/users/switchrole
 * @desc switching role from user to admin
 * @access Private (User Auth)
 */
 
router.put('/switchrole',userAuthMiddleware,switchRole);

/**
 * @route POST /api/decks/addfav/:id
 * @desc adding deck to user favorites
 * @access  Private (admin Auth)
 */
router.post('/addfav/:deckId',userAuthMiddleware,addFavorites);
/**
 * @route DELETE /api/decks/removefav/:id
 * @desc Remove deck from user favorites
 * @access  Private (admin Auth)
 */
router.delete('/removefav/:deckId',userAuthMiddleware,removeFavorites);
/**
 * @route  GET/api/decks/fav/:id
 * @desc get decks of user favorites
 * @access  Private (admin Auth)
 */
router.get('/fav',userAuthMiddleware, getFavorites);




export default router;
