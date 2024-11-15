import Deck from "../db/Deck.js";
import User from "../db/User.js";
import Tag from "../db/Tag.js";
import DeckTag from "../db/DeckTag.js";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import cloudinary from 'cloudinary';
import checkTag from "../middlewares/TagValidate.js";


export const createDeck = async (req, res) => {
  try {
    const { deck_name, description, deck_status, tags, imageUrl, fileName } = req.body;
     let existTag = [];
     let  newTag = [];
     const arraytags = Array.isArray(tags) ? tags : [tags]; 
     if(arraytags.length>0){
      for(const tag of arraytags){
        const existingtag = await Tag.findOne({name:tag.toLowerCase()})
        if(existingtag){
          existTag.push(tag.toLowerCase());
        }else{
          newTag.push(tag.toLowerCase());
        }
      }
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newDeck = new Deck({deck_name,description,deck_status,
      created_by: user._id,
    });

    if (imageUrl && fileName) {
      newDeck.deck_image = { url: imageUrl, filename: fileName };
    }

    await newDeck.save();

    let deckTags = [];
    let errors = [];
    if(existTag && existTag.length>0){
      const decktag = existTag.map(async (tag) => {
        const existingTag = await Tag.findOne({ name: tag });
    return DeckTag.create({ deck_id: newDeck._id, tag_id: existingTag._id });
  });
  deckTags = await Promise.all(decktag);
  }
  if(newTag && newTag.length>0){
    const { errors, validtags } = await checkTag(newTag);
    if (errors && errors.length > 0){
      return res.status(400).json(errors);
    }
    const newtag = validtags.map(async (tag) => {
      const createdTag = new Tag({ name: tag });
      await createdTag.save();
      return DeckTag.create({ deck_id: newDeck._id, tag_id: createdTag._id });
    });
    const newDeckTags = await Promise.all(newtag);
    deckTags.push(...newDeckTags);
  }
  const getDeckTags = await Promise.all(
    deckTags.map(async (deckTag) => {
      const tag = await Tag.findById(deckTag.tag_id);
      return { tag_id: tag._id, tag_name: tag.name };
    })
  );


    return res.status(201).json({ message: "Deck has been created",newDeck, deckTags:getDeckTags });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server error." });
  }
};



// Get all public decks or user's private decks
export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({$and:[{ created_by: req.user.id },{deck_status:{$ne:"Deleted"}}]});
   return res.status(200).json({message:"Here are your Decks",decks});
  } catch (error) {
    console.error(error);
     return res.status(500).json({ message: "Internal Server error." });
  }
};

// Get a specific deck by ID
export const getDeckById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }
    const deckTags = await DeckTag.find({ deck_id: deck._id }).populate('tag_id');

    const tags = deckTags.map((deckTag) => deckTag.tag_id);

   return res.status(200).json({message:"Deck found",deck,tags});
  } catch (error) {
    console.error(error);
   return res.status(500).json({ message: "Server error." });
  }
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