import Tag from "../db/Tag.js";

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
