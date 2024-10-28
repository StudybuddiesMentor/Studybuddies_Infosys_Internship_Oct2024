import Card from "../db/Card.js";
import Deck from "../db/Deck.js";

// Add a card to a deck
export const createCard = async (req, res) => {
  try {
    const { deckId, question, answer } = req.body;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    const newCard = new Card({
      deck: deckId,
      question,
      answer,
    });

    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update a card
export const updateCard = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    card.question = question || card.question;
    card.answer = answer || card.answer;

    await card.save();
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Delete a card
export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ message: "Card not found." });
    }

    await card.remove();
    res.status(200).json({ message: "Card deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
