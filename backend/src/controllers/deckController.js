// Import dependencies
import Deck from "../db/Deck.js";
import User from "../db/User.js";
import Tag from "../db/Tag.js";
import DeckTag from "../db/DeckTag.js";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import cloudinary from 'cloudinary';
import handleTags from "../utils/TagUtils.js";
import SendMail from "../utils/SenddeckMail.js";
import Card from "../db/Card.js";
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
    const {error,deckTags} = await handleTags(newDeck._id, existingTags, newTags);
    if (error && error.length > 0){
      return res.status(400).json(error);
    }

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
    return res.status(500).json({ message: "Internal server error.",error:error.message });
  }
};

/**
 * Get all public decks or user's private decks.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getDecks = async (req, res) => {
  try {
    // Fetch all decks created by the user and not marked as "Deleted"
    const decks = await Deck.find({
      $and: [
        { created_by: req.user.id },
        { deck_status: { $ne: "Deleted" } },
      ],
    });

    // Process each deck
    const userDecks = await Promise.all(
      decks.map(async (deck) => {
        // Fetch all cards related to the deck
        const cards = await Card.find({ deck_id: deck._id });

        // Fetch all tags related to the deck
        const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
        const tags = deckTags.map((deckTag) => deckTag.tag_id);

        // Determine if the user has upvoted or downvoted the deck
        const hasUpvoted = deck.upvotes.includes(req.user.id);
        const hasDownvoted = deck.downvotes.includes(req.user.id);

        return { deck, tags, cards, hasUpvoted, hasDownvoted };
      })
    );

    return res.status(200).json({ message: "Here are your decks.", userDecks });
  } catch (error) {
    console.error("Error fetching decks:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
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
    const deck = await Deck.findById(req.params.deckId).populate('created_by', 'username');
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    // Fetch tags and flashcards related to the deck
    const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
    const tags = deckTags.map((deckTag) => deckTag.tag_id);
    const flashcards = await Card.find({ deck_id: deck._id });

    // Determine if the user has upvoted or downvoted the deck
    const hasUpvoted = deck.upvotes.includes(req.user.id);
    const hasDownvoted = deck.downvotes.includes(req.user.id);

    return res.status(200).json({
      message: "Deck found.",
      deck,
      tags,
      flashcards,
      hasUpvoted,
      hasDownvoted,
    });
  } catch (error) {
    console.error("Error fetching deck by ID:", error);
    return res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};




// Update a deck
export const updateDeck = async (req, res) => {
  try {
    const { deck_name, description, deck_status,tags } = req.body;
    const tagArray = Array.isArray(tags) ? tags : [tags];
    const existingTags = [];
    const newTags = [];

    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    // Update deck details
    deck.deck_name = deck_name || deck.deck_name;
    deck.deck_status = deck_status || deck.deck_status;
    deck.description = description || deck.description;
    if (tagArray.length > 0) {
      for (const tag of tagArray) {
        const existingTag = await Tag.findOne({ name: tag.toLowerCase() });
        existingTag ? existingTags.push(tag.toLowerCase()) : newTags.push(tag.toLowerCase());
      }
      
    }

    const {error,deckTags} = await handleTags(deck._id, existingTags, newTags);
    if (error && error.length > 0){
      return res.status(400).json(error);
    }

    // Format tags for response
    const updatedTags = await Promise.all(
      deckTags.map(async (deckTag) => {
        const tag = await Tag.findById(deckTag.tag_id);
        return { tag_id: tag._id, tag_name: tag.name };
      })
    );


    await deck.save();
    return res.status(200).json({ message: "Deck has been updated successfully", deck,updatedTags });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server error.",error:error.message });
  }
};


// Delete a deck
export const deleteDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    await deck.updateOne({deck_status:"Deleted"});
       return res.status(200).json({ message: "Deck deleted successfully." });
  } catch (error) {
    
   return res.status(500).json({ message: "Internal Server error.",error:error.message });
  }
};

//To get all the public decks 
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
  const filterpublicDecks = await Promise.all(
    decks.map(async (deck) => {
      const cardscount = await Card.countDocuments({deck_id:deck._id})
      if(cardscount > 0){
        const cards = await Card.find({ deck_id: deck._id });
       const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
       const tags = deckTags.map((deckTag) => deckTag.tag_id);
      return { deck, tags,cards };
      }
      return null;
    })

  );
  const publicDecks = filterpublicDecks.filter(deck => deck !== null);
 if(publicDecks.length === 0){
  return res.status(404).json({message:"There are no decks currently to Explore."})
 }
  return res.status(200).json({message:"Public Decks",publicDecks})

}catch(error){
 return res.status(500).json({message:"Internal Serval Error", error:error.message});
}
}

//To remove all decks for user 
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

//particular user total deck count
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

//upload deck image
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
    return res.status(500).json({ error: 'Internal server error.',error:error.message });
  }

}

//update image with deck id 
export const deckImageUpdate = async(req,res)=>{

  if (!req.file) {
   return res.status(400).json({ error: 'No image file uploaded.' });
 }
 try {
   
    const deck = await Deck.findById(req.params.deckId)
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
   return res.status(500).json({ error: 'Internal server error.',error:error.message });
 }

}


//soft deletion of deck by admin
export const softdeleteDeck = async (req, res) => {
  try {
    
    const deck = await Deck.findById(req.params.deckId).populate('created_by','username email');
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
    
   return res.status(500).json({ message: "Internal Server error",error:error.message });
  }
};

//Deck deletion from database by admin
export const HardDelete = async(req,res)=>{
try{
  const deck = await Deck.findByIdAndDelete(req.params.deckId);
  if (!deck) {
    return res.status(404).json({ message: "Deck not found" });
  }
  if (deck.deck_image && deck.deck_image.url) {
  const publicId = extractPublicIdFromUrl(deck.deck_image.url);
try {
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (cloudinaryError) {
    console.error("Cloudinary deletion failed", cloudinaryError.message);
  }
}            
  return res.status(200).json({ message: "Deck deleted successfully." });
} catch (error) {
  return res.status(500).json({ message: "Internal Server error", error:error.message });
}
};
 
//The deleted decks are revoked by admin to normal state
export const RevokeDelete = async(req,res)=>{
  try{
    const deck = await Deck.findById(req.params.deckId);
  if (!deck) {
    return res.status(404).json({ message: "Deck not found" });
  }
  if(deck.deck_status === "Deleted"){
    await deck.updateOne({deck_status:"Public"});
  
    return res.status(200).json({ message: "Deck revoked successfully" });
    }else{
      return res.status(400).json({message:"Deck is not in deleted state"})
    }
} catch (error) {

return res.status(500).json({ message: "Internal Server error",error:error.message });
}
};

//admin can explore both the deleted and public decks 
export const adminExploreDecks = async(req,res)=>{
  try{
    const user = await User.findById(req.user.id);
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const decks = await Deck.find({$or:[{deck_status:"Public"},{deck_status:"Deleted"}]});
    
  
    if(decks.length == 0){
     return res.status(404).json({message:"Currently there are no such decks"})
    }
    const filterpublicDecks = await Promise.all(
      decks.map(async (deck) => {
        const cardscount = await Card.countDocuments({deck_id:deck._id})
        if(cardscount > 0){
          const cards = await Card.find({ deck_id: deck._id });
        const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
        const tags = deckTags.map((deckTag) => deckTag.tag_id);
        return { deck, tags, cards };
        }
        return null;
      })
    );
    
    const publicDecks = filterpublicDecks.filter(deck => deck !== null);
   if(publicDecks.length === 0){
    return res.status(404).json({message:"There are no decks currently to Explore."})
   }
    return res.status(200).json({message:"Public Decks", publicDecks})
  
  }catch(error){
   return res.status(500).json({message:"Internal Serval Error", error:error.message});
  }
}

/**
 * Toggle upvote or downvote for a deck.
 * @route POST /api/decks/:deckId/vote
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const toggleVote = async (req, res) => {
  const { action } = req.body; // `action` should be either "upvote" or "downvote"
  const userId = req.user.id; // Assume `req.user` contains authenticated user info

  try {
    // Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Ensure the user has the "user" role
    if (user.role !== "user") {
      return res.status(403).json({
        message: "Only users with role 'user' can vote on decks.",
      });
    }

    // Find the deck by ID
    const deck = await Deck.findById(req.params.deckId);
    if (!deck) {
      return res.status(404).json({
        message: "Deck not found.",
      });
    }

    // Ensure the deck is public
    if (deck.deck_status !== "Public") {
      return res.status(403).json({
        message: "Only public decks can be voted on.",
      });
    }

    // Ensure the user is not the owner of the deck
    if (deck.created_by.toString() === userId) {
      return res.status(403).json({
        message: "You cannot vote on your own deck.",
      });
    }

    // Handle upvote logic
    if (action === "upvote") {
      if (deck.upvotes.includes(userId)) {
        // Remove upvote if already upvoted
        deck.upvotes = deck.upvotes.filter((id) => id.toString() !== userId);
      } else {
        // Add upvote and remove downvote if it exists
        deck.upvotes.push(userId);
        deck.downvotes = deck.downvotes.filter((id) => id.toString() !== userId);
      }
    }

    // Handle downvote logic
    if (action === "downvote") {
      if (deck.downvotes.includes(userId)) {
        // Remove downvote if already downvoted
        deck.downvotes = deck.downvotes.filter((id) => id.toString() !== userId);
      } else {
        // Add downvote and remove upvote if it exists
        deck.downvotes.push(userId);
        deck.upvotes = deck.upvotes.filter((id) => id.toString() !== userId);
      }
    }

    // Save the updated deck
    await deck.save();

    return res.status(200).json({
      message: `${action === "upvote" ? "Upvoted" : "Downvoted"} successfully.`,
      upvotes: deck.upvotes.length,
      downvotes: deck.downvotes.length,
    });
  } catch (error) {
    console.error("Error toggling vote:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};



