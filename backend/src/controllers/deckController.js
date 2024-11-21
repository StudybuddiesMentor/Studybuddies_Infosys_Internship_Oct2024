// Import dependencies
import Deck from "../db/Deck.js";
import User from "../db/User.js";
import Tag from "../db/Tag.js";
import DeckTag from "../db/DeckTag.js";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import cloudinary from 'cloudinary';
import checkTag from "../utils/TagValidate.js";
import SendMail from "../utils/SenddeckMail.js";
/**
 * Create a new deck with associated tags and optional image.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const createDeck = async (req, res) => {
  try {
    const { deck_name, description, deck_status, tags, imageUrl, fileName } = req.body;

    // Validate user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Process tags
    const tagArray = Array.isArray(tags) ? tags : [tags];
    const existingTags = [];
    const newTags = [];

    if (tagArray.length > 0) {
      for (const tag of tagArray) {
        const existingTag = await Tag.findOne({ name: tag.toLowerCase() });
        existingTag ? existingTags.push(tag.toLowerCase()) : newTags.push(tag.toLowerCase());
      }
    }

    // Create a new deck
    const newDeck = new Deck({
      deck_name,
      description,
      deck_status,
      created_by: user._id,
    });

    if (imageUrl && fileName) {
      newDeck.deck_image = { url: imageUrl, filename: fileName };
    }

    await newDeck.save();

    // Handle tag associations
    const deckTags = await handleTags(newDeck._id, existingTags, newTags);

    // Format tags for response
    const formattedTags = await Promise.all(
      deckTags.map(async (deckTag) => {
        const tag = await Tag.findById(deckTag.tag_id);
        return { tag_id: tag._id, tag_name: tag.name };
      })
    );

    return res.status(201).json({
      message: "Deck has been created.",
      newDeck,
      deckTags: formattedTags,
    });
  } catch (error) {
    console.error("Error creating deck:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Get all public decks or user's private decks.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({
      $and: [
        { created_by: req.user.id },
        { deck_status: { $ne: "Deleted" } },
      ],
    });

    const userDecks = await Promise.all(
      decks.map(async (deck) => {
        const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
        const tags = deckTags.map((deckTag) => deckTag.tag_id);
        return { deck, tags };
      })
    );

    return res.status(200).json({ message: "Here are your decks.", userDecks });
  } catch (error) {
    console.error("Error fetching decks:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Get a specific deck by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDeckById = async (req, res) => {
  try {
    // Validate user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the deck
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
    const tags = deckTags.map((deckTag) => deckTag.tag_id);

    return res.status(200).json({ message: "Deck found.", deck, tags });
  } catch (error) {
    console.error("Error fetching deck by ID:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * Handle tags for a new deck.
 * @param {String} deckId - ID of the newly created deck
 * @param {Array} existingTags - Tags already present in the database
 * @param {Array} newTags - New tags to be added
 * @returns {Promise<Array>} - Array of DeckTag objects
 */
const handleTags = async (deckId, existingTags, newTags) => {
  const deckTags = [];

  // Associate existing tags
  if (existingTags.length > 0) {
    const existingTagPromises = existingTags.map(async (tag) => {
      const existingTag = await Tag.findOne({ name: tag });
      return DeckTag.create({ deck_id: deckId, tag_id: existingTag._id });
    });
    const existingDeckTags = await Promise.all(existingTagPromises);
    deckTags.push(...existingDeckTags);
  }

  // Validate and add new tags
  if (newTags.length > 0) {
    const { errors, validTags } = await checkTagValidity(newTags);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    const newTagPromises = validTags.map(async (tag) => {
      const createdTag = new Tag({ name: tag });
      await createdTag.save();
      return DeckTag.create({ deck_id: deckId, tag_id: createdTag._id });
    });
    const newDeckTags = await Promise.all(newTagPromises);
    deckTags.push(...newDeckTags);
  }

  return deckTags;
};


// Update a deck
export const updateDeck = async (req, res) => {
  try {
    const { deck_name, description, deck_status,tag } = req.body;

    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    // Update deck details
    deck.deck_name = deck_name || deck.deck_name;
    deck.deck_status = deck_status || deck.deck_status;
    deck.description = description || deck.description;


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

    await deck.updateOne({deck_status:"Deleted"});
       return res.status(200).json({ message: "Deck deleted successfully." });
  } catch (error) {
    
   return res.status(500).json({ message: "Server error." });
  }
};


export const getPublicDecks = async(req,res)=>{
  
try{
  const user = await User.findById(req.user.id);
  if(!user){
    return res.status(404).json({message:"user not found"})
  }
  const decks = await Deck.find({deck_status:"Public"});


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
    const removedecks = await Deck.updateMany({deck_status:"Deleted"})
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
    const deckCount = await Deck.countDocuments({$and:[{ created_by: req.user.id },{deck_status:{$ne:"Deleted"}}]});
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
    if(deck.deck_image && deck.deck_image.url){
     const publicId = extractPublicIdFromUrl(deck.deck_image.url);
     if (publicId) {
         await cloudinary.v2.uploader.destroy(publicId);
     }
    }
    deck.deck_image = {
     url: req.file.path,
     filename: req.file.originalname,
   };
   await deck.save(); 
 
   return res.status(200).json({message: 'Image uploaded successfully!', deck_image:deck.deck_image});
 } catch (error) {
   console.error('Error uploading deck image:', error);
   return res.status(500).json({ error: 'Internal server error.' });
 }

}



export const softdeleteDeck = async (req, res) => {
  try {
    
    const deck = await Deck.findById(req.params.id).populate('created_by','username email');
    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }
    
    try {
      await SendMail(deck.created_by.username, deck.created_by.email, deck.deck_name);
    } catch (mailError) {
      return res.status(500).json({ message: "Failed to send mail" });
    }
    

    await deck.updateOne({deck_status:"Deleted"});

       return res.status(200).json({ message: "Deck deleted successfully" });
  } catch (error) {
    
   return res.status(500).json({ message: "Internal Server error" });
  }
};


export const HardDelete = async(req,res)=>{
try{
  const deck = await Deck.findByIdAndDelete(req.params.id);
  if (!deck) {
    return res.status(404).json({ message: "Deck not found" });
  }
  return res.status(200).json({ message: "Deck deleted successfully." });
} catch (error) {
  return res.status(500).json({ message: "Internal Server error", error:error.message });
}
};

export const RevokeDelete = async(req,res)=>{
  try{
    const deck = await Deck.findByIdAndDelete(req.params.id);
  if (!deck) {
    return res.status(404).json({ message: "Deck not found" });
  }
  await deck.updateOne({deck_status:"Public"});

  return res.status(200).json({ message: "Deck deleted successfully" });
} catch (error) {

return res.status(500).json({ message: "Internal Server error" });
}
};