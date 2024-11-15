import express from 'express';
import { createDeck, getDecks, getDeckById, updateDeck, deleteDeck,getPublicDecks,
  RemoveAllDecks,countDecks,deckImage,deckImageUpdate } from '../controllers/deckController.js';
import { userAuthMiddleware, adminAuthMiddleware } from '../middlewares/auth.js';
import Deck from '../models/Deck.js';
import { deckImageUpload,checkMinFileSize } from '../middlewares/ImageValidate.js';

const router = express.Router();

/**
 * @route GET /api/decks
 * @desc Get all decks of user
 * @access Private (User Auth)
 */
router.get('/',userAuthMiddleware, getDecks);

/**
 * @route GET /api/decks/exploredeck
 * @desc Get all decks for explorepage
 * @access Private (User Auth)
 */


router.get('/exploredeck',userAuthMiddleware,getPublicDecks);
/**
 * @route GET /api/decks/alldecks
 * @desc Get count of decks 
 * @access Private (User Auth)
 */

router.get("/alldecks",userAuthMiddleware,countDecks)

/**
 * @route GET /api/decks/:id
 * @desc Get a single deck by its ID
 * @access Private (User Auth)
 */
router.get('/:id',userAuthMiddleware, getDeckById);

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
router.delete('/:id', userAuthMiddleware, deleteDeck);
/**
 * @route DELETE /api/decks/removealldecks
 * @desc Delete all the user decks 
 * @access  Private (User Auth)
 */

router.delete("/removealldecks",userAuthMiddleware,RemoveAllDecks);

/**
 * @route POST /api/decks/deckimage
 * @desc to upload deck image  
 * @access  Private (User Auth)
 */

router.post('/deckimage',userAuthMiddleware,deckImageUpload.single('deck_image'),checkMinFileSize,deckImage);

/**
 * @route PUT /api/decks/deckimage/:id
 * @desc upldate deck image  
 * @access  Private (User Auth)
 */


router.put('/deckimage/:id',userAuthMiddleware,deckImageUpload.single('deck_image'),checkMinFileSize,deckImageUpdate);;








export default router;

