import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
  vote_value: {
    type: Number,
    enum: [1, -1], // 1 for upvote, -1 for downvote
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User who voted
    required: true,
  },
  deck_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Deck", // Reference to the Deck that was voted on
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
