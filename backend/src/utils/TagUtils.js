import Tag from "../db/Tag.js";
import DeckTag from "../db/DeckTag.js";
import checkTag from "./TagValidate.js";

/**
 * Validate tags and return valid ones along with errors.
 * @param {Array} tags - Array of tags to validate
 * @returns {Object} - Object containing valid tags and errors
 */
export const checkTagValidity = async (tags) => {
  const errors = [];
  const validTags = [];

  for (const tag of tags) {
    if (!tag || typeof tag !== "string" || tag.length < 2) {
      errors.push(`Invalid tag: ${tag}`);
    } else {
      validTags.push(tag.toLowerCase());
    }
  }

  return { errors, validTags };
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
    const { errors, validTags } = await checkTag(newTags);
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

export default handleTags;