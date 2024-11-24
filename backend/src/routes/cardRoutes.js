import express from 'express';
import { createCard, updateCard, deleteCard,getCards,cardsCount } from '../controllers/cardController.js';
import { userAuthMiddleware } from '../middlewares/auth.js';

const router = express.Router();


/**
 * @route GET /api/cards/:deckId
 * @desc get all the cards of specific deck
 * @access Private (User Auth)
 */

router.get('/:deckId',userAuthMiddleware,getCards);

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


/**
 * @route GET /api/cards/:deckId/
 * @desc GET COUNT OF FLASH CARDS IN DECK
 * @access Private (User Auth)
 */

router.get('/cardscount/:deckId',userAuthMiddleware,cardsCount);

export default router;
