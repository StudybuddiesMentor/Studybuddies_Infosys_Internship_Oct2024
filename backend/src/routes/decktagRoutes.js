import express from 'express';
const router = express.Router();
import { userAuthMiddleware } from '../middlewares/auth.js';
import  {deleteDeckTag}  from '../controllers/decktagController.js';
import isdeckOwner from "../middlewares/authoriz.js"

router.delete('/:deckId',userAuthMiddleware,isdeckOwner,deleteDeckTag);


export default router;