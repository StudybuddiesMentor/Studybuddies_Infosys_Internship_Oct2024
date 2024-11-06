import express from 'express';
import { createDeck, getDecks, getDeckById, updateDeck, deleteDeck,getPublicDecks,RemoveAllDecks,countDecks } from '../controllers/deckController.js';
import { userAuthMiddleware, adminAuthMiddleware } from '../middlewares/auth.js';
import Deck from '../models/Deck.js';


const router = express.Router();

/**
 * @route GET /api/decks
 * @desc Get all decks of user
 * @access Public
 */
router.get('/',userAuthMiddleware, getDecks);

/**
 * @route GET /api/decks/exploredeck
 * @desc Get all decks for explorepage
 * @access Public
 */


router.get('/exploredeck',userAuthMiddleware,getPublicDecks);


router.get("/alldecks",userAuthMiddleware,countDecks)

/**
 * @route GET /api/decks/:id
 * @desc Get a single deck by its ID
 * @access Public
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
 * @access  user can do it
 */

router.delete("/removealldecks",userAuthMiddleware,RemoveAllDecks);



router.get('/', async (req, res) => {
    try {
      const decks = await Deck.find();
      res.json(decks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching decks' });
    }
  });
  
  // Increment likes for a deck
  router.put('/:id/like', async (req, res) => {
    try {
      const deck = await Deck.findById(req.params.id);
      if (deck) {
        deck.likes += 1;
        await deck.save();
        res.json({ message: 'Like updated', likes: deck.likes });
      } else {
        res.status(404).json({ message: 'Deck not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating likes' });
    }
  });





export default router;

