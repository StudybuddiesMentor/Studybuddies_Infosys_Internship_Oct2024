import express from 'express';
import { createTag, addTagToDeck, removeTagFromDeck, getTags } from '../controllers/tagController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route GET /api/tags
 * @desc Get all tags
 * @access Public
 */
router.get('/', getTags);

/**
 * @route POST /api/tags
 * @desc Create a new tag
 * @access Private (User Auth)
 */
router.post('/', userAuthMiddleware, createTag);

/**
 * @route POST /api/tags/:deckId
 * @desc Add a tag to a specific deck
 * @access Private (User Auth)
 */
router.post('/:deckId', userAuthMiddleware, addTagToDeck);

/**
 * @route DELETE /api/tags/:deckId
 * @desc Remove a tag from a specific deck
 * @access Private (User Auth)
 */
router.delete('/:deckId', userAuthMiddleware, removeTagFromDeck);

export default router;
