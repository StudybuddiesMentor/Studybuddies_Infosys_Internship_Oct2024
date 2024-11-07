// Upvote a deck
export const upvoteDeck = async (req, res) => {
  try {
    const { deckId } = req.body;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    const existingVote = await Vote.findOne({ deck: deckId, user: req.user.id });

    // If the user has already upvoted, return an error or toggle functionality
    if (existingVote && existingVote.voteType === "upvote") {
      return res.status(400).json({ message: "You have already upvoted this deck." });
    }

    // Update vote to upvote if user previously downvoted
    if (existingVote && existingVote.voteType === "downvote") {
      existingVote.voteType = "upvote";
      await existingVote.save();
      return res.status(200).json(existingVote);
    }

    // If no existing vote, create a new upvote
    const newVote = new Vote({
      deck: deckId,
      user: req.user.id,
      voteType: "upvote",
    });

    await newVote.save();
    res.status(201).json(newVote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};


// Downvote a deck
export const downvoteDeck = async (req, res) => {
  try {
    const { deckId } = req.body;

    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ message: "Deck not found." });
    }

    const existingVote = await Vote.findOne({ deck: deckId, user: req.user.id });

    // If the user has already downvoted, return an error or toggle functionality
    if (existingVote && existingVote.voteType === "downvote") {
      return res.status(400).json({ message: "You have already downvoted this deck." });
    }

    // Update vote to downvote if user previously upvoted
    if (existingVote && existingVote.voteType === "upvote") {
      existingVote.voteType = "downvote";
      await existingVote.save();
      return res.status(200).json(existingVote);
    }

    // If no existing vote, create a new downvote
    const newVote = new Vote({
      deck: deckId,
      user: req.user.id,
      voteType: "downvote",
    });

    await newVote.save();
    res.status(201).json(newVote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
