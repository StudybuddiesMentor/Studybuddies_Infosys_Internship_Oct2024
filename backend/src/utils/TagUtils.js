import Tag from "../db/Tag.js";
import DeckTag from "../db/DeckTag.js";
import checkTag from "./TagValidate.js";



/**
 * Handle tags for a new deck.
 * @param {String} deckId - ID of the newly created deck
 * @param {Array} existingTags - Tags already present in the database
 * @param {Array} newTags - New tags to be added
 * @returns {Promise<Array>} - Array of DeckTag objects
 */
const handleTags = async (deckId, existingTags, newTags) => {
  const deckTags = [];
  const error = [];

  // Associate existing tags
  if (existingTags.length > 0) {
    const existingTagPromises = existingTags.map(async (tag) => {
      const existingTag = await Tag.findOne({ name: tag });
      const decktag = await DeckTag.findOne({$and:[{deck_id:deckId},{tag_id:existingTag._id}]})
      if(!decktag){
      return DeckTag.create({ deck_id: deckId, tag_id: existingTag._id });
      }
      return null;
    });
    const existingDeckTags = await Promise.all(existingTagPromises);
    deckTags.push(...existingDeckTags.filter(tag => tag !== null));
  }

  // Validate and add new tags
  if (newTags.length > 0) {
   
      const { errors, validtags } = await checkTag(newTags);
      
      
      if (errors.length > 0) {
        error.push(...errors);
      }

      const newTagPromises = validtags.map(async (tag) => {
        let existingvalidtag = await Tag.findOne({ name: tag });
        
        if (!existingvalidtag) {
          existingvalidtag = new Tag({ name: tag });
          await existingvalidtag.save(); 
        }

        const existingDeckTag = await DeckTag.findOne({ deck_id: deckId, tag_id: existingvalidtag._id });
        if (!existingDeckTag) {
          return DeckTag.create({ deck_id: deckId, tag_id: existingvalidtag._id });
        }
        return null;
      });
  
      
      const newDeckTags = await Promise.all(newTagPromises);
     
      deckTags.push(...newDeckTags.filter(tag => tag !== null));
  }

  return {deckTags,error};
};

export default handleTags;
