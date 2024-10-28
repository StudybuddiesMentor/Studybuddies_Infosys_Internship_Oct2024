import Deck from "../db/Deck.js";
import Tag from "../db/Tag.js";

// Create a new tag
export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    const newTag = new Tag({
      name,
    });

    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Add a tag to a deck
export const addTagToDeck = async (req, res) => {
  try {
    const { deckId } = req.params;
    const { tagId } = req.body;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    deck.tags.push(tagId);
    await deck.save();

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all tags
export const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
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
    res.status(500).json({ message: "Server error." });
  }
};
