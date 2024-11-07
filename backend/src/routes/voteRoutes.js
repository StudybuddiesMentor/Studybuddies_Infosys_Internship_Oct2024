import express from 'express';
import { upvoteDeck, downvoteDeck } from '../controllers/voteController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route POST /api/votes/:deckId/upvote
 * @desc Upvote a public deck
 * @access Private (User Auth)
 */
router.post('/:deckId/upvote', userAuthMiddleware, upvoteDeck);

/**
 * @route POST /api/votes/:deckId/downvote
 * @desc Downvote a public deck
 * @access Private (User Auth)
 */
router.post('/:deckId/downvote', userAuthMiddleware, downvoteDeck);

export default router;
