import Deck from "../db/Deck.js";
import User from "../db/User.js";

// Create a new deck
export const createDeck = async (req, res) => {
  try {
    const { deck_name, description, is_public } = req.body;
      const deck_Image = req.file;
      const user = await User.findById(req.user.id);
      console.log(req.user.id);
      console.log(user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    const newDeck = new Deck({
      deck_name,
      description,
      is_public,
      created_by: user._id,
    });
    if(deck_Image){
      let url = req.file.path;
       let filename = req.file.filename;
       newDeck.deck_Image ={url,filename} 
   }

    await newDeck.save();
    res.status(201).json({message:"Deck has been created",newDeck});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error." });
  }
};

// Get all public decks or user's private decks
export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({ created_by: req.user.id });
    res.status(200).json({message:"Here is your Decks",decks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error." });
  }
};

// Get a specific deck by ID
export const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    res.status(200).json({message:"Deck found",deck});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update a deck
export const updateDeck = async (req, res) => {
  try {
    const { deck_name, description, is_public } = req.body;
      const deck_Image = req.file;

    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    // Update deck details
    deck.deck_name = deck_name || deck.deck_name
    deck.is_public = is_public || deck.is_public;
    deck.description = description || deck.description;
    if(deck_Image){
      let url = req.file.path;
       let filename = req.file.filename;
       newDeck.deck_Image ={url,filename} 
   }
    await deck.save();
    res.status(200).json({message:"Deck has been updated successfully",deck});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a deck
export const deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    await deck.remove();
    res.status(200).json({ message: "Deck deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};


export const getPublicDecks = async(req,res)=>{
  console.log("Fetching public decks...");
try{
  const decks = await Deck.find({is_public: true});
  console.log(decks);

  if(decks.length == 0){
    res.status(404).json({message:"Currently there are no such decks"})
  }
  return res.status(200).json({message:"Public Decks",decks})

}catch(error){
  res.status(500).json({message:"Internal Serval Error", error:error.message});
}
}


export const RemoveAllDecks = async(req,res)=>{
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const removedecks = await Deck.deleteMany({})
    return res.status(200).json({message:"All your Decks are deleted successfully"})
  }catch(error){
    return res.status(500).json({message:"Internal Server error", error : error.message});
  }
}

export const countDecks = async(req,res)=>{
  
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const deckCount = await Deck.countDocuments();
     return res.status(200).json({message:"Total number of decks ",deckCount})
  }catch(error){
    return res.status(500).json({message:"Internal Server error", error : error.message});
  }
}