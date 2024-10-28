import Deck from "../db/deck.js";

// Create a new deck
export const createDeck = async (req, res) => {
  try {
    const { name, isPublic } = req.body;
    const newDeck = new Deck({
      name,
      isPublic,
      createdBy: req.user.id,
    });

    await newDeck.save();
    res.status(201).json(newDeck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get all public decks or user's private decks
export const getDecks = async (req, res) => {
  try {
    const decks = await Deck.find({
      $or: [{ isPublic: true }, { createdBy: req.user.id }],
    });
    res.status(200).json(decks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Get a specific deck by ID
export const getDeckById = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    res.status(200).json(deck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update a deck
export const updateDeck = async (req, res) => {
  try {
    const { name, isPublic } = req.body;

    const deck = await Deck.findById(req.params.id);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    // Update deck details
    deck.name = name || deck.name;
    deck.isPublic = isPublic || deck.isPublic;

    await deck.save();
    res.status(200).json(deck);
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
