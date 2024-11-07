import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
  deck_name: {
    type: String,
    required: true,
  },
  deck_Image:{
    url : String,
    filename : String
  },
  description: {
    type: String,
    default: "",
  },
  is_public: {
    type: Boolean,
    default: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who created this deck
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

const Deck = mongoose.model("Deck", deckSchema);
export default Deck;