import express from 'express';
const router = express.Router();
import { userAuthMiddleware } from '../middlewares/auth.js';
import  {deleteDeckTag}  from '../controllers/decktagController.js';

router.delete('/:deckId',userAuthMiddleware,deleteDeckTag);


export default router;