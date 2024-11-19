import Card from "../db/Card.js";
import Deck from "../db/Deck.js";

// Add a card to a deck
export const createCard = async (req, res) => {
  try {
    const { Title, Content } = req.body;
   
    const {deckId }= req.params;
   

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    const newCard = new Card({
      deck_id: deckId,
      Title,
      Content,
    });

    await newCard.save();
  return  res.status(201).json({message:"New flash Card has been created",newCard});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: "Internal Server error", error:error.message});
  }
};

// Update a card
export const updateCard = async (req, res) => {
  try {
    const { Title, Content } = req.body;
    const {deckId,cardId} = req.params;

    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    card.Title = Title || card.Title;
    card.Content = Content || card.Content;

    await card.save();
   return res.status(200).json({message:"Flash card has been updated",card});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: "Internal Server error.",error:error.message });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  const{cardId} = req.params;
 
  try {
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    await card.updateOne({deleted:true});
   return res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    
   return res.status(500).json({ message: "Server error." });
  }
};


export const getCards = async(req,res)=>{
  const {deckId} = req.params;
  try{
    const cards = await Card.find({$and:[{deck_id:deckId},{deleted:{$ne:true}}]});
    if(cards.length === 0){
     return res.status(404).json({message:"deck doesn't have any flashcards currently"})
    }

    return res.status(200).json({message:"Here are the cards of deck",cards})
  }
  catch(error){
    res.status(500).json({message:"Internal Server error",error:error.message});
  }

}