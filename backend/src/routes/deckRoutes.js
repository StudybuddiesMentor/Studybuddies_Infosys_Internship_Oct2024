import express from 'express';
import { createDeck, getDecks, getDeckById, updateDeck, deleteDeck } from '../controllers/deckController.js';
import { userAuthMiddleware, adminAuthMiddleware } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route GET /api/decks
 * @desc Get all decks (Public & Private based on access level)
 * @access Public
 */
router.get('/', getDecks);

/**
 * @route GET /api/decks/:id
 * @desc Get a single deck by its ID
 * @access Public
 */
router.get('/:id', getDeckById);

/**
 * @route POST /api/decks
 * @desc Create a new deck
 * @access Private (User Auth)
 */
router.post('/', userAuthMiddleware, createDeck);

/**
 * @route PUT /api/decks/:id
 * @desc Update a deck by its ID
 * @access Private (User Auth)
 */
router.put('/:id', userAuthMiddleware, updateDeck);

/**
 * @route DELETE /api/decks/:id
 * @desc Delete a deck by its ID
 * @access Private (Admin Auth)
 */
router.delete('/:id', adminAuthMiddleware, deleteDeck);

export default router;
