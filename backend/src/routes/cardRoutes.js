import express from 'express';
import { createCard, updateCard, deleteCard } from '../controllers/cardController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @route POST /api/cards/:deckId
 * @desc Create a new card within a specific deck
 * @access Private (User Auth)
 */
router.post('/:deckId', userAuthMiddleware, createCard);

/**
 * @route PUT /api/cards/:deckId/:cardId
 * @desc Update a card in a specific deck
 * @access Private (User Auth)
 */
router.put('/:deckId/:cardId', userAuthMiddleware, updateCard);

/**
 * @route DELETE /api/cards/:deckId/:cardId
 * @desc Delete a card in a specific deck
 * @access Private (User Auth)
 */
router.delete('/:deckId/:cardId', userAuthMiddleware, deleteCard);

export default router;
