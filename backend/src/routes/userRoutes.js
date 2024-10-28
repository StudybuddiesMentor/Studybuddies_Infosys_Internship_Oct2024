import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
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

export default router;
