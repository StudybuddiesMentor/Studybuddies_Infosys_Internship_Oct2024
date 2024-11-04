import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  },
  deck_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deck", // Reference to the Deck this card belongs to
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);
export default Card;
