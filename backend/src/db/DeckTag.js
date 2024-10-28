import mongoose from "mongoose";

const deckTagSchema = new mongoose.Schema({
  deck_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deck", // Reference to the Deck
    required: true,
  },
  tag_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag", // Reference to the Tag
    required: true,
  },
});

const DeckTag = mongoose.model("DeckTag", deckTagSchema);
export default DeckTag;
