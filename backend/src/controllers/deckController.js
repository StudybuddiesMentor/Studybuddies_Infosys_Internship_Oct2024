import Deck from "../db/Deck.js";
import User from "../db/User.js";
import Tag from "../db/Tag.js";
import DeckTag from "../db/DeckTag.js";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import cloudinary from 'cloudinary'


export const createDeck = async (req, res) => {
  try {
    const { deck_name, description, is_public,tag,imageUrl, fileName } = req.body;
      
      const user = await User.findById(req.user.id);
       if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    const newDeck = new Deck({
      deck_name,
      description,
      is_public,
      created_by: user._id,
    });
    if (imageUrl && fileName) {
      newDeck.deck_Image = { url: imageUrl, filename: fileName };
    }

    await newDeck.save();
//     let deckTag = null;
// if (tag) {
      
//     let findtag = await Tag.findOneAndUpdate({ name: tag },  { name: tag },{ upsert: true, new: true });
    
//      deckTag = await DeckTag.create({deck_id: newDeck._id,  tag_id: findtag._id});
//   }
    
      
//    return res.status(201).json({message:"Deck has been created", newDeck,deckTag });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: "Internal Server error." });
  }
};


// Get all public decks or user's private decks
export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({ created_by: req.user.id });
   return res.status(200).json({message:"Here is your Decks",decks});
  } catch (error) {
    console.error(error);
     return res.status(500).json({ message: "Internal Server error." });
  }
};

// Get a specific deck by ID
export const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

   return res.status(200).json({message:"Deck found",deck});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: "Server error." });
  }
};

// Update a deck
export const updateDeck = async (req, res) => {
  try {
    const { deck_name, description, is_public } = req.body;
    const deck_Image = req.file; // Updated image

    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    // Update deck details
    deck.deck_name = deck_name || deck.deck_name;
    deck.is_public = is_public || deck.is_public;
    deck.description = description || deck.description;

    // Handle image update
    if (deck_Image) {
      let url = req.file.path;
      let filename = req.file.filename;
      deck.deck_Image = { url, filename }; // Update deck's image
    }

    await deck.save();
    return res.status(200).json({ message: "Deck has been updated successfully", deck });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
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
   return res.status(200).json({ message: "Deck deleted successfully." });
  } catch (error) {
    
   return res.status(500).json({ message: "Server error." });
  }
};


export const getPublicDecks = async(req,res)=>{
  console.log("Fetching public decks...");
try{
  const decks = await Deck.find({is_public: true});


  if(decks.length == 0){
   return res.status(404).json({message:"Currently there are no such decks"})
  }
  return res.status(200).json({message:"Public Decks",decks})

}catch(error){
 return res.status(500).json({message:"Internal Serval Error", error:error.message});
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
export const deckImage = async(req,res)=>{
  
  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded.' });
  }
  try {
    const imageUrl = req.file.path;
    const fileName = req.file.originalname; 

    return res.status(200).json({message: 'Image uploaded successfully!',imageUrl,fileName});
  } catch (error) {
    console.error('Error uploading deck image:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }

}

export const deckImageUpdate = async(req,res)=>{

  if (!req.file) {
   return res.status(400).json({ error: 'No image file uploaded.' });
 }
 try {
   
    const deck = await Deck.findById(req.params.id)
    if (!deck) {
     return res.status(404).json({ message: 'Deck not found.' });
   }
    if(deck.deck_Image && deck.deck_Image.url){
     const publicId = extractPublicIdFromUrl(deck.deck_Image.url);
     if (publicId) {
         await cloudinary.v2.uploader.destroy(publicId);
     }
    }
    deck.deck_Image = {
     url: req.file.path,
     filename: req.file.originalname,
   };
   await deck.save(); 
 
   return res.status(200).json({message: 'Image uploaded successfully!',deck});
 } catch (error) {
   console.error('Error uploading deck image:', error);
   return res.status(500).json({ error: 'Internal server error.' });
 }

}