import Deck from "../db/Deck.js";
import Tag from "../db/Tag.js";
import checkTag from "../middlewares/TagValidate.js";

// Create a new tag
export const createTag = async (req, res) => {
  try {
    let { name } = req.body;
    if (!Array.isArray(name)) {
      name = [name];
    }
    if (!name || name.length === 0) {
      return res.status(400).json({ message: "tags array is empty" });
    }
    const { errors, validtags } = await checkTag(name);
    if (errors && errors.length > 0){
      return res.status(400).json(errors);
    }
    
    const finalTags = [];
    for(const tags of  validtags){
      const existingtag = await Tag.findOne({name:tags})
        if(existingtag){
            finalTags.push(existingtag);
        }
      if(!existingtag){
      const newTag = new Tag({ name: tags.toLowerCase()})
      await newTag.save();
      finalTags.push(newTag);
    }
  }
    return res.status(201).json({message:"tags added successfully ",finalTags});
  } catch (error) {
   return res.status(500).json({ message: "Internal Server error.", error:error.message });
  }
};



// Get all tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).json({message:"Here are all the tags ",tags});
  } catch (error) {
    
    res.status(500).json({messaage:"Internal Server Error",error:error.message});
  }
};

// Remove a tag from a deck
export const removeTagFromDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const { tagId } = req.body;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    deck.tags = deck.tags.filter((id) => id.toString() !== tagId);
    await deck.save();

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ messaage:"Internal Server Error",error:error.message});
  }
};


export const searchTag = async (req, res) => {
  const prefix = req.query.prefix || '';
 try {
    
      const tags = await Tag.find({ name: { $regex: `^${prefix}`, $options: 'i' } }); 
      const suggestions = tags.map(tag =>tag.name);
     return res.json({ message:"this are the suggestions based on your search",suggestions});
  } catch (error) {
      return res.status(500).json({messaage:"Internal Server Error",error:error.message });
  }
};
